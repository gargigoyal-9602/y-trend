import React, { useRef, useState, useEffect } from "react";
import "./css/index.scoped.css";
import {
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  ThreePromo,
  SingleOfferBanner,
  OrderDetailsPage,
  DoubleOfferBanner,
  ProductCard,
} from "../../components";
import commands from "../../commands";
import CacheState from "../../redux/states/cache";
import lang from "../../language";

function OrderDetailPage(props) {
  const orderdetaillang = new lang("homeScreen");
  const cacheState = CacheState.get();
  const [trackingDetails, setTrackingDetails] = useState();
  const orderItem = props.location?.state?.item;
  const order = props.location?.state?.order;
  // const orderId = props.match?.params?.orderId;

  useEffect(() => {
    fetchOrder();
  }, [])

  function fetchOrder() {
    if (order) {
      if (order.logistics_ship_rocket_enabled) {
        commands.orders.getTrackingDetails((data) => onLogisticSuccess(data), () => { }, order.id, undefined);
      } else {
        commands.orders.getTrackingDetails((data) => onSuccess(data), () => { }, undefined, orderItem.id);
      }
      console.log("order ", order);
    }
  }
  function onSuccess(data) {
    // console.log("order data", data);
    setTrackingDetails(data);
  }

  function onLogisticSuccess(data) {
    let trackingDetails = {};
    let trackingResponse = data.tracking;
    trackingDetails["status"] = trackingResponse.status;
    trackingDetails["msg"] = trackingResponse.msg;
    trackingDetails["order_datetime"] = trackingResponse.order_datetime;
    trackingDetails["tracking_number"] = trackingResponse.tracking_number;
    trackingDetails["order_date"] = trackingResponse.order_date;
    setTrackingDetails(trackingDetails);
  }

  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <OrderDetailsPage orderItem={orderItem} order={order} trackingDetails={trackingDetails} refetchData={fetchOrder} />
      <ThreePromo />

      {/*Today’s Deals Product */}
      <ProductCard products={cacheState.homepage?.recommended_products} name={orderdetaillang.get("recommendedProducts", "Recommended Products")} onViewMore={() => props.history.push("/shop?order_field=recommended&page=1&per_page=15")} />
      {/*Today’s Deals Product */}


      {/*Featured Product */}
      <ProductCard products={cacheState.homepage?.latest_products} name={orderdetaillang.get("newProducts", "New Products")} onViewMore={() => props.history.push("/shop?&order_field=latest&page=1&per_page=15")} />
      {/*Featured Product End*/}

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
export default OrderDetailPage;
