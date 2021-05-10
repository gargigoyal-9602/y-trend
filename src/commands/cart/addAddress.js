import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import cartCommands from "./index";

export default async function addAddress({ address }) {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        //const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.addAddressToCart(user?.id, cartState.cart?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.body = address;
        }

        console.log("Cart Service Data is ", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in adding address");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                window.notify([{ message: response.data?.message || "Address added to cart successfully", type: "success" }]);
                //CartState.set({ cart: response.data?.data?.order });
                return true;
            } else {
                throw new Error(response.data?.message || "Error occured in adding address");
            }
        }
    } catch (error) {
        window.notify([{ message: error.message || "Error occured in adding address", type: "danger" }]);
        return false;
    } finally {
        cartCommands.refreshCart();
    };
    return false;
}


