import { useEffect, useState } from "react";
import { YouTubeAPI } from "../../api/YoutubeApi";
import { useSelector, useDispatch } from "react-redux";
import { SetMessageAction, ShowApiMessageAction } from "../../redux";

export const useFetch = (id, path, part, id_param = "id") => {
  const [snippet, setSnippet] = useState([]);
  const ApiKey = useSelector((state) => state.ApiKey);
  const dispatch = useDispatch();

  const GetData = async (id, path, part, id_param, ApiKey_) => {
    return await new Promise((resolve, reject) => {
      YouTubeAPI.get(path, {
        params: {
          part: part,
          key: ApiKey_.isKey
            ? ApiKey_.key
            : process.env.REACT_APP_YOUTUBE_API_KEY,
          [id_param]: id,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // The useEffect is going to be called whenever the url path and the id changes.
  useEffect(() => {
    if (id) {
      GetData(id, path, part, id_param, ApiKey)
        .then((res) => {
          if (path !== "commentThreads") {
            setSnippet(res.data.items[0]);
          } else {
            setSnippet(res.data.items);
          }
        })
        .catch((err) => {
          const errorMessage = err.response;

          let message;
          let errMessage;

          if (errorMessage) {
            if (
              typeof errorMessage.data === "string" ||
              errorMessage.data instanceof String
            ) {
              // it's a string
              errMessage = errorMessage.data;
            } else {
              // it's an object
              errMessage = errorMessage.data.error.message;
            }
          }

          if ((errorMessage.status !== 200) & (errorMessage.status !== 0)) {
            // if (errorMessage.status === 403) {
            //   message = `Error code: 403. Try to insert your api key.`;
            // } else {
            //   message = `Error: ${errMessage}`;
            // }
            message = `Error: ${errMessage}`;

            dispatch(
              SetMessageAction({
                message: message,
                btnText: "dismiss",
                from: "error",
                id: "",
              })
            );

            if (errorMessage.status === 403 || errorMessage.status === 400) {
              dispatch(ShowApiMessageAction());
            }
          }
        });
    }
  }, [path, id, part, id_param, ApiKey, dispatch]);

  return snippet;
};
