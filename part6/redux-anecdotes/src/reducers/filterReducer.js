import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      return action.payload;
    },
  },
});

const { filterChange } = filterReducer.actions;
export { filterChange };
export default filterReducer.reducer;
