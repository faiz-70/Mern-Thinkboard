import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRatelimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.group(res.data);
        setNotes(res.data);
        setIsRateLimited(false);        
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if(error.response?.status === 492){
          setIsRateLimited(true)
        } else{
          toast.error("Failed to loads notes")
        }
      } finally{
        setLoading(false)
      }
    };
    fetchNotes();
  },[]);
  console.log("notes",notes)
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6"> 
        {loading && <div className="text-centre text-primary py-10">Loading notes...</div>}
        {notes.length === 0 && !isRatelimited && <NotesNotFound />}
        {notes.length > 0 && !isRatelimited && (
          <div className="grid gri-col-1 mid:grid-clos-2 lg:grid-cols-3 gap-6">
            {notes.map((note) =>(
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}

          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
