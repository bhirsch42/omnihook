import axios from "axios";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:3010",
});
