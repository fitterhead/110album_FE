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
  likedSong: [],
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
    getLikedSongSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.likedSong = action.payload;
    },
  },
});

export default slice.reducer;

export const createPlaylist =
  ({ playlistName, userRef, songExisted }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    // Check if playlistName is empty
    if (!playlistName) {
      playlistName = `MyPlaylist#${Math.floor(Math.random() * 1000)}`; // Generate a random playlist name
    }
    // Check if songExisted is empty
    if (songExisted === undefined) {
      songExisted = false; // Set songExisted to false
    }
    try {
      const response = await apiService.post("/playlist", {
        playlistName,
        userRef,
        songExisted,
      });
      dispatch(slice.actions.createPlaylistSuccess(response.data));
      // alert("create new playlist success");
      dispatch(createAlertBar("create new playlist success"));
      dispatch(getPlaylist(userRef));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const deletePlaylist =
  ({ playlistId, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log("userID", userId);
      console.log("playlistId", playlistId);
      const response = await apiService.delete(
        `/playlist/deletePlaylist/${playlistId}`
      );
      // dispatch(slice.actions.createPlaylistSuccess(response.data));
      dispatch(createAlertBar("delete playlist success"));

      dispatch(getPlaylist(userId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const deleteAlbumFromAPlaylist =
  ({ playlistId, albumId, userId }) =>
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
      dispatch(getPlaylist(userId));
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

/* -------------------------- add song to likedSong ------------------------- */

export const addLikedSong =
  ({ songId, playlistId, userRef }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/playlist/addAlbumToPlaylist", {
        songId,
        playlistId,
      });
      console.log("add song to likedSong", response);
      dispatch(
        slice.actions.getLikedSongSuccess(response.data?.data[0].songRef)
      );
      dispatch(createAlertBar("add song to liked song"));
      dispatch(getPlaylist(userRef));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      console.log("add song to likedSong fail", error.message);
    }
  };

/* -------------------------------------------------------------------------- */
/*                            add song to playlist                            */
/* -------------------------------------------------------------------------- */

export const addSong =
  ({ songId, playlistId, userRef }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/playlist/addAlbumToPlaylist", {
        songId,
        playlistId,
      });
      console.log("add song to playlist", response);
      dispatch(createAlertBar("add new playlist success"));
      dispatch(getPlaylist(userRef));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      console.log("add song to playlist fail", error.message);
      dispatch(createAlertBar("add new playlist failed"));
    }
  };

/* -------------------------------------------------------------------------- */
/*                          delete song from playlist                         */
/* -------------------------------------------------------------------------- */

export const deleteSongFromPlaylist =
  ({ songId, playlistId, userRef }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/playlist/song", {
        songId,
        playlistId,
      });
      console.log("delete song from playlist", response);
      dispatch(createAlertBar("song delete success"));
      dispatch(getPlaylist(userRef));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      console.log("delete song from playlist fail", error.message);
      dispatch(createAlertBar("delete song from playlist failed"));
    }
  };
