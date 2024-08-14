import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => console.log(error));
  }, [baseUrl]);

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => {
        setResources([...resources, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const service = {
    create,
  };

  return [resources, service];
};
export default useResource;
