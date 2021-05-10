import React, { useEffect, Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import screens from "./screens";
import { NotificationToaster, PageLoadingBlock, ScrollToTop, LoginComponent } from "./components";
import { fetchUUID, setGuestStatus } from "./redux/actions/loginActions";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { post } from "./Barriers/apiHelper";
import './app.css'
import CartState from "./redux/states/cart";
import CacheState from "./redux/states/cache";
import AuthState from "./redux/states/auth";
import commands from "./commands";
import { ToastProvider } from 'react-toast-notifications';
import ScrollToTopButton from "react-scroll-to-top";

function Routes() {
  const cacheState = CacheState.get();
  var showPopup = true;

  if (["/login", "/forgotpassword", "/signupconfirm","/loginconfirm"].includes(window.location.pathname) || window.location.pathname.includes("/help-center")) {
    showPopup = false;
  }


  return (
    <Fragment>
      <Router>
        <ScrollToTop />

        {(!(cacheState.continueAsGuest || commands.user.isLoggedIn()) && showPopup) &&
          < div class="w3-overlay w3-show" style={{ overflowY: "auto" }}>
            <LoginComponent className="main-login-page" isPopup={true} />
          </div>
        }

        <Switch>
          {/* <PrivateRoute
        path="/transactionfailed"
        component={screens.TransactionFailedPage}
      /> */}
          <Route
            path="/transactionfailed"
            component={screens.TransactionFailedPage}
          />

          <Route path="/payment" component={screens.Payment} />
          <Route exact path="/signupconfirm" component={screens.SignUpConfirm} />
          <Route exact path="/loginconfirm" component={screens.SignUpConfirm} />
          <Route path="/orderplaced" component={screens.OrderPlacedPage} />
          <Route path="/cart" component={screens.CartPage} />
          <Route path="/checkout" component={screens.CartPage} />
          <Route
            path="/profile/changepassword"
            component={screens.ChangePasswordPage}
          />
          <Route path="/profile/myorder/:orderId/:itemId" component={screens.OrderDetailPage} />
          <Route path="/profile/:slug" component={screens.ProfilePage} />
          <Route path="/profile" component={screens.ProfilePage} />
          <Route path="/createpassword" component={screens.CreatePassword} />
          <Route path="/forgotpassword" component={screens.ForgotPassword} />
          <Route exact path="/login" component={screens.LoginPage} />
          <Route path="/help-center/:slug" component={screens.HelpCenter} />
          <Route path="/help-center" component={screens.HelpCenter} />

          <Route path="/shop/:productId" component={screens.ProductDetails} />
          <Route path="/shop" component={screens.Products} />
          <Route path="/contactus" component={screens.ContactUs} />
          <Route path="/aboutus" component={screens.AboutUs} />
          <Route path="/reviews" component={screens.Reviews} />
          <Route path="/" component={screens.Home} />
        </Switch>
      </Router>
    </Fragment >
  );
}

function App(props) {
  //dont remove it
  const store = useSelector((store) => store);

  const cartState = CartState.get();
  const cacheState = CacheState.get();
  const authState = AuthState.get();
  const state = useSelector((state) => state.logInReducer);
  const dispatch = useDispatch();
  const [cartCreated, setCartCreated] = useState(undefined);
  const [homeProductsAvailable, setHomeProductsAvailable] = useState(undefined);
  const [bannersAvailable, setBannersAvailable] = useState(undefined);
  const [guestCreated, setGuestCreated] = useState(false);

  useEffect(() => {
    if (cartCreated === undefined || typeof cartState.cart !== "object") {
      if (typeof authState.user === "object" && authState.user?.id !== undefined) {
        commands.cart.createCart();
        setCartCreated(true);
      }
    }
  }, [authState.user, cartState.cart, cartCreated]);

  useEffect(() => {
    commands.user.refreshProfile();
  }, []);

  useEffect(() => {
    if (homeProductsAvailable === undefined || typeof cacheState.homepage !== "object") {
      if (typeof authState.user === "object" && authState.user?.id !== undefined) {
        commands.cache.getHomeProducts();
        setHomeProductsAvailable(true);
      }
    }
  }, [authState.user, cacheState.homepage, homeProductsAvailable]);

  useEffect(() => {
    if (bannersAvailable === undefined || typeof cacheState.banners !== "object") {
      if (typeof authState.user === "object" && authState.user?.id !== undefined) {
        commands.cache.getBanners();
        commands.cache.getWebBanners();
        setBannersAvailable(true);
      }
    }
  }, [authState.user, cacheState.banners, bannersAvailable]);



  useEffect(async () => {
    if (!localStorage.getItem('UUID')) {
      let uuId = uuidv4();
      dispatch(fetchUUID(uuId));
      localStorage.setItem('UUID', uuId);
    }
    if (state.uuId.length > 0) {
      if (state.guest_user) {
        setGuestCreated(true);
      }
    }
  }, [state.uuId]);

  useEffect(() => {
    if (guestCreated) {
      if (state.guest_user) createGuestUser(state.uuId);
    }
  }, [guestCreated]);

  const createGuestUser = (uuid) => {
    let data = {
      uuid: uuid,
    };
    post(`/users/create_guest_user`, data)
      .then((res) => {
        dispatch(setGuestStatus(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("Auth State is ", authState);
  console.log("Cart State is ", cartState.cart);
  return (
    <Fragment>
      <ToastProvider autoDismissTimeout={10000} autoDismiss={true}>
        <NotificationToaster />
        {(window.notify && authState.user && cartState.cart) ?
          <div>
            <Routes />
            <ScrollToTopButton smooth top={600} />
          </div>
          : <PageLoadingBlock message=" " title=" Please Wait..." />}

      </ToastProvider>
      <div></div>
      {/*
        <div className={"d-inline-block w3-bottom w3-round-large w3-green"} style={{marginLeft:"50%",width:"30px",height:"30px"}} onClick={()=>CacheState.set({language:(cacheState.language==="en"?"ar":"en")})}>
            ~ {cacheState.language}
        </div>
      */}
    </Fragment>
  )
}

export default App;
