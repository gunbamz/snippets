import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    newUser: null,
    users: null,
    auth: null,
    error: false,
  },
  reducers: {
    apiRegisterSuccess: (state, action) => {
       state.newUser = action.payload;
    },
    apiUsersSuccess: (state, action) => {
       state.users = action.payload;
    },
    apiLoginSuccess: (state, action) => {
      const { refreshToken, ...others } = action.payload;
      let resObj = {...others};
      const { accessToken, ...another } = resObj;
      //const loggedUser = {...another};
      state.currentUser = {...another};
      state.auth = accessToken; 
      localStorage.setItem("currentUser", JSON.stringify({...another}));
    },
    apiLogoutSuccess: (state) => {
      state.currentUser = null;
      state.auth = null; 
    },
    apiRefreshSuccess: (state, action) => {
      state.auth = action.payload.accessToken;
    },
    apiCallFailure: (state) => {
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.auth = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { apiLogoutSuccess, apiUsersSuccess, apiLoginSuccess, apiRefreshSuccess, apiRegisterSuccess, apiCallFailure, logout } = userSlice.actions;
export default userSlice.reducer;
