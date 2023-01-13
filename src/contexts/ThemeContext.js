import React, { createContext, useReducer } from "react";

const initialThemeState = {
  darkMode: true,
};

const CHANGE_COLOR = "THEME.CHANGE_COLOR";

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};

const ThemeColorContext = createContext({ ...initialThemeState });

function ThemeColorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialThemeState);

  const toggleThemeFunction = async () => {
    dispatch({
      type: CHANGE_COLOR,
    });
  };

  return (
    <ThemeColorContext.Provider value={{ ...state, toggleThemeFunction }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export { ThemeColorContext, ThemeColorProvider };
