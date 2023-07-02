import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice.js";
import contentReducer from "../features/content/contentSlice";
import playlistReducer from "../features/playlist/playlistSlice";
import orderReducer from "../features/order/orderSlice";
import alertReducer from "../features/alert/alertSlice";
import songReducer from "../features/song/songSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import cartReducer from "../features/cart/CartSlice.js";

const rootReducer = {
  post: postReducer,
  content: contentReducer,
  playlist: playlistReducer,
  order: orderReducer,
  alert: alertReducer,
  song: songReducer,
  dashboard: dashboardReducer,
  cart: cartReducer,
};
const store = configureStore({ reducer: rootReducer });

export default store;
