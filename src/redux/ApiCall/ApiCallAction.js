import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "../actionTypes";
import { getMostPopularVideos } from "../../Components/api/YoutubeApi";

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

// Creating a global variable to hold all maped api items
// and then store it in a state.
let PopularVideosArray = [];

export const fetchItems = () => (dispatch) => {
  // loading: true
  dispatch(fetchDataRequest());

  //
  getMostPopularVideos()
    .then((data) => {
      data.items.map((res) => {
        return (PopularVideosArray = [
          ...PopularVideosArray,
          {
            thumbnail:
              "maxres" in res.snippet.thumbnails
                ? res.snippet.thumbnails.maxres.url
                : res.snippet.thumbnails.medium.url,
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
      dispatch(fetchDataFailure(err));
    });
};
