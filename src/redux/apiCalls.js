import { apiCallFailure, apiCallStart, apiRegisterSuccess, apiLoginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const loginApi = async (dispatch, user) => {
  dispatch(apiCallStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(apiLoginSuccess(res.data));
  } catch (err) {
    dispatch(apiCallFailure());
  }
};
export const registerApi = async (dispatch, user) => {
  dispatch(apiCallStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(apiRegisterSuccess(res.data));
  } catch (err) {
    dispatch(apiCallFailure());
    console.log(err);
  }
};
