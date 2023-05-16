import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { getPlaylist } from "../content/contentSlice";
import { Alert } from "@mui/material";
import AlertBar from "../../components/item/AlertBar";
import { useContext } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { createAlertBar } from "../alert/alertSlice";
const initialState = {
  isLoading: false,
  error: null,
  singlePlaylist: [],
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
    getSinglePlaylistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.singlePlaylist = action.payload;
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
      // alert("create new playlist success");
      dispatch(createAlertBar("create new playlist success"));
      dispatch(getPlaylist(userRef));
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
    dispatch(createAlertBar("delete playlist success"));

    dispatch(getPlaylist(playlistId));
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
      dispatch(createAlertBar("delete Album From A Playlist Success"));
      dispatch(getSinglePlaylist(playlistId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getSinglePlaylist = (playlistId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/playlist/${playlistId}`);
    console.log("singlePlaylist response", response);
    dispatch(
      slice.actions.getSinglePlaylistSuccess(response.data?.data[0].albumRef)
    );

    // dispatch(getPlaylist(playlistId));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
//   http://localhost:8000/playlist/deletePlaylist/63b38e1743c84446d10e8f20
