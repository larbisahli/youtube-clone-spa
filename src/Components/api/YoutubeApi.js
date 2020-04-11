import axios from "axios";

// AXIOS INSTANCE
export const YouTubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

// ===========================
//  FETCH MOST POPULAR VIDEOS
// ===========================

export const getMostPopularVideos = async () => {
  const result = await YouTubeAPI.get("videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      maxResults: 5,
      chart: "mostPopular",
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  }).then(({ data }) => data);

  return result;
};

// ===========================
//           SEARCH
// ===========================

export const SearchRequest = async (id, parameter, option) => {
  const result = await YouTubeAPI.get("search", {
    params:
      parameter && option
        ? {
            part: "snippet",
            maxResults: 3,
            q: id,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            [parameter]: option,
          }
        : {
            part: "snippet",
            maxResults: 3,
            q: id,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
  }).then(({ data }) => data);
  return result;
};
