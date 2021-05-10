import loginActions from "../types/loginActionTypes";
import actionTypes from "../types/actionTypes";

const updateUserProfile = (prevState, res) => {
  console.log(prevState, res);
  let modifyUserState = prevState;
  if (prevState.user.name != res.name) {
    modifyUserState.user.name = res.name;
  }
  if (prevState.user.email != res.email) {
    modifyUserState.user.email = res.email;
  }
  if (prevState.user.phone_number != res.phone_number) {
    modifyUserState.user.phone_number = res.phone_number;
  }
  console.log(modifyUserState);
  return modifyUserState;
};

const Intial_State = {
  loginData: {},
  user: null,
  guest_user: true,
  uuId: "",
  address: []
};

function logInReducer(state = Intial_State, action) {
  // console.log(action.payload);
  switch (action.type) {
    case loginActions.LogInSuccess:
      return { ...state, loginData: action.payload.user.is_guest?{}:action.payload, guest_user: action.payload.user.is_guest, user: action.payload.user };

    case loginActions.uuId:
      return { ...state, uuId: action.payload };

    case loginActions.Guest:
      return { ...state, guest_user: true, user: action.payload.data };

    case loginActions.UPDATE_USER_STATE:
      return {
        ...state,
        loginData: updateUserProfile(state.loginData, action.payload),
        guest_user: false,
      };

    case loginActions.LogIn_Clear:
      return { ...state, loginData: {}, guest_user: true, user: null };

    case actionTypes.SET_ADDRESS:
      return { ...state, address: action.payload.addressList }

    case loginActions.UPDATE_USER:
      return { ...state, user: action.payload }

    default:
      return state;
  }
}
export default logInReducer;
