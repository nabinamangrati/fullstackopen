import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs/";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newblogs) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newblogs, config);
  return response.data;
};
const update = async (id, blogToUpdate) => {
  const myToken = setToken();
  const config = {
    headers: { Authorization: myToken },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate, config);
    console.log(response.data, "from update service");
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
  }
};

export default { getAll, create, setToken, update };
