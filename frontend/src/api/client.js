import axios from "axios";


// uses axios to send http requests to endpoints
const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default client;
