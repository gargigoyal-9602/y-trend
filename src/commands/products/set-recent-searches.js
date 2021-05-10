import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import CacheState from "../../redux/states/cache";
import { FaLessThanEqual } from "react-icons/fa";

export default async function setRecentSearches({ query, productId, className }) {
    try {
        console.log("getting recent seach result");
        const cartState = CartState.get();
        const authState = AuthState.get();
        const cacheState = CacheState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.setRecentSearch();
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.params.query = query;
            serviceType.params.class_id = productId;
            serviceType.params.class_name = className;
        }

        console.log("Product Service Data is", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in quick search");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                return true;
            } else {
                throw new Error("Error occured in quick search");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in getching recent searches", type: "danger" }]);
        return false;
    }
}


