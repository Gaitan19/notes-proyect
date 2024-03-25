

interface NoteProps {
    id: string;
    text: string;
  }
  
const Note = ({id,text}:NoteProps) => {
  return (
    <li>
        <span>{text}</span>
        <button>edit</button>
        <button>delete</button>
    </li>
  )
}

export default Note