import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  ThreePromo,
  SingleOfferBanner,
  ProductCard,
  DoubleOfferBanner,
  CartPageComponent,
} from "../../components";
import "./css/index.scoped.css";
import CacheState from "../../redux/states/cache";
function CartPage(props) {

  const cacheState =CacheState.get();

  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <CartPageComponent />
      <ThreePromo />

      {/*Similar Products Product */}
      <ProductCard products={cacheState.homepage?.recommended_products} name="Similar Products" onViewMore={() => props.history.push("/shop?order_field=recommended&page=1&per_page=15")} />
      {/*Similar Products Product */}

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
export default CartPage;
