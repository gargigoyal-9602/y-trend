import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";

export default async function sendContactMessage({ name, email, phone, title, message }) {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const user = authState.user;
        var serviceType = undefined;
        console.log("Auth State is ", authState);

        //auth setter part with optional test data for guest
        if (typeof user === "object") {
            serviceType = serviceTypes.sendContactMessage(user?.id);
        } else {
            throw new Error("Login data error, try logout and login again.");
        }

        if (serviceType) {
            serviceType.body.name = name;
            serviceType.body.email = email;
            serviceType.body.phone = phone;
            serviceType.body.title = title;
            serviceType.body.description = message;
        }

        console.log("Cart Service Data is", serviceType);
        const { response, error } = await service(serviceType);
        if (error) {
            //console.log("Received data is ", error.message);
            throw new Error(error.message || "Error occured in sending message");
        } else if (response) {
            //console.log("Received data is ", response);
            if (response.data?.success === true) {
               // window.notify([{ message: "Message Sent Successfully", type: "success" }]);
                return true;
            } else {
                throw new Error(error.message || "Error occured in sending message");
            }
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in sending message", type: "danger" }]);
        return false;
    }
}


