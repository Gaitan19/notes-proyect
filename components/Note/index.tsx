'use client';
import { handleDeleteNote, handleEditNote } from '@/services/notes';
import { alertMessage } from '../Alert';
import { useState } from 'react';

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
  const [isEditing, setIsEditing] = useState(false);
  const [noteValue, setNoteValue] = useState(text);

  const handleDeleteNotes = async () => {
    const { data, status } = await handleDeleteNote(id);

    if (status === 200) {
      alertMessage.success('Note deleted successfully');
      console.log('data :>> ', data);

      const newNotes = notes.filter((note: any) => note.id !== id);
      console.log('newNotes :>> ', newNotes);

      await updatesNotes(newNotes);
    } else {
      alertMessage.error("Note couldn't be deleted");
    }
  };

  const handleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  };

  const handleEditingText = () => {
    if (!isEditing) {
      return <label>{noteValue}</label>;
    }

    return (
      <input
        defaultValue={noteValue}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
      />
    );
  };

  const handleChangeInput = (input: any) => {
    setNoteValue(() => input.target.value);
  };

  const handleUpdate = async () => {
    if (noteValue !== '') {
      const {
        data: { body },
        status,
      } = await handleEditNote(id, { post: noteValue });

      if (status === 200) {
        setIsEditing((prevEditing) => !prevEditing);

        const newNotes = notes.map((note) => {
          if (note.id === id) {
            note.post = body.data.post;
          }

          return note;
        });

        await updatesNotes(newNotes);

        alertMessage.success('Note edited successfully');
      } else {
        alertMessage.error("Note couldn't be edited");
      }
    } else {
      alertMessage.error("the Note can't be emty");
    }
  };

  const handleEditingButton = () => {
    if (!isEditing) {
      return <button onClick={handleEditing}>Edit</button>;
    }

    return <button onClick={handleUpdate}>Save</button>;
  };

  return (
    <li>
      {/* <span>{text}</span>
       */}

       {handleEditingText()}
      <div>
        {/* <button>edit</button>
         */}
         {handleEditingButton()}
        <button onClick={handleDeleteNotes}>delete</button>
      </div>
    </li>
  );
};

export default Note;
