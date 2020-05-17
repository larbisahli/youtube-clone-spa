import {
  SWITCH_ACC,
  RESTRICT_MODE,
  LANGUAGE,
  NOTIFICATION_COUNT,
  LOCATION,
} from "../actionTypes";

export const SwitchAccAction = (id) => {
  return {
    type: SWITCH_ACC,
    payload: id,
  };
};

export const RestrictModeAction = (BooleanValue) => {
  return {
    type: RESTRICT_MODE,
    payload: BooleanValue,
  };
};

export const SwitchLangAction = (id) => {
  return {
    type: LANGUAGE,
    payload: id,
  };
};

export const SwitchLocationAction = (id) => {
  return {
    type: LOCATION,
    payload: id,
  };
};

export const NotiCountAction = () => {
  return {
    type: NOTIFICATION_COUNT,
  };
};
