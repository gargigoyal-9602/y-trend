import React, { useRef } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col, Button } from "reactstrap";
import { FaRegHeart } from "react-icons/fa";
import Carousel from "react-elastic-carousel";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

function TitleBar(props) {
  if (props.name != undefined) {
    return (
      <div class="yt-produstslider-info d-flex justify-content-between align-items-center mb-3">
        <h4 class="yt-comonent-top-title">{props.name}</h4>
        <div class="yt-comonent-link">
          <Button color="link yt-component-more px-0">View More</Button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
function ProductCardNoSale(props) {
  let carousel = useRef();
  let Breakpoints = [
    { width: 320, itemsToShow: 1 },
    { width: 425, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 992, itemsToShow: 5 },
  ];
  return (
    <section class="hp-featured-product mt-5 mb-5">
      <Container>
        <div class="yt-main-wrap">
          <TitleBar name={props.name} />
          <div class="yt-component-wrapper yt-slider-component bg-white py-4 mb-3">
            <IoIosArrowDropleft
              class="yt-slider-left img-fluid"
              onClick={() => carousel.slidePrev()}
            />
            <IoIosArrowDropright
              class="yt-slider-right img-fluid"
              width="20"
              height="20"
              onClick={() => carousel.slideNext()}
            />
            <Carousel
              focusOnSelect={false}
              itemsToShow={5}
              pagination={false}
              showArrows={false}
              ref={(ref) => (carousel = ref)}
              breakPoints={Breakpoints}
            >
              <div class="yt-item-slider">
                <div class="product yt-product-slider-cpnt text-center">
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="yt-product-off text-center p-1">15%</div>
                    <div class="text-right pr-2">
                      <FaRegHeart class="yt-product-fav" />
                    </div>
                  </div>
                  <img
                    src={require("./images/sample.png")}
                    class="pt-3 px-3 img-fluid yt-product-slider-img prodimage w3-ripple ml-auto mr-auto"
                    alt="ytrend"
                  />
                  <div class="mt-3 yt-product-title text-center">
                    Product Name
                  </div>
                  <div class="price yt-price-wrap text-center py-3">
                    <span class="price1 yt-product-sale-price">$400</span>
                    <span class="price2 yt-product-reg-price2">$500</span>
                  </div>
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div class="yt-item-slider">
                <div class="product yt-product-slider-cpnt text-center">
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="yt-product-off text-center p-1">15%</div>
                    <div class="text-right pr-2">
                      <FaRegHeart class="yt-product-fav" />
                    </div>
                  </div>
                  <img
                    src={require("./images/sample.png")}
                    class="pt-3 px-3 img-fluid yt-product-slider-img prodimage w3-ripple ml-auto mr-auto"
                    alt="ytrend"
                  />
                  <div class="mt-3 yt-product-title text-center">
                    Product Name
                  </div>
                  <div class="price yt-price-wrap text-center py-3">
                    <span class="price1 yt-product-sale-price">$400</span>
                    <span class="price2 yt-product-reg-price2">$500</span>
                  </div>
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div class="yt-item-slider">
                <div class="product yt-product-slider-cpnt text-center">
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="yt-product-off text-center p-1">15%</div>
                    <div class="text-right pr-2">
                      <FaRegHeart class="yt-product-fav" />
                    </div>
                  </div>
                  <img
                    src={require("./images/sample.png")}
                    class="pt-3 px-3 img-fluid yt-product-slider-img prodimage w3-ripple ml-auto mr-auto"
                    alt="ytrend"
                  />
                  <div class="mt-3 yt-product-title text-center">
                    Product Name
                  </div>
                  <div class="price yt-price-wrap text-center py-3">
                    <span class="price1 yt-product-sale-price">$400</span>
                    <span class="price2 yt-product-reg-price2">$500</span>
                  </div>
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div class="yt-item-slider">
                <div class="product yt-product-slider-cpnt text-center">
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="yt-product-off text-center p-1">15%</div>
                    <div class="text-right pr-2">
                      <FaRegHeart class="yt-product-fav" />
                    </div>
                  </div>
                  <img
                    src={require("./images/sample.png")}
                    class="pt-3 px-3 img-fluid yt-product-slider-img prodimage w3-ripple ml-auto mr-auto"
                    alt="ytrend"
                  />
                  <div class="mt-3 yt-product-title text-center">
                    Product Name
                  </div>
                  <div class="price yt-price-wrap text-center py-3">
                    <span class="price1 yt-product-sale-price">$400</span>
                    <span class="price2 yt-product-reg-price2">$500</span>
                  </div>
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div class="yt-item-slider">
                <div class="product yt-product-slider-cpnt text-center">
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="yt-product-off text-center p-1">15%</div>
                    <div class="text-right pr-2">
                      <FaRegHeart class="yt-product-fav" />
                    </div>
                  </div>
                  <img
                    src={require("./images/sample.png")}
                    class="pt-3 px-3 img-fluid yt-product-slider-img prodimage w3-ripple ml-auto mr-auto"
                    alt="ytrend"
                  />
                  <div class="mt-3 yt-product-title text-center">
                    Product Name
                  </div>
                  <div class="price yt-price-wrap text-center py-3">
                    <span class="price1 yt-product-sale-price">$400</span>
                    <span class="price2 yt-product-reg-price2">$500</span>
                  </div>
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div class="yt-item-slider">
                <div class="product yt-product-slider-cpnt text-center">
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="yt-product-off text-center p-1">15%</div>
                    <div class="text-right pr-2">
                      <FaRegHeart class="yt-product-fav" />
                    </div>
                  </div>
                  <img
                    src={require("./images/sample.png")}
                    class="pt-3 px-3 img-fluid yt-product-slider-img prodimage w3-ripple ml-auto mr-auto"
                    alt="ytrend"
                  />
                  <div class="mt-3 yt-product-title text-center">
                    Product Name
                  </div>
                  <div class="price yt-price-wrap text-center py-3">
                    <span class="price1 yt-product-sale-price">$400</span>
                    <span class="price2 yt-product-reg-price2">$500</span>
                  </div>
                  <Button color="secondary yt-product-add-btn buttoncart w3-ripple py-3">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductCardNoSale;
