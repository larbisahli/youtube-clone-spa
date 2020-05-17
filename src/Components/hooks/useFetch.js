import { useEffect, useState } from "react";
import { YouTubeAPI } from "../api/YoutubeApi";

export const useFetch = (id, path, part) => {
  const [snippet, setSnippet] = useState({});

  // =========================
  //      FETCH SNIPPET
  // =========================

  const GetData = async (id, path, part) => {
    return await new Promise((resolve) => {
      YouTubeAPI.get(path, {
        params: {
          part: part,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          id: id,
        },
      }).then((res) => {
        resolve(res);
      });
    });
  };

  // The useEffect is going to be called whenever the url path and the id changes
  useEffect(() => {
    if (id) {
      GetData(id, path, part)
        .then((res) => {
          setSnippet(res.data.items[0]);
        })
        .catch((err) => {
          console.log("useFetch Error :>> ", err);
        });
    }
  }, [path, id, part]);

  return snippet;
};
