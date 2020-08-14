import axios from "axios";

// AXIOS INSTANCE
export const YouTubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

//  FETCH MOST POPULAR VIDEOS
export const getMostPopularVideos = async (isKey, key) => {
  const result = await YouTubeAPI.get("videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      maxResults: 28,
      chart: "mostPopular",
      key: isKey ? key : process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  }).then(({ data }) => data);

  return result;
};

// SEARCH
export const SearchRequest = async (id, parameter, option, isKey, key) => {
  const result = await YouTubeAPI.get("search", {
    params:
      parameter && option
        ? {
            part: "snippet",
            maxResults: 12,
            q: id,
            key: isKey ? key : process.env.REACT_APP_YOUTUBE_API_KEY,
            [parameter]: option,
          }
        : {
            part: "snippet",
            maxResults: 12,
            q: id,
            key: isKey ? key : process.env.REACT_APP_YOUTUBE_API_KEY,
          },
  }).then(({ data }) => data);
  return result;
};
