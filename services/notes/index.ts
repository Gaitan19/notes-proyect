import handleApiRequest from "@/services";

const handleGetNotes = async () => {
  const { data, status } = await handleApiRequest("GET", `/`, "");

  return { data, status };
};

const handleGetNote = async (id: number) => {
  const { data, status } = await handleApiRequest("GET", `/note/${id}`, "");

  return { data, status };
};

const handlePostNote = async (newNote: string) => {
  const { data, status } = await handleApiRequest("POST", ``, {
    post: newNote,
  });

  return { data, status };
};

const handleDeleteNote = async (id: number) => {
  const { data, status } = await handleApiRequest("DELETE", `/${id}`, "");

  return { data, status };
};

const handleEditNote = async (idNote: number, updatedNote: string) => {
  const { data, status } = await handleApiRequest("PATCH", `/${idNote}`, {
    post: updatedNote,
  });

  return { data, status };
};

export {
  handleGetNotes,
  handlePostNote,
  handleDeleteNote,
  handleEditNote,
  handleGetNote,
};
