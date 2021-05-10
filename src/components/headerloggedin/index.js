import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function HeaderLoggedIn() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <div class="topbar">
        <Container>Welcome to our Store!</Container>
      </div>
      <div class="logocontainer">
        <Container>
          <Row>
            <Col xs={12} sm={7} lg={5}>
              <div class="d-flex">
                <div class="logobox">
                  <img
                    src={require("./images/Logo@3x.png")}
                    class="logoimage"
                    alt="ytrend"
                  />
                </div>
                <div class="supportbox">
                  <div class="support">
                    <img
                      src={require("./images/support@3x.png")}
                      class="supportimage"
                      alt="support"
                    />
                    <div class="supportnumber">
                      <span class="title">CALL US</span>
                      <span class="number">+1 123 456 1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <div class="col-12 order-sm-1 col-lg-4 px-lg-0">
              <div class="searchcontainer py-2">
                <img
                  src={require("./images/magnifying-glass@3x.png")}
                  alt="search"
                  class="searchicon"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  class="searchinput"
                />
                <img
                  src={require("./images/menuicon.png")}
                  alt="search"
                  class="menuicon d-md-none w3-hover-opacity"
                  onClick={toggle}
                />
              </div>
            </div>
            <Col xs={12} sm={5} lg={3}>
              <div class="cartcontainer py-2">
                <img
                  src={require("./images/shopping-cart@3x.png")}
                  alt="cart"
                  class="carticon w3-ripple"
                />
                <div class="userbox w3-ripple">
                  <span>
                    <img
                      src={require("./images/user.png")}
                      alt="user"
                      class="usericon"
                    />
                  </span>
                  <span class="uname">Alex Martin </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div class="menucontainer">
        <Container>
          <Navbar color="light" light expand="md">
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="#null" active>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#null">New Arrivals</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>Shop &#8919;</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="#null">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#null">Contact Us</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </header>
  );
}

export default HeaderLoggedIn;
