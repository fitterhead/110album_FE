import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice.js";
import contentReducer from "../features/content/contentSlice";
import playlistReducer from "../features/playlist/playlistSlice";

const rootReducer = {
  post: postReducer,
  content: contentReducer,
  playlist: playlistReducer,
};
const store = configureStore({ reducer: rootReducer });

export default store;
