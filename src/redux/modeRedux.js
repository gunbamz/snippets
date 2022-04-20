import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: {
    currentMode: false,
    messengerMode: false,
  },
  reducers: {
    setMode: (state, action) => {
      state.currentMode = action.payload;
    },
    setMessenger: (state, action) => {
      state.messengerMode = action.payload;
    },
  },
});

export const { setMode, setMessenger } = modeSlice.actions;
export default modeSlice.reducer;
