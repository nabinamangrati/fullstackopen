import { createSlice } from "@reduxjs/toolkit";
const notificationReducer = createSlice({
  name: "notification",
  initialState: "all notifications",
  reducers: {
    notificationChange(state, action) {
      return action.payload;
    },
  },
});
const { notificationChange } = notificationReducer.actions;
export { notificationChange };
export default notificationReducer.reducer; //export reducer to store.js
