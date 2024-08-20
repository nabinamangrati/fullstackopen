import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",

  initialState: null,

  reducers: {
    setMessage(state, action) {
      const message = action.payload;

      return message;
    },

    removeMessage() {
      return null;
    },
  },
});

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    console.log("Dispatching setMessage with:", notification);

    dispatch(setMessage(notification));

    setTimeout(() => {
      dispatch(removeMessage());
    }, time * 1000);
  };
};

export const { setMessage, removeMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
