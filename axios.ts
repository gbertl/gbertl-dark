import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-gbertl.herokuapp.com'
    : 'http://localhost:3001';

const instance = axios.create({
  baseURL,
});

export default instance;
