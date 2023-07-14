import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryupload } from "../../utils/cloudinary";
import { getPlaylist } from "../content/contentSlice";

const initialState = {
  isLoading: false,
  error: null,
  song: [],
  status: "idle",
  listType: "",
  image: "",
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
    addImageSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.image = action.payload;
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

/* ------------------------------ get all song ------------------------------ */

export const getAllSong = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    let url = "/song";
    const response = await apiService.get(url);
    console.log(response.data, "get all song data");
    dispatch(slice.actions.getSongSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

/* --------------------------- add playlist image --------------------------- */
export const addPlaylistImage = (media) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const imageUrl = await cloudinaryupload(media.file, media.folder);

    /* ----------------- post to server, including the image url ---------------- */
    console.log(imageUrl, "imageUrllll");
    if (imageUrl) {
      const response = await apiService.put("/playlist/image", {
        playlistImageUrl: imageUrl.secure_url,
        playlistId: media.playlistId,
      });

      dispatch(slice.actions.addImageSuccess(response));
      dispatch(getPlaylist(media.userId));
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
