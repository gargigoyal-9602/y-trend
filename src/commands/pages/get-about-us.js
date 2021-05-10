import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import CacheState from "../../redux/states/cache";

export default async function getAboutUs() {
    try {
        console.log("getting the aboutus");
        const cartState = CartState.get();
        const authState = AuthState.get();
        const cacheState = CacheState.get();
        const loginData = authState.loginData;
        const user = authState.user;

        var serviceType = {};
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.getAboutUsData();
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.headers = { 'Accept': "text/html" };
        }
        console.log("Cache Service Data is", serviceType);
        const { response, error } = await service(serviceType);

        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in getting aboutus content");
        } else if (response) {

            return response.data;
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in getting aboutus content", type: "danger" }]);
    }
}


