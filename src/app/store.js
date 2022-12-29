import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice.js";
import contentReducer from "../features/content/contentSlice";
const rootReducer = { post: postReducer, content: contentReducer };
const store = configureStore({ reducer: rootReducer });

export default store;
