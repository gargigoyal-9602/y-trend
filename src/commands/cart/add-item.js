import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";

export default async function addItem({ productId, variantId, quantity, onSuccess }) {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.addToCart(user?.id, cartState.cart?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.body.product_id = productId;
            serviceType.body.product_variant_id = variantId;
            !variantId && delete serviceType.body.product_variant_id;
            serviceType.body.quantity = quantity;
        }

        console.log("Cart Service Data is", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in adding to cart");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                window.notify([{ message: response.data?.message || "Product added to cart successfully", type: "success" }]);
                CartState.set({ cart: response.data?.data?.order });
                (typeof onSuccess === "function") && onSuccess();
            } else {
                throw new Error(error.message || "Error occured in adding to cart");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in adding to cart", type: "danger" }]);
    }
}


