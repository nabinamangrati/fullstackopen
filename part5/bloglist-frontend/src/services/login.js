import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (credentials) => {
  const request = await axios.get(baseUrl, credentials);
  return response.data;
};

export default { getAll };
