import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { getPlaylist } from "../content/contentSlice";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "playlist",
  initialState,

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createPlaylistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    deletePlaylistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteAlbumFromAPlaylistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default slice.reducer;

export const createPlaylist =
  ({ playlistName, userRef }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/playlist", {
        playlistName,
        userRef,
      });
      dispatch(slice.actions.createPlaylistSuccess(response.data));
      alert("create new playlist success");
      dispatch(getPlaylist());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deletePlaylist = (playlistId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(
      `/playlist/deletePlaylist/${playlistId}`
    );
    dispatch(slice.actions.createPlaylistSuccess(response.data));
    alert("delete playlist success");
    dispatch(getPlaylist());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export const deleteAlbumFromAPlaylist =
  ({ playlistId, albumId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(
        "/playlist/deleteAlbumFromPlaylist",
        { playlistId, albumId }
      );
      dispatch(slice.actions.deleteAlbumFromAPlaylistSuccess(response.data));
      alert("delete Album From A Playlist Success");
      dispatch(getPlaylist());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
//   http://localhost:8000/playlist/deletePlaylist/63b38e1743c84446d10e8f20
