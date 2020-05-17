import { combineReducers } from "redux";
import themeReducer from "./Theme/themeReducer";
import navReducer from "./Navbar/navReducer";
import MessageReducer from "./MessageBox/MessageReducer";
import GuideReducer from "./Guide/GuideReducer";
import queueListReducer from "./Queue/queueListReducer";
import DisplayQueueReducer from "./Queue/queueDisplayReducer";
import ApiCallReducer from "./ApiCall/ApiCallReducer";
import WLVReducer from "./WLV/WLVReducer";

const rootReducer = combineReducers({
  Theme: themeReducer,
  Navbar: navReducer,
  MessageBox: MessageReducer,
  Guide: GuideReducer,
  QueueList: queueListReducer,
  DisplayQueue: DisplayQueueReducer,
  VideosRequest: ApiCallReducer,
  WLV: WLVReducer,
});

export default rootReducer;
