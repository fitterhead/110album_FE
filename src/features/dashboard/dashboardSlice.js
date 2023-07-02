import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { getPlaylist } from "../content/contentSlice";
import { createAlertBar } from "../alert/alertSlice";

const initialState = {
  isLoading: false,
  error: null,
  userList: [],
};

const slice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.userList = action.payload;
    },
  },
});

export default slice.reducer;

/* -------------------------------------------------------------------------- */
/*                              call list of user                             */
/* -------------------------------------------------------------------------- */

export const getUserList =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const response = await apiService.get("/user/total", { userId });
      dispatch(slice.actions.getUserListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
