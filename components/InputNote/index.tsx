import { use, useState } from 'react';
import { alertMessage } from '../Alert';
import { handlePostNote } from '@/services/notes';

interface UpdateNote {
  (text: any): void;
}

interface notesData {
  author: string;
  created_at: string;
  id: number;
  post: string;
}

interface inputNote {
  author: string;
  updatesNotes: UpdateNote;
  notes: notesData[];
}

interface note {
  author?: string;
  post: string;
}

const InputNote = ({ author, updatesNotes, notes }: inputNote) => {
  const [newNote, setNewNote] = useState('');

  const handleChangeInput = (input: any): void => {
    setNewNote(input.target.value);
  };

  const handleSubmit = async (event: any) => {
    await event.preventDefault();

    const noteData = {
      author,
      post: newNote,
    };

    const { data, status } = await handlePostNote(noteData);

    if (status === 200) {
      alertMessage.success('Note added successfully');
      console.log('data :>> ', data);

      await updatesNotes([...notes, data.body.data]);
      setNewNote(()=> '')
    }

    else{
        alertMessage.error("Note couldn't be added")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a note"
          type="text"
          value={newNote}
          onChange={handleChangeInput}
          required
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default InputNote;
