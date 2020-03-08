import React, { useState, createContext } from "react";

export const NavContext = createContext();

export const NavProvider = props => {
  console.log("NavProvider:==>");
  // Location state
  // Feel free to extend this array.
  const [loca, setLoca] = useState([
    { loca: "Algeria", checked: false, id: 0 },
    { loca: "Canada", checked: false, id: 1 },
    { loca: "Finland", checked: false, id: 2 },
    { loca: "France", checked: false, id: 3 },
    { loca: "Greece", checked: false, id: 4 },
    { loca: "Germany", checked: false, id: 5 },
    { loca: "Greenland", checked: false, id: 6 },
    { loca: "Hong Kong", checked: false, id: 7 },
    { loca: "Indonesia", checked: false, id: 8 },
    { loca: "Israel", checked: false, id: 9 },
    { loca: "Italy", checked: false, id: 10 },
    { loca: "Japan", checked: false, id: 11 },
    { loca: "Morocco", checked: true, id: 12 },
    { loca: "Netherlands", checked: false, id: 13 },
    { loca: "New Zealand", checked: false, id: 14 },
    { loca: "Singapore", checked: false, id: 15 },
    { loca: "United Kingdom", checked: false, id: 16 },
    { loca: "United States", checked: false, id: 17 }
  ]);

  // Langguage state
  const [lang, setLang] = useState([
    { lang: "English (Uk)", checked: false, id: 1 },
    { lang: "English (US)", checked: true, id: 21 },
    { lang: "Espanol", checked: false, id: 3 },
    { lang: "Francais", checked: false, id: 4 },
    { lang: "Italiano", checked: false, id: 5 },
    { lang: "Nederlands", checked: false, id: 6 },
    { lang: "Galego", checked: false, id: 7 },
    { lang: "Eesti", checked: false, id: 8 }
  ]);

  // Restrict state
  const [restrict, setRestrict] = useState({
    isRestrict: false
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
      accId: 1
    },
    {
      img:
        "https://yt3.ggpht.com/-xlewnrG6-ZM/AAAAAAAAAAI/AAAAAAAAAAA/EX-SIc55NtE/s108-c-k-no-mo-rj-c0xffffff/photo.jpg",
      name: "Heaving Rhythm AMV",
      email: "fakemail_xxx@gmail.com",
      subs: 2,
      isCurrent: false,
      accId: 2
    }
  ]);

  return (
    <NavContext.Provider
      value={{
        restrictState: [restrict, setRestrict],
        langState: [lang, setLang],
        locaState: [loca, setLoca],
        accountState: [acc, setAcc]
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

// Provider.propTypes = {
//     users: PropTypes.array,
//     selectedUser: PropTypes.object
//   };

//   Provider.defaultProps = {
//     users: [],
//     selectedUser: {}
//   };
