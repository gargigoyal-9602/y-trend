import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";

export default async function removeItem({ productId, variantId,orderItemId }) {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.removeFromCart(user?.id, cartState.cart?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.params.product_id = productId;
            serviceType.params.product_variant_id = variantId;
            serviceType.params.order_item_id = orderItemId;
            !variantId && delete serviceType.params.product_variant_id;
            !orderItemId && delete serviceType.params.order_item_id;
        }

        console.log("Cart Service Data is ", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in removing from cart");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
                window.notify([{ message: response.data?.message || "Product removed from cart successfully", type: "danger" }]);
                CartState.set({ cart: response.data?.data?.order });
            } else {
                throw new Error(response.data?.message || "Error occured in removing from cart");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in removing from cart", type: "danger" }]);
    }
}


