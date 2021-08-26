import axios from "axios";

const url =
  process.env.NODE_ENV === "development" ? "http://localhost:8000/projects/" : "https://gilbertlc-api.herokuapp.com/projects/";

export const getProjects = () => axios.get(url);
