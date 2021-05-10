import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";

export default async function createCart() {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const user = authState.user;
        var serviceType = {};
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.createCart(user?.id)
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        console.log("Cart Service Data is ", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Cart creation error occured");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                CartState.set({ cart: response.data?.data?.order });
                return true;
            } else {
                throw new Error("Cart creation error occured");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in creating cart", type: "danger" }]);
        return false;
    }
}


