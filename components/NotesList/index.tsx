'use client'

import { useCallback, useEffect, useState } from "react"
import Note from "../Note"
import { handleGetNotes } from "@/services/notes"


interface notesListProps {
    user_id: string;
}

const NotesList = ({user_id}:notesListProps) => {
const[notes,setNotes] = useState([])



// console.log('user_id :>> ', user_id);


// const fetchData = useCallback(async () => {
//    if(notes.length < 1)
//    {
//     try {
    
//         const { data, status } = await handleGetNotes(user_id);
//         if (status === 200) {
//           setNotes(data);
//         }

//     } catch (error) {
//       console.log('error :>> ', error);
//     }
//    }
//   }, [setNotes]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

 
// const renderNotes = () => 



  return (
    <section className="w-full">
        <div className="container mx-auto">
            <div>
                <ul>

                </ul>
            </div>
        </div>

    </section>
  )
}

export default NotesList