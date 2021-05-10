import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import cartCommands from "./index";

export default function convertAddress({ type, extaddress }) {
    var address = undefined;
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const cart = cartState.cart;
        var address = undefined;

        //auth setter part with optional test data for guest
        if (typeof extaddress === "object") {
            var item = extaddress;

            if (type === "billing") {
                address = {
                    bname: item.name || "",
                    bhouseNumber: item.flat_no || "",
                    baddressLine1: item.address || "",
                    baddressLine2: item.address_line_2 || "",
                    bcity: item.city || "",
                    bstate: item.state || "",
                    bcountry: item.country || "",
                    bpincode: item.zip_code || "",
                    bphone: item.phone_number || "",
                    bid:item.id || undefined
                };

            } else if (type === "shipping") {
                address = {
                    sname: item.name || "",
                    shouseNumber: item.flat_no || "",
                    saddressLine1: item.address || "",
                    saddressLine2: item.address_line_2 || "",
                    scity: item.city || "",
                    sstate: item.state || "",
                    scountry: item.country || "",
                    spincode: item.zip_code || "",
                    sphone: item.phone_number || "",
                    sid:item.id || undefined
                };
            }

            return address;


        } else {
            throw new Error("Cart Not available");
        }


    } catch (error) {
        window.notify([{ message: error.message || "Error occured in getting address", type: "danger" }]);
        return address;
    }
}


