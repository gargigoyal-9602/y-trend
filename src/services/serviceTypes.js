//import config from "~/config";
import { ytrendv1 as ytrend } from "../URLConst";
import { ytrend as BASE_URL } from "../URLConst";
const config = { apiUrl: ytrend, baseUrl: BASE_URL };

function getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
}

function getUrl(endpoint = "") {
    if (config.apiUrl !== "") {
        if (config.apiUrl.substr(-1) !== "/") {
            config.apiUrl += "/";
        };
    }

    return config.apiUrl + endpoint;
}

function getBaseUrl(endpoint = "") {
    if (config.baseUrl !== "") {
        if (config.baseUrl.substr(-1) !== "/") {
            config.baseUrl += "/";
        };
    }
    return config.baseUrl + endpoint;
}


export const getHomeProductListing = () => ({
    method: "GET",
    url: getUrl("products"),
    params: {
        uuid: ""
    },
    body: {},
    headers: {},
    bearerToken: ""
});

export const getBanners = () => ({
    method: "GET",
    url: getUrl("products/banners_list"),
    params: {},
    body: {},
    headers: {},
    bearerToken: ""
});

export const getWebBanners = () => ({
    method: "GET",
    url: getUrl("products/web_banners_list"),
    params: {},
    body: {},
    headers: {},
    bearerToken: ""
});

export const getProductDetails = (product) => ({
    method: "GET",
    url: getUrl("products/" + product),
    params: {
        uuid: ""
    },
    body: {},
    headers: {},
    bearerToken: ""
});

export const subscribeForProductNotification = (product) => ({
    method: "POST",
    url: getUrl("products/" + product + "/notify_product"),
    params: {
        uuid: ""
    },
    body: {},
    headers: {},
    bearerToken: ""
});

export const addToWishlist = (userId) => ({
    method: "POST",
    url: getUrl("users/" + userId + "/wishlists"),
    params: {},
    body: {
        product_id: "",
        uuid: ""
    },
    headers: {},
    bearerToken: localStorage.getItem('token') ? localStorage.getItem('token') : ''
});

export const removeFromWishlist = (userId) => ({
    method: "DELETE",
    url: getUrl("users/" + userId + "/wishlists"),
    params: {
        product_id: "",
        uuid: ""
    },
    body: {},
    headers: {},
    bearerToken: ""
});


export const createCart = (userId) => ({
    method: "POST",
    url: getUrl("users/" + (userId || "0") + "/carts"),
    params: {
        uuid: ""
    },
    body: {},
    headers: {},
    bearerToken: "",
});

export const addToCart = (userId, cartId) => ({
    method: "POST",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}/add_cart_item`),
    params: {
        uuid: ""
    },
    body: {
        product_id: "",
        quantity: "",
        product_variant_id: ""
    },
    headers: {},
    bearerToken: ""
});



export const updateInCart = (userId, cartId) => ({
    method: "PUT",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}/update_cart_item`),
    params: {
        uuid: ""
    },
    body: {
        product_id: "",
        quantity: "",
        product_variant_id: ""
    },
    headers: {},
    bearerToken: ""
});

export const removeFromCart = (userId, cartId) => ({
    method: "DELETE",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}/remove_cart_item`),
    params: {
        uuid: "",
        product_id: "",
        product_variant_id: "",
        order_item_id: ""
    },
    body: {},
    headers: {},
    bearerToken: ""
});


export const refreshCart = (userId, cartId) => ({
    method: "GET",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}`),
    params: {
        uuid: ""
    },
    body: {},
    headers: {},
    bearerToken: ""
});


export const deleteCart = (userId, cartId) => ({
    method: "DELETE",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}`),
    params: {
        uuid: ""
    },
    body: {},
    headers: {},
    bearerToken: localStorage.getItem('token') ? localStorage.getItem('token') : ''
});


export const applyCoupon = () => ({
    method: "POST",
    url: getUrl("coupons/apply_coupon"),
    params: {
        uuid: "",
    },
    body: {
        code: "",
        cart_value: "",
        cart_id: ""
    },
    headers: {},
    bearerToken: ""
});

export const removeCoupon = () => ({
    method: "DELETE",
    url: getUrl("coupons/remove_coupon"),
    params: {
        uuid: "",
        cart_id: ""
    },
    body: {},
    headers: {},
    bearerToken: ""
});


export const checkAvailabilityAndBlock = (userId, cartId) => ({
    method: "PUT",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}/check_availability_and_block`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
});

