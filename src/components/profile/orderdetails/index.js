import React, { useState, useEffect } from "react";
import "./css/index.scoped.css";
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { AllModal } from "../../../components";
import { FaLongArrowAltLeft } from "react-icons/fa";
import moment from "moment";
import { getLogisticDetails } from "../../../services/serviceTypes";
import _ from "lodash";
import lang from "../../../language";
function OrderDetailsPage(props) {
  const orederDetailLang = new lang("myOrderDetailScreen");
  const [ShowCOModal, settt] = useState(false);
  const openCancelOrderModal = () => settt(!ShowCOModal);
  const [ShowPRModal, pRsettt] = useState(false);
  const openProductRatingModal = () => pRsettt(!ShowPRModal);
  const history = useHistory();
  const { order, orderItem, trackingDetails, refetchData } = props;//.tracking_detail
  const [shippingAddress, setShippingAddress] = useState(undefined);
  console.log("lorderItem ", order);
  useEffect(() => {

    if (!orderItem) {
      routeToProfile();
    } else {
      let localAddressIndex = order.delivery_addresses.findIndex(
        (item) =>
          item.address_for === "shipping" ||
          item.address_for === "billing and shipping"
      );
      if (localAddressIndex >= 0) {
        setShippingAddress(order.delivery_addresses[localAddressIndex]);
      }
    }
    console.log("tracking details :", trackingDetails?.tracking_detail, orderItem);
  }, [props])

  const routeToProfile = () => {
    let path = "/profile/myorder";
    history.push(path);
  };

  function getImageUrl() {
    if (orderItem.product_variant && orderItem.product_variant.images.length > 0) {
      return orderItem.product_variant.images[0].image
    } else {
      return orderItem.product_image
    }
  }

  function getAddressString() {
    if (shippingAddress) {
      return `${shippingAddress.address}, ${shippingAddress.address_line_2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip_code}`
    }
    return " 503 Branson Turnpike Suite 127, Lawrenceport, Florida 112202"
  }

  function getProductPrice() {
    if (orderItem) {
      return orderItem.product_variant ?
        order.product_variant_on_sale ? orderItem.product_variant_price : orderItem.product_variant_price
        : order.product_on_sale ? orderItem.product_product_sale_price : orderItem.product_price
    }
    return ""
  }

  const getLocalDate = ({ date, toFormat }) => {
    let m =
      moment.utc(date)
        .local().subtract('minutes', 5).utcOffset(+4)
        .format(toFormat);
    return m;
  }

  const reviewData = { orderItemId: orderItem.id/*, orderId: order.id, reviewId*/, canReview: true };

  const data = {
    currency: typeof orderItem.total_price_with_currency === "string" && orderItem.total_price_with_currency.split(" ")[0],
    totalAmount: orderItem.is_default_currency ? orderItem.total_price : orderItem.total_price_with_currency?.split(" ")[1],
    /*
    subTotal: cart.is_default_currency ? cart.sub_total : cart.sub_total_with_currency?.split(" ")[1],
    deliveryCharges: cart.is_default_currency ? cart.shipping_charges?.shipping_total : cart.shipping_total_with_currency?.split(" ")[1],
    tax: cart.is_default_currency ? cart.total_tax : cart.total_tax_with_currency?.split(" ")[1],
    discount: cart.is_default_currency ? cart.applied_discount : cart.applied_discount_with_currency?.split(" ")[1]
  */
  };
  return (
    <Container>
      {ShowCOModal ? <AllModal modalName="CancelOrder" /> : ""}
      <AllModal modalName="Productrate" reviewData={reviewData} isOpen={ShowPRModal} toggle={() => pRsettt(!ShowPRModal)} onSuccess={() => { refetchData() }} />
      <Row>
        <Col md={12}>
          <div className="pageroute hc-breadcrumbs my-3">
            <Link to="/" className="hc-home">Home {">"}</Link>
            <Link to="/profile" className="hc-mid"> Profile {">"}</Link>{" "}
            <Link to="/profile/myorder" className="hc-mid"> My Orders {">"}</Link>{" "}
            <span className="currpage hc-current">Order Details</span>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={12} lg={12} className="px-3 col-xxl-9">
          <div className="od-cm-col-pad">
            <div className="hc-beckfrom-ct-page hc-mb-30 w3-ripple" onClick={() => {
              routeToProfile();
            }}>
              <FaLongArrowAltLeft
                className="hcp-back-arrow"

              />{" "}
              <span className="pl-2 hc-back-tag">
                {orederDetailLang.get("orderDetails", "Order Details")}
              </span>
            </div>
            <div class="order-details-main-wrapper bg-white radius-10 mt-3 hc-mb-80">
              <div class="d-flex flex-wrap justify-content-between yt-sp-my-order-tdet-wrap">
                <div class="d-flex align-items-center flex-wrap sinlge-mo-dt-wrap ">
                  <div class="order-number-wrap">
                    <span class="order-tag">
                      {orederDetailLang.get("orderNumber", "Order Number")}: </span>
                    <span class="order-tag-val">{order?.order_number}</span>
                  </div>
                  <div class="order-bdr-between" />
                  <div class="order-date-wrap">
                    <span class="order-tag">
                      {orederDetailLang.get("orderedOn", "Ordered on")}: </span>
                    <span class="order-tag-val">{order?.order_date}</span>
                  </div>
                </div>
                <div class="order-review text-right">
                  {!trackingDetails?.order_item_detail?.is_review_present && ["delivered", "returned"].includes(trackingDetails?.tracking_detail[0]?.status?.toLowerCase()) && <Button
                    color="link order-write-review px-0"
                    onClick={() => pRsettt(true)}
                  >
                    {orederDetailLang.get("writeAReview", "Write a Review")}
                  </Button>}
                </div>
              </div>
              <div className="py-3 d-flex align-items-center mb-3 od-single-prd-details-wrap">
                <span className="d-flex" >
                  <div class="od-product-img p-1 d-flex align-items-center justify-content-center w3-ripple"  style={{ cursor: "pointer" }} onClick={() => history.push("/shop/" + trackingDetails?.order_item_detail?.product.id)}>
                    <img
                      src={getImageUrl()}
                      class="img-fluid"
                    />
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="order-product-info ">
                      <h2 class="pp-order-product-ttl mt-0 w3-ripple" style={{ cursor: "pointer" }} onClick={() => history.push("/shop/" + trackingDetails?.order_item_detail?.product.id)}>
                        {orderItem.product_name}
                      </h2>
                      <div className="order-prodict-type-container">
                        {orderItem.product_variant ? <Table className="mb-0 order-prodict-type d-block" borderless>
                          <thead>
                            <tr>
                              {orderItem.product_variant.product_variant_properties.map((value, idx) => (<th>{value.variant_name}</th>))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {orderItem.product_variant.product_variant_properties.map((value, idx) => (<td>{value.property_name}</td>))}
                            </tr>
                          </tbody>
                        </Table> : <div></div>}
                      </div>
                      <ul class="p-0 order-ul-list-none mb-0 mt-2 d-flex flex-wrap align-items-center">
                        <li class="op-order-product-price pr-4">
                          <span class="order-product-price">{data.currency} {parseFloat(data?.totalAmount || 0).toFixed(2)}</span>
                        </li>
                        <li>
                          <span className="order-tracing-details">
                            {orederDetailLang.get("trackingId", "Tracking ID")}:{" "}
                            <span className="order-track-id">{trackingDetails?.tracking_detail[0].tracking_number}</span>{" "}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </span>
                <div>
                  <div class="order-product-quanity text-center text-sm-right">
                    <ul class="p-0 order-ul-list-none m-0 ">
                      <li class="op-order-quantity mb-3">
                        {orederDetailLang.get("quantity", "Quantity")}: <span class="ord-product-quantity">{orderItem.quantity}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-details-status on-the-way">
                    {_.capitalize(trackingDetails?.tracking_detail[0].status)}
                  </div>
                </div>
              </div>
              <Row>
                <Col md={12}>
                  <div className="order-details-status-bar py-3 my-3">
                    <h2 className="order-details-sub-title">
                      {orederDetailLang.get("orderStatus", "Order Status")}</h2>
                    <ul class="pl-2 order-ul-list-none mb-0 ml-3 order-details-status-wrap">

                      {trackingDetails?.tracking_detail.map((item, index) => (
                        <div>
                          <li>
                            <img
                              alt="status check"
                              src={require("./images/statuss-check.png")}
                              className="order-details-status-icn" />
                            <div className="order-step-1 order-st-otw">
                              <h4 className="d-flex align-items-center">
                                {_.capitalize(item.status) + " "}
                                <span className="order-status-date">
                                  {item.order_date}
                                </span>
                              </h4>
                              <p className="order-details-message">
                                {item.msg}, {getLocalDate({ date: item.order_datetime, toFormat: "ddd, Do MMMM YYYY - hh:mm A" })}
                              </p>
                            </div>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="order-details-shipping-barmy-3">
                    <h2 className="order-details-sub-title">
                      {orederDetailLang.get("shippingAddress", "Shipping Address")}</h2>
                    <div className="order-shipping-address-wrap">
                      <h2 class="order-details-address-type">{_.capitalize(shippingAddress?.name)}</h2>
                      <p className="order-details-address-details">
                        {getAddressString()}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="order-details-contact">
                      {orederDetailLang.get("phoneNumber", "Phone Number")}:{" "}
                      <span className="order-details-phone">{shippingAddress?.phone_number}</span>
                    </div>
                    <div class="order-cancel-wrap text-right">
                      {/* <Button
                      color="link order-cancel-btn px-0"
                      onClick={openCancelOrderModal}
                    >
                      Cancel this Order Item
                   </Button>*/}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container >
  );
}

export default OrderDetailsPage;
