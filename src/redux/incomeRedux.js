import { createSlice } from "@reduxjs/toolkit";

export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    stats: [],
    isFetching: false,
    error: false,
    perc: 0,
    orderPerc: 0
  },
  reducers: {
    getPerc: (state) => {
      state.perc = (state.stats[1].total * 100) / (state.stats[0]?.total - 100);
      state.orderPerc = (state.stats[1].totalCount * 100) / (state.stats[0]?.totalCount - 100)
    },
    //GET ALL
    getIncomeStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getIncomeSuccess: (state, action) => {
      state.isFetching = false;
      state.stats = action.payload;
    },
    getIncomeFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getIncomeStart,
  getIncomeSuccess,
  getIncomeFailure,
  getPerc
} = incomeSlice.actions;

export default incomeSlice.reducer;
