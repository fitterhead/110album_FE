import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { getPlaylist } from "../content/contentSlice";
import { createAlertBar } from "../alert/alertSlice";

const initialState = {
  isLoading: false,
  error: null,
  userList: [],
  cart: [],
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

    updateCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.cart = action.payload;
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

export const handleCart = (userId, data) => async (dispatch) => {
  try {
    const response = await apiService.put(`/user/${userId}`, data);
    dispatch(createAlertBar("add album to cart success "));
    dispatch(slice.actions.updateCartSuccess(response.data.data.cart));
    console.log(response, "response");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

/* ------------------------------ get cart user ----------------------------- */
export const handleCartUser = (userId) => async (dispatch) => {
  try {
    const response = await apiService.get("/user/myInfo", userId);
    dispatch(slice.actions.updateCartSuccess(response.data.user.cart));
    console.log(response, "response");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

/* ------------------------------- delete cart ------------------------------ */

export const deleteCart = (userId) => async (dispatch) => {
  try {
    console.log("userId delete", userId);
    const response = await apiService.put("/user/cart/remove", { userId });
    dispatch(handleCartUser())
    // dispatch(slice.actions.updateCartSuccess(response.data.user.cart));
    console.log(response, "response");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
