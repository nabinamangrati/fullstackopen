import { createSlice } from "@reduxjs/toolkit";
const notificationReducer = createSlice({
  name: "notification",
  initialState: "all notifications",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      return "all notifications";
    },
  },
});
export const notificationTimeout = (messageToshow, timeInSec) => {
  return async (dispatch) => {
    dispatch(setNotification(`You voted '${messageToshow}'`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeInSec * 1000);
  };
};
const { setNotification, resetNotification } = notificationReducer.actions;
export { setNotification, resetNotification };
export default notificationReducer.reducer;
