import{ PenSquareIcon, PensquareIcon, Trash2Icon } from "lucide-react";
import{ Link } from "react-router";
import { formatDate } from "../lib/utils";
const NoteCard = ({ note }) => {
  return (
    <Link
       to={'/note/${note._id}'}
       className="card bh-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-action justify-between items-centre mt-4">
                <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
                <div className="flex tems-centre gap-1">
                    <PenSquareIcon className="size-4" />
                    <button className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon className="size-4" />
                    </button>

                </div>

            </div>

        </div>
    </Link>
  )
};
export default NoteCard;
