import axios from "axios";

// AIzaSyDq2puq-Pu-wmja4r9vaIHzGurRQK8h61w

export const DataApis = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
