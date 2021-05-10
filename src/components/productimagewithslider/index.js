import React, { useRef, useState } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col } from "reactstrap";
import Carousel from "react-elastic-carousel";
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive'
function ProductverticalSlider(props) {
  let carousel = useRef();
 
  return (
  <>
    {(props.images?.length > 1) && 
    <div class="sp-inner-content-wrap sp-image-vert-slider vertical-slider">
       {(props.images?.length > 4) && 
       <>
      <FaChevronUp
        class="yt-slider-up img-fluid"
        onClick={() => carousel.slidePrev()}
      />
      <FaChevronDown
        class="yt-slider-down img-fluid"
        width="20"
        height="20"
        onClick={() => carousel.slideNext()}
      />
     </> 
     }
      <Carousel
        focusOnSelect={false}
        verticalMode
        itemsToShow={3}
        pagination={false}
        showArrows={false}
        ref={(ref) => (carousel = ref)}
        className="py-4"
      >
        {props.images.map((item, idx) => (
          <div key={idx} class="vert-slider-item my-1 d-flex align-items-center justify-content-center" onClick={() => props.setCurrentImage(item.image)}>
            <img
              src={item.image || "null" || require("./images/P860_2.png")}
              alt={"img " + idx}
              class="img-fluid"
            />
          </div>
        ))}
        </Carousel>
    </div>
      }
      </>
  );
}
function ProducthorizontalSlider(props) {
  let carousel = useRef();
  return (
  <>
    {(props.images?.length > 1) &&
    <div class="pop sp-inner-content-wrap sp-image-vert-slider horizontal-slider">
       {(props.images?.length > 4) &&
       <>
      <FaChevronLeft
        class="yt-slider-up img-fluid"
        onClick={() => carousel.slidePrev()}
      />
      <FaChevronRight
        class="yt-slider-down img-fluid"
        width="20"
        height="20"
        onClick={() => carousel.slideNext()}
      />
      </>
       }
        <Carousel
        focusOnSelect={false}
        itemsToShow={3}
        pagination={false}
        showArrows={false}
        ref={(ref) => (carousel = ref)}
        className="py-4"
      >

        {props.images.map((item, idx) => (
          <div key={idx} class="vert-slider-item m-2 d-flex align-items-center justify-content-center" onClick={() => props.setCurrentImage(item.image)}>
            <img
              src={item.image || "null" || require("./images/P860_2.png")}
              alt="search"
              class="img-fluid"
            />
          </div>)
          )}
      </Carousel>
    </div>
      }
       </>
  );
}
function ResponsiveProductSlider(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1280px)'
  });
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1279.92px)'
  });
  return (
    <>
      {isDesktopOrLaptop &&
        <ProductverticalSlider {...props} />
      }
      {isTabletOrMobile &&
        <ProducthorizontalSlider {...props} />
      }
    </>
  );
}
function ProductImageWithSlider(props) {

  return (
    <div class="sp-inner-wrap p-4 bg-white radius-10">
      <Row className="yt-product-img-inner-row">
        <Col xs={12} sm={8} lg={8} className="yt-inner-col">
          <div class="sp-inner-content-wrap sp-spp-inner-image-wrap">
            <img
              src={props.currentImage || "null" || require("./images/P860_1.png")}
              alt="Try Refresh"
              class="img-fluid sp-spimg-item"
            />
          </div>
        </Col>
        <Col xs={12} sm={4} lg={4} className="yt-inner-col">
          <ResponsiveProductSlider images={props.images} setCurrentImage={props.setCurrentImage} />
        </Col>
      </Row>
    </div>
  );
}


export default ProductImageWithSlider;
