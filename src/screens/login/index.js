import React from "react";
import "./css/index.scoped.css";
import {
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  LoginComponent,
} from "../../components";

function LoginPage(props) {
  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <LoginComponent className="main-login-page" />
      <AppStoreBanner />
      <Footer />
    </div>
  );
}
export default LoginPage;
