import axios from "axios";

// AIzaSyDq2puq-Pu-wmja4r9vaIHzGurRQK8h61w
// AXIOS INSTANCE
export const YouTubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});

// // ===========================
// //  FETCH MOST POPULAR VIDEOS
// // ===========================

// YouTubeAPI.get("videos", {
//   params: {
//     part: "snippet",
//     maxResults: 5,
//     chart: "mostPopular",
//     //regionCode: "us",
//     key: "AIzaSyDq2puq-Pu-wmja4r9vaIHzGurRQK8h61w"
//     //q: searchTerm
//   }
// })
//   .then(res => {
//     console.log("(1)=>", res.data.items);
//   })
//   .catch(err => console.log(err));

// // ========================
// //  FETCH VIDEO STATISTICS
// // ========================

// YouTubeAPI.get("videos", {
//   params: {
//     part: "statistics",
//     maxResults: 5,
//     key: "AIzaSyDq2puq-Pu-wmja4r9vaIHzGurRQK8h61w",
//     id: "C6ruOHwYrtw"
//   }
// })
//   .then(res => {
//     console.log("(2)=>", res.data.items);
//   })
//   .catch(err => console.log(err));

// // =========================
// //  FETCH CHANNELS SNIPPET
// // =========================

// YouTubeAPI.get("channels", {
//   params: {
//     part: "snippet",
//     maxResults: 5,
//     key: "AIzaSyDq2puq-Pu-wmja4r9vaIHzGurRQK8h61w",
//     id: "UChDKyKQ59fYz3JO2fl0Z6sg"
//   }
// })
//   .then(res => {
//     console.log("(3)=>", res.data.items);
//   })
//   .catch(err => console.log(err));

// // ===========================
// //  FETCH CHANNELS STATISTICS
// // ===========================

// YouTubeAPI.get("channels", {
//   params: {
//     part: "statistics",
//     maxResults: 5,
//     key: "AIzaSyDq2puq-Pu-wmja4r9vaIHzGurRQK8h61w",
//     id: "UCX6OQ3DkcsbYNE6H8uQQuVA"
//   }
// })
//   .then(res => {
//     console.log("(4)=>", res.data.items);
//   })
//   .catch(err => console.log(err));