export const addAddressToCart = (userId, cartId) => ({
    method: "PUT",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}/add_address_to_order`),
    params: {},
    body: {
        // "delivery_address_id":8210,
        "billing_same_as_shipping": false,
        "address":
        {
            "name": "shakti",
            "flat_no": "onchfddfeers1@mailinator.com",
            "address": "hello123",
            "address_line_2": "",
            "zip_code": "454545",
            "phone_number": "1111111111",
            "city": "indore",
            "state": "country",
            "country": "india",
            "is_default": false,
            "billing_address": {
                "name": "shakti",
                "flat_no": "onchfddfeers1@mailinator.com",
                "address": "hello1237645765",
                "address_line_2": "",
                "zip_code": "454545",
                "phone_number": "7894561230",
                "city": "indore",
                "state": "country",
                "country": "india",
                "is_default": false
            }
        }
    },
    headers: {},
    bearerToken: ''
});

//used to place order
export const orderTransactions = () => ({
    method: "POST",
    url: getUrl(`order_transactions`),
    params: {},
    body: {
        cart_id: "",
        is_gift: "",
        schedule_time: ""
    },
    headers: {},
    bearerToken: ''
});

//used for hyperpay payments
export const hyperpayDebitCardCheckout = () => ({
    method: "POST",
    url: getUrl(`hyperpay_payments/checkout`),
    params: {},
    body: {
        entityId: "8ac7a4c874672c64017468b0fdcf0756",
        amount: "",
        currency: "SAR",
        paymentType: "DB",
        merchantTransactionId: ""
    },
    headers: {},
    bearerToken: 'OGFjN2E0Yzg3NDY3MmM2NDAxNzQ2OGIwOWFiZjA3NTJ8NkNRQ2M2RkJCdw=='
});


//used for hyperpay payments
export const hyperpayPaymentStatus = () => ({
    method: "GET",
    url: getUrl(`hyperpay_payments/payment_status`),
    params: {
        checkout_id: "",
        entityId: "8ac7a4c874672c64017468b0fdcf0756",
    },
    body: {},
    headers: {},
    bearerToken: 'OGFjN2E0Yzg3NDY3MmM2NDAxNzQ2OGIwOWFiZjA3NTJ8NkNRQ2M2RkJCdw=='
});

//used for hyperpay payments
export const hyperpayOrderConfirm = () => ({
    method: "PUT",
    url: getUrl(`hyperpay_payments/confirm_order`),
    params: {},
    body: {
        cart_id: "",
        checkout_id: ""
    },
    headers: {},
    bearerToken: 'OGFjN2E0Yzg3NDY3MmM2NDAxNzQ2OGIwOWFiZjA3NTJ8NkNRQ2M2RkJCdw=='
});

//use for wishlist listing 
export const getWishlist = (userId) => ({
    method: "GET",
    url: getUrl(`users/${userId}/wishlists`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})

//use for my orders list 
export const getMyOrdersList = (userId) => ({
    method: "GET",
    url: getUrl(`users/${userId}/my_orders`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})

//use for helpcenter data 
export const getHelpCenterData = () => ({
    method: "GET",
    url: getBaseUrl(`static_pages/help_center_details`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})

//use for helpcenter data 
export const getAboutUsData = () => ({
    method: "GET",
    url: getBaseUrl(`static_pages/about-us`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})


export const getQuickSearch = () => ({
    method: "GET",
    url: getUrl(`search`),
    params: {
        uuid: "",
        query: ""
    },
    body: {},
    headers: {},
    bearerToken: ''
})



export const setRecentSearch = () => ({
    method: "GET",
    url: getUrl(`search/fetch_search_records`),
    params: {
        class_name: "Product",
        class_id: "",//product id
        query: ""
    },
    body: {},
    headers: {},
    bearerToken: ''
})

export const getRecentSearch = () => ({
    method: "GET",
    url: getUrl(`search/recent_search`),
    params: {
        query: ""
    },
    body: {},
    headers: {},
    bearerToken: ''
})

//use for get address list
export const getAddressList = (userId) => ({
    method: "GET",
    url: getUrl(`users/${userId}/addresses`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})

//use for update address
export const updateAddress = (userId, addressId) => ({
    method: "PUT",
    url: getUrl(`/users/${userId}/addresses/${addressId}`),
    params: {},
    body: {
        address: {}
    },
    headers: {},
    bearerToken: ''
})

//use for create new address
export const createAddress = (userId) => ({
    method: "POST",
    url: getUrl(`/users/${userId}/addresses`),
    params: {},
    body: {
        uuid: "",
        address: {}
    },
    headers: {},
    bearerToken: ''
})

//use for create new address
export const delAddress = (userId, addressId) => ({
    method: "DELETE",
    url: getUrl(`/users/${userId}/addresses/${addressId}`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})


//use for create new address
export const sendContactMessage = (userId) => ({
    method: "POST",
    url: getUrl(`/users/${userId}/save_contact_us`),
    params: {
        uuid: ""
    },
    body: {
        name: "",
        email: "",
        phone: "",
        title: "",
        description: ""
    },
    headers: {},
    bearerToken: ''
})


export const createReview = (userId) => ({
    method: "POST",
    url: getUrl(`/users/${userId}/reviews`),
    params: {},
    body: {
        order_item_id: "",
        order_id: "",
        rating: "",
        comment: ""
    },
    headers: {},
    bearerToken: ''
})

export const getProductReviews = (userId) => ({
    method: "GET",
    url: getUrl(`/users/${userId}/reviews/get_product_reviews`),
    params: {
        product_id: "",
        per_page: 5,
        page: 1
    },
    body: {},
    headers: {},
    bearerToken: ''
})


export const getVariants = (userId) => ({
    method: "GET",
    url: getUrl(`/users/${userId}/variants`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})


export const updateReview = (userId, reviewId) => ({
    method: "PUT",
    url: getUrl(`/users/${userId}/reviews/${reviewId}`),
    params: {},
    body: {
        rating: "",
        comment: ""
    },
    headers: {},
    bearerToken: ''
})

export const getLogisticDetails = (itemId) => ({
    method: "GET",
    url: getUrl(`shipments/shipment_info?order_id=${itemId}`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})

export const getTrackIdDetails = (userId) => ({
    method: "POST",
    url: getUrl(`users/${userId}/carts/track`),
    params: {},
    body: {
        id: "",
        track: "order_item"
    },
    headers: {},
    bearerToken: ''
})

export const updateProfile = (userId) => ({
    method: "PUT",
    url: getUrl(`/users/${userId}`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})


export const refreshProfile = (userId) => ({
    method: "GET",
    url: getUrl(`/users/${userId}`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})


export const cancelOrderItem = (userId, cartId) => ({
    method: "PUT",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}/cancel_order`),
    params: {},
    body: {
        "item_id[]": ""
    },
    headers: {},
    bearerToken: ''
})


