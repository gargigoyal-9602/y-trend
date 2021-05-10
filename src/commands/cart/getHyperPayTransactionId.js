import service, { serviceTypes, fetcher } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import cartCommands from "./index";

export default async function getHyperPayTransactionId({ paymentType }) {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.hyperpayDebitCardCheckout();
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            var cart = cartState.cart;
            serviceType.body.currency = typeof cart.total_with_currency === "string" && cart.total_with_currency.split(" ")[0];
            serviceType.body.amount = cart.is_default_currency ? cart.total : cart.total_with_currency?.split(" ")[1];
            serviceType.body.amount = String(serviceType.body.amount);
            serviceType.body.merchantTransactionId = cartState.cart?.order_number;
        }

        console.log("Cart Service Data is ", serviceType);
        const { response, error } = await fetcher(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in placing order.");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.status === true) {

                const body = response.data?.body;

                if (body.result?.code === "000.200.100") {
                    //window.notify([{ message: body.result?.description || "Payment initiated successfully", type: "success" }]);
                    return body.id;
                } else {
                    window.notify([{ message: body.result?.description || "Payment initiation error occured", type: "danger" }]);
                }
            } else {
                throw new Error(response.data?.message || "Payment initiation error occured");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in placing order", type: "danger" }]);

    } finally {
        cartCommands.createCart();
    }
    return undefined;
}


