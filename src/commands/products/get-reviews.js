import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import CacheState from "../../redux/states/cache";
import { FaLessThanEqual } from "react-icons/fa";

export default async function getReviews({ productId, perPage, page }) {
    try {
        console.log("getting product reviews");
        const cartState = CartState.get();
        const authState = AuthState.get();
        const cacheState = CacheState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.getProductReviews(user?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.params.product_id = productId;
            serviceType.params.per_page = perPage;
            //serviceType.params.page = page;
        }

        console.log("Product Service Data is", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in gettting reviews");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                return response.data?.data;
            } else {
                throw new Error("Error occured in getting reviews");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in getting reviews.", type: "danger" }]);
        return false;
    }
}


