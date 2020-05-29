import { combineReducers } from "redux";
import themeReducer from "./Theme/themeReducer";
import navReducer from "./Navbar/navReducer";
import MessageReducer from "./MessageBox/MessageReducer";
import GuideReducer from "./Guide/GuideReducer";
import queueListReducer from "./Queue/queueListReducer";
import DisplayQueueReducer from "./Queue/queueDisplayReducer";
import ApiCallReducer from "./ApiCall/ApiCallReducer";
import WLVReducer from "./WLV/WLVReducer";
import ApiKeyReducer from "./ApiKey/ApiKeyReducer";
import ApiMessageReducer from "./ApiMessage/ApiMessageReducer";

const rootReducer = combineReducers({
  Theme: themeReducer,
  Navbar: navReducer,
  MessageBox: MessageReducer,
  Guide: GuideReducer,
  QueueList: queueListReducer,
  DisplayQueue: DisplayQueueReducer,
  DisplayApiMessage: ApiMessageReducer,
  VideosRequest: ApiCallReducer,
  WLV: WLVReducer,
  ApiKey: ApiKeyReducer,
});

export default rootReducer;
