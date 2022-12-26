import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "post",
  initialState,
  reducer: {
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getPosts =
  () =>
  ({ userId, page, limit = 2 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const params = {
        page,
        limit,
      };
      const response = await apiService.get("/posts/user", {
        params,
      });
      dispatch(slice.actions.getPostSuccess(response.data));
    } catch (error) {}
  };
export default slice.reducer;
