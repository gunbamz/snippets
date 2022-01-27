import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    newUser: null,
    isCalling: false,
    error: false,
  },
  reducers: {
    apiCallStart: (state) => {
      state.isCalling = true;
    },
    apiRegisterSuccess: (state, action) => {
      state.isCalling = false;
       state.newUser = action.payload;
    },
    apiLoginSuccess: (state, action) => {
      state.isCalling = false;
      state.currentUser = action.payload;
    },
    apiCallFailure: (state) => {
      state.isCalling = false;
      state.error = true;
    },
  },
});

export const { apiCallStart, apiLoginSuccess, apiRegisterSuccess, apiCallFailure } = userSlice.actions;
export default userSlice.reducer;
