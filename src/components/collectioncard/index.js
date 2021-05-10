import React, { useRef } from "react";
import "./css/index.scoped.css";
import { Row, Col, Button, Container } from "reactstrap";
import Carousel from "react-elastic-carousel";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Ripple from "react-ripples";
import { useHistory } from "react-router";
import langg from "../../language";

function TitleBar(props) {
  const history = useHistory();
  const lang = new langg("common");
  if (props.name != undefined) {
    return (
      <div class="yt-produstslider-info d-flex justify-content-between align-items-center">
        <h4 class="yt-comonent-top-title my-0">{props.name}</h4>
        <div class="yt-comonent-link">
          <Button color="link yt-component-more px-0" onClick={() => history.push("/shop")}>{lang.get("viewMore", "View More")}</Button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

function CollectionCard(props) {
  const history = useHistory();
  let carousel = useRef();
  let Breakpoints = [
    { width: 320, itemsToShow: 2 },
    { width: 730, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 },
  ];
  const collections = props.collections;
  return (Array.isArray(collections) && collections.length > 0) ?
    <section class="hp-collection-slider">
      <Container>
        <div class="yt-main-wrap">
          <TitleBar name={props.name} />
          <div class="product yt-collection-component yt-collection-wrap bg-white py-4 ">
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
              itemsToShow={5}
              pagination={false}
              showArrows={false}
              ref={(ref) => (carousel = ref)}
              breakPoints={Breakpoints}
              className="collection-card-slider"
            >
              {collections.map((item, idx) =>
              (
                <Ripple>
                  <div class="yt-collection-item w3-ripple" onClick={() => history.push(`/shop?category_id[]=${item.id}`)} >
                    <img
                      src={item.image || "/images/thumb/missing.png"}
                      class="img-fluid yt-coll-img"
                      alt="ytrend"
                    />
                    <div class="yt-collection-title">{item.name}</div>
                  </div>
                </Ripple>
              ))}
            </Carousel>
          </div>
        </div>
      </Container>
    </section>
    :
    null;
}

export default CollectionCard;
