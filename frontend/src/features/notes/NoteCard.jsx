import { Trash2 } from 'lucide-react';

const NoteCard = ({ note, onDelete }) => {
  return (
    <div className="group bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative">
      <div className="pr-8">
        <h3 className="font-bold text-lg text-gray-800 truncate">{note.title}</h3>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3">{note.content}</p>
      </div>
      <button 
        onClick={() => onDelete(note.id)}
        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
        title="Delete Note"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default NoteCard;