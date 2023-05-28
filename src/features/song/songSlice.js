import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryupload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  song: [],
  status: "idle",
  listType: "",
};

const slice = createSlice({
  name: "Song",
  initialState,

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    addSongSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    deleteSongSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteAlbumFromASongSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getSingleSongSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getSongSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.song = action.payload;
    },
  },
});

export default slice.reducer;

/* -------------------------------- add media ------------------------------- */

export const addMedia = (media) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    for (let i = 0; i < media.selectedFile.length; i++) {
      const songUrl = await cloudinaryupload(
        media.selectedFile[i],
        media.folder
      );

      /* ----------------- post to server and include the song url ---------------- */
      console.log(songUrl, `${i} times`);
      if (songUrl) {
        const parts = songUrl.public_id.split("/");
        const fullName = parts[parts.length - 1];
        const name = fullName.replace(/^\d+\s/, "");
        console.log(songUrl.duration, "songUrl.duration");
        const response = await apiService.post("/song", {
          songUrl: songUrl.secure_url,
          albumRef: media.albumId,
          artistRef: media.artistId,
          songName: name,
          duration: songUrl.duration,
        });

        dispatch(slice.actions.addSongSuccess(response));
      }
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

/* ------------------------------- find media ------------------------------- */

export const findMedia = (media) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const filterName = media.filterName;
    const input = media.input;

    let url = `/song?filterName=${filterName}&input=${input}`;
    const response = await apiService.get(url);
    console.log(response.data, "response.data");
    dispatch(slice.actions.getSongSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
