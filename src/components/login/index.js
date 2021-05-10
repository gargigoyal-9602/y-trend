import React, { useEffect, useState } from "react";
import classnames from "classnames";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Button,
  Form,
  FormGroup,
  Input,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import SignUpPage from "./SignUp";
import LoginPage from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import lang, { langlist } from "../../language";
import CacheState from "../../redux/states/cache";

function LoginComponent(props) {
  // console.log(props);
  const history = useHistory();
  const [extraClass, setextraClass] = useState("Default-class");
  const [activeTab, setActiveTab] = useState("1");
  const [noWrapBox, setnoWrapBox] = useState(false);
  const cacheState = CacheState.get();

  // if (currentTab != undefined) {
  //   if (activeTab != currentTab) {
  //     setActiveTab(currentTab);
  //   }
  // }

  console.log("pop2",props.isPopup);
  useEffect(() => {
    if (props.className !== undefined) {
      if (extraClass !== props.className) {
        setextraClass(props.className);
        setnoWrapBox(true);
      }
    }
  }, [extraClass]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  console.log(extraClass);

  function onChangeLanguage(code) {
    CacheState.set({ language: code });
  }


  const loginlang = new lang("loginScreen")
  const signuplang = new lang("signupScreen")

  return (
    <div className={extraClass}>
      {noWrapBox ? (
        <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-4">
          <div className="d-flex flex-wrap yt-login-row">
            <div className="yt-login-inner-content yt-login-bg-banner yt-login-col d-none">
              <div className="yt-login-other-info">
                <p className="yt-login-oi-tag-small">
                  Fashion and Trend come togather
                </p>
                <h3 className="yt-login-oi-tag-big my-0">Upto 30% off</h3>
                <span className="yt-login-bdr" />
                <Button
                  color="secondary yt-login-sp-now"
                  onClick={() => history.push("/shop")}
                >
                  Shop Now
                </Button>
              </div>
            </div>
            <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
              <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
                <li
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  {signuplang.get("signUp", "Sign Up")}
                </li>
                <li
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  {loginlang.get("login", "Log In")}
                </li>
              </ul>
              <div className="yt-lptab-content">
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <SignUpPage isPopup={props.isPopup}  />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="2">
                    <LoginPage isPopup={props.isPopup}  />
                  </TabPane>
                </TabContent>
              </div>
              {/** 
              <div className="d-flex justify-content-end">
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    {langlist.find((item) => item.code === cacheState.language)?.name}
                  </DropdownToggle>
                  <DropdownMenu>
                    {langlist.map(item => <DropdownItem value={item.code} onClick={() => onChangeLanguage(item.code)}>{item.name}</DropdownItem>)}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              */}
            </div>
          </div>
        </div>
      ) : (
          <Container>
            <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-5">
              <div className="d-flex flex-wrap yt-login-row">
                <div className="yt-login-inner-content yt-login-bg-banner yt-login-col">
                  <div className="yt-login-other-info">
                    <p className="yt-login-oi-tag-small">
                      Fashion and Trend come togather
                  </p>
                    <h3 className="yt-login-oi-tag-big my-0">Upto 30% off</h3>
                    <span className="yt-login-bdr" />
                    <Button
                      color="secondary yt-login-sp-now"
                      onClick={() => history.push("/shop")}
                    >
                      Shop Now
                  </Button>
                  </div>
                  <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
                    <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
                      <li
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        {signuplang.get("signUp", "Sign Up")}
                      </li>
                      <li
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        {loginlang.get("login", "Log In")}
                      </li>
                    </ul>
                    <div className="yt-lptab-content">
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <SignUpPage isPopup={props.isPopup} />
                        </TabPane>
                      </TabContent>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="2">
                          <LoginPage isPopup={props.isPopup} />
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                  {/*
                  <div className="d-flex justify-content-end">
                    <UncontrolledDropdown>
                      <DropdownToggle caret>
                        {langlist.find((item) => item.code === cacheState.language)?.name}
                      </DropdownToggle>
                      <DropdownMenu>
                        {langlist.map(item => <DropdownItem value={item.code} onClick={() => onChangeLanguage(item.code)}>{item.name}</DropdownItem>)}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                    */}
                </div>
              </div>
            </div>
          </Container>
        )}
    </div>
  );
}

export default LoginComponent;
