import { handleDeleteNote } from "@/services/notes";
import { alertMessage } from "../Alert";

interface UpdateNote {
  (text: any): void;
}

interface notesData {
  author: string;
  created_at: string;
  id: number;
  post: string;
}

interface NoteProps {
  id: number;
  text: string;

  updatesNotes: UpdateNote;
  notes: notesData[];
}

const Note = ({ id, text, notes, updatesNotes }: NoteProps) => {

  const handleDeleteNotes = async () => {
    const { data, status } = await handleDeleteNote(id);

    if (status === 200) {
      alertMessage.success('Note deleted successfully');
      console.log('data :>> ', data);

      const newNotes = notes.filter((note:any) => note.id !== id)
      console.log('newNotes :>> ', newNotes);

      await updatesNotes(newNotes);
    }

    else{
        alertMessage.error("Note couldn't be deleted")
    }

  }

  return (
    <li>
      <span>{text}</span>
      <div>
        <button>edit</button>
        <button onClick={handleDeleteNotes}>delete</button>
      </div>
    </li>
  );
};

export default Note;
