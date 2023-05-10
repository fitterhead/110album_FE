import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  contentStatus: false,
  error: null,
  status: "",
  playlistStatus: "",
  contents: [],
  artists: [],
  albums: [],
  test: "",
  playlist: [],
  favouriteArtist: [],
  similarAlbums: [],
  suggestion: [],
  cart: [],
};

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
/* ------------------------------ get all album ----------------------------- */
export const getContent = createAsyncThunk(
  "content",
  async ({ limit, page, filter, filterName, input }) => {
    console.log("filterName", filterName);
    console.log("inputtt", input);
    let url = `/album?page=${page}&limit=${limit}`;
    if (filter) url += `&filter=${filter}`;
    if (filterName) url += `&filterName=${filterName}`;
    if (input) url += `&input=${input}`;

    // if (filterName&& input) url +=`&filter=${filter}`
    const response = await apiService.get(url);
    console.log(response, "aaaaaa");
    return response;
  }
);
/* ---------------------------- get single album ---------------------------- */
export const getAlbums = createAsyncThunk("albums", async ({ albumId }) => {
  const response = await apiService.get(`/album/result/${albumId}`);
  return response;
});
/* ------------------------------- get artist ------------------------------- */
export const getArtist = createAsyncThunk("artists", async ({ artistId }) => {
  const response = await apiService.get(`/artist/${artistId}`);
  return response;
});
/* -------------------------- get playlist of user -------------------------- */
export const getPlaylist = createAsyncThunk("Playlist", async () => {
  const response = await apiService.get("/playlist");
  return response;
});
/* ----------------- get list of favourite artist of an user ---------------- */
export const getFavouriteArtistList = createAsyncThunk(
  "FavouriteArtistList",
  async () => {
    const response = await apiService.get("/favouriteArtist");
    return response;
  }
);
/* ----------------------- get albums with same genre ----------------------- */
export const getAlbumWithSameGenre = createAsyncThunk(
  "getAlbumWithSameGenre",
  async (genreName) => {
    const response = await apiService.get(
      `/album/similarGenre?genre=${genreName}`
    );
    return response;
  }
);

/* ----------------------- get albums from genre array ---------------------- */

export const fromGenreArray = createAsyncThunk(
  "getAlbumListFromGenreArray",
  async (genres) => {
    const response = await apiService.post("/album/genre", genres);
    return response;
  }
);

/* ---------------------- get Albums of the same Artist --------------------- */
export const getAlbumOfTheSameArtist = createAsyncThunk(
  "getAlbumOfTheSameArtist",
  async (artistId) => {
    const response = await apiService.get(`album/albumOfArtist/${artistId}`);
    return response;
  }
);
/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */

/* ------------------ Send artist to favourite artist list ------------------ */
export const favouriteArtist = createAsyncThunk(
  "favouriteArtist",
  async (data) => {
    const response = await apiService.post("/favouriteArtist", data);
    console.log(response, "resssssss artist");
    return response;
  }
);

/* ---------------------- send array of favourite genre --------------------- */

// export const favouriteGenre = createAsyncThunk(
//   "favouriteArtist",
//   async (data) => {
//     const response = await apiService.post("/favouriteArtist", data);
//     console.log(response, "resssssss artist");
//     return response;
//   }
// );

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */
/* -------------------------- add album to playlist ------------------------- */

export const addAlbumToPlaylist = createAsyncThunk(
  "addAlbumToPlaylist",

  async (data) => {
    const response = await apiService.put("/playlist/addAlbumToPlaylist", data);
    console.log(response, "album was added to playlist ");
    return response;
  }
);

/* ---------------------------- add album to cart --------------------------- */

// export const addAlbumToCart = createAsyncThunk(
//   "addAlbumToCart",

//   async (data) => {
//     const response = await apiService.post("/order", data);
//     console.log(response, "album was added to order ");
//     return response;
//   }
// );
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
        state.isLoading = true;

        console.log("pending");
      })
      .addCase(getContent.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;

        console.log("action payload", action.payload);
        //
        state.contents = [];
        state.contents.push(action.payload);
        // state.contents = action.payload;
      })
      .addCase(getContent.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;

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
        state.artists = [];
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
        console.log("action album payload", action.payload);
        //
        state.albums = [];
        state.albums.push(action.payload);
      })
      .addCase(getAlbums.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist action", action);
      });

    /* ---------------------- get similar genre of an album --------------------- */

    builder
      .addCase(getAlbumWithSameGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAlbumWithSameGenre.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("getAlbumWithSameGenre", action.payload);

        state.similarAlbums = [];
        state.similarAlbums.push(action.payload);
      })
      .addCase(getAlbumWithSameGenre.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("artist action", action);
      });

    /* --------------------- get album list from genre Array -------------------- */

    builder
      .addCase(fromGenreArray.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fromGenreArray.fulfilled, (state, action) => {
        state.status = "idle";
        state.suggestion = [];
        state.suggestion.push(action.payload);
        // console.log("fromGenreArray", action.payload);
      })
      .addCase(fromGenreArray.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("fromGenreArray rejected", action);
      });

    /* ------------------ get Album list from the same Artists ------------------ */
    builder
      .addCase(getAlbumOfTheSameArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAlbumOfTheSameArtist.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("getAlbumOfTheSameArtist", action.payload);

        state.similarAlbums = [];
        state.similarAlbums.push(action.payload);
      })
      .addCase(getAlbumOfTheSameArtist.rejected, (state, action) => {
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
        state.playlist = [];
        state.playlist.push(action.payload);
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        // state.status = "rejected";
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

    /* -------------------------------------------------------------------------- */
    /*                                    post                                    */
    /* -------------------------------------------------------------------------- */

    /* -------------------------- add album to playlist ------------------------- */
    builder
      .addCase(addAlbumToPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAlbumToPlaylist.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("addAlbumToPlaylist Successful", action.payload);
        state.playlistStatus = "added album to playlist successfully";

        // state.playlist = [state.playlist, ...action.payload];
        // state.playlist.map((e) => {
        //   if (e._id === action.payload._id) {
        //     e = action.payload;
        //   }
        // });
      })
      .addCase(addAlbumToPlaylist.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        state.playlistStatus = "added album to playlist failed";
        console.log("artist list action", action);
      });

    /* ---------------------------- add album to cart --------------------------- */

    // builder
    //   .addCase(addAlbumToCart.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(addAlbumToCart.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     console.log("added album to cart", action.payload);
    //     // state.cart = [];
    //     state.cart.push(action.payload);
    //   })
    //   .addCase(addAlbumToCart.rejected, (state, action) => {
    //     state.status = "rejected";
    //     state.error = action.error.message;
    //     console.log("artist action", action);
    //   });
  },
});
// export const { test } = contentSlice.actions;
export default contentSlice.reducer;
