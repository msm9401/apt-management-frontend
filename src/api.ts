import Cookie from "js-cookie";
import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

// http://52.79.128.21/api/v1/
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getApartment = () =>
  localStorage.getItem("access_token")
    ? instance
        .get("houses/", {
          headers: {
            Authorization: `token ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => response.data)
    : instance.get("houses/").then((response) => response.data);

export const getFeed = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, _] = queryKey;
  return instance
    .get(`houses/${kaptName}/feed`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

/* export const knoxlogin = () =>
  instance.post("users/login").then((response) => response.data); */

export const getMe = () =>
  instance
    .get("users/<str:kapt_name>/profile/myprofile", {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/logout`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data)
    .then((response) => {
      localStorage.removeItem("access_token");
    });

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `/users/login`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      if (response.data["token"]) {
        const accessToken = response.data["token"];
        localStorage.setItem("access_token", accessToken);
      }
    });

export interface ISignUpVariables {
  username: string;
  password: string;
  password2: string;
}

export interface ISignUpSuccess {
  ok: string;
}

export interface ISignUpError {
  response: { data: { detail: string; username: string } };
}

export const signUp = ({ username, password, password2 }: ISignUpVariables) =>
  instance
    .post(
      "users/signup",
      { username, password, password2 },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      if (response.data["token"]) {
        const accessToken = response.data["token"];
        localStorage.setItem("access_token", accessToken);
      }
    });

export const searchApt = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName] = queryKey;
  return instance
    .get(`houses/search?keyword=${kaptName}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};
