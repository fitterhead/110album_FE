import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  status: "",
  contents: [],
  artists: [],
  error: "",
  test: "",
  playlist: [],
  favouriteArtist: [],
};

export const getContent = createAsyncThunk("content", async (
  // { query }
  ) =>
  //   {
  //   pageNum, limit,
  //   query,
  // }
  {
    
    const response = await apiService.get("/album");
    return response;
  }
);

// export const setBooksTo = createAsyncThunk(
//   "books/setBooksTo",
//   async ({ pageNum, limit, query }) => {
//     let url = `/books?_page=${pageNum}&_limit=${limit}`;
//     if (query) url += `&q=${query}`;
//     const response = await api.get(url);
//     console.log(response.data, "aaaaaa");
//     return response.data;
//   }
// );

export const getArtist = createAsyncThunk("artist", async () => {
  const response = await apiService.get("/artist");
  return response;
});

export const getAlbums = createAsyncThunk("albums", async () => {
  const response = await apiService.get("/albumlist");
  return response;
});

export const addAlbumToPlaylist = createAsyncThunk(
  "addAlbumToPlaylist",
  async (data) => {
    const response = await apiService.post("/playlist", data);
    console.log(response, "resssssss");
    return response;
  }
);

export const getPlaylist = createAsyncThunk("Playlist", async () => {
  const response = await apiService.get("/playlist");
  return response;
});

/* ---------------------------- get artists list ---------------------------- */

export const favouriteArtist = createAsyncThunk(
  "favouriteArtist",
  async (data) => {
    const response = await apiService.post("/favouriteArtist", data);
    console.log(response, "resssssss artist");
    return response;
  }
);

export const getFavouriteArtistList = createAsyncThunk(
  "FavouriteArtistList",
  async () => {
    const response = await apiService.get("/favouriteArtist");
    return response;
  }
);

/* -------------------------------------------------------------------------- */
/*                                 createSlice                                */
/* -------------------------------------------------------------------------- */

export const contentSlice = createSlice({
  name: "content",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContent.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("action payload", action.payload);
        //
        state.contents.push(action.payload);
      })
      .addCase(getContent.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("action", action);
      });

    builder
      .addCase(getArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("action artist payload", action.payload);
        //
        state.artists.push(action.payload);
      })
      .addCase(getArtist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist action", action);
      });

    builder
      .addCase(getAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAlbums.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("action artist payload", action.payload);
        //
        state.artists.push(action.payload);
      })
      .addCase(getAlbums.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist action", action);
      });

    /* --------------------------- addAlbumToPlaylist --------------------------- */

    builder
      .addCase(addAlbumToPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAlbumToPlaylist.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("added album to playlist", action.payload);

        // state.playlist.push(action.payload);
      })
      .addCase(addAlbumToPlaylist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist action", action);
      });

    /* ------------------------------- getPlaylist ------------------------------ */
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("added album to playlist", action.payload);

        state.playlist.push(action.payload);
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist action", action);
      });

    /* ----------------------------- favouriteArtist ---------------------------- */

    builder
      .addCase(favouriteArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(favouriteArtist.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("added album to playlist", action.payload);
      })
      .addCase(favouriteArtist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist action", action);
      });

    /* ----------------------- get Favourite Artist lists ----------------------- */

    builder
      .addCase(getFavouriteArtistList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavouriteArtistList.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("artistList", action.payload);

        state.favouriteArtist.push(action.payload);
      })
      .addCase(getFavouriteArtistList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist list action", action);
      });
  },
});
// export const { test } = contentSlice.actions;
export default contentSlice.reducer;
