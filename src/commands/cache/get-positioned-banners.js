import service, { serviceTypes } from "../../services";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import CacheState from "../../redux/states/cache";

export default function getPositionedBanners({ position }) {
    try {
        console.log("getting the banners");
        const cartState = CartState.get();
        const authState = AuthState.get();
        const cacheState = CacheState.get();
        const loginData = authState.loginData;
        const user = authState.user;

        if (position && Array.isArray(cacheState.banners)) {
            var banners = cacheState.banners;
            var filtered = banners.filter((item, idx) => item.position == position);
            return filtered;
        } else {
            return [];
        }

    } catch (error) {
        window.notify([{ message: error.message || "Error occured in getting positioned banners", type: "danger" }]);

    }
}


