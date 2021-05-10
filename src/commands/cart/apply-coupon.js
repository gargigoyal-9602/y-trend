import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import cartCommands from "./index";

export default async function applyCoupon({ couponCode, onError }) {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.applyCoupon();
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.body.cart_id = cartState.cart?.id;
            serviceType.body.cart_value = cartState.cart?.total + cartState.cart?.applied_discount || 0;
            serviceType.body.code = couponCode;
        }

        console.log("Cart Service Data is ", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in applying coupon");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                window.notify([{ message: response.data?.message || "Coupon applied successfully", type: "success" }]);
                CartState.set({ cart: response.data?.data?.order });
            } else {
                throw new Error(response.data?.message || response.data?.error || "Error occured in applying coupon");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in applying coupon", type: "danger" }]);
        if (typeof onError === "function") onError(error.message);
    }
}


