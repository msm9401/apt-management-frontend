import Cookie from "js-cookie";
import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "http://52.79.128.21/api/v1/",
  withCredentials: true,
});

// 홈화면
export const getApartment = () =>
  localStorage.getItem("access_token")
    ? instance
        .get("houses/", {
          headers: {
            Authorization: `token ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => response.data)
        .catch((error: any) => {
          localStorage.removeItem("access_token");
          instance.get("houses/").then((response) => response.data);
        })
    : instance.get("houses/").then((response) => response.data);

// 아파트 등록
export const registerApartment = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName] = queryKey;
  return instance
    .post(`houses/${kaptName}/`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 피드 리스트 가져오기
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

// 피드 가져오기
export const getFeedDetail = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, pk] = queryKey;
  return instance
    .get(`houses/${kaptName}/feed/${pk}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 피드 삭제하기
export const deleteFeed = ({ kaptName, id }: any) => {
  return instance
    .delete(`houses/${kaptName}/feed/${id}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

export interface IEditFeedVariables {
  id: number;
  content: string;
  house: string;
  user: string;
  photos: FileList;
}

// 피드 수정하기
export const editFeed = (variables: IEditFeedVariables) => {
  return instance
    .put(`houses/${variables.house}/feed/${variables.id}/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface IUploadFeedVariables {
  content: string;
  house: string;
  user: string;
  photos: FileList;
}

// 피드 업로드
export const uploadFeed = (variables: IUploadFeedVariables) => {
  return instance
    .post(`houses/${variables.house}/feed/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface IUploadCommentVariables {
  id: number;
  content: string;
  house: string;
  user: string;
}

// 피드 댓글 작성
export const uploadComment = (variables: IUploadCommentVariables) => {
  return instance
    .post(`houses/${variables.house}/feed/${variables.id}/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 댓글
export const getComment = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, id, commentId] = queryKey;
  return instance
    .get(`houses/${kaptName}/feed/${id}/comment/${commentId}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 댓글 삭제
export const deleteComment = ({ kaptName, id, commentId }: any) => {
  return instance
    .delete(`houses/${kaptName}/feed/${id}/comment/${commentId}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

export interface IEditCommentVariables {
  id: number;
  commentId: number;
  content: string;
  house: string;
}

// 댓글 수정하기
export const editComment = (variables: IEditCommentVariables) => {
  return instance
    .put(
      `houses/${variables.house}/feed/${variables.id}/comment/${variables.commentId}`,
      variables,
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
          Authorization: `token ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((response) => response.data);
};

export interface IReplyCommentVariables {
  id: number;
  commentId: number;
  content: string;
  house: string;
}

// 대댓글 작성하기
export const replyComment = (variables: IReplyCommentVariables) => {
  return instance
    .post(
      `houses/${variables.house}/feed/${variables.id}/comment/${variables.commentId}`,
      variables,
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
          Authorization: `token ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((response) => response.data);
};

// 공지사항 리스트 가져오기
export const getNotice = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, _, page] = queryKey;

  return instance
    .get(`houses/${kaptName}/notice?page=${page}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 공지사항 가져오기
export const getNoticeDetail = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, pk] = queryKey;

  return instance
    .get(`houses/${kaptName}/notice/${pk}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 투표 리스트 가져오기
export const getPoll = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, _, page] = queryKey;

  return instance
    .get(`houses/${kaptName}/poll?page=${page}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 투표 상세정보 가져오기
export const getPollDetail = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, pk] = queryKey;

  return instance
    .get(`houses/${kaptName}/poll/${pk}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 특정 투표의 선택지 리스트 가져오기
export const getChoice = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, pk, page] = queryKey;

  return instance
    .get(`houses/${kaptName}/poll/${pk}/choice?page=${page}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

// 특정 투표의 선택지 상세정보 가져오기
export const getChoiceDetail = ({ queryKey }: QueryFunctionContext) => {
  const [kaptName, pk, choicePk] = queryKey;

  return instance
    .get(`houses/${kaptName}/poll/${pk}/choice/${choicePk}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

export interface IVoteVariables {
  kaptName: string;
  id: number;
  choiceId: number;
}

// 투표하기
export const vote = ({ kaptName, id, choiceId }: any) => {
  return instance
    .post(`houses/${kaptName}/poll/${id}/choice/${choiceId}/vote`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
        Authorization: `token ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => response.data);
};

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

// 아파트 검색
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

// 게스트 유저 로그인
export const guestLogIn = () =>
  instance.get(`/users/guest`).then((response) => {
    if (response.data["token"]) {
      const accessToken = response.data["token"];
      localStorage.setItem("access_token", accessToken);
    }
  });
