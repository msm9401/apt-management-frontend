import Cookie from "js-cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getApartment = () =>
  instance.get("houses/").then((response) => response.data);

export const knoxlogin = () =>
  instance.post("users/login").then((response) => response.data);

export const getMe = () =>
  instance
    .get("users/<str:kapt_name>/profile/myprofile")
    .then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/logout`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

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
    .then((response) => response.data);
