import React, { useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
import {
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  ProductCard,
  DoubleOfferBanner,
  SingleOfferBanner,
  ThreePromo,
  ProfileComponent,
  ErrorOccuredBlock,
  PageLoadingBlock
} from "../../components";
import { Container, Row, Col, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import "./css/index.scoped.css";
import { FaLongArrowAltLeft, FaCamera } from "react-icons/fa";
import service, { serviceTypes } from "../../services";
import AuthState from "../../redux/states/auth";
import CacheState from "../../redux/states/cache";

function ProfilePage(props) {
  const authState = AuthState.get();
  const cacheState = CacheState.get();
  const [wishlist, setWishlist] = useState(undefined);
  const [errorData, setErrorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [helpCenterData, setHelpCenterData] = useState(undefined);

  useEffect(() => {
    if (authState.user.is_guest) {
      props.history.push("/login");
    }
    getWishlistProducts();
    getMyOrders();
  }, [])

  function getWishlistProducts() {
    const serviceType = serviceTypes.getWishlist(authState.user.id);
    service(serviceType)
      .then(({ response, error }) => {
        console.log("Wish list response ", response);
        console.log("WIsh list error", error);
        if (error) {
          window.notify([{ message: error.message }]);
          if (error.status === 404) {
            setErrorData({
              title: "Oh Noes!, 404 Not Found",
              message: "The product you are looking for is not available!",
              buttonText: "Go to Home",
              onButtonPress: () => props.history.push("/")
            });
          } else {
            setErrorData({
              title: "Oh Noes!, Error Occured",
              message: error.message,
              buttonText: "Retry",
              onButtonPress: () => { setLoading(true); setErrorData(null); setWishlist(undefined); getWishlistProducts(); }
            });
          }
        } else if (response) {
          if (typeof response.data === "object") {
            console.log("Wish list", response.data.data);
            setWishlist(response.data.data)
            setErrorData(null)
          } else {
            setErrorData({
              title: "Oh Noes!, Error Occured",
              message: "Unknown response received from server.",
              buttonText: "Retry",
              onButtonPress: () => { setLoading(true); setErrorData(null); setWishlist(undefined); getWishlistProducts(); }
            });
          }
        }
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }

  function getMyOrders() {
    const serviceType = serviceTypes.getMyOrdersList(authState.user.id);
    service(serviceType)
      .then(({ response, error }) => {
        console.log("get orders called ");
        if (error) {
          window.notify([{ message: error.message }]);
          if (error.status === 404) {
            setErrorData({
              title: "Oh Noes!, 404 Not Found",
              message: "The product you are looking for is not available!",
              buttonText: "Go to Home",
              onButtonPress: () => props.history.push("/")
            });
          } else {
            setErrorData({
              title: "Oh Noes!, Error Occured",
              message: error.message,
              buttonText: "Retry",
              onButtonPress: () => { setLoading(true); setErrorData(null); setOrders(undefined); getMyOrders(); }
            });
          }
        } else if (response) {
          if (typeof response.data.data === "object") {
            console.log("Order List", response.data.data);
            console.log(" list order ");
            setOrders(response?.data?.data?.order);
            setErrorData(null);
          } else {
            setErrorData({
              title: "Oh Noes!, Error Occured",
              message: "Unknown response received from server.",
              buttonText: "Retry",
              onButtonPress: () => { setLoading(true); setErrorData(null); setOrders(undefined); getMyOrders(); }
            });
          }
        }
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }

  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}

      { wishlist ?
        <ProfileComponent onProps={props} wishlist={wishlist} order={orders} getWishlist={getWishlistProducts} getOrders={getMyOrders}/> : <Fragment>
          {!loading && <ErrorOccuredBlock title={errorData?.title || "Oh Noes!, Error Occured"} message={errorData?.message || "Unknown Error Occured."} buttonText={errorData?.buttonText || "Go to Home"} onButtonPress={(errorData?.onButtonPress) || (() => props.history.push("/"))} />}
          {loading && <PageLoadingBlock title={"Please wait..."} message={"Your Profile is loading!"} buttonText={"Go to Home"} onButtonPress={() => props.history.push("/")} />}
        </Fragment>
      }
      

      {/* Singel Offer Banner */}
      <SingleOfferBanner />
      {/* Singel Offer End */}

      {/* Double Offer */}
      <section className="my-4">
        <DoubleOfferBanner />
      </section>
      {/* Double Offer End */}

      {/* App Store Banner */}
      <AppStoreBanner />
      {/* App Store Banner End*/}
      <Footer />
    </div>
  );
}
export default ProfilePage;
