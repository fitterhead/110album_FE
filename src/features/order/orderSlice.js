import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: null,
  error: null,
  transaction: [],
  tableData: [],
  pastOrder: [],
  combine: [],
};
const slice = createSlice({
  name: "Order",
  initialState,

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = true;
      state.error = action.payload;
    },
    getTableDataSuccess(state, action) {
      state.isLoading = false;
      state.tableData = [];
      state.tableData = action.payload.data;
    },
    getPastOrder(state, action) {
      state.isLoading = false;
      state.pastOrder = action.payload.data;
    },
    saveCombinedList(state, action) {
      state.isLoading = false;
      state.combine = action.payload;
    },
  },
});

export default slice.reducer;

// nhan array of item

export const transactionSuccess = (items) => async (dispatch) => {
  console.log("transactionData", items);
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/order", items);
    console.log("transaction response", response);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

/* --------------------------- send data for table -------------------------- */
export const getTableData = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    console.log("show userId before dispatch", { userId });
    let customQuery = "/order";
    if (userId) {
      customQuery = `/order?userId=${userId}`;
    }

    // const response = await apiService.get("/order", { userId });
    const response = await apiService.get(customQuery, { userId });
    console.log("customQuery", customQuery);
    console.log("table data successsss aaaaa", response);

    dispatch(slice.actions.getTableDataSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

/* ------------------------- list of album purchased ------------------------ */

export const getOrderHistory = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    console.log("show userId before dispatch", { userId });
    let customQuery = "/order";
    if (userId) {
      customQuery = `/order?userId=${userId}`;
    }

    // const response = await apiService.get("/order", { userId });
    const response = await apiService.get(customQuery, { userId });
    console.log("table data successsss aaaaa", response);

    let productList = response.data.map((product) => product.product);
    productList = productList.flat(1);
    productList = productList.map((item) => item.reference_id);
    dispatch(slice.actions.getPastOrder(productList));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

/* ------------------------------ combinedList ------------------------------ */

export const getCombinedList = (list) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    dispatch(slice.actions.saveCombinedList(list));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
