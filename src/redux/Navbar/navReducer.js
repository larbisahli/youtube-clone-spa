import {
  SWITCH_ACC,
  RESTRICT_MODE,
  LANGUAGE,
  NOTIFICATION_COUNT,
  LOCATION,
} from "../actionTypes";
import { v4 as uuidv4 } from "uuid";

// this could be an api call

const initialState = {
  // Feel free to extend this array.
  location: [
    { loca: "Algeria", checked: false, id: uuidv4() },
    { loca: "Canada", checked: true, id: uuidv4() },
    { loca: "Finland", checked: false, id: uuidv4() },
    { loca: "France", checked: false, id: uuidv4() },
    { loca: "Greece", checked: false, id: uuidv4() },
    { loca: "Germany", checked: false, id: uuidv4() },
    { loca: "Greenland", checked: false, id: uuidv4() },
    { loca: "Hong Kong", checked: false, id: uuidv4() },
    { loca: "Indonesia", checked: false, id: uuidv4() },
    { loca: "Israel", checked: false, id: uuidv4() },
    { loca: "Italy", checked: false, id: uuidv4() },
    { loca: "Japan", checked: false, id: uuidv4() },
    { loca: "Morocco", checked: false, id: uuidv4() },
    { loca: "Netherlands", checked: false, id: uuidv4() },
    { loca: "New Zealand", checked: false, id: uuidv4() },
    { loca: "Singapore", checked: false, id: uuidv4() },
    { loca: "United Kingdom", checked: false, id: uuidv4() },
    { loca: "United States", checked: false, id: uuidv4() },
  ],

  language: [
    { lang: "English (Uk)", checked: false, id: uuidv4() },
    { lang: "English (US)", checked: true, id: uuidv4() },
    { lang: "Espanol", checked: false, id: uuidv4() },
    { lang: "Francais", checked: false, id: uuidv4() },
    { lang: "Italiano", checked: false, id: uuidv4() },
    { lang: "Nederlands", checked: false, id: uuidv4() },
    { lang: "Galego", checked: false, id: uuidv4() },
    { lang: "Eesti", checked: false, id: uuidv4() },
  ],
  accounts: [
    {
      img:
        "https://yt3.ggpht.com/a-/AAuE7mCD0A834-oe9m44YrvgjigbMXwRc254LoMuOkqDJw=s88-c-k-c0xffffffff-no-rj-mo",
      name: "Larbi Sahli",
      email: "larbisahli1905@gmail.com",
      subs: 666,
      isCurrent: true,
      accId: 1,
    },
    {
      img:
        "https://yt3.ggpht.com/-xlewnrG6-ZM/AAAAAAAAAAI/AAAAAAAAAAA/EX-SIc55NtE/s108-c-k-no-mo-rj-c0xffffff/photo.jpg",
      name: "Heaving Rhythm AMV",
      email: "fakemail@gmail.com",
      subs: 2,
      isCurrent: false,
      accId: 2,
    },
  ],
  restrictMode: {
    isRestrict: false,
  },
  notiCount: { count: "2", seen: true },
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTRICT_MODE:
      return {
        ...state,
        restrictMode: { isRestrict: action.payload },
      };
    case NOTIFICATION_COUNT:
      return {
        ...state,
        notiCount: { ...state.notiCount, seen: false },
      };
    case SWITCH_ACC:
      return {
        ...state,
        accounts: [
          ...state.accounts.map((acc) => {
            acc.isCurrent = false;
            if (acc.accId === action.payload) {
              acc.isCurrent = !acc.isCurrent;
            }
            return acc;
          }),
        ],
      };
    case LANGUAGE:
      return {
        ...state,
        language: [
          ...state.language.map((lang) => {
            lang.checked = false;
            if (lang.id === action.payload) {
              lang.checked = true;
            }
            return lang;
          }),
        ],
      };
    case LOCATION:
      return {
        ...state,
        location: [
          ...state.location.map((loca) => {
            loca.checked = false;
            if (loca.id === action.payload) {
              loca.checked = true;
            }
            return loca;
          }),
        ],
      };
    default:
      return state;
  }
};

export default navReducer;
