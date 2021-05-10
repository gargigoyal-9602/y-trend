import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  input,
  FormGroup,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
function CartQuantityField(props) {

  const { CartQuantityVal, maxQuantity, setCartQuantityVal } = props;
  return (
    <div className="cart-quantity-field">
      <Form>
        <FormGroup className="m-0">
          <span class="cart-quantity-icn quantity-icn-left d-flex align-items-center p-2">
            <FaMinus
              className="cart-quantity-minus"
              onClick={() => {
                if (CartQuantityVal - 1 < 1) {
                  window.notify([{ message: `You can not set less than 1 quantity`, type: "danger" }]);
                } else if (CartQuantityVal - 1 > maxQuantity){
                  setCartQuantityVal(maxQuantity);
                } else {
                  setCartQuantityVal(CartQuantityVal - 1);
                }
              }}
            />
          </span>
          <input
            type="number"
            className="form-control border-0"
            id="cart-quantity-123"
            value={CartQuantityVal}
          />
          <span className="cart-quantity-icn quantity-icn-right d-flex align-items-center p-2">
            <FaPlus
              className="cart-quantity-plus"
              onClick={() => {
                if (CartQuantityVal + 1 > maxQuantity) {
                  window.notify([{ message: `You can not add more than ${maxQuantity} quantity of this product`, type: "danger" }]);
                } else {
                  setCartQuantityVal(CartQuantityVal + 1);
                }
              }}
            />
          </span>
        </FormGroup>
      </Form>
    </div>
  );
}
export default CartQuantityField;
