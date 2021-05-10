import service, { serviceTypes } from "../../services";
import AuthState from "../../redux/states/auth";
import _ from "lodash";

export default async function resendConfirmationOtp(email, onSuccess, onFailure) {
    try {
        const authState = AuthState.get();
        const loginData = authState.loginData;
        var serviceType = undefined;
        const user = authState.user;

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.resendEmailConfirmOTP();
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.body.email = email;
        }

        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured while sending confirmation otp.");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                window.notify([{ message: response.data?.message || "OTP sent successfully", type: "success" }]);
                //setTimeout(() => onSuccess(), 500);
            } else {
                throw new Error(response.data?.message || "Error occured while sending confirmation otp.");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured while sending confirmation otp.", type: "danger" }]);
    }
}


