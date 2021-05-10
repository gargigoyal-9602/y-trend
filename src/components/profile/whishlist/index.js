import React, { useRef, useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col, Button } from "reactstrap";
import { FaHeart } from "react-icons/fa";
import { AllModal } from "../../../components";
import NoWishlist from "./no-wishlist";
import commands from "../../../commands";
import { useHistory } from "react-router-dom";
import service, { serviceTypes } from "../../../services"
import AuthState from "../../../redux/states/auth";
import { FavouriteProductSet } from "../../index";
import langg from "../../../language";

function WhishListProductComponent({ products, ...props }) {
  const productList = products;
  const [ShowWLModal, setShowWLModal] = useState(false);
  const openRemoveWhishListModal = () => setShowWLModal(!ShowWLModal);
  const history = useHistory();
  const state = AuthState.get();
  const lang = new langg("common");

  function addToWishlist(product) {
    console.log("Adding to wishlist");
    const serviceType = serviceTypes.addToWishlist(state.user?.id);
    serviceType.body.product_id = product.id;

    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          window.notify([{ message: error.message }]);
        } else if (response?.data?.success) {
          window.notify([{ message: "Product added to wishlist successfully", type: "success" }]);
          props.getWishlist();
        }
      }).finally(commands.user.refreshProfile);
  }

  function removeFromWishlist(product) {
    console.log("Removing from wishlist");
    const serviceType = serviceTypes.removeFromWishlist(state.user?.id);
    serviceType.params.product_id = product.id;
    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          window.notify([{ message: error.message }]);
        } else if (response?.data?.success) {
          window.notify([{ message: "Product removed from wishlist successfully", type: "danger" }]);
          props.getWishlist();
        }
      }).finally(commands.user.refreshProfile);
  }


  console.log("Wish list", productList);
  return (
    <div className="profile-pg-whish-lt-inner-wrap profile-pg-inner-wrap bg-white radius-10 profile-pg-mb-30 profile-p-30">
      <div className="profile-pg-inner-wrapper">
        <div className="profile-tab-content">
          <div class="profile-pg-wl-allproduct-main-wrap">
            {ShowWLModal ? <AllModal modalName="removewhishlist" /> : ""}
            <Row className="profile-pg-wl-cm-row-margin">

              {productList.map((product, index) => {
                if (!(Array.isArray(product.product_variants) && product.product_variants.length > 0)) {
                  return (
                    <Col md={6} lg={4} className="px-2 col-xxl-4 yt-cm-wl-col">
                      <div class="product profile-pg-wl-sgl-product-cpnt text-center mb-4">
                        <div class="d-flex justify-content-between align-items-center mt-3">
                          {product.on_sale && false ? (<div class="profile-yt-sgl-product-off text-center p-1">Sale</div>) : <div className="text-center p-1" />}
                          <div class="text-right pr-2">
                            <FavouriteProductSet onDataId={index} onPageType="shop" isFav={product.is_wishlisted} onClick={() => product.is_wishlisted ? removeFromWishlist(product) : addToWishlist(product)} />
                          </div>
                        </div>
                        <div onClick={() => history.push("/shop/" + product.id)} className="w3-ripple" style={{ cursor: "pointer" }}>
                          <img
                            src={product.images[0].image}
                            class="yt-product-bg-image img-fluid"
                            alt="ytrend"
                          />
                          <div class="mt-3 profile-pg-wl-sgl-product-title text-center">
                            {product.name}
                          </div>
                          <div className="price profile-pg-wl-sgl-price-wrap text-center ">
                            {product.on_sale && (<><span className="price1 profile-pg-wl-sgl-product-sale-price">
                              SAR {product.sale_price}
                            </span>
                              <span className="price2 profile-pg-wl-sgl-product-reg-price2">
                                SAR {product.price}
                              </span></>)}
                            {!product.on_sale && <span className="price1 profile-pg-wl-sgl-product-sale-price">
                              SAR {product.price}
                            </span>}
                          </div>

                        </div>
                        {/*
                        <Button color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: product.id, quantity: 1, onSuccess: () => props.getWishlist() })}>
                          {product.is_in_cart ? "Already in Cart" : "Add to Cart"}
                  </Button>*/}
                        {(product.stock_qty >= 1 && product.current_availability === "in_stock") ?
                          <Fragment>
                            {product.is_in_cart &&
                              <Button color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => history.push("/cart")} >
                                {lang.get("goToCart", "Go to Cart")}
                              </Button>
                            }
                            {!product.is_in_cart &&
                              <Button color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: product.id, quantity: 1, onSuccess: () => props.getWishlist() })}>
                                {lang.get("addToCart", "Add to Cart")}
                              </Button>
                            }
                          </Fragment>
                          :
                          <Button disabled color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: product.id, quantity: 1, onSuccess: () => props.getWishlist() })}>
                            {lang.get("outOfStock", "Out of Stock")}
                          </Button>
                        }
                      </div>
                    </Col>
                  );
                }




                return product?.product_variants?.map((value, index) => value.is_master && (
                  <Col md={6} lg={4} className="px-2 col-xxl-4 yt-cm-wl-col">
                    <div class="product profile-pg-wl-sgl-product-cpnt text-center mb-4">
                      <div class="d-flex justify-content-between align-items-center mt-3">
                        {value.on_sale && false ? (<div class="profile-yt-sgl-product-off text-center p-1">Sale</div>) : <div className="text-center p-1" />}
                        <div class="text-right pr-2">
                          <FavouriteProductSet onDataId={index} onPageType="shop" isFav={product.is_wishlisted} onClick={() => product.is_wishlisted ? removeFromWishlist(product) : addToWishlist(product)} />
                        </div>
                      </div>
                      <div onClick={() => history.push("/shop/" + value.id)} className="w3-ripple" style={{ cursor: "pointer" }}>
                        <img
                          src={value.images.length > 0 ? value.images[0].image : product.images[0].image}
                          class="yt-product-bg-image img-fluid"
                          alt="ytrend"
                        />
                        <div class="mt-3 profile-pg-wl-sgl-product-title text-center">
                          {product.name}
                        </div>

                        <div className="price profile-pg-wl-sgl-price-wrap text-center ">
                          {value.on_sale && (<><span className="price1 profile-pg-wl-sgl-product-sale-price">
                            SAR {value.sale_price}
                          </span>
                            <span className="price2 profile-pg-wl-sgl-product-reg-price2">
                              SAR {value.actual_price}
                            </span></>)}
                          {!value.on_sale && <span className="price1 profile-pg-wl-sgl-product-sale-price">
                            SAR {value.actual_price}
                          </span>}
                        </div>
                      </div>
                      {/*
                      <Button color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: value.id, quantity: 1, onSuccess: () => props.getWishlist() })}>
                        {value.is_in_cart ? "Already in Cart" : "Add to Cart"}
                </Button>*/}
                      {(value.stock_qty >= 1 && value.current_availability === "in_stock") ?
                        <Fragment>
                          {value.is_in_cart &&
                            <Button color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => history.push("/cart")}>
                              {lang.get("goToCart", "Go to Cart")}
                            </Button>
                          }
                          {!value.is_in_cart &&
                            <Button color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: product.id, variantId: value.id, quantity: 1, onSuccess: () => props.getWishlist() })}>
                              {lang.get("addToCart", "Add to Cart")}
                            </Button>
                          }
                        </Fragment>
                        :
                        <Button disabled color="secondary profile-pg-wl-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: product.id, variantId: value.id, quantity: 1, onSuccess: () => props.getWishlist() })}>
                          {lang.get("outOfStock", "Out of Stock")}
                        </Button>
                      }
                    </div>
                  </Col>
                ));

              })}



            </Row>
          </div>
        </div></div></div>
  );
}
function UserWhishList({ products, ...props }) {
  console.log('Wish list page');
  return Array.isArray(products) && products.length > 0 ?
    <WhishListProductComponent products={products} {...props} />
    :
    <NoWishlist />;
}
export default UserWhishList;
