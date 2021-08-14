import axios from "axios";

const url =
  process.env.NODE_ENV === "development" ? "http:localhost:5000/projects" : "";

export const getProjects = () => axios.get(url);
