import service, { serviceTypes } from "../../services";
import AuthState from "../../redux/states/auth";

export default function isLoggedIn() {
    const authState = AuthState.get();
    const loginData = authState.loginData;

    if (authState.guest_user === false && (typeof loginData.user) === "object") {
        return true;
    }

    return false;

}