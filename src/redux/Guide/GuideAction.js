import {
  SHOWGUIDE,
  HIDEGUIDE,
  TOGGLEGUIDE,
  SET_URLLOCATION,
  GUIDE_MODE,
} from "../actionTypes";

export const ShowGuideAction = () => {
  return {
    type: SHOWGUIDE,
  };
};

export const HideGuideAction = () => {
  return {
    type: HIDEGUIDE,
  };
};

export const ToggleGuideAction = () => {
  return {
    type: TOGGLEGUIDE,
  };
};

export const SetUrlLocationAction = (loca) => {
  return {
    type: SET_URLLOCATION,
    payload: loca,
  };
};

export const SetGuideModeAction = (num) => {
  return {
    type: GUIDE_MODE,
    payload: num,
  };
};
