import { PageLocation } from "../../utils/index";
import {
  SHOWGUIDE,
  HIDEGUIDE,
  TOGGLEGUIDE,
  SET_URLLOCATION,
  GUIDE_MODE,
} from "../actionTypes";

const UrlLoc = PageLocation(false);

const isWatchPage = UrlLoc === "watch";

const initialState = {
  showGuide: window.innerWidth > 1340 ? !isWatchPage : false,
  urlLocation: UrlLoc,
  guideMode: window.innerWidth > 1340 ? 1 : 2,
};

const GuideReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOWGUIDE:
      return {
        ...state,
        showGuide: true,
      };
    case HIDEGUIDE:
      return {
        ...state,
        showGuide: false,
      };
    case TOGGLEGUIDE:
      return {
        ...state,
        showGuide: !state.showGuide,
      };
    case SET_URLLOCATION:
      return {
        ...state,
        urlLocation: action.payload,
      };
    case GUIDE_MODE:
      return {
        ...state,
        guideMode: action.payload,
      };
    default:
      return state;
  }
};

export default GuideReducer;
