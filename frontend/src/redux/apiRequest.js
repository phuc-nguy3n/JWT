import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "./authSlice";

import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
    if (res && res.data) {
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailure());
    console.log(err);
    alert(err.response.data);
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/auth/register",
      user
    );
    if (res && res.data) {
      dispatch(registerSuccess());
      navigate("/login");
    }
  } catch (err) {
    dispatch(registerFailure());
    console.log(err);
    alert(err.response.data);
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/user/", {
      headers: { token: `Bearer ${accessToken}` },
    });

    if (res && res.data) {
      dispatch(getUsersSuccess(res.data));
    }
  } catch (err) {
    dispatch(getUsersFailure());
    console.log(err);
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/v1/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailure(err.response?.data));
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("http://localhost:8000/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailure());
  }
};
