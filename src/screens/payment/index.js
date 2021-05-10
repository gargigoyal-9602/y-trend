import React, { useState, Fragment, useEffect } from "react";
import "./css/index.scoped.css";
import {
  TransactionFailedComponent,
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  SingleOfferBanner,
  DoubleOfferBanner,
  PageLoadingBlock,
  ErrorOccuredBlock,
  OrderPlaced
} from "../../components";
import { Helmet } from "react-helmet";
import getConfig from "../../config";
import commands from "../../commands";
import { setGuestStatus } from "../../redux/actions/loginActions";

function Payment(props) {
  const Config = getConfig();
  const query = new URLSearchParams(props.location.search);
  const resourcePath = query.get('resourcePath');
  const statuses = { processingPayments: "processingPayments", transactionSuccess: "transactionSuccess", transactionFailed: "transactionFailed" };
  const [status, setStatus] = useState(statuses.processingPayments);
  const [orderId, setOrderId] = useState(undefined);

  const checkoutId = query.get('id');
  const cartId = query.get('cartId');
  function postMessage() {
    window.top.postMessage({
      // frameHeight: document.body.scrollHeight || 606
      frameHeight: 606
    }, '*');
  }

  useEffect(() => {
    window.onload = () => postMessage();
    window.onresize = () => postMessage();
    document.body.onchange = () => postMessage();
    document.body.onload = () => postMessage();
  }, []);


  function getCurrentProcess() {
    switch (status) {
      case statuses.processingPayments: return <PageLoadingBlock title="Please wait..." message={"Processing your payment, please do not close this window."} />;
      case statuses.transactionSuccess: return <OrderPlaced orderId={orderId} />;
      case statuses.transactionFailed: return <TransactionFailedComponent />;
      default: return <PageLoadingBlock title="Please wait...default" message={"Processing your payment, please do not close this window."} />;
    }
  }

  useEffect(async () => {
    try {
      if (typeof resourcePath === "string") {
        const isTransactionSuccess = await commands.cart.getHyperPayPaymentStatus({ checkoutId });

        if (isTransactionSuccess === true) {
          const isOrderPlaced = await commands.cart.placeOrder();
          if (isOrderPlaced) {
            commands.cache.getHomeProducts();
            const isOrderConfirmed = await commands.cart.confirmOrder({ cartId, checkoutId });
            if (isOrderConfirmed) {
              setStatus(statuses.transactionSuccess);
              setOrderId(isOrderPlaced?.id);
            } else {
              throw new Error("Error in Confirming Order");
            }
          } else {
            throw new Error("Error in Placing Order");
          }
        } else {
          throw new Error("Error in Getting Payment Status");
        }
      }
    } catch (error) {
      window.notify([{
        message: error.message || "Error occured in processing payments", type: "danger"
      }]);
      setStatus(statuses.transactionFailed);
    }
  }, []);

  return (
    typeof resourcePath === "string" ?
      <Fragment>
        {getCurrentProcess()}
      </Fragment>
      :
      <Fragment>
        <Helmet onChangeClientState={(newState, addedTags, removedTags) => console.log("Doms are ", newState, addedTags, removedTags)}>
          <script>
            {`
              var wpwlOptions = {
                style:"card",
                maskCvv: true,
                paymentTarget: "_top"
                }
            `}
          </script>
          <script src={"https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" + checkoutId}></script>


        </Helmet>

        <style>
          {`
          .wpwl-container.wpwl-container-card.wpwl-clearfix {
            background-color:white;
          }
          .wpwl-button.wpwl-button-pay {
            background-color:black;
            border-radius: 5px;
            border-color: black;
          }
          .wpwl-form.wpwl-form-card.wpwl-clearfix {
            margin:24px auto;
          }
          `}
        </style>
        <div key="card-form">
          <form action={window.location.href.split('?')[0] + "?cartId=" + cartId} class="paymentWidgets" data-brands="VISA MASTER AMEX"></form>
        </div>
      </Fragment>
  );
}
export default Payment;
