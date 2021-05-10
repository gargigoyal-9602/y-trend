import React, { useState, useEffect } from "react";
import "./css/index.scoped.css";
import { AllModal } from "../../../components";
import { useHistory } from "react-router-dom";
import lang from "../../../language";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Input,
  Button,
  Table,
} from "reactstrap";
import _ from "lodash";

function MultipleOrders() {
  const history = useHistory();
  const [ShowCOModal, settt] = useState(false);
  const [ShowPRModal, pRsettt] = useState(false);
  const openProductRatingModal = () => pRsettt(!ShowPRModal);
  const openCancelOrderModal = () => settt(!ShowCOModal);
  const routeToOrderDetails = () => {
    let path = "myorder/orderdetails";
    history.push(path);
  };
  return (
    <div className="profile-pg-inner-wrap bg-white radius-10 mb-4 yt-my-order-wrap">
      <div className="profile-pg-inner-wrapper">
        {ShowCOModal ? <AllModal modalName="CancelOrder" /> : ""}
        {ShowPRModal ? <AllModal modalName="Productrate" /> : ""}
        <div className="d-flex flex-wrap align-items-center justify-content-between yt-my-order-tdet-wrap">
          <div className="d-flex align-items-center flex-wrap profile-mo-dt-wrap">
            <div className="order-number-wrap">
              <span className="order-tag">Order Number :</span>
              <span className="order-tag-val">4987984949</span>
            </div>
            <div className="order-bdr-between" />
            <div className="order-date-wrap">
              <span className="order-tag">Ordered on </span>
              <span className="order-tag-val">12 Jun 2020</span>
            </div>
          </div>
          <div className="order-review text-right">
            <Button
              color="link order-write-review"
              onClick={openProductRatingModal}
            >
              Write a Review
            </Button>
          </div>
        </div>
        <div className="py-3 d-flex align-items-center yt-order-wrapper-box">
          <div className="od-product-img p-1">
            <img
              src={require("./images/order-product-img.png")}
              className="img-fluid"
            />
          </div>
          <div className="d-flex align-items-center">
            <div className="order-product-info">
              <h2
                className="pp-order-product-ttl mt-0"
                onClick={routeToOrderDetails}
              >
                Beautiful Embroidered Yoke Brown Abaya
              </h2>
              <Table className="mb-0 order-prodict-type d-block" borderless>
                <thead>
                  <tr>
                    <th>COLOR</th>
                    <th>SIZE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dark Blue</td>
                    <td>XS</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="order-product-quanity text-center text-sm-right">
            <ul className="p-0 order-ul-list-none m-0 yt-qt-prc d-flex flex-wrap">
              <li className="op-order-quantity mb-3">
                Quantity : <span className="ord-product-quantity">1</span>
              </li>
              <li className="op-order-product-price align-self-end">
                <span className="order-product-price">SAR 120</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-3 d-flex align-items-center yt-order-wrapper-box">
          <div className="od-product-img p-1">
            <img
              src={require("./images/order-product-img.png")}
              className="img-fluid"
            />
          </div>
          <div className="d-flex align-items-center">
            <div className="order-product-info">
              <h2
                className="pp-order-product-ttl mt-0"
                onClick={routeToOrderDetails}
              >
                Beautiful Embroidered Yoke Brown Abaya
              </h2>
              <Table className="mb-0 order-prodict-type d-block" borderless>
                <thead>
                  <tr>
                    <th>COLOR</th>
                    <th>SIZE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dark Blue</td>
                    <td>XS</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="order-product-quanity text-center text-sm-right">
            <ul className="p-0 order-ul-list-none m-0 yt-qt-prc d-flex flex-wrap">
              <li className="op-order-quantity mb-3">
                Quantity : <span className="ord-product-quantity">1</span>
              </li>
              <li className="op-order-product-price align-self-end">
                <span className="order-product-price">SAR 120</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleOrders(props) {
  const orderlang = new lang("myOrderScreen");
  const history = useHistory();
  const [ShowCOModal, settt] = useState(false);
  const [ShowPRModal, pRsettt] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const openProductRatingModal = () => pRsettt(!ShowPRModal);
  const openCancelOrderModal = (order, item) => { setCurrentOrder({ orderId: order?.id, itemId: item?.id }); settt(!ShowCOModal); };
  const { order } = props;

  const routeToOrderDetails = (order, item) => {
    console.log("Route to order details", item);
    history.push({ pathname: `myorder/${order.id}/${item.id}`, state: { order, item } });
  };


  const reviewData = { orderId: order.id /*, orderItemId: order.id*/ };

  if (order.reviews) {
    reviewData.reviewId = order.reviews.id;
    reviewData.reviewText = order.reviews.comment;
    reviewData.reviewRating = order.reviews.rating;
  }



  order.order_items = order.order_items.map((item, index) => {
    const data = {
      currency: typeof order.total_with_currency === "string" && order.total_with_currency.split(" ")[0],
      totalAmount: order.is_default_currency ? item.total_price : item.total_price_with_currency?.split(" ")[1],
      /*
      subTotal: cart.is_default_currency ? cart.sub_total : cart.sub_total_with_currency?.split(" ")[1],
      deliveryCharges: cart.is_default_currency ? cart.shipping_charges?.shipping_total : cart.shipping_total_with_currency?.split(" ")[1],
      tax: cart.is_default_currency ? cart.total_tax : cart.total_tax_with_currency?.split(" ")[1],
      discount: cart.is_default_currency ? cart.applied_discount : cart.applied_discount_with_currency?.split(" ")[1]
    */
    };
    item.data = data;
    return item;
  });

  return (
    <div className="profile-pg-inner-wrap bg-white radius-10 mb-4 yt-my-order-wrap yt-cc-ord">
      <div className="profile-pg-inner-wrapper">
        {ShowCOModal ? <AllModal modalName="CancelOrder" order={currentOrder} getOrders={props.getOrders} /> : ""}
        <AllModal modalName="Productrate" reviewData={reviewData} isOpen={ShowPRModal} toggle={() => pRsettt(!ShowPRModal)} onSuccess={() => { history.replace("/profile/myorder"); props.getOrders(); }} />
        <div className="d-flex flex-wrap align-items-center justify-content-between yt-my-order-tdet-wrap">
          <div className="d-flex align-items-center flex-wrap profile-mo-dt-wrap">
            <div className="order-number-wrap">
              <span className="order-tag">
                {orderlang.get("orderNumber", "Order Number")} : </span>
              <span className="order-tag-val">{order.order_number}</span>
            </div>
            <div className="order-bdr-between" />
            <div className="order-date-wrap">
              <span className="order-tag">{orderlang.get("orderedOn", "Ordered on")} :</span>
              <span className="order-tag-val">{order.order_date}</span>
            </div>
          </div>
          <div className="order-review text-right">
            {/*order.is_review_present && typeof order.reviews === "object" ?
              <Button
                color="link order-write-review"
                onClick={openProductRatingModal}
                className="d-none"
              >
                Edit Review
              </Button>
              :
              <Button
                color="link order-write-review"
                onClick={openProductRatingModal}
              >
                Write a Review
              </Button>
          */}

            {!order.is_review_present && ["delivered", "returned"].includes(order?.status?.toLowerCase()) &&
              <Button
                color="link order-write-review"
                onClick={openProductRatingModal}
              >
                {orderlang.get("writeAReview", "Write a Review")}
              </Button>
            }
          </div>
        </div>
        {order.order_items.map((item, index) => (
          <>
            <div className={(index >= 1) ? "py-3 d-flex align-items-center yt-order-wrapper-box w3-ripple  yt-border-order" : "py-3 d-flex align-items-center yt-order-wrapper-box "} >
              <div className="od-product-img p-1 w3-ripple"  style={{ cursor: "pointer" }} onClick={() => routeToOrderDetails(order, item)}>
                {console.log(`item-${index}`, item.product_variant)}
                <img
                  src={item.product_variant && item.product_variant.images[0] ? item.product_variant.images[0].image : item.product_image}
                  className="img-fluid"
                />
              </div>
              <div className="d-flex align-items-center">
                <div className="order-product-info">
                  <h2
                    className="pp-order-product-ttl mt-0 w3-ripple"
                    style={{ cursor: "pointer" }}
                    onClick={() => routeToOrderDetails(order, item)}
                  >
                    {item.product_name}
                  </h2>
                  <div className="order-prodict-type-container">
                    {item.product_variant ? <Table className="mb-0 order-prodict-type d-block" borderless>
                      <thead>
                        <tr>
                        {item.product_variant.product_variant_properties.map((value, idx) => (<th>{value.variant_name?.toUpperCase()}</th>))}
                       </tr>
                      </thead>
                      <tbody>
                        <tr>
                        {item.product_variant.product_variant_properties.map((value, idx) => (<td>{_.capitalize(value.property_name)}</td>))}
                        </tr>
                      </tbody>
                    </Table> : <div></div>}
                  </div>
                </div>
              </div>
              <div className="order-product-quanity text-center text-sm-right">
                <ul className="p-0 order-ul-list-none m-0 yt-qt-prc d-flex flex-wrap">
                  <li className="op-order-quantity mb-3">
                    {orderlang.get("quantity", "Quantity: ")}
                    <span className="ord-product-quantity">{item.quantity}</span>
                  </li>
                  <li className="op-order-product-price align-self-end">
                    <span className="order-product-price">{item.data?.currency} {parseFloat(item.data?.totalAmount || 0).toFixed(2)}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-right">
              <span style={{ color: "var(--color-green)", fontSize: "28px", verticalAlign: "sub" }}>&#8226;</span> {_.capitalize(item.status)}
            </div>
          </>
        ))}
      </div>
      {/* {orderlang.get("writeAReview", "Write a Review")} */}
      <div class="w3-border my-3"></div>
      <div className="text-right">
        <Button
          color="link od-cancel-btn"
          onClick={["placed", "confirmed"].includes(order.status.toLowerCase()) ? () => openCancelOrderModal(order) : undefined}
          style={["placed", "confirmed"].includes(order.status.toLowerCase()) ? {} : { textDecoration: "none", cursor: "default" }}
        >
          {["placed", "confirmed"].includes(order.status.toLowerCase()) ?
            <span style={{ color: "#e65e52" }}>
              {orderlang.get("cancelOrder", "Cancel Order")}
            </span>
            :
            _.capitalize(order.status)
          }
        </Button>
      </div>
    </div >
  );
}
function OrderDetails(props) {

  return (
    <div className="order-main-wrapper">
      {
        props.order.map((order, index) => (<SingleOrders {...props} order={order} />))
      }
    </div>
  );
}


function NoOrder() {
  const orderlang = new lang("myOrderScreen");
  const history = useHistory();
  const routeToshop = () => {
    let path = "/shop";
    history.push(path);
  };

  return (
    <div className="profile-pg-inner-wrap profile-pg-inner-no-order p-3 bg-white radius-10 mb-4">
      <div className="profile-pg-inner-wrapper">
        <div className="profile-pg-order-main-wrap text-center ">

          <img
            src={require("./images/no-order-icn.png")}
            className="img-fluid  mb-5"
          />
          <div className="pp-sa-order-wrap mb-5 mt-2">
            <h2 className="pp-od-no-ttl mt-0 mb-3">
              {orderlang.get("noAnyOrder", "No any order")}</h2>
            <p className="pp-od-no-text mb-0">
              {orderlang.get("noOrderText", "You haven’t order any items, Browse items and order it")}
            </p>
          </div>
          <Button
            color="secondary pp-no-order-btn py-3 px-3"
            onClick={routeToshop}
          >
            {orderlang.get("browseProducts", "Browse Products")}
          </Button>
        </div>
      </div>
    </div>
  );
}


function MyOrderPage(props) {
  const [ShowOrders, setShowOrders] = useState(true);
  console.log("My orders page", props);
  // if(props.orders?.length){
  //   setShowOrders(true)
  // }
  return <>{props.orders && props.orders.length > 0 ? <OrderDetails order={props.orders} {...props} /> : <NoOrder />}</>;

}
export default MyOrderPage;
