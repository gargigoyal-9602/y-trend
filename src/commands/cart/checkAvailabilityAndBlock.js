import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";

export default async function checkAvailabilityAndBlock() {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.checkAvailabilityAndBlock(user?.id, cartState.cart?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }
        /*
                if (serviceType) {
                    serviceType.params.product_id = productId;
                    serviceType.params.product_variant_id = variantId
                }*/

        console.log("Cart Service Data is ", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in processing cart");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                window.notify([{ message: response.data?.message || "Hurray! All products are available in your Cart", type: "success" }]);
                //CartState.set({ cart: response.data?.data?.order });
                return true;
            } else {
                throw new Error(response.data?.message || "One or more Products are not available in your cart");
            }
        }
    } catch (error) {
        window.notify([{ message: error.message || "Error occured in processing cart", type: "danger" }]);
        return false;
    }
    return false;
}


