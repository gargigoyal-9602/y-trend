import service, { serviceTypes } from "../../services";
import UserState from "../../redux/states/user";

export default async function getTrackingDetails(onSuccess, onFailure, orderId = null ,orderItemId = null) {
    try {
        const userState = UserState.get();
        const user = userState.user;
        var serviceType = undefined;

        if (typeof user === "object") {
            if (orderId) {
                serviceType = serviceTypes.getLogisticDetails(orderItemId);
            } else {
                serviceType = serviceTypes.getTrackIdDetails(user?.id);
                serviceType.body.id = orderItemId
            }
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        const { response, error } = await service(serviceType);

        if (error) {
            console.log("Received error is ", error.message);
            throw new Error(error.message || "Error occured whit getting tracking details");
        } else if (response) {
            console.log("Received data in tracking ", response.data.data);
            if (response.data?.success === true) {
                (typeof onSuccess === "function") && setTimeout(() => onSuccess(response.data.data), 500);
            } else {
                throw new Error(error.message || "Error occured whit getting tracking details");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured whit getting tracking details", type: "danger" }]);
    }
}