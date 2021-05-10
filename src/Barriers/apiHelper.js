import { headers } from "./helpers";
import { ytrendv1 } from "../URLConst";

import axios from "axios";

export const post = async (endpoint, data) => {
  return await axios.post(`${ytrendv1}${endpoint}`, data, headers);
};
export const put = async (endpoint, data) => {
  return await axios.put(`${ytrendv1}${endpoint}`, data, headers);
};
export const get = async (endpoint, paramHeader) => {
  return await axios.get(`${ytrendv1}${endpoint}`, paramHeader? paramHeader : headers);
};
export const getProducts = async (endpoint, header) => {
  // console.log(header, "headers");
  return await axios.get(`${ytrendv1}${endpoint}`, header);
};
export const putUpdate = async (endpoint, data, header) => {
  return await axios.put(`${ytrendv1}${endpoint}`, data, header);
};
export const postUpdate = async (endpoint, data, header) => {
  return await axios.post(`${ytrendv1}${endpoint}`, data, header);
};
export const deleteData = async (endpoint, header) => {
  return await axios.delete(`${ytrendv1}${endpoint}`, header);
};
// export default post, put ;
// export default apiHelper;
