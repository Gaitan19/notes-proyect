interface NoteProps {
  id: number;
  text: string;
}

const Note = ({ id, text }: NoteProps) => {
  return (
    <li>
      <span>{text}</span>
      <div>
        <button>edit</button>
        <button>delete</button>
      </div>
    </li>
  );
};

export default Note;
