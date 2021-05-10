import signUpActionTypes from "../types/signUpActionTypes";

const Intial_State = {
  signUpData: {},
  err: "",
};

export const signUpReducer = (state = Intial_State, action) => {
  switch (action.type) {
    case signUpActionTypes.SignUp_Success:
      return { ...state, signUpData: action.payload, err: "" };
    case signUpActionTypes.SignUp_FAILURE:
      return { ...state, err: action.payload, signUpData: {} };
    case signUpActionTypes.SignUp_Clear:
      return { ...state, err: "", signUpData: {} };
    default:
      return state;
  }
};
