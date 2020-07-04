import axios from "axios";

export const API_ENDPOINT = "http://localhost:8080";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_ENDPOINT;
