import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
} from "reactstrap";
import { useHistory } from "react-router";

const Navigate = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <div>
        <img
          src={require("./images/navimage.png")}
          class="navimage"
          alt="ytrend"
        />
      </div>
      <Row>
        <div class="shopnow w3-ripple" onClick={() => history.push("/shop")}>
          Shop Now
        </div>
      </Row>
    </div>
  );
};

export default Navigate;
