import { DARK_THEME, LIGHT_THEME } from "../actionTypes";

const prevTheme = JSON.parse(localStorage.getItem("isDarkTheme"));

const initialState = { isDarkTheme: prevTheme !== null ? prevTheme : false };

if (prevTheme) {
  // app update this slow so we have to put it on top.
  const generalBackgroundDark = "#1f1f1f";
  const generalBackgroundLight = "#f9f9f9";

  document.body.style.backgroundColor = initialState.isDarkTheme
    ? generalBackgroundDark
    : generalBackgroundLight;
}

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_THEME:
      try {
        localStorage.setItem("isDarkTheme", JSON.stringify(true));
      } catch {
        console.log("localStorage error");
      }
      return { isDarkTheme: true };

    case LIGHT_THEME:
      try {
        localStorage.setItem("isDarkTheme", JSON.stringify(false));
      } catch {
        console.log("localStorage error");
      }
      return { isDarkTheme: false };

    default:
      return state;
  }
};

export default themeReducer;

// Local storage stores strings ,
// I'm afraid, whatever the input
// (if you feed it with an object,
// it will be converted automatically with its standard toString() method)

// You should always use JSON.stringify() and JSON.parse() when dealing with what you store in DOM storage

// To keep it short, here's the only situation in which you should use local storage:
// when you need to store some publicly available information that is not at all sensitive,
// doesn't need to be used in a high-performance app, isn't larger than 5MB, and consists
// of purely string data.
