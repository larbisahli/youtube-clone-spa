import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "../actionTypes";
import { getMostPopularVideos } from "../../api/YoutubeApi";

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchDataSuccess = (items) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: items,
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

// Creating a global variable to hold all maped items and then store it in the state.
let PopularVideosArray = [];

export const fetchItems = (ApiKey) => (dispatch) => {
  // loading: true
  dispatch(fetchDataRequest());

  //
  getMostPopularVideos(ApiKey.isKey, ApiKey.key)
    .then((data) => {
      data.items.map((res) => {
        return (PopularVideosArray = [
          ...PopularVideosArray,
          {
            thumbnail:
              "maxres" in res.snippet.thumbnails
                ? res.snippet.thumbnails.maxres.url
                : res.snippet.thumbnails.medium.url,
            placeholder: res.snippet.thumbnails.medium.url,
            channelTitle: res.snippet.channelTitle,
            channelId: res.snippet.channelId,
            videoId: res.id,
            publishedAt: res.snippet.publishedAt,
            viewCount: res.statistics.viewCount,
            title: res.snippet.localized.title,
            duration: res.contentDetails.duration,
          },
        ]);
      });

      dispatch(fetchDataSuccess(PopularVideosArray));
      PopularVideosArray = [];
    })
    .catch((err) => {
      // Error Setup
      if (err.response) {
        dispatch(fetchDataFailure(err.response));
      }
    });
};
