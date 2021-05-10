import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  Footer,
  HeroBanner,
  Header,
  ThreePromo,
  SingleOfferBanner,
  DoubleOfferBanner,
  AppStoreBanner,
  ErrorOccuredBlock,
  PageLoadingBlock
} from "../../components";
import { Container, Row, Col, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import "./css/index.scoped.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import service, { serviceTypes } from "../../services";
import AuthState from "../../redux/states/auth";

function HelpCenter(props) {
  const tabName = props.match.params.slug;
  const [activeTab, setActiveTab] = useState("1");
  const [activeMobileTab, setactiveMobileTab] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [helpCenterData, setHelpCenterData] = useState(undefined);
  const authState = AuthState.get();
  const isLoggedIn = (authState.guest_user === false && (typeof authState?.loginData?.user) === "object");

  useEffect(() => {
    getHelpceterData();
  }, [])

  function getHelpceterData() {
    const serviceType = serviceTypes.getHelpCenterData();
    service(serviceType)
      .then(({ response, error }) => {
        if (error) {
          window.notify([{ message: error.message }]);
          if (error.status === 404) {
            setErrorData({
              title: "Oh Noes!, 404 Not Found",
              message: "The product you are looking for is not available!",
              buttonText: "Go to Home",
              onButtonPress: () => props.history.push("/")
            });
          } else {
            setErrorData({
              title: "Oh Noes!, Error Occured",
              message: error.message,
              buttonText: "Retry",
              onButtonPress: () => { setLoading(true); setErrorData(null); setHelpCenterData(undefined); getHelpceterData(); }
            });
          }
        } else if (response) {
          if (typeof response.data.data.help_centers === "object") {
            console.log("Help center data", response.data.data.help_centers);
            setHelpCenterData(response?.data?.data?.help_centers);
            setErrorData(null);
          } else {
            setErrorData({
              title: "Oh Noes!, Error Occured",
              message: "Unknown response received from server.",
              buttonText: "Retry",
              onButtonPress: () => { setLoading(true); setErrorData(null); setHelpCenterData(undefined); getHelpceterData(); }
            });
          }
        }
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const history = useHistory();
  const routeToProfile = () => {
    history.push(isLoggedIn ? "/profile" : "/");
  };

  const routeHelpCenter = (value) => {
    if (value !== undefined) {
      let path = "/help-center/" + value;
      history.push(path);
    } else {
      let path = "/help-center";
      history.push(path);
    }
  };
  const routeHelpCenterMb = (value) => {
    if (value !== undefined) {
      let path = "/help-center/" + value;
      history.push(path);
      setactiveMobileTab(!activeMobileTab);
    } else {
      let path = "/help-center";
      history.push(path);
      setactiveMobileTab(!activeMobileTab);
    }
  };

  if (tabName !== undefined && helpCenterData !== undefined) {
    let matchTabName = "";
    helpCenterData.map(
      (data, index) => {
        if (tabName === data.title) {
          matchTabName = index + 1;
        }
      }
    )
    toggle(matchTabName);
  }

  if (tabName === undefined && helpCenterData !== undefined) {
    toggle(1);
  }

  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <Container className={activeMobileTab ? "yt-mobile-datapg" : "yt-desktop-datapg"}>
        <Row>
          <Col md={12}>
            <div className="pageroute hc-breadcrumbs my-3 mb-5">
              <Link to="/">
                <span className="hc-home w3-hover-opacity w3-ripple" style={{ cursor: "default" }}>Home</span>
              </Link>
              {" > "}
              {isLoggedIn &&
                <Link to="/profile">
                  <span className="hc-home w3-hover-opacity w3-ripple" style={{ cursor: "default" }}>Profile</span>
                </Link>
              }
              {" > "}
              <span className="currpage hc-current">Help Center</span>
            </div>

          </Col>
        </Row>
        <section className="mb-4 d-block hc-mb-30">
          <Row className="yt-cm-row">
            <Col md={5} lg={4} className="yt-cm-lt-col col">
              <div className="hc-beckfrom-ct-page d-flexx align-items-center hc-mb-30 w3-ripple my-0 d-none"
                onClick={() => {
                  routeToProfile();
                }}
                style={{ cursor: "pointer" }}
              >
                {isLoggedIn &&
                  <FaLongArrowAltLeft
                    className="hcp-back-arrow"
                  />
                }{" "}
                <span className="pl-2 hc-back-tag d-none" style={{ opacity: 0 }}>Help Center</span>
              </div>
              {helpCenterData && <div className="hc-inner-wrap bg-white radius-10 hc-mb-30">
                <div className="hc-inner-contnet yt-desk-hc">
                  <ul className="p-0 m-0 list-style-none hc-tabs-name">
                    {helpCenterData.map((data, index) => (<li
                      className={classnames({ active: activeTab === index + 1 })}
                      onClick={() => {
                        routeHelpCenter(data.title);
                      }}
                    >
                      {data.title}
                    </li>))}
                  </ul>
                </div>
                <div className="hc-inner-contnet yt-tab-movile-hc">
                  <ul className="p-0 m-0 list-style-none hc-tabs-name">
                    {helpCenterData.map((data, index) => (<li
                      className={classnames({ active: activeTab === index + 1 })}
                      onClick={() => {
                        routeHelpCenterMb(data.title);
                      }}
                    >
                      {data.title}
                    </li>))}
                  </ul>
                </div>
              </div>}
            </Col>
            <Col md={7} lg={8} className="yt-cm-rt-col col">
              <div className="yt-mb-pg-ttl">
                <div className="hc-beckfrom-ct-page d-flex align-items-center hc-mb-30">
                  <FaLongArrowAltLeft
                    className="hcp-back-arrow"
                    onClick={() => {
                      routeHelpCenterMb();
                    }}
                  />{" "}
                </div>
              </div>
              {
                !helpCenterData &&
                <Fragment>
                  {!loading && <ErrorOccuredBlock title={errorData?.title || "Oh Noes!, Error Occured"} message={errorData?.message || "Unknown Error Occured."} buttonText={errorData?.buttonText || "Go to Home"} onButtonPress={(errorData?.onButtonPress) || (() => props.history.push("/"))} />}
                  {loading && <PageLoadingBlock title={"Please wait..."} message={"Fetching helpcenter data"} buttonText={"Go to Home"} onButtonPress={() => props.history.push("/")} />}</Fragment>
              }
              {helpCenterData && <div className="hc-inner-wrap hc-tab-content bg-white radius-10 hc-mb-30 mt-0">
                <div className="hc-inner-content">
                  {helpCenterData.map((data, index) => (<TabContent activeTab={activeTab}>
                    <TabPane tabId={index + 1}>
                      <div dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br />') }} />
                    </TabPane>
                  </TabContent>))}
                </div>
              </div>}
            </Col>
          </Row>
        </section>

      </Container>
      <section className="hc-product-promo hc-mt-30 hc-mb-30">
        {/*<ThreePromo />*/}
        <br />
      </section>
      {/* Singel Offer Banner */}
      <SingleOfferBanner />
      {/* Singel Offer End */}

      {/* Double Offer */}
      <section className="my-4">
        <DoubleOfferBanner />
      </section>
      {/* Double Offer End */}

      {/* App Store Banner */}
      <AppStoreBanner />
      {/* App Store Banner End*/}
      <Footer />
    </div>
  );
}

function FaqContent() {
  return (
    <div className="hc-tab-content-wrap">
      <h2 className="hc-tab-main-title mt-0">FAQs</h2>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">1.1 Question?</h3>
        <p className="m-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">1.2 Question?</h3>
        <p className="m-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">1.3 Question?</h3>
        <p className="m-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">1.4 Question?</h3>
        <p className="m-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="hc-tab-inner-data">
        <h3 className="hc-tab-sub-title mt-0">1.5 Question?</h3>
        <p className="m-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}
function DeliveryReturnsContent() {
  return (
    <div className="hc-tab-content-wrap">
      <h2 className="hc-tab-main-title mt-0">Delivery & Returns</h2>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">Heading</h3>
        <p className="mt-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p className="mt-0 ht-tab-description">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p className="mt-0 ht-tab-description">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
    </div>
  );
}
function HowitworksContent() {
  return (
    <div className="hc-tab-content-wrap">
      <h2 className="hc-tab-main-title mt-0">How it works</h2>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">Heading</h3>
        <p className="mt-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p className="mt-0 ht-tab-description">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p className="mt-0 ht-tab-description">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
    </div>
  );
}
function TermsServiceContent() {
  return (
    <div className="hc-tab-content-wrap">
      <h2 className="hc-tab-main-title mt-0">Terms of Service</h2>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">Heading</h3>
        <p className="mt-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p className="mt-0 ht-tab-description">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p className="mt-0 ht-tab-description">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
    </div>
  );
}
function PrivacyPolicyContent() {
  return (
    <div className="hc-tab-content-wrap">
      <h2 className="hc-tab-main-title mt-0">Privacy Policy</h2>
      <div className="hc-tab-inner-data hc-mb-30">
        <h3 className="hc-tab-sub-title mt-0">Heading</h3>
        <p className="mt-0 ht-tab-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p className="mt-0 ht-tab-description">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p className="mt-0 ht-tab-description">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
    </div>
  );
}
export default HelpCenter;
