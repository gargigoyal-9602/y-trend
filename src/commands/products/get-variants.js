import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import CacheState from "../../redux/states/cache";

export default async function getVariants() {
    try {
        console.log("getting variants");
        const cartState = CartState.get();
        const authState = AuthState.get();
        const cacheState = CacheState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.getVariants(user?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }


        console.log("Variants data is", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in getting variants");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                return response.data?.data;
            } else {
                throw new Error("Error occured in getting variants");
            }
        }

    } catch (error) {
        //window.notify([{ message: error.message || "Error occured in refreshing cache", type: "danger" }]);
        return [];
    }
}


