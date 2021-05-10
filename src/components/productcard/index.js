import React, { useRef, useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { FaRegHeart } from "react-icons/fa";
import Carousel from "react-elastic-carousel";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { FavouriteProductSet } from "../../components";
import { useHistory } from "react-router";
import commands from "../../commands";
import service, { serviceTypes } from "../../services"
import AuthState from "../../redux/states/auth";
import langg from "../../language";

function TitleBar(props) {
  const lang = new langg("common");
  if (props.name != undefined) {
    return (
      <div className="yt-produstslider-info d-flex justify-content-between align-items-center">
        <h4 className="yt-comonent-top-title my-0">{props.name}</h4>
        <div className="yt-comonent-link">
          <Button color="link yt-component-more px-0" onClick={props.onViewMore}>{lang.get("viewMore", "View More")}</Button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

function ProductCard(props) {
  const history = useHistory();
  const state = AuthState.get();
  const [products, setProducts] = useState(undefined);
  const lang = new langg("common");

  let carousel = useRef();
  let p = 0;
  let Breakpoints = [
    { width: 320, itemsToShow: 2, itemsToScroll: 2 },
    { width: 730, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1300, itemsToShow: 5 },
  ];

  useEffect(() => {
    // if(props.name=="Today’s Deals"){
    if (props.products?.length > 0) {
      setProducts(props.products);
    }
    // }
  }, [props]);

  useEffect(() => {
    // console.log(products, "products");
  }, [products]);

  const productDetails = (a) => {
    console.log(a);
    history.push({ pathname: `/shop/${a.id}`, state: { a } });
  };

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
          commands.cache.getHomeProducts();
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
          commands.cache.getHomeProducts();
        }
      }).finally(commands.user.refreshProfile);
  }

  function getList() {
    var list = [];
    var lolist = [];

    products.forEach((product, index) => {
      var percentageValue=parseInt((product.price - product.sale_price) / product.price * 100);
      if (!(Array.isArray(product.product_variants) && product.product_variants.length > 0)) {
        list.push(
          <div className="yt-item-slider" >
            <div className="product yt-product-slider-cpnt text-center">
              <div className="d-flex justify-content-between align-items-center mt-3 yt-top-offer-whl">
                {product.on_sale && 
                <div className="yt-product-off text-center p-1">
                  {percentageValue<1 ?
                "sale" 
                :
                "-"+parseInt((product.price - product.sale_price) / product.price * 100)+"%"
                  }

                </div>
                }
                {!product.on_sale && <div className="text-center p-1" />}
                <div className="text-right mr-3">
                  <FavouriteProductSet onDataId={index} onPageType="shop" isFav={product.is_wishlisted} onClick={() => product.is_wishlisted ? removeFromWishlist(product) : addToWishlist(product)} />
                </div>
              </div>
              <img
                src={product.images.length > 0 ? product.images[0].image : "/images/thumb/missing.png"}
                className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                alt="ytrend"
                onClick={() => productDetails(product)}
              />
              <div className="mt-4 yt-product-title text-center">
                {product.name}
              </div>
              <div className="price yt-price-wrap text-center pt-3 pb-4">
                {product.on_sale && (<><span className="price1 yt-product-sale-price">
                  SAR {product.sale_price}
                </span>
                  <span className="price2 yt-product-reg-price2">
                    SAR {product.price}
                  </span></>)}
                {!product.on_sale && <span className="price1 yt-product-sale-price">
                  SAR {product.price}
                </span>}
              </div>
              {(product.stock_qty >= 1 && product.current_availability === "in_stock") ?
                <Fragment>
                  {product.is_in_cart &&
                    <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3" onClick={() => history.push("/cart")} >
                      {lang.get("goToCart", "Go to Cart")}
                    </Button>
                  }
                  {!product.is_in_cart &&
                    <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3" onClick={() => commands.cart.addItem({ productId: product.id, quantity: 1, onSuccess: () => commands.cache.getHomeProducts() })}>
                      {lang.get("addToCart", "Add to Cart")}
                    </Button>
                  }
                </Fragment>
                :
                <Button disabled color="secondary yt-product-add-btn buttoncart w3-ripple py-3" onClick={() => commands.cart.addItem({ productId: product.id, quantity: 1, onSuccess: () => commands.cache.getHomeProducts() })}>
                  {lang.get("outOfStock", "Out of Stock")}
                </Button>
              }
            </div>
          </div>
        );
      }

      product?.product_variants?.forEach((x, i) => x.is_master && list.push(
        <div className="yt-item-slider" popkey={index + "-" + i}>
          <div className="product yt-product-slider-cpnt text-center">
            <div className="d-flex justify-content-between align-items-center mt-3 yt-top-offer-whl">
              {x.on_sale && <div className="yt-product-off text-center p-1">
                -{parseInt((x.actual_price - x.sale_price) / x.actual_price * 100)}%
                </div>}
              {!x.on_sale && <div className="text-center p-1" />}
              <div className="text-right mr-3">
                <FavouriteProductSet onDataId={index} onPageType="shop" isFav={product.is_wishlisted} onClick={() => product.is_wishlisted ? removeFromWishlist(product) : addToWishlist(product)} />
              </div>
            </div>
            <img
              src={x.images.length > 0 ? x.images[0].image : product.images[0].image}
              className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
              alt="ytrend"
              onClick={() => productDetails(product)}
            />
            <div className="mt-4 yt-product-title text-center">
              {product.name}
            </div>
            <div className="price yt-price-wrap text-center pt-3 pb-4">
              {x.on_sale && (<><span className="price1 yt-product-sale-price">
                SAR {x.sale_price}
              </span>
                <span className="price2 yt-product-reg-price2">
                  <del>SAR {x.actual_price}</del>
                </span></>)}
              {!x.on_sale && <span className="price1 yt-product-sale-price">
                SAR {x.actual_price}
              </span>}
            </div>
            {(x.stock_qty >= 1 && x.current_availability === "in_stock") ?
              <Fragment>
                {x.is_in_cart &&
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3" onClick={() => history.push("/cart")}>
                    {lang.get("goToCart", "Go to Cart")}
                  </Button>
                }
                {!x.is_in_cart &&
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3" onClick={() => commands.cart.addItem({ productId: product.id, variantId: x.id, quantity: 1, onSuccess: () => commands.cache.getHomeProducts() })}>
                    {lang.get("addToCart", "Add to Cart")}
                  </Button>
                }
              </Fragment>
              :
              <Button disabled color="secondary yt-product-add-btn buttoncart w3-ripple py-3" onClick={() => commands.cart.addItem({ productId: product.id, variantId: x.id, quantity: 1, onSuccess: () => commands.cache.getHomeProducts() })}>
                {lang.get("outOfStock", "Out of Stock")}
              </Button>
            }
          </div>
        </div>
      ));
      list = [...list, ...lolist];
    });

    return list;
  }

  var list = [];
  if (products && Array.isArray(products) && products.length > 0) {
    list = getList();
  }
  const showCard = list.length > 0;

  return (products && Array.isArray(products) && products.length > 0) ? (
    <section className="hp-product-slider" style={showCard ? {} : { display: "none" }}>
      <Container>
        <TitleBar name={props.name} onViewMore={props.onViewMore} />
        <div className="yt-component-wrapper yt-slider-component bg-white py-4 mb-3">
          <IoIosArrowDropleft
            className="yt-slider-left img-fluid"
            onClick={() => carousel.slidePrev()}
          />
          <IoIosArrowDropright
            className="yt-slider-right img-fluid"
            width="20"
            height="20"
            onClick={() => carousel.slideNext()}
          />
          <Carousel
            itemsToShow={15}
            itemsToScroll={15}
            pagination={false}
            showArrows={false}
            ref={(ref) => (carousel = ref)}
            breakPoints={Breakpoints}
          >
            {list}

            {/* <div className="yt-item-slider">
              <div className="product yt-product-slider-cpnt text-center">
                <div className="d-flex justify-content-between align-items-center mt-3 yt-top-offer-whl">
                  <div className="yt-product-off text-center p-1">15%</div>
                  <div className="text-right mr-3">
                    <FavouriteProductSet />
                  </div>
                </div>
                <img
                  src={require("./images/sample.png")}
                  className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                  alt="ytrend"
                />
                <div className="mt-4 yt-product-title text-center">
                  Product Name
                </div>
                <div className="price yt-price-wrap text-center pt-3 pb-4">
                  <span className="price1 yt-product-sale-price">$400</span>
                  <span className="price2 yt-product-reg-price2">$500</span>
                </div>
                <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                  Add to Cart
                </Button>
              </div>
            </div> */}
            {/* <div className="yt-item-slider">
              <div className="product yt-product-slider-cpnt text-center">
                <div className="d-flex justify-content-between align-items-center mt-3 yt-top-offer-whl">
                  <div className="yt-product-off text-center p-1">15%</div>
                  <div className="text-right mr-3">
                    <FavouriteProductSet />
                  </div>
                </div>
                <img
                  src={require("./images/sample.png")}
                  className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                  alt="ytrend"
                />
                <div className="mt-4 yt-product-title text-center">
                  Product Name
                </div>
                <div className="price yt-price-wrap text-center pt-3 pb-4">
                  <span className="price1 yt-product-sale-price">$400</span>
                  <span className="price2 yt-product-reg-price2">$500</span>
                </div>
                <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="yt-item-slider">
              <div className="product yt-product-slider-cpnt text-center">
                <div className="d-flex justify-content-between align-items-center mt-3 yt-top-offer-whl">
                  <div className="yt-product-off text-center p-1">15%</div>
                  <div className="text-right mr-3">
                   <FavouriteProductSet />
                  </div>
                </div>
                <img
                  src={require("./images/sample.png")}
                  className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                  alt="ytrend"
                />
                <div className="mt-4 yt-product-title text-center">
                  Product Name
                </div>
                <div className="price yt-price-wrap text-center pt-3 pb-4">
                  <span className="price1 yt-product-sale-price">$400</span>
                  <span className="price2 yt-product-reg-price2">$500</span>
                </div>
                <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="yt-item-slider">
              <div className="product yt-product-slider-cpnt text-center">
                <div className="d-flex justify-content-between align-items-center mt-3 yt-top-offer-whl">
                  <div className="yt-product-off text-center p-1">15%</div>
                  <div className="text-right mr-3">
                    <FavouriteProductSet />
                  </div>
                </div>
                <img
                  src={require("./images/sample.png")}
                  className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                  alt="ytrend"
                />
                <div className="mt-4 yt-product-title text-center">
                  Product Name
                </div>
                <div className="price yt-price-wrap text-center pt-3 pb-4">
                  <span className="price1 yt-product-sale-price">$400</span>
                  <span className="price2 yt-product-reg-price2">$500</span>
                </div>
                <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="yt-item-slider">
              <div className="product yt-product-slider-cpnt text-center">
                <div className="d-flex justify-content-between align-items-center mt-3 yt-top-offer-whl">
                  <div className="yt-product-off text-center p-1">15%</div>
                  <div className="text-right mr-3">
                    <FavouriteProductSet />
                  </div>
                </div>
                <img
                  src={require("./images/sample.png")}
                  className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                  alt="ytrend"
                />
                <div className="mt-4 yt-product-title text-center">
                  Product Name
                </div>
                <div className="price yt-price-wrap text-center pt-3 pb-4">
                  <span className="price1 yt-product-sale-price">$400</span>
                  <span className="price2 yt-product-reg-price2">$500</span>
                </div>
                <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                  Add to Cart
                </Button>
              </div>
            </div>
     
      */}
          </Carousel>
        </div>
      </Container>
    </section>
  )
    :
    null;
}

export default ProductCard;
