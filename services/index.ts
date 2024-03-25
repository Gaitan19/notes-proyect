import axios from "axios";

const handleApiRequest = (method: string, endpoint: string, data: any): any => {
  return axios({
    method,
    url: `/api/notes/${endpoint}`,
    data: {
      ...data,
    },
  });
};

export default handleApiRequest;
