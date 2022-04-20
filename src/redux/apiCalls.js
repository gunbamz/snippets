import { apiCallFailure, apiRegisterSuccess, apiRefreshSuccess, apiLoginSuccess } from "./userRedux";
import { publicRequest, refreshRequest, userRequest } from "../requestMethods";

export const loginApi = async (dispatch, user) => {
  try { 
    const res = await publicRequest.post("/auth/login", user);
    dispatch(apiLoginSuccess(res.data));
  } catch (err) {
    dispatch(apiCallFailure()); 
  }
};
export const registerApi = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(apiRegisterSuccess(res.data));
  } catch (err) {
    dispatch(apiCallFailure());
  }
};
export const refreshApi = async (dispatch, user) => {
  try {
    const res = await refreshRequest.get("/auth/refresh", {
      withCredentials: true
  });
    dispatch(apiRefreshSuccess(res.data));
  } catch (err) {
    dispatch(apiCallFailure());
  }
};
