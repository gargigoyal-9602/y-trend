import service, { serviceTypes } from "../../services";
import UserState from "../../redux/states/user";

export default async function getAddressList(onSuccess, onFailure) {
    try {
        const userState = UserState.get();
        const user = userState.user;
        var serviceType = undefined;

        if (typeof user === "object") {
            serviceType = serviceTypes.getAddressList(user?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        const { response, error } = await service(serviceType);

        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in fetching address list");
        } else if (response) {
            console.log("Received data is address ", response.data.data);
            if (response.data?.success === true) {
                UserState.set({ addressList: response.data?.data });
                (typeof onSuccess === "function") && setTimeout(() => onSuccess(), 500);
            } else {
                throw new Error(error.message || "Error occured in fetching address list");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in fetching address list", type: "danger" }]);
    }
}