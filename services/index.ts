import axios from "axios";

const handleApiRequest = (method: string, endpoint: string, data: any): any => {
  return axios({
    method,
    url: `http://localhost:3000/api/notes/${endpoint}`,
    data: {
      ...data,
    },
  });
};

export default handleApiRequest;
