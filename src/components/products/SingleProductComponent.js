import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Button, Spinner } from "reactstrap";
//import { FaRegHeart } from "react-icons/fa";
import { FavouriteProductSet, NoProductsFound } from "../../components";
import { getProducts, get } from "../../Barriers/apiHelper";
import { useSelector } from "react-redux";
import commands from "../../commands";
import langg from "../../language";
import Ripple from "react-ripples";
import _ from "lodash";
import service, { serviceTypes } from "../../services";

import "./css/index.scoped.css";
import { useHistory, withRouter } from "react-router";
// export class SingleProductComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(props, "pops");
//     this.state = {
//       productList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//       accessToken: "",
//     };
//   }
//   componentDidMount() {
//     let headers = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxMTYsImVtYWlsIjoieXRyZW5kX3Rlc3QxOUB5b3BtYWlsLmNvbSIsImlzc3VlX3RpbWUiOjE2MDMzNjkyOTN9fQ.68T5S9GqI9WUDzkjwFk7jI4oaaKgHZ3Qb0XZ6NJ_IjgTMwOyvAMMrMh6x8j2h-vwI_mM_ZbKI034BumczX_2sw",
//       },
//     };
//     getProducts(`/api/v1/products/3`, headers)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     getProducts(`/api/v1/products/get_all_products?page=1&per_page=30`, headers)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   render() {
function SingleProductComponent(props) {
  console.log(props, "propss");
  const history = useHistory();
  const [productsList, setProductList] = useState([]);
  const [userdata, setuserData] = useState({});
  const [showSpinner, setShowSpinner] = useState(true);
  // const [categoryParam, setCategoryParam] = useState("category_id[]=1&");
  //const [productId, setProductId] = useState("&product_type_id=5");
  //const productList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [prevUrl, setPrevUrl] = useState("");
  const state = useSelector((state) => state.logInReducer);
  const lang = new langg("productListingScreen");
  const filterData = (type) => {

    if (type !== "force" && prevUrl === window.location.href) {
      return;
    } else {
      setPrevUrl(window.location.href);
    }

    console.log(props, type);
    let uuid = state.uuId;
    let categoryParam;
    let tagId;
    let brandId;
    let from = ``;
    let to = ``;
    let OrderBy;
    //let perPage = `&per_page=${props.per_page || 30}`;
    //let page = `&page=${props.page || 1}`;
    //let query = props.query ? `&query=${props.query}` : "";


    if (props.category.length > 0) {
      let d = "";
      categoryParam = "&category_id[]=1";
      props.category.forEach((x) => {
        d += x.checked === true ? `&category_id[]=${x.id}` : "";
      });
      categoryParam = d;
    }
    console.log("List we received for tags ", props.tags);
    if (props.tags.length > 0) {

      let d = "&tag=";
      tagId = "tag=5,";
      props.tags.forEach((x) => {
        console.log("Value of x is ,", x);
        d += x.checked === true ? x.name + "," : "";
      });
      tagId = d + "&";
    }
    if (props.brands.length > 0) {
      let d = "";
      brandId = "brand_id[]=3&";
      props.brands.forEach((x) => {
        d += x.checked === true ? `&brand_id[]=${x.id}` : "";
      });
      brandId = d;
    }
    if (Object.keys(props.priceRange).length > 0) {
      from = `&from=${props.priceRange.min}`;
      to = `&to=${props.priceRange.max}`;
    }
    if (props.sortBy == "1") {
      //low to high
      OrderBy = "&order_field=price&order_by=asc";
    } else if (props.sortBy == "2") {
      //high to low
      OrderBy = "&order_field=price&order_by=desc";
    } else if (props.sortBy == "3") {
      OrderBy = "&order_field=popular";
    } else if (props.sortBy == "4") {
      OrderBy = "&order_field=latest";
    }
    console.log(from, to, "brandId");

    console.log("Yes is " + window.location.href);
    if (state.guest_user) {
      getProductList(`/products/filter${window.location.search ? window.location.search : "?"}&uuid=${uuid}`);
    } else {
      let headers = {
        headers: {
          Authorization: `${state.loginData.token.token_type} ${state.loginData.token.access_token}`,
        },
      };

      getProducts(
        `/products/filter${window.location.search ? window.location.search : "?"}`,
        headers
      )
        .then((res) => {
          console.log(res);
          setProductList(res.data?.data);

          if (!(_.isEqual(props.paginationData, res.data?.meta?.pagination))) {
            props.setPaginationData(res.data?.meta?.pagination);
          }
        })
        .catch((err) => {

          console.log(err);
          if (err.response?.status === 404) {
            setProductList([]);
          }
          window.notify([{ message: err.response?.data?.error || err.message, type: "success" }]);
        }).finally(() => setShowSpinner(false));;
    }

  };


  function getProductList(data) {
    get(data)
      .then((res) => {
        console.log(res);
        setProductList(res.data?.data);

        if (!(_.isEqual(props.paginationData, res.data?.meta?.pagination))) {
          props.setPaginationData(res.data?.meta?.pagination);
        }
      })
      .catch((err) => {

        console.log(err);
        console.log("Status is ", typeof err.response?.status);
        if (err.response?.status === 404) {
          setProductList([]);
        }
        window.notify([{ message: err.response?.data?.error || err.message, type: "success" }]);
      })
      .finally(() => setShowSpinner(false));
  }


  useEffect(() => {
    // if (props.type == "category") {
    //   if (props.category.length > 0) filterData(props.type);
    // }
    // if (props.type == "tags") {
    //   if (props.tags.length > 0) filterData(props.type);
    // }

    if (
      props.brands.length > 0 ||
      props.tags.length > 0 ||
      props.category.length > 0 ||
      Object.keys(props.priceRange).length > 0 ||
      props.sortBy.length > 0
    ) {
      filterData(props.type);
    } else {
      //checkUserData();
    }
  }, [props]);

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
          filterData("force");
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
          filterData("force");
        }
      }).finally(commands.user.refreshProfile);
  }



  const checkUserData = () => {
    console.log(userdata, "userdata");
    if (userdata.loginData != undefined) {
      if (Object.keys(userdata.loginData).length > 0) {
        console.log("!1111111");
        let accessToken = userdata.loginData.token;
        if (props.location.state == undefined) callMe(accessToken);
        else callCategoryToken(accessToken, props.location.state);
      } else if (userdata.guest_user) {
        console.log("!22222");

        let uuid = userdata.uuId;
        if (props.location.state == undefined) callUuidProducts(uuid);
        else callCategory(props.location.state, uuid);
      }
    }
  };
  const callCategory = (catgId, uuid) => {
    get(`/categories/${catgId}/get_products?uuid=${uuid}`)
      .then((res) => {
        setProductList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callCategoryToken = (token, catgId) => {
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    getProducts(`/categories/${catgId}/get_products`, headers)
      .then((res) => {
        setProductList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setuserData(state);
  }, [state]);
  useEffect(() => {
    // console.log(userdata, Object.keys(userdata).length);
    if (Object.keys(userdata).length > 0) {
      //checkUserData();
    }
  }, [userdata]);
  useEffect(() => { }, [productsList]);

  const callMe = async (token) => {
    console.log(token, "accessToken");
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    // await getProducts(`/api/v1/products/3`, headers)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    await getProducts(`/products/get_all_products?page=1&per_page=15`, headers)
      .then((res) => {
        console.log(res.data.data);
        setProductList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // getProducts(`/api/v1/products?uuid=7454B0E9-E6E5-497D-BD94-F04783D54EAC&category_id%5B%5D=1&page=1&per_page=12`,headers).
    // then(res=>{
    //   console.log(res);
    // }).catch(Err=>{
    //   console.log("err",Err);
    // })
  };
  const callUuidProducts = (uuid) => {
    get(`/products?uuid=${uuid}`)
      .then((res) => {
        console.log(res);
        setProductList(res.data.data.all_products);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const productDetails = (a) => {
    console.log(a);
    history.push({ pathname: `/shop/${a.id}`, state: { a } });
  };

  return (
    <div className="yt-allproduct-main-wrap my-3">
      <Row className="yt-cm-row-margin">
        {productsList?.length > 0 ? (
          productsList.map((product, index) => {
            var percentageValue=parseInt((product.price - product.sale_price) / product.price * 100);
            return (
            <Fragment>

              { !(Array.isArray(product.product_variants) && product.product_variants.length > 0) &&
                <Col md={4} className="cm-xxl-3 cm-col-prdt-col">
                  <div className="product yt-sgl-product-cpnt text-center mb-4" style={{ cursor: "default" }}>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {product.on_sale ?
                       (<div className="yt-sgl-product-off text-center p-1">
                      {percentageValue<1 ?
                "sale"
                :
                "-"+parseInt((product.price - product.sale_price) / product.price * 100)+"%"
                  }

                      </div>) 
                      : <div className="text-center p-1" />}
                      <div className="text-right mr-3">
                        <FavouriteProductSet onDataId={index} onPageType="shop" isFav={product.is_wishlisted} onClick={() => product.is_wishlisted ? removeFromWishlist(product) : addToWishlist(product)} />
                      </div>
                    </div>
                    <div
                      onClick={() => productDetails(product)}
                      className="yt-product-bg-image w3-ripple"
                      style={{
                        backgroundImage: `url(${product.images.length > 0 ? product.images[0].image : product.images[0].image})`,
                        cursor: "default"
                      }}

                    />
                    <div className="yt-sgl-product-title text-center w3-ripple"
                      onClick={() => productDetails(product)}>
                      {product.name}
                    </div>
                    <div className="price yt-sgl-price-wrap text-center w3-ripple"
                      onClick={() => productDetails(product)}>
                      <span className="price1 yt-sgl-product-sale-price">
                        SAR {product.on_sale ? product.sale_price : product.price}
                      </span>
                      {product.on_sale &&
                        <span className="price2 yt-sgl-product-reg-price2">
                          <del>SAR {product.price}</del>
                        </span>
                      }
                    </div>

                    {(product.stock_qty >= 1 && product.current_availability === "in_stock") ?
                      <Fragment>
                        {product.is_in_cart &&
                          <Ripple className={"w-100 cm-overflow-auto cm-bdr-rad-prdt-btn"}>
                            <Button color="secondary yt-sgl-product-add-btn buttoncart py-3 pshkr" onClick={() => history.push("/cart")}>
                              {lang.get("goToCart", "Go to Cart")}
                            </Button>
                          </Ripple>
                        }
                        {!product.is_in_cart &&
                          <Ripple className={"w-100 cm-overflow-auto cm-bdr-rad-prdt-btn"}>
                            <Button color="secondary yt-sgl-product-add-btn buttoncart py-3 pshkr" onClick={() => commands.cart.addItem({ productId: product.id, quantity: 1, onSuccess: () => { filterData("force"); commands.cache.getHomeProducts(); } })}>
                              {lang.get("addToCart", "Add to Cart")}
                            </Button>
                          </Ripple>
                        }
                      </Fragment>
                      :
                      <Ripple className={"w-100 cm-overflow-auto cm-bdr-rad-prdt-btn"}>
                        <Button disabled color="secondary yt-sgl-product-add-btn buttoncart py-3 pshkr" onClick={() => commands.cart.addItem({ productId: product.id, quantity: 1, onSuccess: () => filterData("force") })}>
                          {lang.get("outOfStock", "Out of Stock")}
                        </Button>
                      </Ripple>
                    }
                  </div>
                </Col>
              }

              {product.product_variants.map((value, idx) => value.is_master && (
                <Col key={index + " " + idx} md={4} className="cm-xxl-3 cm-col-prdt-col">
                  <div className="product yt-sgl-product-cpnt text-center mb-4" style={{ cursor: "default" }}>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {value.on_sale ? (<div className="yt-sgl-product-off text-center p-1">
                        -{parseInt((value.actual_price - value.sale_price) / value.actual_price * 100)}%
                      </div>) : <div className="text-center p-1" />}
                      <div className="text-right mr-3">
                        <FavouriteProductSet onDataId={index} onPageType="shop" isFav={product.is_wishlisted} onClick={() => product.is_wishlisted ? removeFromWishlist(product) : addToWishlist(product)} />
                      </div>
                    </div>
                    <div
                      onClick={() => productDetails(product)}
                      className="yt-product-bg-image w3-ripple"
                      style={{
                        backgroundImage: `url(${value.images.length > 0 ? value.images[0].image : product.images[0].image})`,
                        cursor: "default"
                      }}

                    />
                    <div className="yt-sgl-product-title text-center w3-ripple"
                      onClick={() => productDetails(product)}>
                      {product.name}
                    </div>
                    <div className="price yt-sgl-price-wrap text-center w3-ripple"
                      onClick={() => productDetails(product)}>
                      <span className="price1 yt-sgl-product-sale-price">
                        SAR {value.on_sale ? value.sale_price : value.actual_price}
                      </span>
                      {value.on_sale &&
                        <span className="price2 yt-sgl-product-reg-price2">
                          <del>SAR {value.actual_price}</del>
                        </span>
                      }
                    </div>
                    {(value.stock_qty >= 1 && value.current_availability === "in_stock") ?
                      <Fragment>
                        {value.is_in_cart &&
                          <Ripple className={"w-100 cm-overflow-auto cm-bdr-rad-prdt-btn"}>
                            <Button color="secondary yt-sgl-product-add-btn buttoncart py-3" onClick={() => history.push("/cart")}>
                              {lang.get("goToCart", "Go to Cart")}
                            </Button>
                          </Ripple>
                        }
                        {!value.is_in_cart &&
                          <Ripple className={"w-100 cm-overflow-auto cm-bdr-rad-prdt-btn"}>
                            <Button color="secondary yt-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: product.id, variantId: value.id, quantity: 1, onSuccess: () => { filterData("force"); commands.cache.getHomeProducts(); } })}>
                              {lang.get("addToCart", "Add to Cart")}
                            </Button>
                          </Ripple>
                        }
                      </Fragment>
                      :
                      <Ripple className={"w-100 cm-overflow-auto cm-bdr-rad-prdt-btn"}>
                        <Button disabled color="secondary yt-sgl-product-add-btn buttoncart py-3" onClick={() => commands.cart.addItem({ productId: product.id, variantId: value.id, quantity: 1, onSuccess: () => filterData("force") })}>
                          {lang.get("outOfStock", "Out of Stock")}
                        </Button>
                      </Ripple>
                    }
                  </div>
                </Col>
              ))}
            </Fragment>
          )})
        ) : !showSpinner ? (
          <NoProductsFound />
        ) : (
              <Spinner
                className="mt-5 ml-auto mr-auto"
                style={{ width: "3rem", height: "3rem" }}
              />
            )}
      </Row>
    </div>
  );
}

export default withRouter(SingleProductComponent);
