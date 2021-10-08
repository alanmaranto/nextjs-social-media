import axios from "axios";
import baseUrl from "./baseUrl.js";
import catchErrors from "./catchErrors";
import Router from "next/router";
import cookie from "js-cookie";

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};

export const registerUser = async (
  user,
  profilePictureUrl,
  setError,
  setLoading
) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      user,
      profilePictureUrl,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async (user, setError, setLoading) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, {
      user,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};
