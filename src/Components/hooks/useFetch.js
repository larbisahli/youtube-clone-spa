import { useEffect, useState } from "react";
import { YouTubeAPI } from "../api/YoutubeApi";

export const useFetch = (id, path, part, id_param = "id") => {
  const [snippet, setSnippet] = useState([]);

  // =========================
  //      FETCH SNIPPET
  // =========================

  const GetData = async (id, path, part, id_param) => {
    return await new Promise((resolve) => {
      YouTubeAPI.get(path, {
        params: {
          part: part,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          [id_param]: id,
        },
      }).then((res) => {
        resolve(res);
      });
    });
  };

  // The useEffect is going to be called whenever the url path and the id changes
  useEffect(() => {
    if (id) {
      GetData(id, path, part, id_param)
        .then((res) => {
          if (path !== "commentThreads") {
            setSnippet(res.data.items[0]);
          } else {
            setSnippet(res.data.items);
          }
        })
        .catch((err) => {
          console.log("useFetch Error :>> ", err);
        });
    }
  }, [path, id, part, id_param]);

  return snippet;
};
