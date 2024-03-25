import handleApiRequest from "@/services";

interface note {
  user_id?: string;
  post: string;
}

const handleGetNotes = async (user_id: string | undefined) => {
  const { data, status } = await handleApiRequest("GET", `/${user_id}`, "");

  return { data, status };
};

const handleGetNote = async (id: number) => {
  const { data, status } = await handleApiRequest("GET", `/note/${id}`, "");

  return { data, status };
};

const handlePostNote = async (newNote: note) => {
  const { data, status } = await handleApiRequest("POST", ``, newNote);

  return { data, status };
};

const handleDeleteNote = async (id: number) => {
  const { data, status } = await handleApiRequest("DELETE", `/${id}`, "");

  return { data, status };
};

const handleEditNote = async (idNote: number, updatedNote: note) => {
  const { data, status } = await handleApiRequest(
    "PATCH",
    `/${idNote}`,
    updatedNote
  );

  return { data, status };
};

export {
  handleGetNotes,
  handlePostNote,
  handleDeleteNote,
  handleEditNote,
  handleGetNote,
};