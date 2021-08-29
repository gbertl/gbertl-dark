import axios from "axios";

const url =
  process.env.NODE_ENV === "development" ? "http://localhost:8000/portfolio" : "https://gilbertlc-api.herokuapp.com/portfolio";

export const getProjects = () => axios.get(`${url}/projects`);
export const getCategories = () => axios.get(url + '/categories');
