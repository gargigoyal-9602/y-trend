import service, { serviceTypes } from "../../services";
import AuthState from "../../redux/states/auth";
import store from "../../redux/store";
import _ from "lodash";
import { fetchUserSuccess } from "../../redux/actions/loginActions";


export default async function refreshProfile(profileDetails, onSuccess, onFailure) {
    try {
        const authState = AuthState.get();
        var serviceType = undefined;
        const user = authState.user;

        //dont run it for guest user;
        /*
        if (!(typeof authState.user === "object" && authState.user?.id !== undefined && authState.user?.is_guest == false)) {
            return;
        };*/

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.refreshProfile(user?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            //serviceType.body = profileDetails;
        }

        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured while updating profile");
        } else if (response) {
            console.log("Received profile data is ", response?.data?.data);
            if (response.data?.success === true) {
                // window.notify([{ message: response.data?.message || "Profile updated successfully", type: "success" }]);
                var loginData = authState.loginData;
                loginData.user = response.data.data;
                store.dispatch(fetchUserSuccess(loginData));
                //AuthState.set(response.data.data);
                //setTimeout(() => onSuccess(), 500);
            } else {
                throw new Error(response.data?.message || "Error occured while updating profile");
            }
        }

    } catch (error) {
        //window.notify([{ message: error.message || "Error occured while updating profile", type: "danger" }]);
        // onFailure("Error : "+error.message || "Unknown Error Occured");
    }
}


