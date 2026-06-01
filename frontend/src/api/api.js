import axios from "axios";

const API = axios.create({
  baseURL: "https://announcement-board-2.onrender.com/api/",
});

export default API;


