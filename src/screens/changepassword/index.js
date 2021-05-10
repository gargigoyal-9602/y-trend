import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/index.scoped.css";
import {
  ChangePasswordComponent,
  Header,
  HeroBanner,
  ThreePromo,
  AppStoreBanner,
  Footer,
} from "../../components";
function ChangePasswordPage(props) {
  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <ChangePasswordComponent />
      <ThreePromo />
      <AppStoreBanner />
      <Footer />
    </div>
  );
}
export default ChangePasswordPage;
