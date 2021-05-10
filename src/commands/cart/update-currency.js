import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import cartCommands from "./index";
import _ from "lodash";


export default async function updateCurrency({ currency }) {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        var serviceType = undefined;
        const user = authState.user;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.updateCartCurrency(user?.id, cartState.cart?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.body.currency = currency;
        }

        console.log("Cart Service Data is", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in updating currency");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                window.notify([{ message: response.data?.message || "Currency updated successfully", type: "success" }]);
                CartState.set({ cart: response.data?.data?.order });
            } else {
                throw new Error(response.data?.message || "Error occured in updating currency");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in updating currency", type: "danger" }]);
        cartCommands.refreshCart();
    }
}


