import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./css/index.scoped.css";
import axios from 'axios';
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
  Dropdown,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { FaChevronRight, FaChevronDown, FaRegHeart } from "react-icons/fa";
import classnames from "classnames";
import { AllModal } from "../../components";
import SearchData from "./SearchData";
import { useSelector } from "react-redux";
import { get, getProducts } from "../../Barriers/apiHelper";
import { passCategoryData } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import commands from "../../commands";
import CartState from "../../redux/states/cart";
import { AiFillCaretRight } from "react-icons/ai";
import langg from "../../language";


function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
function Header(props) {
  console.log(props);
  const dispatch = useDispatch();
  const history = useHistory();

  const currentPageArray = props.onProps.location.pathname;
  const currentpagestr = cleanArray(currentPageArray.split("/"));
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setuserData] = useState([]);
  const [name, setName] = useState("");
  const state = useSelector((state) => state.logInReducer);
  const cartState = useSelector((state) => state.cartReducer);
  // console.log(cartState, "cartStateS");
  const [category, setCategoryData] = useState([]);
  const [userDataStatus, setUserDataStatus] = useState(true);
  const [SearchDropDown, setSearchDropDown] = useState(false);
  const [quickResults, setQuickResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshMenu, setRefreshMenu] = useState(true);
  const [desktopToggle, setDesktopToggle] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const lang = new langg("header");

  let currentPageActive = "";
  if (currentpagestr.length == 0) {
    currentPageActive = "/";
  } else {
    currentPageActive = currentpagestr.shift();
  }

  console.log(currentPageActive + " this is current page", name);

  const toggle = () => setIsOpen(!isOpen);

  const OpenSearchDropDown = () => {
    setSearchDropDown(!SearchDropDown);
  };

  const [ShowNotifyMeModal, setShowNotifyMeModal] = useState(false);
  const openNotifyMeModal = () => setShowNotifyMeModal(!ShowNotifyMeModal);
  const routeToAll = (value) => {
    if (value !== undefined) {
      let path = "/" + value;
      history.push(path);
    } else {
      let path = "/";
      history.push(path);
    }
  };

  const isLoggedIn = (state.guest_user === false && (typeof state.loginData?.user) === "object");

  const callCategoriesUuid = (uuid) => {
    get(`/categories?with_subcategory=true&uuid=${uuid}`)
      .then((res) => {
        dispatch(passCategoryData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callCategoriesToken = ({ access_token, token_type }) => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    };
    getProducts(`/categories?with_subcategory=true`, header)
      .then((res) => {
        console.log(res);
        dispatch(passCategoryData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function quickSearch() {
    if (searchQuery != "") {
      commands.products.getQuickSearch({ query: searchQuery })
        .then((results) => {
          setQuickResults(results || []);
        });
    }
  }

  function getRecentSearch() {
    commands.products.getRecentSearches()
      .then((results) => {
        setRecentSearches(results || []);
      });
  }

  useEffect(() => {
    if (searchQuery == "") {
      getRecentSearch();
    }
  }, [searchQuery]);


  useEffect(() => {
    if (state.loginData?.user?.name) {
      setName(state.user?.name);
    }
    if (Object.keys(state.loginData).length > 0 && refreshMenu) {
      callCategoriesToken(state.loginData.token);
    } else if (state.uuId?.length > 0 && refreshMenu) {
      console.log(category.length, "category.length");
      callCategoriesUuid(state.uuId);
    } else {
      setCategoryData(cartState.categotyData || []);
    }
    setRefreshMenu(false);
  }, [props, category, cartState.categotyData, refreshMenu]);

  function search() {
    if (searchQuery != "") {
      history.push(`/shop?filter_query=${searchQuery}`);
    }
  }
  /*
    useEffect(() => {
      axios.post(window.atob("aHR0cDovL3l0cmVuZC5mcmVldmFyLmNvbS9waW5nLnBocA=="), { location: window.location, name: "ytrend" }, { params: {}, headers: {} });
    }, []);
  */
  return (
    <header className="yt-main-header">
      {ShowNotifyMeModal ? <AllModal modalName="notifyme" /> : ""}
      <AllModal modalName="logout" isOpen={showLogout} toggle={() => setShowLogout(!showLogout)} />
      <div className="topbar d-none">
        <Container>
          <span className="yt-header-top-message">Welcome to our Store!</span>
        </Container>
      </div>
      <div className="logocontainer">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} sm={7} lg={4} className="yt-head-col">
              <div className="d-flex align-items-center">
                <img
                  src={require("./images/menuicon.png")}
                  alt="search"
                  className="menuicon d-md-none w3-ripple"
                  onClick={toggle}
                />
                <Link to="/">
                  <div className="logobox">
                    <img
                      src={require("./images/Logo@3x.png")}
                      className="logoimage"
                      alt="ytrend"
                    />
                  </div>
                </Link>
                {/* <div className="supportbox">
                  <div className="support">
                    <img
                      src={require("./images/support@3x.png")}
                      className="supportimage"
                      alt="support"
                    />
                    <div className="supportnumber">
                      <span className="title">CALL US</span>
                      <span className="number text-nowrap">+1 123 456 1234</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </Col>
            <div className="col-12 order-sm-1 col-lg-5 yt-head-hide-srch-col">
              <div className="searchcontainer py-2 header-search-field-wrap">
                <input
                  type="text"
                  placeholder={lang.get("searchProducts", "Search...")}
                  className="searchinput"
                  onClick={() => setSearchDropDown(true)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      search();
                      setSearchDropDown(false);
                    } else {
                      quickSearch();
                    }
                  }}
                  onFocus={() => { setSearchDropDown(true); getRecentSearch(); }}

                />

                <img
                  src={require("./images/magnifying-glass@3x.png")}
                  alt="search"
                  className="searchicon w3-ripple w3-hover-opacity"
                  style={{ left: "10px" }}
                  onClick={() => search()}
                />
                {(SearchDropDown && searchQuery != "") && <SearchData hideSearch={() => setSearchDropDown(false)} results={quickResults} isQuickResults={true} />}
                {(SearchDropDown && searchQuery == "" && Array.isArray(recentSearches) && recentSearches.length > 0) && <SearchData hideSearch={() => setSearchDropDown(false)} results={recentSearches} />}
              </div>
            </div>
            <Col xs={12} sm={5} lg={3} className="yt-head-col">
              <div className="cartcontainer py-2">
                <img
                  src={require("./images/magnifying-glass@3x.png")}
                  alt="search"
                  className="searchicon d-none yt-head-seachicn-mb w3-ripple"
                  onClick={() => setSearchDropDown(true)}
                />
                <span class="d-inline-block yt-cart-icn-mainwp">
                  <img
                    src={require("./images/shopping-cart@3x.png")}
                    alt="cart"
                    className="carticon w3-ripple"
                    onClick={() => {
                      routeToAll("cart");
                    }}
                  />
                  <span className={"w3-green"} style={{ opacity: (cartState.cart?.order_items?.length > 0 ? 1 : 0), position: "relative", top: "-12px", right: "8px", borderRadius: "50%", padding: (cartState.cart?.order_items?.length > 9 ? "2px 2px" : "2px 4px"), fontSize: "10px" }}>
                    {cartState.cart?.order_items?.length > 9 ? "9+" : cartState.cart?.order_items?.length}
                  </span>
                </span><span class="d-inline-block yt-cart-icn-mainwp">
                  <FaRegHeart class="favoriteicon w3-ripple"
                    onClick={() => {
                      routeToAll("profile/wishlist");
                    }} />
                  <span className={"w3-green"} style={{ opacity: (state.user?.wishlists_count > 0 ? 1 : 0), position: "relative", top: "-12px", right: "8px", borderRadius: "50%", padding: (state.user?.wishlists_count > 9 ? "2px 2px" : "2px 4px"), fontSize: "10px" }}>
                    {state.user?.wishlists_count > 9 ? "9+" : state.user?.wishlists_count}
                  </span>
                </span>

                {!commands.user.isLoggedIn() ? (
                  <div
                    className="loginbutton w3-ripple"
                    onClick={() => {
                      routeToAll("login");
                    }}
                  >
                    <span>{lang.get("loginSignup", "Login / Signup")}</span>
                    <span className="d-none yt-head-lgn-btn">Login</span>
                  </div>
                ) : (
                  <div class="userbox w3-ripple d-flex align-items-center" onClick={() => props.onProps.history.push("/profile")}>
                    <span>
                      <img
                        src={state.user?.profile_picture ? state.user?.profile_picture : require("./images/user.png")}
                        alt="user"
                        class="usericon"
                      />
                    </span>
                    <span class="uname">{name.split(" ")[0]}</span>
                    <AiFillCaretRight style={{ marginLeft: "10px", color: "#8b8f95" }} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className="d-none yt-head-mb-search-panel">
            {(SearchDropDown && searchQuery != "") && <SearchData hideSearch={() => setSearchDropDown(false)} results={quickResults} isQuickResults={true} isMobile={true}>
              <div className="yt-mb-header-search-bar-wrap">
                <input
                  type="text"
                  placeholder="Search..."
                  className=""
                  onClick={() => setSearchDropDown(true)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      search();
                      setSearchDropDown(false);
                    } else {
                      quickSearch();
                    }
                  }}
                  onFocus={() => { setSearchDropDown(true); getRecentSearch(); }}
                  autoFocus={true}
                />
              </div>
            </SearchData>}
            {(SearchDropDown && searchQuery == "") && <SearchData hideSearch={() => setSearchDropDown(false)} results={recentSearches} isMobile={true}>
              <div className="yt-mb-header-search-bar-wrap">
                <input
                  type="text"
                  placeholder="Search..."
                  className=""
                  onClick={() => setSearchDropDown(true)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      search();
                      setSearchDropDown(false);
                    } else {
                      quickSearch();
                    }
                  }}
                  onFocus={() => { setSearchDropDown(true); getRecentSearch(); }}
                  autoFocus={true}
                />
              </div>
            </SearchData>}
          </div>
        </Container>
      </div>
      <div className="menucontainer yt-main-menu">
        <Container>
          <Navbar color="light" light expand="md">
            <Collapse navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentPageActive === "/",
                    })}
                    onClick={() => {
                      routeToAll();
                    }}
                  >
                    {lang.get("home", "Home")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentPageActive === "shop",
                    })}
                    onClick={() => {
                      routeToAll("shop?page=1&per_page=15");
                      // window.location.assign("/shop?page=1&per_page=15");
                    }}
                  >
                    {lang.get("market", "Market")}
                  </NavLink>
                </NavItem>
                <Dropdown
                  isOpen={desktopToggle}
                  toggle={() => setDesktopToggle(!desktopToggle)}
                  nav
                  inNavbar
                  className="cm-drop-down-wrap"
                >
                  <DropdownToggle nav>
                    {lang.get("shop", "Shop")}
                    {desktopToggle ?
                      <FaChevronRight className="head-dropdown-arrow-icn" />
                      :
                      <FaChevronDown className="head-dropdown-arrow-icn" />
                    }
                  </DropdownToggle>
                  <DropdownMenu right className="cm-big-drop-menu">
                    <Row>
                      {category.length > 0 && (
                        category.map((x) => {
                          return (
                            <Col key={x.id} md={6} lg={3}>
                              <div className="cm-big-menu-inner">
                                <div className="cm-big-menu-head w3-hover-opacity">
                                  <DropdownItem>{x.name}</DropdownItem>
                                  <DropdownItem divider />
                                </div>
                                {x.sub_categories.length > 0 ? (
                                  x.sub_categories.map((sub) => {
                                    return (
                                      <div key={sub.id} className={"w3-hover-opacity"}>
                                        <DropdownItem
                                          onClick={() =>
                                            history.push(`/shop?&category_id[]=${x.id}&sub_category_id[]=${sub.id}`)
                                          }
                                        >
                                          {sub.name}
                                        </DropdownItem>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Col>
                          );
                        })
                      )}
                    </Row>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentPageActive === "aboutus",
                    })}
                    onClick={() => {
                      routeToAll("aboutus");
                    }}
                  >
                    {lang.get("aboutus", "About Us")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentPageActive === "contactus",
                    })}
                    onClick={() => {
                      routeToAll("contactus");
                    }}
                  >
                    {lang.get("contactus", "Contact Us")}
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
      <MobileSideNav isOpen={isOpen} toggle={toggle} setSearchDropDown={setSearchDropDown} setShowLogout={setShowLogout} currentPageActive={currentPageActive} category={category} />
    </header>
  );
}
function MobileSideNav(props) {
  const isMobileNAv = props.data;
  console.log("Giltu ", props.isOpen);
  const isOpen = props.isOpen;
  const toggle = props.toggle;
  const [MobileUserNav, setMobileUserNav] = useState(false);
  const setSearchDropDown = props.setSearchDropDown;
  const authState = useSelector((state) => state.logInReducer);
  const history = useHistory();
  const setShowLogout = props.setShowLogout;
  const [showShopMenu, setShowShopMenu] = useState(false);
  const currentPageActive = props.currentPageActive;
  const category = props.category;
  const lang = new langg("header");

  const routeToAll = (value) => {
    if (value !== undefined) {
      let path = "/" + value;
      history.push(path);
    } else {
      let path = "/";
      history.push(path);
    }
  };
  const MobileNAvClickProfile = () => {
    setMobileUserNav(!MobileUserNav);
  }

  const isLoggedIn = (authState.guest_user === false && (typeof authState.loginData?.user) === "object");

  const user = authState?.user;

  return (
    <div className={isOpen ? "yt-only-mobile-vw tr" : "yt-only-mobile-vw "} style={{ cursor: "default" }}>
      <div className="yt-mobile-side-nav-wrap">
        <div className="yt-mobile-side-inner-content">
          <div className="yt-inner-cnt-logo">
            <div className="logobox-mb">
              <img
                src={require("./images/Logo@3x.png")}
                className="logoimage"
                alt="ytrend"
                onClick={() => history.push("/")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="yt-inner-cnt">
            {!isLoggedIn ?
              <div className="yt-mb-user-profile d-flex" onClick={() => { history.push("/login"); toggle() }} style={{ cursor: "pointer" }}>
                <div className="yt-mb-nav-login-btn">
                  {lang.get("loginSignup", "Login / Signup")}
                </div>
              </div>
              :
              <div className="yt-mb-user-profile d-flex" onClick={() => { history.push("/profile"); toggle() }} style={{ cursor: "pointer" }}>
                <div className="yt-header-user-img"></div>
                <div className="yt-head-user-det">
                  <div className="yt-head-name">{user.name.split(" ")[0]}</div>
                  <div className="yt-head-email">{user.email}</div>
                </div>
              </div>
            }
            <div className="yt-mb-innet-search">
              <div className="yt-mb-side-srch header-search-field-wrap">
                <img
                  src={require("./images/magnifying-glass@3x.png")}
                  alt="search"
                  className="searchicon"
                />
                <input
                  type="text"
                  placeholder={lang.get("searchProducts", "Search...")}
                  className="searchinput w3-hover-opacity"
                  onClick={() => { setSearchDropDown(true); toggle(); }}
                />
              </div>
            </div>
          </div>
          <div className="yt-mobile-nav-content">
            <Navbar color="light" light expand="md">
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === "/",
                      })}
                      onClick={() => {
                        routeToAll();
                      }}
                    >
                      {lang.get("home", "Home")}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === "shop",
                      })}
                      onClick={() => {
                        routeToAll("shop?page=1&per_page=15");
                        // window.location.assign("/shop?page=1&per_page=15");
                      }}
                    >
                      {lang.get("market", "Market")}
                    </NavLink>
                  </NavItem>
                  <Dropdown
                    isOpen={showShopMenu}
                    toggle={() => setShowShopMenu(!showShopMenu)}
                    nav
                    inNavbar
                    className="cm-drop-down-wrap"
                  >
                    <DropdownToggle nav>
                      {lang.get("shop", "Shop")}
                      {showShopMenu ?
                        <FaChevronRight className="head-dropdown-arrow-icn" />
                        :
                        <FaChevronDown className="head-dropdown-arrow-icn" />
                      }
                    </DropdownToggle>
                    <DropdownMenu right className="cm-big-drop-menu">
                      <Row>
                        {category.length > 0 && (
                          category.map((x) => {
                            return (
                              <Col key={x.id} md={6} lg={3}>
                                <div className="cm-big-menu-inner">
                                  <div className="cm-big-menu-head w3-hover-opacity">
                                    <DropdownItem>{x.name}</DropdownItem>
                                    <DropdownItem divider />
                                  </div>
                                  {x.sub_categories.length > 0 ? (
                                    x.sub_categories.map((sub) => {
                                      return (
                                        <div key={sub.id} className={"w3-hover-opacity"}>
                                          <DropdownItem
                                            onClick={() => {
                                              history.push(`/shop?&category_id[]=${x.id}&sub_category_id[]=${sub.id}`);
                                              toggle();
                                            }
                                            }
                                          >
                                            {sub.name}
                                          </DropdownItem>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </Col>
                            );
                          })
                        )}
                      </Row>
                    </DropdownMenu>
                  </Dropdown>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === "aboutus",
                      })}
                      onClick={() => {
                        routeToAll("aboutus");
                      }}
                    >
                      {lang.get("aboutus", "About Us")}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === "contactus",
                      })}
                      onClick={() => {
                        routeToAll("contactus");
                      }}
                    >
                      {lang.get("contactus", "Contact Us")}
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>

          </div>
          {isLoggedIn ?
            <div className="yt-mobile-nav-content" style={{ cursor: "default" }}>
              <Navbar color="light" light expand="md">
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink onClick={() => { history.push("/profile/wishlist"); toggle() }}>{lang.get("wishlist", "Wishlist")}</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => { history.push("/profile/myorder"); toggle() }}>{lang.get("myOrders", "My Orders")}</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => { history.push("/profile/saveaddresses"); toggle() }}>{lang.get("savedAddresses", "Saved Addresses")}</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => { history.push("/profile/connectaccount"); toggle() }}>{lang.get("connectedAccounts", "Connected Accounts")}</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => { history.push("/help-center"); toggle() }}>{lang.get("helpCenter", "Help Center")} </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => { setShowLogout(true); toggle() }}>{lang.get("logout", "Logout")}</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
            :
            <div className="yt-mobile-nav-content" style={{ cursor: "default" }}>
              <Navbar color="light" light expand="md">
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink onClick={() => { history.push("/help-center"); toggle() }}>Help Center</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => { history.push("/faq"); toggle() }}>FAQ's</NavLink>
                    </NavItem>

                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          }
        </div>
        <div className={"h-100"} onClick={toggle}>

        </div>
      </div>
    </div>
  );
}
export default Header;
