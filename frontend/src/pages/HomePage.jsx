import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import axios from "axios"
import toast from "react-hot-toast";
const HomePage = () => {
  const [isRatelimited, setIsRateLimited] = useState(true);
  const [notes, setnotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.group(res.data);
        setnotes(res.data);
        setIsRateLimited(false)        
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error)
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
  })
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6"> 
        {loading && <div className="text-centre text-primary py-10">Loading notes...</div>}
        {notes.len > 0 && !isRatelimited && (
          <div clasName="grid gri-col-1 mid:grid-clos-2 lg:grid-co;s-3 gap-6">
            {notes.map((note) =>(
              <NoteCard key={note.id} note={note} />
            ))}

          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
