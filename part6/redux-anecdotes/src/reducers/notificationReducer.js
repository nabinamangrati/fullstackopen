import { createSlice } from "@reduxjs/toolkit";
const notificationReducer = createSlice({
  name: "notification",
  initialState: "all notifications",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      setNotification(action);
      return "New notifications";
    },
  },
});
const { setNotification, resetNotification } = notificationReducer.actions;
export { setNotification, resetNotification };
export default notificationReducer.reducer;
