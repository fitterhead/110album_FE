import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "/Users/morita/Desktop/final project/top120albums-fe/top120albums-fe/src/features/post /postSlice.js";
import contentReducer from "../features/content/contentSlice";
const rootReducer = { post: postReducer, content: contentReducer };
const store = configureStore({ reducer: rootReducer });

export default store;
