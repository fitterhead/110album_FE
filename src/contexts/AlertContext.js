import React, { useState } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { createSlice } from "@reduxjs/toolkit";

/* ------------------------------ initialstate ------------------------------ */
const initialState = {
  alertMessage: null,
  alertSeverity: null,
  alertOpen: false,
  alertClose: true,
};

/* --------------------------------- reducer -------------------------------- */
const slice = createSlice({
  name: "AlertBar",
  initialState,

  reducers: {
    createSuccessAlert(state, action) {
      state.alertOpen = true;
      state.alertClose = false;
      state.alertSeverity = "success";
      state.alertMessage = action.payload;
    },
  },
});

export default slice.reducer;

const createAlertBar = (messageText) => (dispatch) => {
  dispatch(slice.actions.createSuccessAlert(messageText));
};

/* ------------------------------ cart context ------------------------------ */
const AlertContext = createContext({ ...initialState });

function AlertProvider({ children }) {
  return (
    <AlertContext.Provider
      value={{
        ...initialState,
        createAlertBar,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export { AlertProvider, AlertContext };
