import getAddressList from "./get-address";
import updateAddress from "./edit-address";
import addAddress from "./add-new-address";
import delAddress from "./del-address";
import sendContactMessage from "./send-contact-message";
import isLoggedIn from "./is-logged-in";
import updateProfile from "./update-profile";
import getSocialList from "./get-social-list";
import connectSocialAccount from "./connectSocialAccount";
import removeSocialAccount from "./removeSocialAccount";
import refreshProfile from "./refresh-profile";;
import resendConfirmationOtp from "./resendConfirmationOtp";

export default {
    getAddressList,
    updateAddress,
    addAddress,
    delAddress,
    sendContactMessage,
    isLoggedIn,
    updateProfile,
    refreshProfile,
    getSocialList,
    connectSocialAccount,
    removeSocialAccount,
    resendConfirmationOtp
}