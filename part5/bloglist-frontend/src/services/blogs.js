import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs/";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: token },
  });
  return response.data;
};

const create = async (newblogs) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newblogs, config);
  return response.data;
};

export default { getAll, create, setToken };
