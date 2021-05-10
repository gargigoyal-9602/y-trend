import React, { useState, useEffect, Fragment } from "react";
//import "./css/index.scoped.css";
import "./css/singleproductdetails.scoped.css";
import _ from "lodash";
import { useMediaQuery } from 'react-responsive'
import {
  Footer,
  HeroBanner,
  ProductCard,
  Header,
  SingleOfferBanner,
  DoubleOfferBanner,
  AppStoreBanner,
  CartQuantityField,
  ProductImageWithSlider,
  ErrorOccuredBlock,
  PageLoadingBlock
} from "../../components";
import { Container, Row, Col, Button } from "reactstrap";
import { FaRegHeart, FaTemperatureLow } from "react-icons/fa";
import { AllModal } from "../../components";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import service, { serviceTypes } from "../../services";
import commands from "../../commands";
import { useHistory, Link } from "react-router-dom";
import CacheState from "../../redux/states/cache";
import parse from "html-react-parser";
import Sticky from 'react-stickynode';
import langg from "../../language";

function ProductInStock(props) {

  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const loginState = useSelector((store) => store.logInReducer);
  console.log("Login state received is ", loginState);

  const [ShowNMModal, setShowNMModal] = useState(false);
  const openNotifyMegModal = () => setShowNMModal(!ShowNMModal);
  const history = useHistory();
  const [sizeChart, setsizeChart] = useState(false);
  const openSizeChartModal = () => setsizeChart(!sizeChart);
  const lang = new langg("productDescriptionScreen");

  async function onBuyNow({ productId, variantId, quantity }) {
    const cartDeleted = await commands.cart.deleteCart();
    if (cartDeleted) {
      const cartCreated = await commands.cart.createCart();
      if (cartCreated) {
        commands.cart.addItem({ productId, variantId, quantity, onSuccess: () => history.push("/cart") });
        return;
      }
    }

    window.notify([{ message: "Error occured", type: "danger" }]);
  }

  return (
    <div className="right-inner-content-wrap">
      {ShowNMModal ? <AllModal modalName="notifyme" onOkay={() => props.subscribe()} /> : ""}
      <AllModal modalName="SizeChart" isOpen={sizeChart} toggle={openSizeChartModal} images={(Array.isArray(props.product?.size_charts) && props.product?.size_charts.length > 0 && props.product.size_charts[0]?.image) ? props.product.size_charts : []} />

      <div className="sp-inner-wrap bg-white radius-10">
        <div className="d-flex align-items-center justify-content-between yt-sp-title-wrapper">
          <h1 className="product-title m-0">{props.product?.name}</h1>
          <div
            className={
              props.product?.is_wishlisted
                ? "added sp-favorite-wrap d-flex align-items-center p-3"
                : "sp-favorite-wrap d-flex align-items-center p-3"
            }
            onClick={props.product.toggleWishlist}
          >
            <FaRegHeart className="sp-fav-icn" />
          </div>
        </div>
        {props.product?.short_description &&
          <div className="sp-description-text text-break">
            {parse(props.product?.short_description || "No Short Description Available")}
          </div>
        }
        <div className="sp-price-wrap d-flex flex-nowrap align-items-center justify-content-between">
          <div className="sp-price-left-content">
            <p className="m-0 sp-small-tag-name">{lang.get("price", "PRICE")}</p>
            {props.product?.on_sale ?
              <ul className="list-style-none p-0 my-2">
                <li className="d-inline-block">
                  <p className="sp-price-tag-value m-0 pr-3 ">SAR {props.product?.sale_price}</p>
                </li>
                <li className="d-inline-block">
                  <p className="sp-price-tag-value m-0 d-inline-block" style={{ color: "#8b8f95" }}><strike>SAR {props.product?.price}</strike></p>
                </li>
              </ul>
              :
              <ul className="list-style-none p-0 my-2 d-flex align-items-center">
                <li>
                  <p className="sp-price-tag-value m-0">SAR {props.product?.price}</p>
                </li>
              </ul>
            }
            {(props.product.stock_qty >= 1 && props.product.current_availability === "in_stock") ?
              <Fragment>
                <div className="d-flex align-items-center">
                  <div className="sp-verify-icn-wrap">
                    <img
                      src={require("./images/verify-icn.png")}
                      alt="verify"
                      className="img-fluid"
                      width="19"
                      height="19"
                    />
                  </div>
                  <p className="m-0 sp-quantity-tag-name">{lang.get("inStock", "In stock online")}</p>
                </div>
                {Array.isArray(props.product?.size_charts) && props.product?.size_charts.length > 0 &&
                  <div className="yt-prdt-size-chart in stock" onClick={openSizeChartModal}>
                    <p className="m-0 mt-2 sp-size-chart-tag-name">{lang.get("sizeChart", "Size Chart")}</p>
                  </div>}
              </Fragment>
              :
              <Fragment>
                <div className="d-flex align-items-center">
                  {!props.product.anyOtherVariantInStock &&
                    <Fragment>
                      <div className="sp-verify-icn-wrap">
                        <img
                          src={require("./images/close-icn.png")}
                          alt="verify"
                          className="img-fluid"
                          width="19"
                          height="19"
                        />
                      </div>
                      <p className="m-0 mr-2 sp-out-quantity-tag-name">{lang.get("soldOut", "Sold Out")}</p>
                    </Fragment>
                  }
                </div>

                {Array.isArray(props.product?.size_charts) && props.product?.size_charts.length > 0 &&
                  <div className="yt-prdt-size-chart in stock" onClick={openSizeChartModal}>
                    <p className="m-0 mt-2 sp-size-chart-tag-name">{lang.get("sizeChart", "Size Chart")}</p>
                  </div>}
              </Fragment>
            }
          </div>
          {(props.product.stock_qty >= 1 && props.product.current_availability === "in_stock") &&
            <div className="sp-price-right-content">
              <div className="d-flex align-items-center justify-content-end">
                <p className="m-0 sp-quantity-tag-name pr-2">{lang.get("quantity", "Quantity")}</p>
                <div className="sp-quantity-box">
                  <CartQuantityField maxQuantity={props.product.stock_qty} CartQuantityVal={props.product.quantity} setCartQuantityVal={props.product.setQuantity} />
                </div>
              </div>
            </div>
          }
        </div>


        {/*props.product.product_attributes?.color?.length > 0 &&
          <div className="sp-price-wrap  sp-border-top-bottom yt-mb-space-border">
            <p className="m-0 sp-small-tag-name">{lang.get("color", "COLOR")}</p>
            <ul className="p-0 mt-3 list-style-none d-flex align-items-center">
              {props.product.product_attributes?.color.map((item, idx) => (
                <li className={idx === 0 ? "" : "mx-2"}>
                  <div
                    className={`${item.active ? "active " : ""} sp-ccolor-box`}
                    style={{ backgroundColor: item.name }}
                    onClick={() => props.product.setActiveAttribute("color", item.name)}
                  />
                </li>
              ))}
            </ul>
          </div>
              */}

              
        {props.product.product_attributes?.color?.length > 0 &&
          <div className="sp-size-wrap pb-0">
            <p className="m-0 sp-small-tag-name">{lang.get("color", "COLOR")}</p>
            <ul
              className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
              id="sp-size-data"
            >
              {props.product.product_attributes?.color.map((item, idx) => (

                <li className={`${idx === 0 ? "ml-md-0" : ""} mx-2 my-2 sp-size-col`}>
                  <div
                    className={`${item.active ? "active" : ""} sp-size-details p-2 text-center`}
                    data-item="XS"
                    onClick={() => props.product.setActiveAttribute("color", item.name)}
                  >
                    {item.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }

        {props.product.product_attributes?.size?.length > 0 &&
          <div className="sp-size-wrap pb-0 sp-other-wrap">
            <p className="m-0 sp-small-tag-name">{lang.get("size", "SIZE")}</p>
            <ul
              className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
              id="sp-size-data"
            >
              {props.product.product_attributes?.size.map((item, idx) => (

                <li className={`${idx === 0 ? "ml-md-0" : ""} mx-2 my-2 sp-size-col`}>
                  <div
                    className={`${item.active ? "active" : ""} sp-size-details p-2 text-center`}
                    data-item="XS"
                    onClick={() => props.product.setActiveAttribute("size", item.name)}
                  >
                    {item.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }


        {Object.keys(props.product.product_attributes || {}).map((key) => (

          !["color", "size"].includes(_.lowerCase(key)) && (props.product.product_attributes[key]?.length > 0) &&
          <div className="sp-size-wrap pb-0 sp-other-wrap">
            <p className="m-0 sp-small-tag-name">{_.upperCase(key)}</p>
            <ul
              className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
              id="sp-size-data"
            >
              {props.product.product_attributes[key].map((item, idx) => (

                <li className={`${idx === 0 ? "ml-md-0" : ""} mx-2 my-2 sp-size-col`}>
                  <div
                    className={`${item.active ? "active" : ""} sp-size-details p-2 text-center`}
                    data-item="XS"
                    onClick={() => props.product.setActiveAttribute(key, item.name)}
                  >
                    {item.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>

        ))}
      </div>

      {(props.product.stock_qty >= 1 && props.product.current_availability === "in_stock") ?
        <div className="d-flex align-items-center justify-content-center justify-content-md-end ">
          <ul className="p-0  mb-0 list-style-none d-flex align-items-center sp-product-add-action-wrap">

            {props.product.is_in_cart === true ?
              <Fragment>
                <li className="mx-2">
                  {/*
                  <button type="button" className="btn btn-light sp-addto-cart-btn py-3" onClick={() => commands.cart.removeItem({ productId: props.product.id, variantId: props.product.variant_id || "" })}>
                    Remove
                </button>*/}
                  <button type="button" className="btn btn-light sp-addto-cart-btn py-3" onClick={() => history.push("/cart")}>
                    {lang.get("gotoCart", "Go to Cart")}
                  </button>
                </li>
                <li className="mx-2">
                  <button type="button" className="btn btn-light sp-buy-now-btn py-3" onClick={() => onBuyNow({ productId: props.product.id, variantId: props.product.variant_id || "", quantity: props.product.quantity })}>
                    {lang.get("buyNow", "Buy Now")}
                  </button>
                </li>
              </Fragment>
              :
              <Fragment>
                <li className="mx-2">
                  <button type="button" className="btn btn-light sp-addto-cart-btn py-3" onClick={() => commands.cart.addItem({ productId: props.product.id, variantId: props.product.variant_id || "", quantity: props.product.quantity })}>
                    {lang.get("addToCart", "Add to Cart")}
                  </button>
                </li>
                <li className="mx-2">
                  <button type="button" className="btn btn-light sp-buy-now-btn py-3" onClick={() => onBuyNow({ productId: props.product.id, variantId: props.product.variant_id || "", quantity: props.product.quantity })}>
                    {lang.get("buyNow", "Buy Now")}
                  </button>
                </li>
              </Fragment>
            }
          </ul>
        </div>
        :
        <div className="d-flex align-items-center justify-content-center justify-content-md-end ">
          <ul className="p-0 list-style-none d-flex align-items-center sp-product-add-action-wrap">
            <li className="mx-2">
              {/*lang.direction === "rtl" ?
                <p className="product-stock-message mb-0">
                  {props.product.is_notify_product && !props.product.variantNotAvailable && lang.get("youWillGetNotified", "You will get notified once the product is back in stock.")} {props.product.anyOtherVariantInStock && props.product.variantNotAvailable ? lang.get("combinationNotAvailable", "This combination is not available. Please select from the available variants.") : lang.get("itemOutOfStock", "The Item is currently out of stock.")}
                </p>
                :
                <p className="product-stock-message mb-0">
                  {props.product.anyOtherVariantInStock && props.product.variantNotAvailable ? lang.get("combinationNotAvailable", "This combination is not available. Please select from the available variants.") : lang.get("itemOutOfStock", "The Item is currently out of stock.")} {props.product.is_notify_product && !props.product.variantNotAvailable  && lang.get("youWillGetNotified", "You will get notified once the product is back in stock.")}
                </p>
              */}
              {props.product.anyOtherVariantAvailable ?
                <p className="product-stock-message mb-0">
                  {(!props.product.variantAvailable) ? lang.get("combinationNotAvailable", "This combination is not available. Please select from the available variants.") : lang.get("itemOutOfStock", "The Item is currently out of stock.")} {props.product.is_notify_product && props.product.variantAvailable && lang.get("youWillGetNotified", "You will get notified once the product is back in stock.")}
                </p>
                :
                <p className="product-stock-message mb-0">
                  {lang.get("itemOutOfStock", "The Item is currently out of stock.")} {props.product.is_notify_product && lang.get("youWillGetNotified", "You will get notified once the product is back in stock.")}
                </p>
              }
            </li>
            {!props.product.is_notify_product && (props.product.variantAvailable || !props.product.anyOtherVariantAvailable) &&
              <li className="mx-2">
                <button
                  type="button"
                  className="btn btn-light sp-buy-now-btn py-3"
                  onClick={() => { openNotifyMegModal(); }}
                >
                  {lang.get("notifyMe", "Notify Me")}
                </button>
              </li>
            }
          </ul>
        </div>
      }
    </div >
  );
}
function ProductOutStock(props) {
  const [toggle, setToggle] = useState(false);
  const sizeToggle = (value) => {
    let prevclass = value.target.className;
    // let size = value.target.innerHTML;
    let elm = document.getElementsByClassName("sp-size-details");
    if (elm) {
      for (let index = 0; index < elm.length; index++) {
        elm[index].classList.remove("active");
      }
    }
    value.target.className = "active " + prevclass;
  };
  const colorToggle = (value) => {
    let prevclass = value.target.className;
    let elm = document.getElementsByClassName("sp-ccolor-box");
    if (elm) {
      for (let index = 0; index < elm.length; index++) {
        elm[index].classList.remove("active");
      }
    }
    value.target.className = "active " + prevclass;
  };
  const SP_Favourute = () => {
    setToggle(!toggle);
  };
  const [ShowNMModal, setShowNMModal] = useState(false);
  const openNotifyMegModal = () => setShowNMModal(!ShowNMModal);
  return (
    <div className="right-inner-content-wrap">
      {ShowNMModal ? <AllModal modalName="notifyme" /> : ""}
      <div className="sp-inner-wrap bg-white radius-10 ">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="product-title m-0">
            Beautiful Embroidered Yoke Brown Abaya
          </h1>
          <div
            className={
              toggle
                ? "added sp-favorite-wrap d-flex align-items-center p-3"
                : "sp-favorite-wrap d-flex align-items-center p-3"
            }
            onClick={() => SP_Favourute()}
          >
            <FaRegHeart className="sp-fav-icn" />
          </div>
        </div>
        <div className="sp-price-wrap d-flex flex-nowrap align-items-center justify-content-between">
          <div className="sp-price-left-content">
            <p className="m-0 sp-small-tag-name">PRICE</p>
            <ul className="list-style-none p-0 my-2 d-flex align-items-center">
              <li>
                <p className="sp-price-tag-value m-0">SAR 120</p>
              </li>
              <li>
                <div className="d-flex align-items-center pl-3">
                  <div className="sp-verify-icn-wrap">
                    <img
                      src={require("./images/close-icn.png")}
                      alt="verify"
                      className="img-fluid"
                      width="19"
                      height="19"
                    />
                  </div>
                  <p className="m-0 sp-out-quantity-tag-name">Sold Out</p>
                  <div className="yt-prdt-size-chart yt-out" onClick={openSizeChartModal}>
                    <p className="sp-out-quantity-tag-name">Size Chart</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="sp-price-wrap sp-border-top-bottom">
          <p className="m-0 sp-small-tag-name">COLOR</p>
          <ul className="p-0 mt-3 mb-0 list-style-none d-flex align-items-center">
            <li>
              <div
                className="active sp-color-1 sp-ccolor-box"
                data-item="color1"
                onClick={(e) => colorToggle(e)}
              />
            </li>
            <li className="mx-2">
              <div
                className="sp-color-2 sp-ccolor-box"
                data-item="color2"
                onClick={(e) => colorToggle(e)}
              />
            </li>
            <li className="mx-2">
              <div
                className="sp-color-3 sp-ccolor-box"
                data-item="color3"
                onClick={(e) => colorToggle(e)}
              />
            </li>
            <li className="mx-2">
              <div
                className="sp-color-4 sp-ccolor-box"
                data-item="color4"
                onClick={(e) => colorToggle(e)}
              />
            </li>
            <li>
              <div
                className="sp-color-5 sp-ccolor-box"
                data-item="color5"
                onClick={(e) => colorToggle(e)}
              />
            </li>
          </ul>
        </div>
        <div className="sp-size-wrap pb-0">
          <p className="m-0 sp-small-tag-name">SIZE</p>
          <ul
            className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
            id="sp-size-data"
          >
            {props.product.product_attributes?.size.map((item, idx) => (

              <li className={`${idx === 0 ? "ml-md-0" : ""} mx-2 my-2 sp-size-col`}>
                <div
                  className={`${item.active ? "active" : ""} sp-size-details p-2 text-center`}
                  data-item="XS"
                  onClick={() => props.setActiveSize(idx)}
                >
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center justify-content-md-end ">
        <ul className="p-0 list-style-none d-flex align-items-center sp-product-add-action-wrap">
          <li className="mx-2">
            <p className="product-stock-message mb-0">
              The Item is currently out of stock
            </p>
          </li>
          <li className="mx-2">
            <button
              type="button"
              className="btn btn-light sp-buy-now-btn py-3"
              onClick={openNotifyMegModal}
            >
              Notify Me
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
function ProductDetails(props) {
  //console.log(props);
  const [ProductDesc, setProductDesc] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const forceUpdate = () => setRefresh(!refresh);
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [activeAttributes, setActiveAttributes] = useState({});

  const setActiveAttribute = (key, value) => {
    var aa = activeAttributes;
    aa = { ...aa, [key]: value };
    setActiveAttributes(aa);
  };

  const [whishlisted, setWhishlisted] = useState(false);
  const [notify, setNotify] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState("null");
  const [product, setProduct] = useState(undefined);
  const [productReviews, setProductReviews] = useState(undefined);
  const [reviewData, setReviewData] = useState({});
  const [errorData, setErrorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolledToTop, setScrolledToTop] = useState(false);
  const [showReviewStars, setShowReviewStars] = useState(false);
  const dispatch = useDispatch();
  const loginData = useSelector((store) => store.logInReducer.loginData);
  const token = loginData?.token?.access_token;
  const user = useSelector((store) => store.logInReducer.user || {});
  const cartState = useSelector((store) => store.cartReducer || {});;
  const cacheState = CacheState.get();
  const [similarProducts, setSimilarProducts] = useState([]);
  const lang = new langg("productDescriptionScreen");
  const enableSticky = !useMediaQuery({ query: '(max-width: 768px)' });
  console.log("value of sticky ", enableSticky);
  useEffect(() => {
    if (!scrolledToTop) {
      const body = document.querySelector('#root');
      body.scrollIntoView({
        behavior: 'smooth'
      }, 500)
    }
    setScrolledToTop(false);

  }, []);

  useEffect(() => {
    setShowReviewStars(false);
    setTimeout(() => setShowReviewStars(true), 200);
  }, [product?.total_review]);

  /*
  if (currentImage === "null" && product !== undefined) {
    if (product.images.length) {
      setCurrentImage(product.images[0].image);
    }
  }
  */

  function toggleWishlist() {
    if (!whishlisted) {
      addToWishlist();
    } else {
      removeFromWishlist();
    }
    setWhishlisted(!whishlisted)
  }

  useEffect(() => {
    getProductDetails();
    getProductReviews();
  }, [props.match?.params?.productId]);

  function getProductDetails() {

    console.log("Fetching Product Data");
    const serviceType = serviceTypes.getProductDetails(props.match?.params?.productId);
    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          //window.notify([{ message: error.message }]);
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
              onButtonPress: () => { setLoading(true); setErrorData(null); setProduct(undefined); getProductDetails(); }
            });
          }
        } else if (response) {
          if (response.data.success === true && typeof response.data.data.product === "object") {

            setProduct(_.omitBy(response.data.data.product, _.isNil));
            setSimilarProducts(response?.data?.data?.similar_products);
            var reviewData = response?.data?.data?.logged_in_user_reviews || [];
            var orderItemId = response?.data?.data?.order_item_id;
            var orderId = response?.data?.data?.order_id;

            //for update oldest review function.
            //var reviewId = (Array.isArray(reviewData) && reviewData.length > 0) ? reviewData[reviewData.length - 1].id : undefined;
            if (orderItemId && orderId) {
              var canReview = response?.data?.data?.can_review && !(Array.isArray(reviewData) && reviewData.find((item) => item.order_id === orderId));
              setReviewData({ orderItemId/*, orderId, reviewId*/, canReview });
            }
            setErrorData(null)
          } else {
            setErrorData({
              title: "Oh Noes!, Error Occured",
              message: "Unknown response received from server.",
              buttonText: "Retry",
              onButtonPress: () => { setLoading(true); setErrorData(null); setProduct(undefined); getProductDetails(); }
            });
          }
        }
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }


  function getProductReviews() {

    if (productReviews?.meta?.pagination?.next_page || !productReviews) {

      commands.products.getReviews({ productId: props.match?.params?.productId, perPage: productReviews?.meta?.pagination?.total_count * 2 || 5 })
        .then((val) => {
          if (val) {
            setProductReviews(val);
          } else {
            setProductReviews(undefined);
          }
        });
    }

  }

  useEffect(() => {
    if (product === undefined) {
      getProductDetails();
    } else {
      try {
        console.log("Product list available in state ", product);
        setWhishlisted(product?.is_wishlisted);
        setNotify(product?.is_notify_product);
      } catch (err) {
        window.notify([{ message: "Error in Processing Data", type: "danger" }]);
      }
    }

  }, [product]);

  useEffect(() => {
    getProductDetails();
  }, [cartState.cart]);

  function subscribeForProductNotification() {
    console.log("Subscribing to product notificaitons");
    const serviceType = serviceTypes.subscribeForProductNotification(product.id);

    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          //window.notify([{ message: error.message, type: "danger" }]);
          setNotify(!notify);
        } else if (response?.data?.success) {
          //window.notify([{ message: "Subscribed for notifications successfully", type: "success" }]);
          getProductDetails();
        }
      });
  }

  function addToWishlist() {
    console.log("Adding to wishlist");
    const serviceType = serviceTypes.addToWishlist(user?.id);
    serviceType.body.product_id = product.id;

    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          window.notify([{ message: error.message, type: "danger" }]);
          setWhishlisted(false);
        } else if (response?.data?.success) {
          window.notify([{ message: "Product added to wishlist successfully", type: "success" }]);
          getProductDetails();
        }
      }).finally(commands.user.refreshProfile);
  }

  function removeFromWishlist() {
    console.log("Removing from wishlist");
    const serviceType = serviceTypes.removeFromWishlist(user?.id);
    serviceType.params.product_id = product.id;
    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          window.notify([{ message: error.message, type: "danger" }]);
          setWhishlisted(false);
        } else if (response?.data?.success) {
          window.notify([{ message: "Product removed from wishlist successfully", type: "danger" }]);
          getProductDetails();
        }
      }).finally(commands.user.refreshProfile);
  }


  const qparams = new URLSearchParams(window.location.search);

  const [ShowPRModal, setShowPRModal] = useState(!!qparams.get("review"));
  const openProductRatingModal = () => setShowPRModal(!ShowPRModal);
  const styles = {
    item: {
      margin: "0 10px",
    },
  };
  const items = [
    "apple",
    "grape",
    "banana",
    "melon",
    "kiwi",
    "peach",
    "mango",
    "tomato",
    "pineapple",
    "blueberry",
    "avocado",
  ];
  const secondExample = {
    size: 20,
    count: 5,
    color: "#DBDBDB",
    activeColor: "#D4C96D",
    value: parseFloat(product?.average_rating)?.toFixed(1) || 0,
    a11y: true,
    isHalf: true,
    emptyIcon: <BsStarFill className="m-1" />,
    halfIcon: <BsStarHalf className="m-1" />,
    filledIcon: <BsStarFill className="m-1" />,
  };
  const ProductDscClick = () => {
    setProductDesc(!ProductDesc);
  }

  function getCurrentProduct() {
    if (!product) return product;
    var clone = _.cloneDeep(product);

    var variantIndex = undefined;


    if (Object.keys(clone.product_attributes || {}).find((item) => !(item in activeAttributes))) {
      clone.product_variants.forEach((vitem, vidx) => {
        if (vitem.is_master) {
          var initialAttributes = {};
          vitem.product_variant_properties.forEach((item, idx) => {
            initialAttributes[item.variant_name] = item.property_name;
          });
          setActiveAttributes(initialAttributes);
        }
      });
    } else {
      //searching for variants
      clone.product_variants.forEach((vitem, vidx) => {


        /*
        var variantColor = undefined;
        var variantSize = undefined;
        vitem.product_variant_properties.forEach((item, idx) => {
          if (item.variant_name === "color") {
            variantColor = item.property_name;
          }
          if (item.variant_name === "size") {
            variantSize = item.property_name;
          }
        });*/
        var found = true;
        vitem.product_variant_properties.forEach((item, idx) => {
          /*
          if (item.variant_name === "size") {
            variantSize = item.property_name;
          }*/

          if (!(item.variant_name in activeAttributes && item.property_name === activeAttributes[item.variant_name])) {
            found = false;
          }

        });

        if (found) {
          variantIndex = vidx;
        }
      });
    }

    variantIndex === undefined && ((clone?.stock_qty || 0) - (clone?.block_qty || 0));

    if (variantIndex !== undefined) {
      clone = { ...clone, ...(clone.product_variants[variantIndex]) }
      //clone.images = [{ image: clone.image }, ...clone.images];
      clone.price = clone.actual_price;
      clone.variant_id = clone.id;
      clone.id = product.id
      clone.variantAvailable = true;
      clone.stock_qty = clone.available_quantity;
    } else if (Array.isArray(clone.product_variants) && clone.product_variants.length > 0) {
      clone.current_availability = null;
    }

    if (Array.isArray(clone.product_variants) && clone.product_variants.length > 0) {

      clone.product_variants.forEach((item, idx) => {
        if (item.current_availability === "in_stock") {
          clone.anyOtherVariantInStock = true;
        }
      });
      clone.anyOtherVariantAvailable = true;
    }

    if (clone.product_attributes) {
      Object.keys(clone.product_attributes).forEach((key) => {
        clone.product_attributes[key].forEach((item) => item.active = (item.name === activeAttributes[key]) ? true : false);
      });
    }
    clone.is_wishlisted = whishlisted;
    clone.is_notify_product = notify;
    clone.quantity = quantity;
    clone.setActiveColor = setActiveColor;
    clone.setActiveSize = setActiveSize;
    clone.setActiveAttribute = setActiveAttribute;
    clone.toggleWishlist = toggleWishlist;
    clone.setQuantity = setQuantity;

    if (product !== undefined && (currentImage === "null" || clone.images.filter((item, idx) => item.image === currentImage).length < 1)) {
      if (clone?.images.length > 0) {
        if (currentImage !== clone.images[0].image) {
          setCurrentImage(clone.images[0].image);
        }
      }
      else if (product?.images.length > 0) {
        if (currentImage !== product.images[0].image) {
          setCurrentImage(product.images[0].image);
        }
      }
    }

    return clone;
  }

  const currentProduct = getCurrentProduct();

  const canReview = reviewData.canReview;

  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      {product ?
        <Container>
          <AllModal modalName="Productrate" reviewData={reviewData} isOpen={ShowPRModal} toggle={() => setShowPRModal(!ShowPRModal)} onSuccess={() => { props.history.replace("/shop/" + props.match?.params?.productId); getProductDetails(); }} />
          <div className="pageroute sp-breadcrumbs mt-3">
            <Link to="/">
              <span class="sp-mid w3-hover-opacity" style={{ cursor: "default" }}>Home</span>
            </Link>
            {" > "}
            <Link to="/shop">
              <span class="sp-mid w3-hover-opacity" style={{ cursor: "default" }}>Shop</span>
            </Link>
            {" > "}
            <span className="currpage sp-current">{currentProduct?.name}</span>
          </div>

          <Row className="yt-cm-row">
            <Col xs={12} sm={6} lg={6} className="yt-cm-lt-col">
              <ProductImageWithSlider images={currentProduct.images} currentImage={currentImage} setCurrentImage={setCurrentImage} />


              {!enableSticky &&
                <ProductInStock product={currentProduct} subscribe={subscribeForProductNotification} />
              }
              <div className="yt-lt-inner-bottom-content">
                {product?.description &&
                  <div className="sp-inner-content-wrap bg-white radius-10">
                    <div className={
                      ProductDesc ? 'sp-description-wrap' : "sp-description-wrap active-desc"
                    }>
                      <h2 className="sp-description-title mt-0">{lang.get("description", "Description")}</h2>
                      <p className="sp-description-text text-break">
                        {parse(product?.description || "No Description Available")}
                      </p>
                      <Button color="link yt-read-more-des p-0 d-none" onClick={ProductDscClick}>{lang.get("readMore", "Read More")}</Button>
                    </div>
                  </div>
                }

                {product.total_review > 0 &&
                  <div className="sp-inner-content-wrap bg-white radius-10">
                    <div className="sp-rating-wrap pb-4">
                      <h2 className="sp-description-title mt-0">{lang.get("productRatingSmall", "Product Rating")}</h2>
                      <Row className="align-items-center yt-rating-row">
                        <Col xs={12} sm={12} md={6} lg={12} xl={8} className="yt-rating-col">
                          <div className="d-flex flex-wrap align-items-center justify-content-between sp-border-md-right yt-rating-inner-row" style={canReview ? {} : { border: "unset" }}>
                            <div className="sp-rating-inner-wrap">
                              <div className="d-flex flex-wrap">
                                <div className="d-flex sp-rating-inner">
                                  <div className="sp-rating-content">
                                    <span className="sp-rating-value">{parseFloat(product?.average_rating)?.toFixed(1) || 0}</span> / 5
                                </div>
                                </div>
                              </div>
                              <div className="yt-rating-val-wrapper">
                                {showReviewStars &&
                                  <ReactStars {...secondExample} classNames="yt-rating-single-prdt" />
                                }
                              </div>
                              {lang.direction === "rtl" ?
                                <span className="yt-based-on">{lang.get("ratings", "Ratings")} {product.total_review} {lang.get("basedOn", "Based on")}</span>
                                :
                                <span className="yt-based-on">{lang.get("basedOn", "Based on")} {product.total_review} {lang.get("ratings", "Ratings")}</span>
                              }
                            </div>
                            <div className="sp-rating-inner-wrap">
                              <ul className="list-style-none p-0 my-3 sp-rating-view">
                                <li>
                                  <div className="d-flex align-items-center star-5 justify-content-between">
                                    <span>5</span>
                                    <span>
                                      <img
                                        src={require("./images/star.png")}
                                        alt="search"
                                        className="star"
                                      />
                                    </span>
                                    <span className="sp-rating-area sp-width-80" />
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex align-items-center star-5 justify-content-between">
                                    <span>4</span>
                                    <span>
                                      <img
                                        src={require("./images/star.png")}
                                        alt="search"
                                        className="star"
                                      />
                                    </span>
                                    <span className="sp-rating-area sp-width-60" />
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex align-items-center star-5 justify-content-between">
                                    <span>3</span>
                                    <span>
                                      <img
                                        src={require("./images/star.png")}
                                        alt="search"
                                        className="star"
                                      />
                                    </span>
                                    <span className="sp-rating-area sp-width-40" />
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex align-items-center star-5 justify-content-between">
                                    <span>2</span>
                                    <span>
                                      <img
                                        src={require("./images/star.png")}
                                        alt="search"
                                        className="star"
                                      />
                                    </span>
                                    <span className="sp-rating-area sp-width-20" />
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex align-items-center star-5 justify-content-between">
                                    <span>1</span>
                                    <span>
                                      <img
                                        src={require("./images/star.png")}
                                        alt="search"
                                        className="star"
                                      />
                                    </span>
                                    <span className="sp-rating-area sp-width-10" />
                                  </div>
                                </li>
                              </ul>
                            </div>
                            {/* <div className="yt-rating-val-wrapper">
                            <ReactStars
                              {...secondExample}
                              classNames="yt-rating-single-prdt"
                            />
                          </div> */}
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={12} xl={4} className="yt-rating-col">
                          <div className={"sp-inner-write-review" + (canReview ? "" : " d-none")}>
                            <h2 className="sp-description-title mt-0 m-0">
                              {lang.get("productRatingSmall", "Product Rating")}
                            </h2>
                            <ul className="list-style-none p-0 my-3 d-flex align-items-center">
                              {_.times(5, () => (<li className="mr-1">
                                <img
                                  src={require("./images/star.png")}
                                  alt="search"
                                  className="img-fluid"
                                />
                              </li>)
                              )}
                            </ul>
                            <button
                              type="button"
                              className="btn btn-light sp-give-review-btn py-3"
                              data-v-b6eeb6e1=""
                              onClick={openProductRatingModal}
                            >
                              {/*reviewData.reviewId ? "Update Review" : "Write Review"*/}
                              {lang.get("writeReview", "Write Review")}
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="sp-rating-wrap pt-4 border-top-grey">
                      {productReviews?.review.map((item, idx) => (
                        <div key="idx" className="d-flex align-aitems-center justify-content-between py-3 yt-sp-user-rate-box">
                          <div className="d-flex align-aitems-center">
                            <div className="sp-user-img py-1">
                              <div style={{ display: "inline-block", border: "1px solid silver", borderRadius: "50%", width: 40, height: 40, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                <img
                                  src={item.user.profile_picture || require("./images/user-alt-512.png")}
                                  alt="user"
                                  className="img-fluid"
                                  style={{ objectFit: "fill" }}
                                />
                              </div>
                            </div>
                            <div className="sp-user-info pl-3">
                              <h4 className="sp-user-name mt-0 mb-2">{item?.user?.name || "Anonymous"}</h4>
                              <div className="yt-tab-mob">
                                <ul className="list-style-none p-0 mb-2 d-flex align-items-center">
                                  {_.times(item.rating || 1, (idx) => (
                                    <li className={idx == 0 ? "" : "ml-1"}>
                                      <img
                                        src={require("./images/starfilled.png")}
                                        alt="search"
                                        className="img-fluid"
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p className="sp-usermessage m-0 text-break">
                                {item.comment}
                              </p>
                            </div>
                          </div>
                          <div className="sp-user-rated-meta text-right">
                            <ul className="list-style-none p-0 mb-2 d-flex align-items-center justify-content-end">
                              {_.times(item.rating || 1, (idx) => (
                                <li className={idx == 0 ? "" : "ml-1"}>
                                  <img
                                    src={require("./images/starfilled.png")}
                                    alt="search"
                                    className="img-fluid"
                                  />
                                </li>
                              ))}
                            </ul>
                            <div className="sp-rating-date text-nowrap">{item.review_date}</div>
                          </div>
                        </div>
                      ))}
                      {productReviews?.meta?.pagination?.next_page &&
                        <div>
                          <Button color="link yt-read-more-des p-0 w3-right" onClick={() => getProductReviews()}>{lang.get("readMore", "Read More")}</Button>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>


            </Col>
            <Col xs={12} sm={6} lg={6} className="yt-cm-rt-col">
              {enableSticky &&
                <div className="h-100" id="sticky-container" >
                  <Sticky bottomBoundary='#sticky-container'>
                    {props => (
                      <div style={props.style}>
                        <ProductInStock product={currentProduct} subscribe={subscribeForProductNotification} />
                      </div>
                    )}
                  </Sticky>
                </div>
              }
            </Col>
          </Row>
        </Container>
        :
        <Fragment>
          {!loading && <ErrorOccuredBlock title={errorData?.title || "Oh Noes!, Error Occured"} message={errorData?.message || "Unknown Error Occured."} buttonText={errorData?.buttonText || "Go to Home"} onButtonPress={(errorData?.onButtonPress) || (() => props.history.push("/"))} />}
          {loading && <PageLoadingBlock title={"Please wait..."} message={"The product you are looking for is loading!"} buttonText={"Go to Home"} onButtonPress={() => props.history.push("/")} />}
        </Fragment>
      }

      {/*Today’s Deals Product */}
      <ProductCard products={[...similarProducts/*,...cacheState.homepage?.recommended_products*/]} name={lang.get("similarProduct", "Similar Product")} onViewMore={() => props.history.push(`/shop?page=1&per_page=15&category_id[]=${product?.sub_category?.category_id}&sub_category_id[]=${product?.sub_category?.id}`)} />
      {/*Today’s Deals Product */}


      {/*Featured Product */}
      <ProductCard products={cacheState.homepage?.latest_products} name={lang.get("newProducts", "New Products")} onViewMore={() => props.history.push("/shop?&order_field=latest&page=1&per_page=15")} />
      {/*Featured Product End*/}
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

export default ProductDetails;