export const getSocialConnects = (userId) => ({
    method: "GET",
    url: getUrl(`users/${(userId || "0")}/social_auths`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})


export const removeSocialConnects = (userId, connectId) => ({
    method: "DELETE",
    url: getUrl(`users/${(userId || "0")}/social_auths/${(connectId || "0")}`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
})


export const connectSocialAccount = (userId) => ({
    method: "POST",
    url: getUrl(`users/${(userId || "0")}/social_auths/connect`),
    params: {},
    body: {
        provider: "", //google/facebook
        uid: undefined,
        fb_uid: undefined,
        display_name: ""
    },
    headers: {},
    bearerToken: ''
})



export const getCartCurrencies = (userId) => ({
    method: "GET",
    url: getUrl(`users/${(userId || "0")}/carts/get_all_currencies`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
});


export const updateCartCurrency = (userId, cartId) => ({
    method: "PUT",
    url: getUrl(`users/${(userId || "0")}/carts/${(cartId || "0")}/update_currency`),
    params: {},
    body: {
        currency: "SAR"
    },
    headers: {},
    bearerToken: ''
});



export const resendEmailConfirmOTP = () => ({
    method: "PUT",
    url: getUrl(`/users/resend_confirmation_token`),
    params: {},
    body: {
        email: ""
    },
    headers: {},
    bearerToken: ''
});

export const getFeedbacks = () => ({
    method: "GET",
    url: getBaseUrl(`static_pages/show_feedback`),
    params: {},
    body: {},
    headers: {},
    bearerToken: ''
});