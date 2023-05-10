import React, { useState } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { createSlice } from "@reduxjs/toolkit";

/* ------------------------------ initialstate ------------------------------ */
const initialState = {
  alertMessage: null,
  alertSeverity: null,
  alertOpen: false,
};

/* --------------------------------- reducer -------------------------------- */
const slice = createSlice({
  name: "alert",
  initialState,

  reducers: {
    createSuccessAlert(state, action) {
      state.alertOpen = true;
      state.alertSeverity = "success";
      state.alertMessage = action.payload;
    },

    createClosedAlert(state) {
      state.alertOpen = false;
    },
  },
});

export default slice.reducer;

export const createAlertBar = (messageText) => (dispatch) => {
  dispatch(slice.actions.createSuccessAlert(messageText));
};
export const handleCloseAlert = () => (dispatch) => {
  dispatch(slice.actions.createClosedAlert());
};
