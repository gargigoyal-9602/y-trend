import React from "react";
import {
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  ForgotPasswordComponent,
} from "../../components";
import SignUpConfirmComponent from "../../components/signup-confirm-account/index";
function SignUpConfirm(props) {
  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <SignUpConfirmComponent />
      <AppStoreBanner />
      <Footer />
    </div>
  );
}
export default SignUpConfirm;
