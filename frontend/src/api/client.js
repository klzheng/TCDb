import axios from "axios";


// uses axios to send http requests to endpoints
const client = axios.create({
  // baseURL: "http://localhost:8000/api",
  // baseURL: "https://seal-app-odxdb.ondigitalocean.app/api"
  baseURL: process.env.REACT_APP_BASE_URL
});

export default client;
