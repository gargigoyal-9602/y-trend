import React from "react";
import "./css/index.scoped.css";
import { Header, Footer, HeroBanner, ContactForm ,SingleOfferBanner,DoubleOfferBanner,AppStoreBanner} from "../../components";

function ContactUs(props) {
  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
     
      <ContactForm />
      {/* Singel Offer Banner */}
      <SingleOfferBanner />
      {/* Singel Offer End */}

      {/* Double Offer */}
      <section className="my-4">
        <DoubleOfferBanner />
      </section>
      {/* Double Offer End */}

      {/* App Store Banner */}
      <AppStoreBanner />
      {/* App Store Banner End*/}
      <Footer />
    </div>
  );
}

export default ContactUs;
