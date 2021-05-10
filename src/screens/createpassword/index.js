import React, { useState } from "react";
import {
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  CreatePasswordComponent,
} from "../../components";
function CreatePassword(props) {
  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <CreatePasswordComponent />
      <AppStoreBanner />
      <Footer />
    </div>
  );
}
export default CreatePassword;
