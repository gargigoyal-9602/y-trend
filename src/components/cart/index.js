import React, { useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom"
import "./css/index.scoped.css";
import { CartQuantityField } from "../../components";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Input,
  FormGroup,
  Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { AllModal, LoginComponent } from "../../components";
import { useHistory, useParams, Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { string } from "prop-types";
import commands from "../../commands";
import CartState from "../../redux/states/cart";
import AuthState from "../../redux/states/auth";
import Ripple from "react-ripples";
import * as validationSchemas from '../../validationSchemas';
import { Formik } from 'formik';
import { addAddressToCart } from "../../services/serviceTypes";
import { Helmet } from "react-helmet";
import Screens from "../../screens";
import IframeResizer from 'iframe-resizer-react';
import { useSelector } from "react-redux";
import lang from "../../language";

function FieldError({ error, touched }) {
  return (error && touched) ? (
    <div style={{ color: "#e65e52", marginBottom: "10px" }}>
      {error}
    </div>)
    : null;
}
function EmptyCartContent() {
  const emptycartlang = new lang("cartScreen");
  const history = useHistory();
  const routeToshop = () => {
    let path = "/shop";
    history.push(path);
  };
  return (
    <>
      <CartBreadCrumbs />

      <section>
        <Container>
          <Row>
            <Col md={12}>
              <h1 class="cart-page-main-title mt-0 empty-main-ttl">
                {emptycartlang.get("cart", "Cart")}
              </h1>
            </Col>
          </Row>
          <div class="yt-empty-cart-wrap cart-pg-inner-wrap p-4 bg-white radius-10 cart-pg-mb-30 mt-5">
            <div class="cart-pg-empty-main-wrap text-center py-5">
              <img
                src={require("./images/cart-empty-icn.png")}
                class="img-fluid"
                width="170"
                height="212"
              />
              <div class="cartno-wrap">
                <h2 class="empty-cartn-ttl mt-0">
                  {emptycartlang.get("emptyCart", "Your cart is empty !")} </h2>
                <p class="empty-cart-text mb-0">
                  {emptycartlang.get("emptyCart", "You haven’t added any items in your cart yet !")}
                </p>
              </div>
              <Ripple>
                <Button
                  color="secondary empty-cart-btn py-3 px-5"
                  onClick={routeToshop}
                >
                  {emptycartlang.get("browseProducts", "Browse Products")}
                </Button>
              </Ripple>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
function CartBreadCrumbs() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div class="pageroute cart-pg-breadcrumbs my-3">
            <Link to="/">
              <span class="cart-pg-home w3-hover-opacity" style={{ cursor: "default" }}>Home</span>
            </Link>
            {" > "}
            <span class="cart-pg-current">Cart</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function CartCheckoutform(props) {

  const confirmordercartlang = new lang("confirmOrderScreen");
  const [CardType, setCardType] = useState("");
  const handleChange = (e) => {
    const { id } = e.target;
    const item = document.getElementById(id).getAttribute("data-item");
    let data = "";
    switch (item) {
      case "payment1":
        data = "Card 1";
        break;
      case "payment2":
        data = "Card 2";
        break;
      case "payment3":
        data = "Card 3";
        break;
      default:
        data = "No Match Found";
        break;
    }
    setCardType(data);
  };

  const [ShowSelectAddressModal, setShowSelectAddressModal] = useState(false);
  const [ShowShippingSelectAddressModal, setShowShippingSelectAddressModal] = useState(false);

  const onContinueAddressModal = ({ type, address, setFieldValue, values }) => {

    const addressToFill = commands.cart.convertAddress({ type, extaddress: address });

    if (typeof addressToFill === "object") {

      // Object.keys(addressToFill).forEach((key, idx) => setFieldValue(key, addressToFill[key]));
      setFieldValue({ ...values, ...addressToFill });
    }
    setShowSelectAddressModal(false);
    setShowShippingSelectAddressModal(false);
  }

  const [ifUserLoggedIn, setifUserLoggedIn] = useState("");

  const [isShippingAddressSame, setIsShippingAddressSame] = useState(true);
  const [saveBillingAddress, setSaveBillingAddress] = useState(false);
  const [saveShippingAddress, setSaveShippingAddress] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [values, setValues] = useState(undefined);
  const paymentModes = { cashondelivery: "cashondelivery", debitcard: "debitcard" };
  const [paymentMode, setPaymentMode] = useState(paymentModes.cashondelivery);
  const [hyperPayId, setHyperPayId] = useState(undefined);
  const [iFrameHeight, setiFrameHeight] = useState("0px");
  const [initialAddress, setInitialAddress] = useState(undefined);
  const validationSchema = validationSchemas.addressForm;
  const history = useHistory();
  const cartState = CartState.get();
  const [currencies, setCurrencies] = useState(undefined);
  const [selectedCurrency, setSelectedCurrency] = useState(undefined);
  const [currencyddOpen, setcurrencyddOpen] = useState(false);
  const [frameSizeInterval, setFrameSizeInterval] = useState(undefined);
  const currencytoggle = () => setcurrencyddOpen((prevState) => !prevState);
  const data = props.data;

  useEffect(() => {
    if (paymentMode === paymentModes.cashondelivery) {
      if (frameSizeInterval) {
        clearInterval(frameSizeInterval);
      }
    }
  }, [paymentMode]);

  useEffect(async () => {

    if (history.location.hash === "#payment"/* && Array.isArray(cartState?.cart?.delivery_addresses) && cartState?.cart?.delivery_addresses.length > 0*/) {
      //setShowPaymentOptions(true);
      const isAllProductsAvailable = await commands.cart.checkAvailabilityAndBlock();
      if (isAllProductsAvailable) {
        setShowPaymentOptions(true);
      }
    } else if (history.location.hash === "#address") {
      setShowPaymentOptions(false);
    } else {
      history.push("/cart");
    }

  }, [history.location.hash]);

  useEffect(() => {
    if (values !== undefined) {
      addAddressToCart(values);
    }
  }, [values]);

  useEffect(() => {
    if (selectedCurrency === undefined || data.currency !== selectedCurrency) {
      setSelectedCurrency(data.currency);
    }
  }, [cartState.cart]);

  useEffect(() => {
    if (!currencies) {
      setCurrencies(cartState.currencies);
    }
  }, [cartState.currencies]);

  useEffect(() => {
    if (initialAddress === undefined) {
      //for cart address fillup
      //setInitialAddress(commands.cart.getCurrentAddress());



      setInitialAddress({
        saveBillingAddress: false,
        saveShippingAddress: false,

        bid: undefined,
        bname: "",
        bhouseNumber: "",
        baddressLine1: "",
        baddressLine2: "",
        bcity: "",
        bstate: "",
        bcountry: "",
        bpincode: "",
        bphone: "",

        isShippingAddressSame: true,


        sid: undefined,
        sname: "",
        shouseNumber: "",
        saddressLine1: "",
        saddressLine2: "",
        scity: "",
        sstate: "",
        scountry: "",
        spincode: "",
        sphone: "",


      });

    }
  }, []);

  async function addAddressToCart(values) {
    try {
      var billingAddress = {};
      var shippingAddress = {};
      var finalAddress = {};

      billingAddress = {
        name: values.bname,
        flat_no: values.bhouseNumber,
        address: values.baddressLine1,
        address_line_2: values.baddressLine2,
        city: values.bcity,
        state: values.bstate,
        country: values.bcountry,
        zip_code: values.bpincode,
        phone_number: values.bphone,
        is_default: false,
        save_address: values.saveBillingAddress
      }

      shippingAddress = {
        name: values.sname,
        flat_no: values.shouseNumber,
        address: values.saddressLine1,
        address_line_2: values.saddressLine2,
        city: values.scity,
        state: values.sstate,
        country: values.scountry,
        zip_code: values.spincode,
        phone_number: values.sphone,
        is_default: false,
        save_address: values.saveShippingAddress
      }

      if (values.isShippingAddressSame === true) {
        finalAddress = {
          billing_same_as_shipping: true,
          delivery_address_id: values.bid,
        };
        if (!values.bid) {
          finalAddress.address = billingAddress;
        }
      } else {
        finalAddress = {
          billing_same_as_shipping: false,
          delivery_address_id: values.sid,
          billing_address_id: values.bid,
        };

        if (!values.bid) {
          finalAddress.address = { billing_address: billingAddress }
        }

        if (!values.sid) {
          finalAddress.address = { ...finalAddress.address, ...shippingAddress };
        }

      }

      const success = await commands.cart.addAddress({ address: finalAddress });
      if (success === true) {
        //setShowPaymentOptions(true);
        history.push("#payment");
      }
    } catch (error) {
      window.notify([{ message: error.message || "Error occured while adding address to cart." }]);
    } finally {
      setValues(undefined);
    }
  }

  async function placeOrder() {
    const orderPlaced = await commands.cart.placeOrder();
    if (orderPlaced !== false) {
      history.push("/orderplaced?cartId=" + orderPlaced.id);
      commands.cache.getHomeProducts();
    }
  }

  async function getHyperPayId() {
    const paymentType = "DB";
    const id = await commands.cart.getHyperPayTransactionId({ paymentType });
    console.log("Received id is ", id);
    if (typeof id === "string") {
      setHyperPayId(id);
    }
  }

  useEffect(() => {

    if (paymentMode === paymentModes.debitcard) {
      getHyperPayId();
    }

  }, [paymentMode]);

  useEffect(() => {
    window.onmessage = (e) => {
      console.log("E data is ", e.data);
      //setiFrameHeight(e.data?.frameHeight + "px");
      if (e.data?.threeDFrameLoaded) {
        alert("threeDLOaded");
      }
    }
    return () => window.onmessage = undefined;
  }, []);


  return (
    <Fragment>
      <div class="checkout-form-wrap">
        <Form>
          {!showPaymentOptions ?
            <Fragment>
              {initialAddress &&
                <Formik
                  initialValues={initialAddress}
                  onSubmit={(values) => setValues(values)}
                  validationSchema={validationSchema}
                >
                  {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit: originalSubmit, setFieldValue, setValues, setErrors, setTouched, validateForm }) => {
                    const cacheState = useSelector((state) => state.cache);

                    useEffect(() => {
                      setValues(values);
                    }, [cacheState?.language]);

                    const handleSubmit = (e) => {
                      if (values.bid > 0 && Object.keys(errors).find((item) => item.charAt(0) === 'b')) {
                        setValues({ ...values, bid: undefined });
                      }

                      if (values.sid > 0 && Object.keys(errors).find((item) => item.charAt(0) === 's')) {
                        setValues({ ...values, sid: undefined });
                      }
                      originalSubmit(e);
                    }

                    return (
                      <Fragment>
                        <AllModal modalName="selectaddress" type="billing" isOpen={ShowSelectAddressModal} toggle={() => setShowSelectAddressModal(!ShowSelectAddressModal)} onContinue={onContinueAddressModal} setFieldValue={(values) => { setErrors({}); setTouched({}); setValues(values); }} values={values} />
                        <AllModal modalName="selectaddress" type="shipping" isOpen={ShowShippingSelectAddressModal} toggle={() => setShowShippingSelectAddressModal(!ShowShippingSelectAddressModal)} onContinue={onContinueAddressModal} setFieldValue={(values) => { setErrors({}); setTouched({}); setValues(values); }} values={values} />


                        <div class="cart-pg-inner-wrap bg-white radius-10 cart-pg-mb-30">
                          <div class="d-flex align-items-center justify-content-between mb-3">
                            <h2 class="cart-checkout-tile mt-0">
                              {confirmordercartlang.get("billingAddress", "Billing Address")}</h2>
                            <Button
                              color="link cart-select-aar-btn"
                              onClick={() => setShowSelectAddressModal(true)}
                            >
                              {confirmordercartlang.get("selectAddress", "Select Address")}
                            </Button>
                          </div>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("name", "Name")}
                                </span>
                                <Input
                                  type="text"
                                  name="bname"
                                  id="checkout-form-name"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('bname')}
                                  value={values.bname}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.bname} touched={touched.bname} />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("flatNumber", "Flat / House / Apartment No.")}

                                </span>
                                <Input
                                  type="text"
                                  name="bhouseNumber"
                                  id="checkout-form-address"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('bhouseNumber')}
                                  value={values.bhouseNumber}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.bhouseNumber} touched={touched.bhouseNumber} />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("addressLine1", "Address Line 1")}
                                </span>
                                <Input
                                  type="text"
                                  name="baddressLine1"
                                  id="checkout-form-address-2"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('baddressLine1')}
                                  value={values.baddressLine1}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.baddressLine1} touched={touched.baddressLine1} />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("addressLine2", "Address Line 2")}
                                </span>
                                <Input
                                  type="text"
                                  name="baddressLine2"
                                  id="checkout-form-address-3"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('baddressLine2')}
                                  value={values.baddressLine2}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.baddressLine2} touched={touched.baddressLine2} />

                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("city", "City")}
                                </span>
                                <Input
                                  type="text"
                                  name="bcity"
                                  id="checkout-form-city"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('bcity')}
                                  value={values.bcity}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.bcity} touched={touched.bcity} />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("state", "State")}
                                </span>
                                <Input
                                  type="text"
                                  name="bstate"
                                  id="checkout-form-state"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('bstate')}
                                  value={values.bstate}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.bstate} touched={touched.bstate} />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("country", "Country")}
                                </span>
                                <Input
                                  type="text"
                                  name="bcountry"
                                  id="checkout-form-country"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('bcountry')}
                                  value={values.bcountry}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.bcountry} touched={touched.bcountry} />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("pinCode", "Pin Code")}
                                </span>
                                <Input
                                  type="text"
                                  name="bpincode"
                                  id="checkout-form-pincode"
                                  className="py-2 border-0 pl-0"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('bpincode')}
                                  value={values.bpincode}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.bpincode} touched={touched.bpincode} />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <span class="checkout-form-label">
                                  {confirmordercartlang.get("phoneNumber", "Phone Number")}
                                </span>
                                <Input
                                  type="number"
                                  name="bphone"
                                  id="checkout-form-ph-number"
                                  className="py-2 border-0 pl-0 yt-remove-arrow"
                                  onChange={handleChange}
                                  onBlur={() => setFieldTouched('bphone')}
                                  value={values.bphone}
                                  disabled={values.bid}
                                />
                                <FieldError error={errors.bphone} touched={touched.bphone} />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <div class="checkout-checkbox d-flex flex-wrap my-3">
                                <FormGroup className="mr-5">
                                  <span className="yt-checkout-chekbox-label">
                                    {confirmordercartlang.get("sameBillingAndShipping", "My billing and shipping address are the same")}
                                  </span>
                                  <Input
                                    type="checkbox"
                                    id="checkout-billing-addr"
                                    name="isShippingAddressSame"
                                    checked={values.isShippingAddressSame}
                                    onChange={handleChange}
                                  />{" "}
                                  <Label className="yt-checkout-form-chk-box" check />
                                </FormGroup>
                                {/** 
                              <FormGroup>
                                <span className="yt-checkout-chekbox-label">
                                  Save Address
                                </span>
                                <Input
                                  type="checkbox"
                                  id="save-addr"
                                  name="saveBillingAddress"
                                  checked={values.saveBillingAddress}
                                  onChange={handleChange}
                                />{" "}
                                <Label className="yt-checkout-form-chk-box" check />
                              </FormGroup>
                              */}
                              </div>
                            </Col>
                          </Row>
                          {!values.isShippingAddressSame &&
                            <Fragment>
                              <div class="d-flex align-items-center justify-content-between mb-3">
                                <h2 class="cart-checkout-tile mt-0">
                                  {confirmordercartlang.get("shippingAddress", "Shipping Address")}</h2>
                                <Button
                                  color="link cart-select-aar-btn"
                                  onClick={() => setShowShippingSelectAddressModal(true)}
                                >
                                  {confirmordercartlang.get("selectAddress", "Select Address")}
                                </Button>
                              </div>
                              <Row form>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("name", "Name")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="sname"
                                      id="checkout-form-shiping-name"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('sname')}
                                      value={values.sname}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.sname} touched={touched.sname} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("flatNumber", "Flat / House / Apartment No.")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="shouseNumber"
                                      id="checkout-form-shiping-address"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('shouseNumber')}
                                      value={values.shouseNumber}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.shouseNumber} touched={touched.shouseNumber} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("addressLine1", "Address Line 1")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="saddressLine1"
                                      id="checkout-form-shiping-address-1"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('saddressLine1')}
                                      value={values.saddressLine1}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.saddressLine1} touched={touched.saddressLine1} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("addressLine2", "Address Line 2")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="saddressLine2"
                                      id="checkout-form-shiping-address-2"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('saddressLine2')}
                                      value={values.saddressLine2}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.saddressLine2} touched={touched.saddressLine2} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("city", "City")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="scity"
                                      id="checkout-form-shiping-city"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('scity')}
                                      value={values.scity}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.scity} touched={touched.scity} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("state", "State")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="sstate"
                                      id="checkout-form-shiping-state"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('sstate')}
                                      value={values.sstate}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.sstate} touched={touched.sstate} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("country", "Country")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="scountry"
                                      id="checkout-form-shiping-country"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('scountry')}
                                      value={values.scountry}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.scountry} touched={touched.scountry} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("pinCode", "Pin Code")}
                                    </span>
                                    <Input
                                      type="text"
                                      name="spincode"
                                      id="checkout-form-shiping-pincode"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('spincode')}
                                      value={values.spincode}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.spincode} touched={touched.spincode} />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <span class="checkout-form-label">
                                      {confirmordercartlang.get("phoneNumber", "Phone Number")}
                                    </span>
                                    <Input
                                      type="number"
                                      name="sphone"
                                      id="checkout-form-shiping-ph-number"
                                      className="py-2 border-0 pl-0"
                                      onChange={handleChange}
                                      onBlur={() => setFieldTouched('sphone')}
                                      value={values.sphone}
                                      disabled={values.sid}
                                    />
                                    <FieldError error={errors.sphone} touched={touched.sphone} />
                                  </FormGroup>
                                </Col>
                                <Col md={12}>
                                  <div class="checkout-checkbox d-flex flex-wrap my-3">
                                    {/**
                                  <FormGroup>
                                    <span className="yt-checkout-chekbox-label">
                                      Save Address
                                </span>
                                    <Input
                                      type="checkbox"
                                      id="checkout-form-shiping-save-address"
                                      name="saveShippingAddress"
                                      checked={values.saveShippingAddress}
                                      onChange={handleChange}
                                    />{" "}
                                    <Label className="yt-checkout-form-chk-box" check />
                                  </FormGroup> */}
                                  </div>
                                </Col>
                              </Row>
                            </Fragment>}
                        </div>
                        <div class="d-none">
                          <div class="w3-gray" style={{ overflowWrap: "break-word" }}>
                            {JSON.stringify(values)}
                          </div>
                          <br />
                          <div style={{ overflowWrap: "break-word" }}>
                            {JSON.stringify(errors)}
                          </div>
                        </div>
                        <div class="text-right">
                          <Ripple>
                            <Button color="btn btn-secondary cart-proceed-to-checkput py-3 px-5" onClick={handleSubmit}>
                              {confirmordercartlang.get("proceedButton", "Proceed")}
                            </Button>
                          </Ripple>
                        </div>
                      </Fragment>);

                  }
                  }
                </Formik>
              }
            </Fragment>
            :
            <Fragment>
              <div class="cart-pg-inner-wrap bg-white radius-10 cart-pg-mb-30">
                <h2 class="cart-checkout-tile mt-0 mb-3">
                  {confirmordercartlang.get("paymentOption", "Payment Option")}
                </h2>
                <Row>
                  <Col md={12}>
                    <div class="yt-chekout-radio d-flex flex-wrap my-3 justify-content-between">
                      <div className="yt-cart-radio-slct-wrap d-flex flex-wrap align-items-center">
                        <FormGroup className="mr-2">
                          <span class="checkout-form-label">
                            {confirmordercartlang.get("cashOnDelivery", "Cash On Delivery")}
                          </span>

                          <Input
                            checked={paymentMode === paymentModes.cashondelivery}
                            type="radio"
                            id="checkout-form-payment-radio1"
                            name="checkout-form-payment-radio1"
                            data-item="payment1"
                            onChange={(e) => { handleChange(e); setPaymentMode(paymentModes.cashondelivery) }}
                          />
                          <Label className="yt-checkout-form-rado-box" check></Label>
                        </FormGroup>
                        <FormGroup>
                          <span class="checkout-form-label">
                            {confirmordercartlang.get("credit_Debit_card", "Credit/Debit card")}
                          </span>

                          <Input
                            checked={paymentMode === paymentModes.debitcard}
                            type="radio"
                            id="checkout-form-payment-radio2"
                            name="checkout-form-payment-radio1"
                            data-item="payment2"
                            onChange={(e) => { handleChange(e); setPaymentMode(paymentModes.debitcard) }}
                          />{" "}

                          <Label className="yt-checkout-form-rado-box" check></Label>
                        </FormGroup>
                      </div>

                      {/*
                      <FormGroup className="yt-currency-wrap">
                        <span style={{ marginRight: "0.5rem" }}>Currency: </span>
                        <Dropdown isOpen={currencyddOpen} toggle={currencytoggle}>
                          <DropdownToggle caret>
                            {selectedCurrency}
                          </DropdownToggle>
                          <DropdownMenu>
                            {currencies?.map((item, index) => <DropdownItem onClick={() => { setSelectedCurrency(item.name); commands.cart.updateCurrency({ currency: item.name }) }}>{item.name}</DropdownItem>)}
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                        */}
                      {/*
                      <FormGroup>
                        <span class="checkout-form-label">Payment Option 3</span>
                        <Input
                          type="radio"
                          id="checkout-form-payment-radio3"
                          name="checkout-form-payment-radio1"
                          data-item="payment2"
                          onChange={handleChange}
                        />{" "}
                        <Label className="yt-checkout-form-rado-box" check></Label>

                      </FormGroup>*/
                      }
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="yt-chekout-card-wrap">
                      <Row>
                        {/**
                        <Col md={5} >
                          <div class="checkout-form-visa-type">{CardType}</div>
                        </Col> */}
                        {(paymentMode === paymentModes.debitcard && false) &&
                          <Col md={12}>
                            <Row>
                              <Col md={12}>
                                <h2 class="cart-checkout-tile mt-0 mb-4">
                                  Card Details
                              </h2>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <span class="checkout-form-label">Card Number</span>
                                  <Input
                                    type="number"
                                    name="checkout-form-payment-card-number"
                                    id="checkout-form-payment-card"
                                    className="py-2 border-0 pl-0 yt-remove-arrow"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <span class="checkout-form-label">Card Holder</span>
                                  <Input
                                    type="number"
                                    name="checkout-form-payment-card-name"
                                    id="checkout-form-payment-name"
                                    className="py-2 border-0 pl-0 yt-remove-arrow"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <span class="checkout-form-label">
                                    Expiry (MM/YY)r
                                  </span>
                                  <Input
                                    type="date"
                                    name="checkout-form-payment-card-expiry"
                                    id="checkout-form-payment-expiry"
                                    className="py-2 border-0 pl-0"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={6}>
                                <FormGroup>
                                  <span class="checkout-form-label">CVV</span>
                                  <Input
                                    type="number"
                                    name="checkout-form-payment-card-code"
                                    id="checkout-form-payment-code"
                                    className="py-2 border-0 pl-0 yt-remove-arrow"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        }
                        {(paymentMode === paymentModes.debitcard && typeof hyperPayId === "string") &&
                          <Col md={12}>
                            <Row>
                              <Col md={12}>
                                <h2 class="cart-checkout-tile mt-0 mb-4">
                                  Card Details
                              </h2>
                              </Col>
                              <Col md={12}>
                                <iframe
                                  url
                                  src={`/payment?id=${hyperPayId}&cartId=${cartState.cart?.id}`}
                                  frameBorder="0"
                                  style={{ height: iFrameHeight, width: "100%" }}
                                  onLoad={(e) => {
                                    if (frameSizeInterval) {
                                      clearInterval(frameSizeInterval);
                                    }
                                    setFrameSizeInterval(setInterval(() => {
                                      setiFrameHeight(e.target.contentWindow.document.body.scrollHeight);
                                      //console.log("current url ",e.target.contentWindow.location.href );
                                    }, 100));

                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        }
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="text-right">
                <Ripple>
                  {(paymentMode === paymentModes.cashondelivery) &&
                    <Button color="btn btn-secondary cart-proceed-to-checkput py-3 px-5" onClick={placeOrder}>

                      {confirmordercartlang.get("placeOrder", "Place Order")}
                    </Button>
                  }
                  {(paymentMode === paymentModes.debitcard && false) &&
                    <Button color="btn btn-secondary cart-proceed-to-checkput py-3 px-5" onClick={() => alert("Proceed to Pay pressed")}>
                      Pay
                    </Button>
                  }
                </Ripple>
              </div>
            </Fragment>
          }
        </Form>
      </div>
    </Fragment >
  );
}
function CartPageCheckoutContent(props) {
  return (
    <div class="cart-checkout-wrap">
      <Row>
        <Col md={12}>
          <CartCheckoutform data={props.data} />
        </Col>
      </Row>
    </div>
  );
}
function CartProductListData(props) {
  const confirnordercartlang = new lang("confirmOrderScreen");
  const cartscreenlang = new lang("cartScreen");

  const [ShowCheckout, setShowCheckout] = useState(false);
  const [ShowCart, setShowCart] = useState(false);
  const [cartTitle, setcarttitle] = useState(true);
  const [ShowLogin, setShowLogin] = useState(false);
  const authState = AuthState.get();
  const cartState = CartState.get();
  const history = useHistory();
  const params = useParams();
  const cart = cartState.cart;

  const data = {
    currency: typeof cart.total_with_currency === "string" && cart.total_with_currency.split(" ")[0],
    totalAmount: cart.is_default_currency ? cart.total : cart.total_with_currency?.split(" ")[1],
    subTotal: cart.is_default_currency ? cart.sub_total : cart.sub_total_with_currency?.split(" ")[1],
    deliveryCharges: cart.is_default_currency ? cart.shipping_charges?.shipping_total : cart.shipping_total_with_currency?.split(" ")[1],
    tax: cart.is_default_currency ? cart.total_tax : cart.total_tax_with_currency?.split(" ")[1],
    discount: cart.is_default_currency ? cart.applied_discount : cart.applied_discount_with_currency?.split(" ")[1]
  };


  console.log("hiss ", history);

  const CheckoutBtn = () => {
    setShowCheckout(!ShowCheckout);
    setcarttitle(!cartTitle);
  };

  useEffect(() => {
    if (history.location.hash === "#address" || history.location.hash === "#payment") {
      showCheckoutForm();
    } else {
      showCartForm();
    }
    commands.cart.getCurrencies();
  }, [history.location.hash]);

  function showLoginForm() {
    setShowLogin(true);
    setShowCart(false);
    setShowCheckout(false);
  }

  function showCartForm() {
    setShowLogin(false);
    setShowCart(true);
    setShowCheckout(false);
  }
  function showCheckoutForm() {
    setShowLogin(false);
    setShowCart(false);
    setShowCheckout(true);
  }



  function getProducts() {
    var products = [];
    var items = cartState.cart?.order_items;

    if (Array.isArray(items)) {
      products = items.map((item, idx) => {
        item.currency = data.currency;
        return <CartProduct key={idx} product={item} />;
      });
    }

    return products;
  }

  async function proceedToCheckoutForm() {
    console.log("It is ", commands.user.isLoggedIn());
    if (commands.user.isLoggedIn()) {
      /*
            const isAllProductsAvailable = await commands.cart.checkAvailabilityAndBlock();
            console.log("Returned value is ", isAllProductsAvailable);
            if (isAllProductsAvailable) {
              //showCheckoutForm();
              history.push("#address");
            }
            */
      history.push("#address");
    } else {
      history.push(`/login?redirect=${history.location.pathname}`);
    }
  }



  return (
    <>
      <section class="cat-main-wrapper mb-4">
        <Container>
          <Row>
            <Col md={12}>
              <h1 class="cart-page-main-title mt-0">
                {cartTitle ? cartscreenlang.get("cart", "Cart") : "Secure Checkout"}
              </h1>
            </Col>
          </Row>

          {ShowLogin && (
            <Row>
              <Col md={12}>
                <LoginComponent
                  className="login-on-cart-page login-box-top"
                  container={true}
                  active="2"
                />
              </Col>
            </Row>
          )}
          <Row className="yt-cm-row">
            <Col md={7} className="yt-cm-lt-col">
              {ShowLogin ? (
                <LoginComponent
                  className="login-on-cart-page login-box-bottom"
                  container={true}
                  active="2"
                />
              ) :
                <Fragment>
                  {ShowCheckout ? (
                    <CartPageCheckoutContent data={data} />
                  ) : (
                    <Fragment>
                      {getProducts()}
                    </Fragment>
                  )}
                </Fragment>
              }
            </Col>
            <Col md={5} className="yt-cm-rt-col">
              {(ShowCart || ShowCheckout) && <CartAmount cart={cartState.cart} data={data} />}
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              {ShowCheckout ? <div></div>/*<div class="text-right">
                <Ripple>
                  <Button
                    color="btn btn-secondary cart-proceed-to-checkput cart-pp-btn cart-btn-bill-pg py-3 px-5"
                    onClick={CheckoutBtn}
                  >
                    Proceed to Pay
                  </Button>
                </Ripple>
            </div>*/
                :
                <Fragment>
                  {ShowCart &&
                    <div class="text-right">
                      <Ripple>
                        <Button
                          color="btn btn-secondary cart-proceed-to-checkput cart-pp-btn py-3 px-5"
                          onClick={proceedToCheckoutForm}
                        >
                          {confirnordercartlang.get("proceedButton", "Proceed")}
                        </Button>
                      </Ripple>
                    </div>}
                </Fragment>
              }

            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
function CartPageContent() {
  return (
    <>
      <CartBreadCrumbs />

      <CartProductListData />
    </>
  );
}
function CartAmount({ cart, data, ...props }) {
  const confirnordercartlang = new lang("confirmOrderScreen");

  const [CheckCouponCode, setCheckCouponCode] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeEmptyError, setCodeEmptyError] = useState(false);
  const [enableInput, setEnableInput] = useState(true);
  const checkCoupon = () => {
    setCheckCouponCode(!CheckCouponCode);
  };


  function getProducts() {
    var items = [];
    if (Array.isArray(cart.order_items) && cart.order_items.length) {

      cart.order_items.forEach((item, idx) => {
        if (!cart.is_default_currency) {
          item.total_price = item.total_price_with_currency.split(" ")[1];
        }
        items.push(
          <tr key={idx}>
            <td>
              <span class="cart-product-amount-ttl">
                {item.quantity} x {item.product_name}
              </span>
            </td>
            <td>
              <span class="cart-product-amount-price">{data.currency} {item.total_price}</span>
            </td>
          </tr>
        )
      });
    }
    return items;
  }

  useEffect(() => {
    if (cart.coupon === null) {
      setEnableInput(true);
    } else {
      setEnableInput(false);
    }
    setCouponCode(cart.coupon?.code || "");
  }, [cart.coupon, cart.coupon?.code]);

  function onApplyCoupon() {
    setCodeError("");
    setCodeEmptyError(false);
    if (couponCode.length > 0) {
      commands.cart.applyCoupon({ couponCode, onError: (err) => { setCodeError(err); setCodeEmptyError(false); } });
    }
    else {
      setCodeEmptyError(true);
    }
  }




  return (
    <div class="radius-10 bg-white yt-cart-price-lister">
      <Table className="mb-0 cart-prodict-amount " borderless>
        <thead>
          <tr>
            <th>
              {confirnordercartlang.get("yourCart", "Your Cart")}</th>
            <th>
              {confirnordercartlang.get("amount", "Amount")}</th>
          </tr>
        </thead>
        <tbody>
          {getProducts()}
        </tbody>
      </Table>
      <Table className="yt-sub-ttl-tbl-wrap">
        <tbody>
          <tr>
            <td style={{ paddingLeft: 0 }}>
              <span class="cart-product-amount-ttl">
                {confirnordercartlang.get("subTotal", "Sub Total")}</span>
            </td>
            <td style={{ paddingRight: 0 }}>
              <span class="cart-product-amount-price cart-sub-total">{data.currency} {data.subTotal}</span>
            </td>
          </tr>
        </tbody>
      </Table>
      <span class="cart-divider" />
      <Table className="mb-0 cart-prodict-total-amount " borderless>
        <tbody>
          <tr>
            <td>
              <span class="cart-product-amount-ttl">
                {confirnordercartlang.get("taxes", "Taxes")}</span>
            </td>
            <td>
              <span class="cart-product-amount-price">+ {data.currency} {data.tax}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="cart-product-amount-ttl">
                {confirnordercartlang.get("deliveryCharges", "Delivery Charges")}</span>
            </td>
            <td>
              <span class="cart-product-amount-price">+ {data.currency} {data.deliveryCharges}</span>
            </td>
          </tr>
        </tbody>
      </Table>
      <span class="cart-divider" />
      <div class="cart-coupon mt-3">
        <Form className="yt-cart-disct-wrap pb-4">
          <FormGroup className={"m-0 " + ((codeError || codeEmptyError) ? 'yt-form-cpn-err error' : '') + ((cart.coupon && !codeError && !codeEmptyError) ? 'success' : '')}>
            <input
              type="text"
              class="form-control"
              id="cart-total-products-amount"
              placeholder={confirnordercartlang.get("applyCouponButton", "Apply Coupon")}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}

              disabled={!enableInput}
            />
            <div class="pb-3 d-flex align-items-center cart-coupon-bottom-wrapper justify-content-between">
              {(cart.coupon && !codeError) &&
                <span class="cart-coupon-code-message success-message" style={{ color: "#43b7a7", display: "block" }}>
                  {confirnordercartlang.get("couponCodeSuccess", "Great ! Coupon Code Applied")}

                </span>
              }
              <span class="cart-coupon-code-message error-message">
                {codeEmptyError && confirnordercartlang.get("couponCodeCanntEmpty", "Coupon code can't be empty")}
                {codeError}
              </span>
              {/*(cart.coupon && !enableInput)*/ false &&
                <Button color="link cart-coupon-change-btn p-0" onClick={() => { setEnableInput(true); setCodeError(""); }}>
                  {confirnordercartlang.get("changeCoupon", "Change Coupon")}

                </Button>
              }
              {(cart.coupon && !enableInput) &&
                <Button color="link cart-coupon-change-btn p-0" onClick={() => { setCodeError(""); commands.cart.removeCoupon({ onError: (err) => { setCodeError(err || "Error in removing coupon"); window.location.reload() } }); }}>
                  {confirnordercartlang.get("removeCoupon", "Remove Coupon")}

                </Button>
              }
            </div>

            {/*typeof cart.coupon?.code === "string" && couponCode === cart.coupon?.code ?
              <Button color="secondary cart-coupon-btn" onClick={() => { setCodeError(false); commands.cart.removeCoupon({ onError: () => { setCodeError(true); window.location.reload() } }); }}>
                Remove
            </Button> :
              <Button color="secondary cart-coupon-btn" onClick={onApplyCoupon}>
                Apply
            </Button>*/}
            <Button color="secondary cart-coupon-btn" onClick={onApplyCoupon} disabled={!enableInput}>
              {confirnordercartlang.get("applyCouponButton", "Apply")}

            </Button>
          </FormGroup>
        </Form>
        {cart.coupon &&
          <div>
            <Table className="mt-2 mb-0 cart-prodict-total-amount " borderless>
              <tbody>
                <tr>
                  <td>
                    <span class="cart-product-amount-ttl">
                      {confirnordercartlang.get("discount", "Discount")}
                    </span>
                  </td>
                  <td>
                    <span class="cart-product-amount-price">- {data.currency} {data.discount}</span>
                  </td>
                </tr>
              </tbody>
            </Table>
            <span class="cart-divider" />
          </div>
        }
      </div>
      <Table className="mb-0 cart-prodict-sub-total-amount " borderless>
        <tbody>
          <tr>
            <td>
              <span class="cart-product-amount-ttl" style={{ color: "black" }}>
                {confirnordercartlang.get("totalAmount", "Total Amount")}
              </span>
            </td>
            <td>
              <span class="cart-product-amount-price cart-sub-total">{data.currency} {data.totalAmount}</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </div >
  );
}

