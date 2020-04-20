import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const NavContext = createContext();

export const NavProvider = (props) => {
  // Location state
  // Feel free to extend this array.
  const [loca, setLoca] = useState([
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
  ]);

  // Notification count

  const [NotiCount, setNotiCount] = useState({ notiCount: "2", seen: true });

  // Langguage state
  const [lang, setLang] = useState([
    { lang: "English (Uk)", checked: false, id: uuidv4() },
    { lang: "English (US)", checked: true, id: uuidv4() },
    { lang: "Espanol", checked: false, id: uuidv4() },
    { lang: "Francais", checked: false, id: uuidv4() },
    { lang: "Italiano", checked: false, id: uuidv4() },
    { lang: "Nederlands", checked: false, id: uuidv4() },
    { lang: "Galego", checked: false, id: uuidv4() },
    { lang: "Eesti", checked: false, id: uuidv4() },
  ]);

  // Restrict state
  const [restrict, setRestrict] = useState({
    isRestrict: false,
  });

  // Account state
  const [acc, setAcc] = useState([
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
      email: "fakemail_xxx@gmail.com",
      subs: 2,
      isCurrent: false,
      accId: 2,
    },
  ]);

  return (
    <NavContext.Provider
      value={{
        restrictState: [restrict, setRestrict],
        langState: [lang, setLang],
        locaState: [loca, setLoca],
        accountState: [acc, setAcc],
        notiCountState: [NotiCount, setNotiCount],
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};
