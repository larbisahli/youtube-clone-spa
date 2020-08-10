import {
  WL_ADD_ITEM,
  LV_ADD_ITEM,
  WL_REMOVE_ONE,
  LV_REMOVE_ONE,
  WL_REMOVE_ALL,
  LV_REMOVE_ALL,
  WL_MOVEUP,
  LV_MOVEUP,
  WL_MOVEDOWN,
  LV_MOVEDOWN,
  FETCH_PLAYLIST_REQUEST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  WL_REPLACE,
  LV_REPLACE,
  PL_REPLACE
} from "../actionTypes";
import axios from "axios";
import { YouTubeAPI } from "../../api/YoutubeApi";

export const Wl_AddAction = (obj) => {
  return {
    type: WL_ADD_ITEM,
    payload: obj,
  };
};
export const Lv_AddAction = (obj) => {
  return {
    type: LV_ADD_ITEM,
    payload: obj,
  };
};

export const Wl_Replace = (item_id, replace_id) => {
  return {
    type: WL_REPLACE,
    payload: { item_id, replace_id }
  }
}

export const Lv_Replace = (item_id, replace_id) => {
  return {
    type: LV_REPLACE,
    payload: { item_id, replace_id }
  }
}

export const Pl_Replace = (item_id, replace_id) => {
  return {
    type: PL_REPLACE,
    payload: { item_id, replace_id }
  }
}

export const Wl_RemoveOneAtion = (videoId) => {
  return {
    type: WL_REMOVE_ONE,
    payload: videoId,
  };
};

export const Lv_RemoveOneAtion = (videoId) => {
  return {
    type: LV_REMOVE_ONE,
    payload: videoId,
  };
};

export const Wl_RemoveAllAtion = () => {
  return {
    type: WL_REMOVE_ALL,
  };
};

export const Lv_RemoveAllAtion = () => {
  return {
    type: LV_REMOVE_ALL,
  };
};

export const Wl_MoveUpAtion = (index) => {
  return {
    type: WL_MOVEUP,
    payload: index,
  };
};
export const Lv_MoveUpAtion = (index) => {
  return {
    type: LV_MOVEUP,
    payload: index,
  };
};

export const Wl_MoveDownAtion = (index) => {
  return {
    type: WL_MOVEDOWN,
    payload: index,
  };
};
export const Lv_MoveDownAtion = (index) => {
  return {
    type: LV_MOVEDOWN,
    payload: index,
  };
};

export const fetchPlayListRequest = () => {
  return {
    type: FETCH_PLAYLIST_REQUEST,
    payload: "",
  };
};
export const fetchPlayListSuccess = (data) => {
  return {
    type: FETCH_PLAYLIST_SUCCESS,
    payload: data,
  };
};
export const fetchPlayListFailure = (error) => {
  return {
    type: FETCH_PLAYLIST_FAILURE,
    payload: error,
  };
};

// Creating a global variable to hold all maped api items
// and then store it in a state.
let PlayListArray = [];
let itemCount = 0;

export const fetchPlayList = (id, ApiKey) => (dispatch) => {
  // loading: true
  dispatch(fetchPlayListRequest());

  axios
    .all([
      YouTubeAPI.get("playlistItems", {
        params: {
          part: "snippet",
          maxResults: 10,
          key: ApiKey.isKey
            ? ApiKey.key
            : process.env.REACT_APP_YOUTUBE_API_KEY,
          playlistId: id,
        },
      }),
      YouTubeAPI.get("playlists", {
        params: {
          part: "contentDetails",
          key: ApiKey.isKey
            ? ApiKey.key
            : process.env.REACT_APP_YOUTUBE_API_KEY,
          id: id,
        },
      }),
    ])
    .then((response) => {
      response[0].data.items.map((item) => {
        return (PlayListArray = [
          ...PlayListArray,
          {
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            videoId: item.snippet.resourceId.videoId,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            position: item.snippet.position,
            description: item.snippet.description,
          },
        ]);
      });
      itemCount = response[1].data.items[0].contentDetails.itemCount;
      dispatch(
        fetchPlayListSuccess({ items: PlayListArray, count: itemCount })
      );
      PlayListArray = [];
      itemCount = 0;
    })
    .catch((err) => {
      // Error Setup
      dispatch(fetchPlayListFailure(err));
    });
};