function CartProduct({ product, ...props }) {
  const productcartlang = new lang("productListingScreen");

  const [quantity, setQuantity] = useState(product.quantity || 0);
  const maxQuantity = (product.product_variant != null && typeof product.product_variant === "object") ? product.product_variant?.available_quantity || 0 : (product.product?.stock_qty || 0) - (product.product?.block_qty || 0);
  const { cart } = CartState.get();

  var color = "";
  var size = "";
  const history = useHistory();
  function getColorAndSize() {
    var properties = product.product_variant?.product_variant_properties;
    if (Array.isArray(properties)) {
      properties.forEach((item, idx) => {
        if (item.variant_name === "color") {
          color = item.property_name || "";
        } else if (item.variant_name === "size") {
          size = item.property_name || "";
        }
      });
    }
  }
  getColorAndSize();
  const properties = Array.isArray(product.product_variant?.product_variant_properties) ? product.product_variant?.product_variant_properties : undefined;

  if (product.quantity !== quantity) {
    setQuantity(product.quantity);
  }

  product.price = cart.is_default_currency ? product.unit_price : product.unit_price_with_currency?.split(" ")[1];

  return (product.product_variant != null && typeof product.product_variant === "object") ?
    <div class="cart-produt-list-wrap radius-10 bg-white cart-pg-mb-30">
      <div className="d-flex flex-wrap cart-pg-product-list-row justify-content-between">
        <div className="cart-pg-list-image">
          <div class="cart-product-image p-1 w3-ripple" onClick={() => history.push(`/shop/${product?.product?.id}`)} style={{ cursor: "pointer" }} >
            {(Array.isArray(product.product_variant?.images) && product.product_variant?.images.length > 0) ?
              <img
                src={product.product_variant?.images[0]?.image || "#null" || require("./images/order-product-img.png")}
                class="img-fluid"
              /> :
              <img
                src={(product?.product?.images[0]?.image) || "/images/thumb/missing.png"}
                class="img-fluid"
              />
            }
          </div>
        </div>
        <div className="cart-pg-list-prdt-info d-flex justify-content-between">
          <div class="cart-prodict-info" style={{ cursor: "default" }} >
            <h2 class="cart-product-title mt-0 w3-ripple" style={{ cursor: "pointer" }}  onClick={() => history.push(`/shop/${product?.product?.id}`)}>
              {product.product_name}
            </h2>
            <div className="cart-prodict-type-container">
            <Table className="cart-prodict-type w-auto" borderless>
              <thead>
                <tr>
                  {properties.map((item, idx) => <th>{_.capitalize(item.variant_name)}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {properties.map((item, idx) => <th>{_.upperCase(item.property_name)}</th>)}
                </tr>
              </tbody>
            </Table>
            </div>
            <span class="cart-product-price">{product.currency} {product.price}</span>
          </div>
          <div class="cart-list-other-act">
            <div class="cart-action-wrap text-right w-100">
              <div class="cart-product-delete p-2 w3-ripple" onClick={() => commands.cart.removeItem({ productId: product?.product?.id, variantId: product?.product_variant?.id })}>
                <FaTrashAlt />
              </div>
            </div>
            <div class="cart-action-wrap text-right">
              <div class="cart-quantity-box">
                <CartQuantityField CartQuantityVal={quantity} setCartQuantityVal={(val) => { setQuantity(val); commands.cart.updateItem({ productId: product?.product?.id, variantId: product?.product_variant?.id, quantity: val }) }} maxQuantity={maxQuantity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    <div class="cart-produt-list-wrap radius-10 bg-white cart-pg-mb-30">
      <div className="d-flex flex-wrap cart-pg-product-list-row justify-content-between">
        <div className="cart-pg-list-image">
          <div class="cart-product-image p-1 w3-ripple" onClick={() => history.push(`/shop/${product?.product?.id}`)} style={{ cursor: "pointer" }} >
            {(Array.isArray(product.product?.images) && product.product?.images.length > 0) ?
              <img
                src={product.product?.images[0]?.image || "#null" || require("./images/order-product-img.png")}
                class="img-fluid"
              /> :
              <img
                src={(product?.product?.images[0]?.image) || "/images/thumb/missing.png"}
                class="img-fluid"
              />
            }
          </div>
        </div>
        <div className="cart-pg-list-prdt-info d-flex justify-content-between">
          <div class="cart-prodict-info w3-ripple" style={{ cursor: "default" }} onClick={() => history.push(`/shop/${product?.product?.id}`)}>
            <h2 class="cart-product-title mt-0">
              {product.product_name}
            </h2>
            <Table className="cart-prodict-type w-auto" borderless>
              <thead>
                <tr>
                  {color && <th>{productcartlang.get("color", "COLOR")}</th>}
                  {size && <th>{productcartlang.get("size", "SIZE")}</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {color && <td>{color}</td>}
                  {size && <td>{size}</td>}
                </tr>
              </tbody>
            </Table>
            {/*product.product.on_sale ?
              <span class="cart-product-price">{product.currency} {product.product.sale_price}</span>
              :
              <span class="cart-product-price">{product.currency} {product.product.price}</span>
            */}
            <span class="cart-product-price">{product.currency} {product.price}</span>
          </div>
          <div class="cart-list-other-act">
            <div class="cart-action-wrap text-right w-100">
              <div class="cart-product-delete p-2 w3-ripple" onClick={() => commands.cart.removeItem({ productId: product?.product?.id, orderItemId: product.id })}>
                <FaTrashAlt />
              </div>
            </div>
            <div class="cart-action-wrap text-right">
              <div class="cart-quantity-box">
                <CartQuantityField CartQuantityVal={quantity} setCartQuantityVal={(val) => { setQuantity(val); commands.cart.updateItem({ productId: product?.product?.id, quantity: val }) }} maxQuantity={maxQuantity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}
function CartPageComponent() {
  const { cart } = CartState.get();
  const history = useHistory();

  var ShowCart = false;

  if (typeof cart === "object") {
    if (cart.order_items?.length > 0) {
      ShowCart = true;
    }
  } else {
    ShowCart = false;
    window.notify([{ message: "Unable to read cart", type: "danger" }]);
  }

  useEffect(() => {
    commands.user.getAddressList();
  }, []);

  return ShowCart ? <CartPageContent /> : <EmptyCartContent />;
}
export default CartPageComponent;
