import React from "react";
import {
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  ForgotPasswordComponent,
} from "../../components";
function ForgotPassword(props) {
  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <ForgotPasswordComponent />
      <AppStoreBanner />
      <Footer />
    </div>
  );
}
export default ForgotPassword;
