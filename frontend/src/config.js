import axios from "axios";

export const API_ENDPOINT = "http://localhost:8080";
export const API_ENDPOINTHEADER = "http://localhost:3000";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_ENDPOINT;
