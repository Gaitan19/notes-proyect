'use client';

import { useCallback, useEffect, useState } from 'react';
import Note from '../Note';
import { handleGetNotes } from '@/services/notes';
import InputNote from '../InputNote';
import GridLoader from 'react-spinners/GridLoader';

interface notesListProps {
  author: string;
}

interface NoteData {
  id: number;
  post: string;
}

const NotesList = ({ author }: notesListProps) => {
  const [notes, setNotes] = useState([]);

  const fetchData = useCallback(async () => {
    if (notes.length < 1) {
      try {
        const { data, status } = await handleGetNotes(author);
        if (status === 200) {
          setNotes(() => data.body.data);
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }, [setNotes]);

  useEffect(() => {
    fetchData();
    console.log('notes :>> ', notes);
  }, [fetchData]);

  const handleUpdateNotes = (newNotes: any) => {
    setNotes(() => newNotes);
  };

  const renderNotes = () =>
    notes.map((note: NoteData) => {
      return (
        <Note
          id={note.id}
          text={note.post}
          notes={notes}
          updatesNotes={handleUpdateNotes}
          key={note.id}
        />
      );
    });

  return (
    <section className="bg-background py-8 w-ful">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <InputNote
            author={author}
            notes={notes}
            updatesNotes={handleUpdateNotes}
          />

          {notes.length > 0 ? (
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 notes__list">
              {renderNotes()}
            </ul>
          ) : (
            <div className="pt-9">
              <GridLoader color="#4B5563" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotesList;
