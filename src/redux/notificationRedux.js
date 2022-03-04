import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    data: [],
    counter: 0
  },
  reducers: {
    saveNotification: (state, action) => {
      state.data.push(action.payload);
      state.counter += 1
    },
    bellClicked: ( state ) => {
      state.counter = 0
    },
    viewNotification: (state, action) => {
      state.data.splice(
        state.data.findIndex((item) => item._id === action.payload),
        1
      );
    }
  },
});

export const { saveNotification, bellClicked, viewNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
