import cartAction from "../types/cartActionTypes";

export const passCategoryData = (data) => {
  return {
    type: cartAction.GET_CATEGOTY,
    payload: data,
  };
};
