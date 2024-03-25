"use client";

import { useCallback, useEffect, useState } from "react";
import Note from "../Note";
import { handleGetNotes } from "@/services/notes";

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
        console.log("error :>> ", error);
      }
    }
  }, [setNotes]);

  useEffect(() => {
    fetchData();
    console.log("notes :>> ", notes);
  }, [fetchData]);

  const renderNotes = () =>
    notes.map((note:NoteData) => {
      return <Note id={note.id} text={note.post} key={note.id}/>
    });

  return (
    <section className="w-full">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <ul>{notes.length > 0 && renderNotes()}</ul>
        </div>
      </div>
    </section>
  );
};

export default NotesList;
