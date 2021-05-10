import loginActions from "../types/loginActionTypes";
import { post, postUpdate } from "../../Barriers/apiHelper";
import { headers } from "../../Barriers/helpers";
import CacheState from "../states/cache";

export const fetchUserSuccess = (res) => {
  return {
    type: loginActions.LogInSuccess,
    payload: res,
  };
};
export const changeUserState = (res) => {
  console.log(res);
  return {
    type: loginActions.UPDATE_USER_STATE,
    payload: res,
  };
};

export const fetchUUID = (res) => {
  return {
    type: loginActions.uuId,
    payload: res,
  };
};
export const fetchHeaders = (res) => {
  return {
    type: loginActions.Headers,
    payload: res,
  };
};
export const clearUserData = (res) => {
  return {
    type: loginActions.LogIn_Clear,
    payload: res,
  };
};
export const setGuestStatus = (res) => {
  console.log("Guest user responce", res);
  return {
    type: loginActions.Guest,
    payload: res,
  };
};

const fetchUserFailure = (err) => {
  return {
    type: loginActions.LogIn_FAILURE,
    payload: err,
  };
};

export const userLogIn = (url, data) => {
  return async (dispatch) =>
    await post(url, data)
      .then((res) => {
        console.log("login success ", res);
        dispatch(fetchUserSuccess(res.data.data));
        localStorage.setItem('token', res.data.data.token.access_token);
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err.response.data));
        console.log(err.response.data);
      });
};

export const userSocialLogin = (data, onSuccess, onFailure) => {
  const url = "/oauth/token";
  return async (dispatch) =>
    await post(url, data)
      .then((res) => {
        if (res !== undefined && res.status === 200) {
          dispatch(fetchUserSuccess(res.data.data));
          onSuccess(res.data.data);
          localStorage.setItem('token', res.data.data.token.access_token);
        } else {
          dispatch(fetchUserFailure("Error"));
          onFailure(null);
        }
      })
      .catch((err) => {
        if (err.request._response && err.request.status !== 0) {
          let response = JSON.parse(err.request._response);
          dispatch(fetchUserFailure(response.error));
          onFailure(response.error);
        } else {
          dispatch(fetchUserFailure("Error"));
          onFailure(null);
          console.log(err);
        }
      });
};

export const userLogout = (data, header, onSuccess, onFailure) => {
  const url = "/oauth/revoke";
  return async (dispatch) => {
    await postUpdate(url, data, header)
      .then((res) => {
        if (res !== undefined && res.status === 200) {
          dispatch(clearUserData());
          localStorage.removeItem('UUID');
          localStorage.removeItem('token');
          localStorage.removeItem('persist:root');
          localStorage.removeItem('language');
          CacheState.clear();
          onSuccess(res.data.data);
        } else {
          onFailure(null);
        }
      })
      .catch((err) => {
        if (err.request && err.request._response && err.request.status !== 0) {
          let response = JSON.parse(err.request._response);
          onFailure(response.error);
        } else {
          onFailure(null);
          console.log(err);
        }
      });
  };
};

// export default userLogIn
