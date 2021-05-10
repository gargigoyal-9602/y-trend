import AuthState from "../redux/states/auth";
import * as serviceTypes from './serviceTypes';
import fetcher from "./fetcher";

async function service(serviceType) {
    var message = "";
    var errorObject = {};
    const authState = AuthState.get();
    const loginData = authState.loginData;
    const user = authState.user;

    //request interceptor
    console.log("Received at service  ", serviceType);
    if (authState.guest_user === true && authState.uuId != "") {
        serviceType.params.uuid = authState.uuId;
    } else if (authState.guest_user === false && (typeof loginData.user) === "object") {
        serviceType.bearerToken = loginData.token?.access_token;
    } else {
        return { error: { message: "Login data error, try logout and login again." } };
    }

    //request to server
    const { response, error } = await fetcher(serviceType);


    //response interceptor
    if (error) {
        if (error.response) {
            errorObject.message = error.response.data.error;
            errorObject.status = error.response.status;
            if (typeof (errorObject.message) !== "string") {
                errorObject.message = error.response.data.message;
            }
        } else {
            errorObject.message = error.message;
        }
        return { error: errorObject };
    } else if (response) {
        return { response };
    } else {
        return { error: { message: "Unknown Error Occured" } };
    }
}

export default service;
export { serviceTypes, fetcher };
