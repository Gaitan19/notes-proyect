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
    <div className="mt-8 bg-gray-100 rounded-md p-4 shadow-md">
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        className="flex-grow py-2 px-4 mr-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Enter a note"
        type="text"
        value={newNote}
        onChange={handleChangeInput}
        required
      />
      <button className="py-2 px-4 rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
        Submit
      </button>
    </form>
  </div>
  );
};

export default InputNote;
