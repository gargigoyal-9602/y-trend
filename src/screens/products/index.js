import React, { useState, useEffect } from "react";
import "./css/index.scoped.css";
import "./css/pagination.css";
import {
  Header,
  Footer,
  HeroBanner,
  ProductCard,
  ProductCardNoSale,
  ThreePromo,
  SingleOfferBanner,
  DoubleOfferBanner,
  AppStoreBanner,
  AllProducts,
  ProductsFilterBar,
} from "../../components";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import classnames from "classnames";
import styled from "styled-components";
import ReactSlider from "react-slider";
import { RiCloseLine } from "react-icons/ri";
import { BsFilterLeft, BsFunnel } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import CacheState from "../../redux/states/cache";
import langg from "../../language";
import { Link } from "react-router-dom";

function Products(props) {
  console.log(props);

  const lang = new langg("productListingScreen");
  var qparams = new URLSearchParams(window.location.search);

  var orderField = qparams.get("order_field");
  var orderBy = qparams.get("order_by");
  var filterQuery = qparams.get("filter_query");

  var currentRecommend = "";

  if (orderField === "recommended") {
    currentRecommend = "0";
  } else if (orderField === "price" && orderBy === "asc") {
    currentRecommend = "1";
  } else if (orderField === "price" && orderBy === "desc") {
    currentRecommend = "2";
  } else if (orderField === "popular") {
    currentRecommend = "3";
  } else if (orderField === "latest") {
    currentRecommend = "4";
  }

  function removeFilterQuery() {
    var urlSearch = new URLSearchParams(window.location.search);

    urlSearch.delete("filter_query");
    props.history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
  }

  function addSortBy(order) {
    var urlSearch = new URLSearchParams(window.location.search);

    if (order == "0") {
      urlSearch.set("order_field", "recommended");
      urlSearch.delete("order_by");
    } else if (order == "1") {
      //low to high
      urlSearch.set("order_field", "price");
      urlSearch.set("order_by", "asc");
    } else if (order == "2") {
      //high to low
      urlSearch.set("order_field", "price");
      urlSearch.set("order_by", "desc");
    } else if (order == "3") {
      urlSearch.set("order_field", "popular");
      urlSearch.delete("order_by");
    } else if (order == "4") {
      urlSearch.set("order_field", "latest");
      urlSearch.delete("order_by");
    } else {
      urlSearch.delete("order_field");
      urlSearch.delete("order_by");
    }

    props.history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
  }
  // END SortBy Handler

  const StyledSlider = styled(ReactSlider)`
    width: 90%;
    height: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
  `;

  const StyledThumb = styled.div`
    height: 10px;
    width: 10px;
    text-align: center;
    background-color: #d4c96d;
    color: #d4c96d;
    border-radius: 50%;
    cursor: grab;
    font-size: 0px;
    padding: 1px;
  `;

  const Thumb = (props, state) => (
    <StyledThumb {...props}>{state.valueNow}</StyledThumb>
  );

  const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props) =>
      props.index === 2 ? "#ddd" : props.index === 1 ? "#d4c96d" : "#ddd"};
    border-radius: 999px;
  `;

  const Track = (props, state) => (
    <StyledTrack {...props} index={state.index} />
  );

  const styles = {
    item: {
      margin: "0 10px",
    },
  };

  const [YT_Category, setYT_Category] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [TrpeRangeDefailt, setTrpeRangeDefailt] = useState({
    min: 0,
    max: 50000,
  });
  const [YT_Color, setYT_Color] = useState([
    { id: 1, title: "Baby Pink", checked: true },
    { id: 2, title: "Beig", checked: false },
    { id: 3, title: "Black", checked: false },
    { id: 4, title: "Blue", checked: false },
    { id: 5, title: "Bottle Green", checked: false },
    { id: 6, title: "Green", checked: false },
    { id: 7, title: "Brown", checked: false },
    { id: 8, title: "Indigo", checked: false },
  ]);
  const [YT_Sizes, setYT_Sizes] = useState([
    { id: 1, title: "XS (215)", checked: true },
    { id: 2, title: "S (142)", checked: false },
    { id: 3, title: "M (50)", checked: false },
    { id: 4, title: "L (90)", checked: false },
    { id: 5, title: "XL (140)", checked: false },
    { id: 6, title: "XXL (120)", checked: false },
  ]);

  const [YT_Other, setYT_Other] = useState([
    { id: 1, title: "Discounted Items", checked: false },
    { id: 2, title: "Exclude out of stock Items", checked: false },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [YT_Clear_ALl, setYT_Clear_ALl] = useState(true);
  const [YtMbFilter, setYtMbFilter] = useState(false);
  const [removeFilter, setRemoveFilter] = useState(() => null);
  const [setOrderBy, setOrderByFunction] = useState(() => null);
  const [paginationData, setPaginationData] = useState(undefined);
  const cacheState = CacheState.get();

  const ToggleValue = async (id, type, arrayData) => {
    console.log(type, id);
    setTypeFilter(type);
    if (type !== undefined) {
      if (type == "category") {
        /*
        let data = [id];
        let check = YT_Category.find((element) => element == id);
        console.log(check);
        if (!check) setYT_Category(YT_Category.concat(data));
        else {
          let data = YT_Category.filter((x) => {
            if (x != id) {
              return x;
            }
          });
        }*/
        setYT_Category(arrayData);
      } else if (type == "tags") {
        console.log("ID is ", JSON.stringify(id));
        /*
        let data = [id];
        let check = tagData.find((element) => element.id == id.id);
        console.log(check);
        if (!check) setTagData(tagData.concat(data));
        else {
          let data = tagData.filter((x) => {
            if (x.id != id.id) {
              return x;
            }
          });
        }*/
        setTagData(arrayData);
      } else if (type == "brands") {
        /*
        let data = [id];
        let check = brandsData.find((element) => element == id);
        console.log(check);
        if (!check) setBrandsData(brandsData.concat(data));
        else {
          let data = brandsData.filter((x) => {
            if (x != id) {
              return x;
            }
          });
      }*/
        setBrandsData(arrayData);
      } else if (type == "priceRange") {
        console.log(id);
        setTrpeRangeDefailt(id);
      }
    }
  };
  console.log("YT_Category", currentRecommend);
  const ytmbFilter = () => {
    setYtMbFilter(!YtMbFilter)

  }
  useEffect(() => {
    if (currentRecommend) {
      console.log("II");
      setTypeFilter("orderBy");
    }
  }, [currentRecommend]);

  console.log("Pagination data received is ", paginationData);


  return (
    <div>
      <Header onProps={props} />
      {/*<HeroBanner />*/}

      <Container>
        <div className="pageroute">

          <Link to="/">
            <span class="cart-pg-home w3-hover-opacity" style={{ cursor: "default" }}>Home</span>
          </Link>
          {" > "}
          <span className="currpage">Shop</span>
        </div>
        <div className="filterpage">
          <Row className="yt-cm-row">
            <Col xs={12} sm={6} lg={3} className={YtMbFilter ? "yt-cm-lt-col ytMbfilteropen" : "yt-cm-lt-col "}>

              <ProductsFilterBar onSelect={ToggleValue} mbOpenState={[YtMbFilter, setYtMbFilter]} setRemoveFilter={setRemoveFilter} setOrderBy={setOrderByFunction} paginationData={paginationData} />
              <div className="w3-overlay w3-show" style={{ zIndex: -1, backgroundColor: "transparent" }} onClick={ytmbFilter}></div>
            </Col>
            <Col xs={12} sm={6} lg={9} className="yt-cm-rt-col">
              <div className="d-flex flex-column justify-content-between h-100">
                <div>
                  <div className="filtertop">
                    <Row>
                      <Col>
                        <div className="filter_abayas">
                          <Row className="align-items-center">
                            <Col>
                              <div className="abayas yt-shop-category-name">
                                {lang.get("products", "Products")}
                              </div>
                            </Col>
                            <div className="recommended">
                              <Col>
                                <Row className="align-item-center">
                                  <div className="yt-sp-mb-filter-wrapper align-self-center">
                                    <div className="d-flex align-items-center" onClick={ytmbFilter}>
                                      <div className="yt-sp-recmnd-icn" >
                                        <BsFunnel />
                                      </div>
                                      <div className="yt-recmnd-mb-txt">{lang.get("filter", "Filter")}</div>
                                    </div>
                                  </div>
                                  <div className="all-prod-sort-tag-name">
                                    {lang.get("sortBy", "Sort by :")}
                                  </div>
                                  <div className="recomdrop yt-recommend-inner">
                                    <Dropdown
                                      isOpen={dropdownOpen}
                                      toggle={toggle}
                                      size="sm"
                                    >
                                      <DropdownToggle
                                        caret
                                        style={styles.dropcustom}
                                        className="yt-product-page-recommend-btn "
                                      >
                                        <div className="yt-sp-mb-recomment-wrap">
                                          <div className="d-flex align-items-center">
                                            <div className="yt-sp-recmnd-icn">
                                              <BsFilterLeft />
                                            </div>
                                            <div className="yt-recmnd-mb-txt">{lang.get("sort", "Sort")}</div>
                                          </div>
                                        </div>
                                        {currentRecommend == "" &&
                                          <span>{lang.get("allProducts", "All Products")}</span>
                                        }
                                        {currentRecommend == "0" &&
                                          <span>{lang.get("recommended", "Recommended")}</span>
                                        }
                                        {currentRecommend == "1" &&
                                          <span>{lang.get("priceLowToHigh", "Price - Low to High")}</span>
                                        }
                                        {currentRecommend == "2" &&
                                          <span>{lang.get("priceHighToLow", "Price - High to Low")}</span>
                                        }
                                        {currentRecommend == "3" &&
                                          <span>{lang.get("byPopularity", "By Popularity")}</span>
                                        }
                                        {currentRecommend == "4" &&
                                          <span>{lang.get("latestProducts", "Latest Products")}</span>
                                        }
                                      </DropdownToggle>
                                      <DropdownMenu className="yt-recommend-wrapper">
                                        <DropdownItem
                                          className={classnames({
                                            "current-active-filter yt-mb-def-recomnd active":
                                              currentRecommend === "",
                                          })}
                                          onClick={() => {
                                            addSortBy("");
                                          }}
                                        >
                                          {lang.get("allProducts", "All Products")}
                                        </DropdownItem>
                                        <DropdownItem
                                          className={classnames({
                                            "current-active-filter yt-mb-def-recomnd active":
                                              currentRecommend === "0",
                                          })}
                                          onClick={() => {
                                            addSortBy("0");
                                          }}
                                        >
                                          {lang.get("recommended", "Recommended")}
                                        </DropdownItem>
                                        <DropdownItem
                                          className={classnames({
                                            "current-active-filter":
                                              currentRecommend === "1",
                                          })}
                                          onClick={() => {
                                            addSortBy("1");
                                          }}
                                        >
                                          {lang.get("priceLowToHigh", "Price - Low to High")}
                                        </DropdownItem>
                                        <DropdownItem
                                          className={classnames({
                                            "current-active-filter":
                                              currentRecommend === "2",
                                          })}
                                          onClick={() => {
                                            addSortBy("2");
                                          }}
                                        >
                                          {lang.get("priceHighToLow", "Price - High to Low")}
                                        </DropdownItem>
                                        <DropdownItem
                                          className={classnames({
                                            "current-active-filter":
                                              currentRecommend === "3",
                                          })}
                                          onClick={() => {
                                            addSortBy("3");
                                          }}
                                        >
                                          {lang.get("byPopularity", "By Popularity")}
                                        </DropdownItem>
                                        <DropdownItem
                                          className={classnames({
                                            "current-active-filter":
                                              currentRecommend === "4",
                                          })}
                                          onClick={() => {
                                            addSortBy("4");
                                          }}
                                        >
                                          {lang.get("latestProducts", "Latest Products")}
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </div>
                                </Row>
                              </Col>
                            </div>
                          </Row>
                        </div>



                        <div className="selectedprops yt-selected-filter-wrap">
                          <Row>
                            <Col md={9}>
                              <div className="yt-filter-selected d-flex align-items-center flex-wrap">
                                {filterQuery &&
                                  <span className="yt-flt-tag">
                                    <b>Search :</b> {filterQuery}
                                    <RiCloseLine
                                      className="yt-close-icn"
                                      onClick={() => removeFilterQuery()}
                                        />
                                </span>}
                                {YT_Category?.map(
                                          (data) =>
                                            data.checked && (
                                              <span className="yt-flt-tag">
                                                {data.name}
                                                <RiCloseLine
                                                  className="yt-close-icn"
                                                  onClick={() =>
                                                    removeFilter(data, "category", YT_Category)
                                                  }
                                                />
                                              </span>
                                            )
                                        )}
                                    {brandsData?.map(
                                      (data) =>
                                        data.checked && (
                                          <span className="yt-flt-tag">
                                            {data.name}
                                            <RiCloseLine
                                              className="yt-close-icn"
                                              onClick={() =>
                                                removeFilter(data, "brands", brandsData)
                                              }
                                            />
                                          </span>
                                        )
                                    )}
                                    {tagData?.map(
                                      (data) =>
                                        data.checked && (
                                          <span className="yt-flt-tag">
                                            {data.name}
                                            <RiCloseLine
                                              className="yt-close-icn"
                                              onClick={() =>
                                                removeFilter(data, "tags", tagData)
                                              }
                                            />
                                          </span>
                                        )
                                    )}
                                    {(tagData?.filter((i) => i.checked).length > 0 || brandsData?.filter((i) => i.checked).length > 0 || YT_Category?.filter((i) => i.checked).length > 0) && (
                                      <span className="yt-clear-all" onClick={() => window.location = "/shop?page=1&per_page=15"} style={{ cursor: "default" }}>Clear All</span>
                                    )}
                              </div>
                            </Col>
                              <Col md={3} className="align-self-center">
                                {paginationData && paginationData.total_pages > 0 && lang.direction === "ltr" &&
                                  <div className="showingnum yt-product-showing-total-item">
                                    Showing <span className="yt-first">{paginationData.current_page}</span> of{" "}
                                    <span className="yt-second">{paginationData.total_pages}</span> pages
                                </div>
                                }
                                {paginationData && paginationData.total_pages > 0 && lang.direction === "rtl" &&
                                  <div className="showingnum yt-product-showing-total-item">
                                    {lang.get("pages")} <span className="yt-first">{paginationData.total_pages}</span> {lang.get("of") + " "}
                                    <span className="yt-second">{paginationData.current_page}</span> {lang.get("showing")}
                                  </div>
                                }
                              </Col>
                          </Row>
                        </div>


                      </Col>
                    </Row>
                  </div>
                    <div id="SingelnewProducts">
                      <AllProducts
                        category={YT_Category || []}
                        tags={tagData || []}
                        brands={brandsData || []}
                        priceRange={TrpeRangeDefailt}
                        type={typeFilter}
                        sortBy={currentRecommend}
                        page={paginationData?.current_page}
                        per_page={15}
                        paginationData={paginationData}
                        setPaginationData={setPaginationData}
                      />
                    </div>
                  </div>
                  {paginationData && (paginationData.next_page || paginationData.prev_page) &&
                    <div id="pagination">
                      <ReactPaginate
                        previousLabel={'<<<'}
                        nextLabel={'>>>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={paginationData.total_pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(val) => {
                          if ('URLSearchParams' in window) {
                            var searchParams = new URLSearchParams(window.location.search);
                            searchParams.set("page", val.selected + 1);
                            console.log("Newton ", searchParams.toString());
                            props.history.push("/shop?" + searchParams.toString());
                          }

                          setPaginationData({ ...paginationData, current_page: val.selected + 1 });
                        }
                        }
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                  }
                </div>
            </Col>
          </Row>
        </div>
      </Container>

        <ThreePromo />
        {/*Today’s Deals Product */}
        <ProductCard products={cacheState.homepage?.recommended_products} name={lang.get("recommendedProducts", "Recommended Products")} onViewMore={() => window.location.assign("/shop?order_field=recommended&page=1&per_page=15")} />
        {/*Today’s Deals Product */}


        {/*Featured Product */}
        <ProductCard products={cacheState.homepage?.latest_products} name={lang.get("newProducts", "New Products")} onViewMore={() => window.location.assign("/shop?&order_field=latest&page=1&per_page=15")} />
        {/*Featured Product End*/}
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

export default Products;
// if (type == "category") {
//   var catdata = [...YT_Category];
//   catdata.map((val) => {
//     if (id == val.id) {
//       val.checked = !val.checked;
//     }
//   });
//   setYT_Category(catdata);
// } else if (type == "color") {
//   var colordata = [...YT_Color];
//   colordata.map((val) => {
//     if (id == val.id) {
//       val.checked = !val.checked;
//     }
//   });
//   setYT_Color(colordata);
// } else if (type == "size") {
//   var sizedata = [...YT_Sizes];
//   sizedata.map((val) => {
//     if (id == val.id) {
//       val.checked = !val.checked;
//     }
//   });
//   setYT_Sizes(sizedata);
// } else if (type == "other") {
//   var otherdata = [...YT_Other];
//   otherdata.map((val) => {
//     if (id == val.id) {
//       val.checked = !val.checked;
//     }
//   });
//   setYT_Other(otherdata);
// }

// { id: 1, title: "All Abayas", quantity: "", checked: true },
//     { id: 2, title: "Casual Abayas", quantity: "253", checked: false },
//     { id: 3, title: "Formal Abayas", quantity: "222", checked: false },
//     { id: 4, title: "Dubai Style Abayas", quantity: "175", checked: false },
//     { id: 5, title: "Luxury Abayas", quantity: "25", checked: false },
//     { id: 6, title: "Denim Abayas", quantity: "24", checked: false },
//     { id: 7, title: "Black Abayas", quantity: "102", checked: false },
//     { id: 8, title: "Coat Style Abayas", quantity: "15", checked: false },
//     { id: 9, title: "Lace Abayas", quantity: "125", checked: false },
//     { id: 10, title: "Maxi Dresses", quantity: "12", checked: false },
