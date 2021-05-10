import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import cartCommands from "./index";

export default function getCurrentAddress() {
    try {
        const cartState = CartState.get();
        const authState = AuthState.get();
        const loginData = authState.loginData;
        const cart = cartState.cart;

        var address = {
            bname: "",
            bhouseNumber: "",
            baddressLine1: "",
            baddressLine2: "",
            bcity: "",
            bstate: "",
            bcountry: "",
            bpincode: "",
            bphone: "",

            isShippingAddressSame: true,

            sname: "",
            shouseNumber: "",
            saddressLine1: "",
            saddressLine2: "",
            scity: "",
            sstate: "",
            scountry: "",
            spincode: "",
            sphone: "",

            saveShippingAddress: false,
            saveBillingAddress: false
        };

        //auth setter part with optional test data for guest
        if (typeof cart === "object") {

            if (Array.isArray(cart.delivery_addresses) && cart.delivery_addresses?.length > 0) {

                cart.delivery_addresses.forEach((item, index) => {

                    if (typeof item.address_for === "string" && item.address_for.search("billing") > -1) {

                        address = {
                            ...address,
                            bname: item.name || "",
                            bhouseNumber: item.flat_no || "",
                            baddressLine1: item.address || "",
                            baddressLine2: item.address_line_2 || "",
                            bcity: item.city || "",
                            bstate: item.state || "",
                            bcountry: item.country || "",
                            bpincode: item.zip_code || "",
                            bphone: item.phone_number || ""
                        }
                    }

                    if (typeof item.address_for === "string" && item.address_for.search("shipping") > -1) {
                        address = {
                            ...address,
                            sname: item.name || "",
                            shouseNumber: item.flat_no || "",
                            saddressLine1: item.address || "",
                            saddressLine2: item.address_line_2 || "",
                            scity: item.city || "",
                            sstate: item.state || "",
                            scountry: item.country || "",
                            spincode: item.zip_code || "",
                            sphone: item.phone_number || ""
                        }
                    }

                });

                if (cart.delivery_addresses?.length > 1) {
                    address.isShippingAddressSame = false;
                }

            } else {
                return address;
            }


        } else {
            throw new Error("Cart Not available");
        }


    } catch (error) {
        window.notify([{ message: error.message || "Error occured in getting address", type: "danger" }]);
        return address;
    } finally {
        cartCommands.refreshCart();
    };

    return address;
}


