import React, { useState, useEffect } from "react";
import "./css/index.scoped.css";
import {
  Header,
  Footer,
  HeroBanner,
  ThreeInOneBanner,
  FeatureBar,
  AppStoreBanner,
  ProductCard,
  CollectionCard,
  ThreePromo,
  SingleOfferBanner,
  DoubleOfferBanner,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUUID, setGuestStatus } from "../../redux/actions/loginActions";
import { get, getProducts, post } from "../../Barriers/apiHelper";
import { v4 as uuidv4 } from "uuid";
import service, { serviceTypes } from "../../services";
import useSWR from "swr";
import langg from "../../language";

function Home(props) {
  const styles = {
    item: {
      margin: "0 10px",
    },
  };

  const dispatch = useDispatch();
  const [products, setHomeProduts] = useState([]);
  const [featureProducts, setFeaturedProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const state = useSelector((state) => state.logInReducer);
  const cacheState = useSelector((state) => state.cache);
  const cartState = useSelector((state) => state.cartReducer);

  const lang = new langg("homeScreen");

  useEffect(async () => {
    if (!localStorage.getItem('UUID')) {
      let uuId = uuidv4();
      dispatch(fetchUUID(uuId));
      localStorage.setItem('UUID', uuId);
    }
    if (Object.keys(state.loginData).length > 0 && state.uuId.length > 0) {
      callProducts(state.loginData.token, state.uuId);
    }
    if (state.uuId.length > 0) {
      console.log('UUID Length');
      if (state.guest_user) await createGuestUser(state.uuId);
    }
  }, []);

  // useEffect(() => {}, [products]);

  function callProducts(token, uuid) {
    console.log(uuid);
    let headers = {
      headers: {
        Authorization: token.token_type + " " + token.access_token,
      },
    };
    getProducts(
      `/products/get_all_products?page=1&per_page=15&uuid=${uuid}`,
      headers
    )
      .then((res) => {
        console.log(res);
        setHomeProduts(res.data.data);
      })
      .catch((Err) => {
        console.log("err", Err);
      });
  }
  const createGuestUser = (uuid) => {
    let data = {
      uuid: uuid,
    };
    post(`/users/create_guest_user`, data)
      .then((res) => {
        console.log(res);
        callProductsUUID(res.data.data.uuid);
        dispatch(setGuestStatus(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callProductsUUID = (uuid) => {
    let headers;
    if (localStorage.getItem('token')) {
      headers = {
        'Accept': "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    }
    get(`/products/get_all_products?page=1&per_page=15&uuid=${uuid}`, { headers })
      .then((res) => {
        console.log(res);
        setHomeProduts(res.data.data);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  function onClickHeart(product) {
    const data = {
      product_id: product.id,
      uuid: localStorage.getItem('UUID'),
      userId: state.user.id
    }
    let serviceType;
    let notificationMsg;
    if (product.is_wishlisted) {
      serviceType = serviceTypes.removeFromWishlist(data);
      notificationMsg = `${product.name} has been removed to wishlist`;
    } else {
      serviceType = serviceTypes.addToWishlist(data);
      notificationMsg = `${product.name} has been added to wishlist`;
    }
    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          window.notify([{ message: error.message, type: "warning" }]);
        } else if (response) {
          window.notify([{ message: notificationMsg, type: "info" }])
          callProductsUUID(localStorage.getItem('UUID'))
        }
      })
      .finally(() => { });
  }

  return (
    <div>
      <Header onProps={props} />
      <HeroBanner />

      {/* <FeatureBar /> */}

      {/*Today’s Deals Product */}
      <ProductCard products={cacheState.homepage?.recommended_products} name={lang.get("recommendedProducts", "Recommended Products")} onViewMore={() => props.history.push("/shop?order_field=recommended&page=1&per_page=15")} />
      {/*Today’s Deals Product */}

      {/*Three Banner Section */}
      <ThreeInOneBanner />
      {/*Three Banner Section */}

      {/*Collections Product */}
      <CollectionCard collections={cacheState.homepage?.categories /*cartState?.categotyData || []*/} name={lang.get("collections", "Collections")} />
      {/*Collections Product END*/}

      <ThreePromo />

      {/*Featured Product */}
      <ProductCard products={cacheState.homepage?.latest_products} name={lang.get("newProducts", "New Products")} onViewMore={() => props.history.push("/shop?&order_field=latest&page=1&per_page=15")} />
      {/*Featured Product End*/}

      {/*Best Seller Product 
      <ProductCard products={cacheState.homepage?.all_products} name="Best Seller" />
       Best Seller Product End*/}

      {/* Singel Offer Banner */}
      <SingleOfferBanner />
      {/* Singel Offer End */}

      {/* Double Offer */}
      <DoubleOfferBanner />
      {/* Double Offer End */}

      {/* App Store Banner */}
      <AppStoreBanner />
      {/* App Store Banner End*/}
      <Footer />
    </div>
  );
}

export default Home;
