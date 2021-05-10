import React, { useEffect, useState } from "react";
import "./css/index.scoped.css";
import { Header, Footer, HeroBanner, AboutUsReviews, SingleOfferBanner, DoubleOfferBanner, AppStoreBanner } from "../../components";
import { Container } from "reactstrap";
import commands from "../../commands";
import parse from "html-react-parser";

function AboutUs(props) {
  // console.log("About us");

  const [content, setContent] = useState(undefined);

  useEffect(() => {
    if (content === undefined) {
      commands.pages.getAboutUs()
        .then((res) => {
          setContent(parse(res));
        })
    }

  }, []);
  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <section className="yt-about-us-pg">
        {content &&
          <Container>
            <div className="yt-cm-mobile-bread">
              <div className="pageroute profile-pg-breadcrumbs">
                <span className="profile-pg-home">Home {">"}</span>{" "}
                <span className="">About Us</span>
              </div>
              <h2 className="yt-profile-mb-ttl profile-pg-title">About Us</h2>
            </div>

            <div class="cardcontainer yt-main-wrapper border-radius-10 bg-white">
              <div class="customcard yt-inner-wrap">
                {/*
              <Item title={dummytitle} details={dummydetails} />
              <Item title={dummytitle} details={dummydetails} />
              <Item title={dummytitle} details={dummydetails} />
              */}
                {content}
              </div>
            </div>
          </Container>
        }
      </section>
      <AboutUsReviews />
      {/* Singel Offer Banner */}
      <SingleOfferBanner />
      {/* Singel Offer End */}

      {/* Double Offer */}
      <DoubleOfferBanner />
      {/* Double Offer End */}

      {/* App Store Banner */}
      <AppStoreBanner />
      {/* App Store Banner End*/}
      <Footer />
    </div>
  );
}

function Item(props) {
  return (
    <div class="yt-items item">
      <div class="item-title">{props.title}</div>
      <div class="item-details">{props.details}</div>
    </div>
  );
}

export default AboutUs;

const dummytitle = `Who we are ?`;
const dummydetails = (
  <>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </p>

    <p>
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.
    </p>

    <p>
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout. The point of using
      Lorem Ipsum is that it has a more-or-less normal distribution of letters,
      as opposed to using 'Content here, content here', making it look like
      readable English. Many desktop publishing packages and web page editors
      now use Lorem Ipsum as their default model text, and a search for 'lorem
      ipsum' will uncover many web sites still in their infancy. Various
      versions have evolved over the years, sometimes by accident, sometimes on
      purpose (injected humour and the like).
    </p>
  </>
);
