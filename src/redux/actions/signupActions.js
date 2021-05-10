import { post } from "../../Barriers/apiHelper";
import signUpActions from "../types/signUpActionTypes";

export const fetchSignUpSucces = (res) => {
  return {
    type: signUpActions.SignUp_Success,
    payload: res,
  };
};
const fetchSignUpFailure = (res) => {
  return {
    type: signUpActions.SignUp_FAILURE,
    payload: res,
  };
};
export const fetchSignUpClear = () => {
  return {
    type: signUpActions.SignUp_Clear,
    payload: "",
  };
};

export const userSignUp = (url, data) => {
  return async (dispatch) =>
    await post(url, data)
      .then((res) => {
        dispatch(fetchSignUpSucces(res.data.data.user));
      })
      .catch((err) => {
        dispatch(fetchSignUpFailure(err.response.data));
        console.log(err.response.data);
      });
};
