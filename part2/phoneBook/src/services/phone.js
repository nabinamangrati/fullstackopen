import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
const getAll = () => {
  return axios.get(baseUrl);
};
const create = (person) => {
  return axios.post(baseUrl, person);
};
const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};
export default { getAll, create, update };
