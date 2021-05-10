import React, { useState, Fragment } from "react";
import "./css/index.scoped.css";
import { useMediaQuery } from 'react-responsive'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import commands from "../../../commands";
import * as validationSchemas from "../../../validationSchemas";
import { Formik } from 'formik';
import lang from "../../../language";
function ProductRating(props) {
  const reviewlang = new lang("myOrderScreen");

  //const [deleteorder, SetDelete] = useState(false);
  let [rating, setRating] = useState(0);
  let [comment, setComment] = useState("");

  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 767.88px)'
  });
  var StarColor = '#D4C96D';
  if (isTabletOrMobile) {
    StarColor = '#3BC490';
  }

  const { reviewData: { orderId, orderItemId, reviewId, reviewText, reviewRating }, toggle, isOpen, onSuccess } = props;

  //const canReview = orderId && orderItemId;
  const canReview = true;

  const secondExample = {
    size: 40,
    count: 5,
    color: "#DBDBDB",
    activeColor: StarColor,
    value: reviewRating || 5,
    a11y: true,
    isHalf: false,
    emptyIcon: <BsStarFill className="m-1" />,
    halfIcon: <BsStarHalf className="m-1" />,
    filledIcon: <BsStarFill className="m-1" />,
    onChange: setRating,
  };

  function onSubmit({ rating, comment }) {
    if (reviewId) {
      const data = { reviewId, rating, comment };
      console.log("Data for submit ", data);
      commands.products.updateReview({ reviewId, rating, comment, onSuccess });
    } else {
      const data = { orderId, orderItemId, rating, comment };
      console.log("Data for submit ", data);
      commands.products.createReview({ orderId, orderItemId, rating, comment, onSuccess });
    }
    toggle();
  }

  console.log("data received is ", props);
  return (
    <div>
      <Formik
        initialValues={{ rating: reviewRating || 5, comment: reviewText || "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchemas.productRateForm}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue }) => (
          <Fragment>
            <Modal isOpen={isOpen} toggle={toggle} className="cm-small-modal-4" centered={true}>
              <ModalHeader toggle={toggle} className="pr-title-bar border-0">
                <span>
                  {reviewlang.get("rateAndReview", "Rate and Review")}</span>
              </ModalHeader>
              {canReview ?
                <ModalBody className="cm-modal-body">
                  <h3 class="pr-body-title">
                    {reviewlang.get("rateProduct", "Rate our Product")}</h3>
                  <ReactStars {...secondExample} classNames="yt-rating-wrapper" onChange={(val) => setFieldValue("rating", val)} />
                  <Form>
                    <FormGroup>
                      <Input
                        type="hidden"
                        name="ProductStar"
                        id="ProductStar"
                        value={rating}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="product-review-description"
                        id="product-review-description"
                        placeholder={reviewlang.get("writeDetailReview", "Write detailed review for us ..")}
                        className="p-3"
                        value={values.comment}
                        onChange={(e) => setFieldValue("comment", e.target.value)}
                      />
                      {(errors.comment && touched.comment) &&
                        <div style={{ color: "#e65e52" }}>
                          {errors.comment}
                        </div>
                      }
                    </FormGroup>
                  </Form>
                </ModalBody>
                :
                <ModalBody className="cm-modal-body">
                  <h3 class="pr-body-title">
                    {reviewlang.get("cantreview", "You can't review a product until you purchase it.")}</h3>
                </ModalBody>
              }
              <ModalFooter className="pr-bottom-bar p-0">
                {canReview ?
                  <Button
                    color="secondary pr-rate-submit-btn bg-white py-3"
                    onClick={handleSubmit}
                    block
                  >
                    {reviewlang.get("submit", "Submit")}
                  </Button>
                  :
                  <Button
                    color="secondary pr-rate-submit-btn bg-white py-3"
                    onClick={toggle}
                    block
                  >
                    {reviewlang.get("ok", "OK")}
                  </Button>
                }
              </ModalFooter>
            </Modal>
          </Fragment>
        )}
      </Formik>
    </div>
  );
}
export default ProductRating;
