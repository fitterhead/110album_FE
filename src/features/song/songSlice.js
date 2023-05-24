import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryupload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  song: [],
  status: "idle",
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
        const response = await apiService.post("/song", { songUrl: songUrl });

        dispatch(slice.actions.addSongSuccess(response));
      }
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
