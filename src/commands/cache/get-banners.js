import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import CacheState from "../../redux/states/cache";

export default async function getBanners() {
    try {
        console.log("getting the banners");
        const cartState = CartState.get();
        const authState = AuthState.get();
        const cacheState = CacheState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        
        var serviceType = {};
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.getBanners();
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        console.log("Cache Service Data is", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in getting banners");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                CacheState.set({ banners: response.data?.data?.banners });
            } else {
                throw new Error("Error occured in getting banners");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in getting banners", type: "danger" }]);

    }
}


