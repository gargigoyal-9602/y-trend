import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import "./css/index.scoped.css";
import "./css/inputrange.css";
import { Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { FaSearch, FaCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
import InputRange from "react-input-range";
import { get } from "../../../Barriers/apiHelper";
import { useSelector } from "react-redux";
import getConfig from "../../../config";
import { useHistory } from "react-router";
import { useMediaQuery } from 'react-responsive'
import classnames from 'classnames';
import commands from "../../../commands";
import langg from "../../../language";
import _ from "lodash";
import { RiTruckLine } from "react-icons/ri";
import MobileFilter from "./mobile";

function ProductsFilterBar(props) {
  // console.log(props);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767.92px)' })
  const qparams = new URLSearchParams(window.location.search);

  const [brands, setBrands] = useState(undefined);

  const [tags, setTags] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  const [order, setOrder] = useState("");
  const [reflect, setReflect] = useState("");
  const [colorVariants, setColorVariants] = useState([]);
  const [sizeVariants, setSizeVariants] = useState([]);
  const [allAvailableVariants, setAllAvailableVariants] = useState([]);
  const YTCategory = props.onCategory;
  const YTColor = props.onColor;
  const YTSize = props.onSize;
  const cartState = useSelector((state) => state.cartReducer.categotyData);
  const categoryData = useSelector((state) => state.cartReducer.categotyData);

  const config = getConfig();
  const history = useHistory();
  const [colorSearch, setColorSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");
  const [allAvailableAttributeSearch, setAllAvailableAttributeSearch] = useState({});
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [activeTab, setActiveTab] = useState('1');
  const [YTmbFilter, setYTmbFilter] = props.mbOpenState;
  const [maxProductValue, setMaxProductValue] = useState(100000);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }



  // Start Price FIlter Module Handler
  const initialPriceFrom = qparams.get("from") === null || isNaN(qparams.get("from")) ? 0 : parseInt(qparams.get("from"));
  const initialPriceTo = qparams.get("to") === null || isNaN(qparams.get("to")) ? maxProductValue : parseInt(qparams.get("to"));

  const [TrpeRangeDefailt, setTrpeRangeDefailt] = useState({
    min: initialPriceFrom,
    max: initialPriceTo,
  });

  useEffect(() => {
    setTrpeRangeDefailt({
      min: initialPriceFrom,
      max: maxProductValue,
    });
  }, [maxProductValue]);

  const lang = new langg("productListingScreen");

  function addPriceFilter(priceRange) {
    console.log("newr ", priceRange);
    var query = new URLSearchParams(window.location.search);

    query.set("from", priceRange.min);
    query.set("to", priceRange.max);

    history.push(`/shop?${decodeURIComponent(query.toString())}`);
  }

  // End Price FIlter Module Handler

  const runFilter = () => {

    if (categories && brands && tags) {
      var urlSearch = new URLSearchParams(window.location.search);
      /*
      var priceFrom = typeof TrpeRangeDefailt.min === "number" ? TrpeRangeDefailt.min : 0;
      var priceTo = typeof TrpeRangeDefailt.max === "number" ? TrpeRangeDefailt.max : 50000;
      urlSearch.set("from", priceFrom);
      urlSearch.set("to", priceTo);

      if (order == "1") {
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
*/

      if (Array.isArray(categories) && categories.length > 0) {
        var checkedCategories = categories.filter((category) => category.checked === true).map((category) => category.id);
        checkedCategories.forEach((id, idx) => {
          if (idx === 0) {
            urlSearch.set("category_id[]", id);
          } else {
            urlSearch.append("category_id[]", id);
          }
        });
        if (checkedCategories.length < 1) {
          urlSearch.delete("category_id[]");
        }



        //removing subcategories for unchecked
        var subcategoryIds = [];

        categories.forEach((item, index) => {
          var sub = urlSearch.getAll("sub_category_id[]");
          if (checkedCategories.includes(item.id)) {
            item.sub_categories.forEach((itm, idx) => {
              if (sub.includes(String(itm.id))) {
                subcategoryIds.push(String(itm.id));
              }
            });
          }
        });


        urlSearch.delete("sub_category_id[]");
        subcategoryIds.forEach((item, idx) => {
          urlSearch.append("sub_category_id[]", item);
        });



      }

      if (Array.isArray(brands) && brands.length > 0) {
        var checkedBrands = brands.filter((brand) => brand.checked === true).map((brand) => brand.id);
        checkedBrands.forEach((id, idx) => {
          if (idx === 0) {
            urlSearch.set("brand_id[]", id);
          } else {
            urlSearch.append("brand_id[]", id);
          }
        });
        if (checkedBrands.length < 1) {
          urlSearch.delete("brand_id[]");
        }
      }

      var checkedTags = "";
      if (Array.isArray(tags) && tags.length > 0) {
        checkedTags = tags.filter((tag) => tag.checked === true).map((tag) => tag.name).join(",");
        if (checkedTags) {
          urlSearch.set("tag", checkedTags);
        } else {
          urlSearch.delete("tag");
        }
      }

      if (qparams.get("page") === null) {
        urlSearch.set("page", 1);
      }
      if (qparams.get("per_page") === null) {
        urlSearch.set("per_page", 15);
      }

      /*
      if (qparams.get("order_field") === null) {
        urlSearch.set("order_field", "recommended");
      }*/

      //alert(priceFrom);
      history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
    }
  };


  function toggleDiscounted() {
    var urlSearch = new URLSearchParams(window.location.search);

    if (urlSearch.get("discounted_items")) {
      urlSearch.delete("discounted_items");
    } else {
      urlSearch.set("discounted_items", "true");
    }
    history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
  }
  const showDiscounted = qparams.get("discounted_items");



  function toggleOutofstock() {
    var urlSearch = new URLSearchParams(window.location.search);

    if (urlSearch.get("exclude_out_of_stock")) {
      urlSearch.delete("exclude_out_of_stock");
    } else {
      urlSearch.set("exclude_out_of_stock", "true");
    }
    history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
  }
  const excludeOutofstock = qparams.get("exclude_out_of_stock");




  function toggleColorAndSize(name) {
    var urlSearch = new URLSearchParams(window.location.search);
    var copy = new URLSearchParams(window.location.search);
    if (urlSearch.getAll("color_size[]")?.includes(name)) {
      urlSearch.delete("color_size[]");
      copy.getAll("color_size[]")?.forEach((item, idx) => {
        if (item !== name) {
          urlSearch.append("color_size[]", item);
        }
      });
    } else {
      urlSearch.append("color_size[]", name);
    }
    history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
  }


  function toggleSubCategory(id) {
    var urlSearch = new URLSearchParams(window.location.search);
    var copy = new URLSearchParams(window.location.search);
    if (urlSearch.getAll("sub_category_id[]")?.includes(id)) {
      urlSearch.delete("sub_category_id[]");
      copy.getAll("sub_category_id[]")?.forEach((item, idx) => {
        if (item !== id) {
          urlSearch.append("sub_category_id[]", item);
        }
      });
    } else {
      urlSearch.append("sub_category_id[]", id);
    }
    history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
  }

  useEffect(async () => {
    getCategories();
    getBrands();
    getTags();
  }, []);

  useEffect(() => {
    if (categories) {
      getCategories();
    }
    var cloneBrands = brands;
    var clonetags = tags;
    if (Array.isArray(cloneBrands) && cloneBrands.length > 0) {
      var urlBrands = qparams.getAll("brand_id[]") || [];
      var checkedBrands = cloneBrands.map((brand) => urlBrands.includes(brand.id.toString()) ? (brand.checked = true, brand) : (brand.checked = false, brand));
      setBrands(checkedBrands);
    }

    if (Array.isArray(clonetags) && clonetags.length > 0) {
      var urlTags = qparams.get("tag")?.split(",") || [];
      var checkedTags = clonetags.map((tag) => urlTags.includes(tag.name) ? (tag.checked = true, tag) : (tag.checked = false, tag));
      setTags(checkedTags);
    }

  }, [history.location.search]);

  const getCategories = () => {
    let categories = categoryData;

    if (Array.isArray(categories) && categories.length > 0) {
      var urlCategories = qparams.getAll("category_id[]") || [];
      var checkedCategories = categories.map((category) => urlCategories.includes(category.id.toString()) ? (category.checked = true, category) : (category.checked = false, category));
      setCategories(checkedCategories);
    }

  }

  const getBrands = () => {

    get(`/brands`)
      .then((res) => {
        let brands = res.data.data.brands;
        setMaxProductValue(res.data.data?.max_product_value || 100000);
        if (Array.isArray(brands) && brands.length > 0) {
          var urlBrands = qparams.getAll("brand_id[]") || [];
          var checkedBrands = brands.map((brand) => urlBrands.includes(brand.id.toString()) ? (brand.checked = true, brand) : (brand.checked = false, brand));
          setBrands(checkedBrands);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTags = () => {
    get(`/tags`)
      .then((res) => {
        var tags = res.data.data;

        if (Array.isArray(tags) && tags.length > 0) {
          var urlTags = qparams.get("tag")?.split(",") || [];
          var checkedTags = tags.map((tag) => urlTags.includes(tag.name) ? (tag.checked = true, tag) : (tag.checked = false, tag));
          setTags(checkedTags);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getVariants = async () => {
    const data = await commands.products.getVariants();
    console.log("wahwah ", data);
    if (Array.isArray(data)) {
      data.forEach((item, idx) => {

        if (item.name === "color") {
          if (Array.isArray(item.variant_properties)) {
            setColorVariants(item.variant_properties);
          }
        }


        if (item.name === "size") {
          if (Array.isArray(item.variant_properties)) {
            setSizeVariants(item.variant_properties);
          }
        }

      });

      setAllAvailableVariants(data);
      console.log("gotley", data);
    }
  };


  useEffect(() => {
    getVariants();
  }, []);

  const filterCheck = (id) => {
    let data = [];
    categories.forEach((x) => {
      if (id == x.id) {
        x.checked = !x.checked;
      }
      data.push(x);
    });
    console.log(data);
    setCategories(data);
  };
  async function removeFilter(item, type, arrayData = []) {

    let data = [];
    arrayData.forEach((x) => {
      if (item.id == x.id) {
        x.checked = false;
      }
      data.push(x);
    });

    if (type == "category") {
      setCategories(data);
    }
    if (type == "brands") {
      setBrands(data);
    }
    if (type == "tags") {
      setTags(data);
    }
    props.onSelect(item, type, data);
    runFilter();
  };

  useEffect(() => {
    props.setRemoveFilter(() => removeFilter);
    props.setOrderBy(() => setOrder);
  }, []);

  useEffect(() => {
    props.onSelect({}, "category", categories);
    runFilter();
  }, [categories]);
  useEffect(() => {
    props.onSelect({}, "brands", brands);
    runFilter();
  }, [brands]);
  useEffect(() => {
    props.onSelect({}, "tags", tags);
    runFilter();
  }, [tags]);

  /*
  useLayoutEffect(() => {
    runFilter();
  }, [order]);*/




  return (
    <div className="yt-product-filter-wrap">
      {isTabletOrMobile ?
        YTmbFilter &&
        <MobileFilter data={{ categories, brands, tags, colorVariants, sizeVariants, allAvailableVariants, priceRange: TrpeRangeDefailt, showDiscountedItems: showDiscounted, excludeOutofStockItems: excludeOutofstock }} content={({ categories, toggleCategories, toggleSubCategories, brands, toggleBrands, tags, toggleTags, colorVariants, toggleColorVariants, sizeVariants, toggleSizeVariants, allAvailableVariants, toggleAllAvailableVariants, priceRange, setPriceRange, showDiscountedItems, setDiscountedItems, excludeOutofStockItems, setExcludeOutofStockItems, onApply }) => (
          <div>
            <div className="yt-mbtab-filter-wrap d-flex" style={{ cursor: "default" }}>
              <Nav tabs>
                {categories?.length > 0 && (
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      <h4 className="yt-mbtab-filter-ttl my-0">Category</h4>
                    </NavLink>
                  </NavItem>
                )}
                {brands?.length > 0 && (
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      <h4 className="yt-mbtab-filter-ttl my-0">Brands</h4>
                    </NavLink>
                  </NavItem>
                )}
                {colorVariants?.length > 0 && (
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      <h4 className="yt-mbtab-filter-ttl my-0">Colors</h4>
                    </NavLink>
                  </NavItem>
                )}
                {sizeVariants?.length > 0 && (
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '4' })}
                      onClick={() => { toggle('4'); }}
                    >
                      <h4 className="yt-mbtab-filter-ttl my-0">Size</h4>
                    </NavLink>
                  </NavItem>
                )}

                {allAvailableVariants.map((variant, index) => (
                  variant.variant_properties?.length > 0 && !['size', 'color'].includes(variant.name) && (
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === String(index + 7) })}
                        onClick={() => { toggle(String(index + 7)); }}
                      >
                        <h4 className="yt-mbtab-filter-ttl my-0">{_.capitalize(variant.name)}</h4>
                      </NavLink>
                    </NavItem>
                  )))}

                {tags?.length > 0 && (
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '5' })}
                      onClick={() => { toggle('5'); }}
                    >
                      <h4 className="yt-mbtab-filter-ttl my-0">Tags</h4>
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '6' })}
                    onClick={() => { toggle('6'); }}
                  >
                    <h4 className="yt-mbtab-filter-ttl my-0">Price Range</h4>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="yt-tab-filte-content-mb">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <div className="yt-cmyt-mb-filter-search-bar">
                        <img src={require('./images/magnifying-glass@3x.png')} className="yt-mb-filter-search-icn" />
                        <input
                          type="text"
                          placeholder="Search"
                          className="yt-mb-filter-search-filed"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                        />
                      </div>
                      <ul className="p-0 m-0 yt-ul-list-none">
                        {categories?.map((cat, index) => (categorySearch === "" ? true : (cat.name.toLowerCase().search(categorySearch.toLowerCase()) > -1)) && (

                          <Fragment>
                            <li
                              key={index}
                              className="pb-4 d-flex align-items-center"
                            >
                              <div className="yt-filter-checkbox-wrap mr-3">
                                <input
                                  type="checkbox"
                                  onChange={() => toggleCategories(cat.id)}
                                  dataId={cat.id}
                                  dataValue={cat.name}
                                  checked={cat.checked}
                                />
                                <label className="yt-filter-label" for={cat.name} />
                              </div>
                              <div className="yt-cat-name">
                                {_.capitalize(cat.name)} {cat.checked}
                                {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                              </div>
                            </li>


                            {
                              cat.checked && cat?.sub_categories?.map((subcat, index) => (
                                <li
                                  key={index}
                                  className="pb-4 d-flex align-items-center"
                                >
                                  <BsArrowReturnRight />
                                  <div className="yt-filter-checkbox-wrap mr-3">
                                    <input
                                      type="checkbox"
                                      onChange={() => toggleSubCategories(subcat.id)}
                                      dataId={subcat.id}
                                      dataValue={subcat.name}
                                      checked={subcat.checked}
                                    />
                                    <label className="yt-filter-label" for={"m" + subcat.name} />
                                  </div>
                                  <div className="yt-cat-name">
                                    {_.capitalize(subcat.name)} {subcat.checked}
                                    {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                                  </div>
                                </li>
                              ))
                            }

                          </Fragment>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <div className="yt-cmyt-mb-filter-search-bar">
                    <img src={require('./images/magnifying-glass@3x.png')} className="yt-mb-filter-search-icn" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="yt-mb-filter-search-filed"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                    />
                  </div>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {brands?.map((cat, index) => (brandSearch === "" ? true : (cat.name.toLowerCase().search(brandSearch.toLowerCase()) > -1)) && (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center"
                      >
                        <div className="yt-filter-checkbox-wrap mr-3">
                          <input
                            type="checkbox"
                            onChange={() => toggleBrands(cat.id)}
                            dataId={cat.id}
                            dataValue={cat.name}
                            checked={cat.checked}
                          />
                          <label className="yt-filter-label" for={cat.name} />
                        </div>
                        <div className="yt-cat-name">
                          {_.capitalize(cat.name)}
                          {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabPane>

                <TabPane tabId="3">
                  <div className="yt-cmyt-mb-filter-search-bar">
                    <img src={require('./images/magnifying-glass@3x.png')} className="yt-mb-filter-search-icn" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="yt-mb-filter-search-filed"
                      value={colorSearch}
                      onChange={(e) => setColorSearch(e.target.value)}
                    />
                  </div>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {colorVariants?.map((cat, index) => (colorSearch === "" ? true : (cat.name.toLowerCase().search(colorSearch.toLowerCase()) > -1)) && (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center"
                      >
                        <div className="yt-filter-checkbox-wrap mr-3">
                          <input
                            type="checkbox"
                            onChange={() => toggleColorVariants(cat.name)}
                            dataId={cat.id}
                            dataValue={cat.name}
                            checked={cat.checked}
                          />
                          <label className="yt-filter-label" for={cat.name} />
                        </div>
                        <FaCircle color={typeof cat.name === "string" ? cat.name.split(" ").join("") : cat.name} style={cat.name.toLowerCase() === "white" ? { borderWidth: "1px", borderColor: "silver", borderStyle: "solid", borderRadius: "50%" } : {}} />
                        <div className="yt-cat-name ml-3">
                          {_.capitalize(cat.name)}
                          {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabPane>




                <TabPane tabId="4">
                  <div className="yt-cmyt-mb-filter-search-bar">
                    <img src={require('./images/magnifying-glass@3x.png')} className="yt-mb-filter-search-icn" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="yt-mb-filter-search-filed"
                      value={sizeSearch}
                      onChange={(e) => setSizeSearch(e.target.value)}
                    />
                  </div>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {sizeVariants?.map((cat, index) => (sizeSearch === "" ? true : (cat.name.toLowerCase().search(sizeSearch.toLowerCase()) > -1)) && (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center"
                      >
                        <div className="yt-filter-checkbox-wrap mr-3">
                          <input
                            type="checkbox"
                            onChange={() => toggleSizeVariants(cat.name)}
                            dataId={cat.id}
                            dataValue={cat.name}
                            checked={cat.checked}
                          />
                          <label className="yt-filter-label" for={cat.name} />
                        </div>
                        <div className="yt-cat-name">
                          {_.capitalize(cat.name)}
                          {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabPane>

                {allAvailableVariants.map((variant, index) => (
                  variant?.variant_properties.length > 0 && !['size', 'color'].includes(variant.name) &&
                  <TabPane tabId={String(index + 7)}>
                    <div className="yt-cmyt-mb-filter-search-bar">
                      <img src={require('./images/magnifying-glass@3x.png')} className="yt-mb-filter-search-icn" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="yt-mb-filter-search-filed"
                        value={allAvailableAttributeSearch[variant.name]}
                        onChange={(e) => setAllAvailableAttributeSearch({ ...allAvailableAttributeSearch, [variant.name]: e.target.value })}
                      />
                    </div>
                    <ul className="p-0 m-0 yt-ul-list-none">
                      {variant?.variant_properties?.map((cat, index) => (allAvailableAttributeSearch[variant.name] == "" ? true : (cat.name.toLowerCase().search(allAvailableAttributeSearch[variant.name]?.toLowerCase()) > -1)) && (
                        <li
                          key={index}
                          className="pb-4 d-flex align-items-center"
                        >
                          <div className="yt-filter-checkbox-wrap mr-3">
                            <input
                              type="checkbox"
                              onChange={() => toggleAllAvailableVariants(variant.name, cat.name)}
                              dataId={cat.id}
                              dataValue={cat.name}
                              checked={cat.checked}
                            />
                            <label className="yt-filter-label" for={cat.name} />
                          </div>
                          <div className="yt-cat-name">
                            {_.capitalize(cat.name)}
                            {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabPane>
                ))}


                <TabPane tabId="5">
                  <div className="yt-cmyt-mb-filter-search-bar">
                    <img src={require('./images/magnifying-glass@3x.png')} className="yt-mb-filter-search-icn" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="yt-mb-filter-search-filed"
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                    />
                  </div>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {tags?.map((cat, index) => (tagSearch === "" ? true : (cat.name.toLowerCase().search(tagSearch.toLowerCase()) > -1)) && (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center"
                      >
                        <div className="yt-filter-checkbox-wrap mr-3">
                          <input
                            type="checkbox"
                            onChange={() => toggleTags(cat.id)}
                            dataId={cat.id}
                            dataValue={cat.name}
                            checked={cat.checked}
                          />
                          <label className="yt-filter-label" for={cat.name} />
                        </div>
                        <div className="yt-cat-name">
                          {_.capitalize(cat.name)}
                          {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabPane>
                <TabPane tabId="6">
                  <div className="yt-filter-inner-wrap p-4 yt-price-filter-wrap">
                    <span className="yt-min-price">Select a price range</span>
                    <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
                      <span className="yt-min-price">SAR {priceRange.min}</span>
                      <span className="yt-max-price">SAR {priceRange.max}</span>
                    </div>
                    <InputRange
                      maxValue={maxProductValue}
                      minValue={0}
                      step={20}
                      value={priceRange}
                      onChange={(value) => setPriceRange(value)}
                      onChangeComplete={(value) => setTrpeRangeDefailt(value)}
                    />
                  </div>

                  <ul className="p-0 m-0 yt-ul-list-none mt-2 p-3">
                    <li
                      className="pb-4 d-flex align-items-center"
                    >
                      <div className="yt-filter-checkbox-wrap mr-3">
                        <input
                          type="checkbox"
                          onChange={() => setDiscountedItems(!showDiscountedItems)}
                          dataId={123}
                          dataValue={1123}
                          checked={showDiscountedItems}
                          name="mdiscounteditems"
                        />
                        <label className="yt-filter-label" for={"mdiscounteditems"} />
                      </div>
                      <div className="yt-cat-name">
                        Discounted Items
                    </div>
                    </li>
                    <li
                      className="pb-4 d-flex align-items-center"
                    >
                      <div className="yt-filter-checkbox-wrap mr-3">
                        <input
                          type="checkbox"
                          onChange={() => setExcludeOutofStockItems(!excludeOutofStockItems)}
                          dataId={123}
                          dataValue={1123}
                          checked={excludeOutofStockItems}
                          name="mexcludeoutofstock"
                        />
                        <label className="yt-filter-label" for={"mexcludeoutofstock"} />
                      </div>
                      <div className="yt-cat-name">
                        Exclude OutofStock
                    </div>
                    </li>
                  </ul>
                </TabPane>
              </TabContent>
            </div>
            <div className="d-flex yt-mb-filter-apply">
              <Button color="secondary yt-filte-btn-mb yt-filter-cancel" onClick={() => setYTmbFilter(false)}>Cancel</Button>
              <Button color="secondary yt-filte-btn-mb yt-filter-apply" onClick={() => { setCategories(categories); setBrands(brands); setTags(tags); onApply(); setYTmbFilter(false); }}>Apply</Button>
            </div>
          </div>
        )}
        />
        :

        <Fragment>
          <h2 className="yt-filter-title mt-0 mb-3">{lang.get("filter", "Filter")}</h2>
          <div className="yt-main-filter-box bg-white radius-10">
            {categories?.length > 0 &&
              <Fragment>
                <div className="yt-filter-inner-wrap p-4">
                  <h4 className="yt-box-title mt-0">{lang.get("category", "Category")}</h4>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {categories?.map((cat, index) => (
                      <Fragment>
                        <li
                          key={index}
                          className="pb-4 d-flex align-items-center justify-content-between"
                        >
                          <div className="yt-cat-name">
                            {cat.name} {cat.checked}
                            {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                          </div>
                          <div className="yt-filter-checkbox-wrap">
                            <input
                              type="checkbox"
                              onChange={() => {
                                categories[index] = (cat.checked = !cat.checked, cat);
                                setCategories([...categories]);
                                runFilter();
                              }}
                              dataId={cat.id}
                              dataValue={cat.name}
                              checked={cat.checked}
                            />
                            <label className="yt-filter-label" for={cat.name} />
                          </div>
                        </li>
                        {cat.checked && cat?.sub_categories?.map((subcat, index) => (
                          <li
                            key={index}
                            className="pb-4 d-flex align-items-center justify-content-between"
                          >
                            <div className="yt-cat-name">
                              <BsArrowReturnRight />
                              {subcat.name} {subcat.checked}
                              {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                            </div>
                            <div className="yt-filter-checkbox-wrap">
                              <input
                                type="checkbox"
                                onChange={(e) => { toggleSubCategory(String(subcat.id)) }}
                                name={subcat.name + index}
                                checked={qparams.getAll("sub_category_id[]")?.includes(String(subcat.id))}
                              />
                              <label className="yt-filter-label" for={subcat.name + index} />
                            </div>
                          </li>
                        ))}
                      </Fragment>
                    ))}
                  </ul>
                </div>
                <span className="yt-filter-divider" />
              </Fragment>}

            {brands?.length > 0 && (
              <Fragment>
                <div className="yt-filter-inner-wrap p-4">
                  <h4 className="yt-box-title mt-0">{lang.get("brands", "Brands")}</h4>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {brands?.map((cat, index) => (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center justify-content-between"
                      >
                        <div className="yt-cat-name">
                          {cat.name}
                          {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                        </div>
                        <div className="yt-filter-checkbox-wrap">
                          <input
                            type="checkbox"
                            onChange={() => { brands[index] = (cat.checked = !cat.checked, cat); setBrands([...brands]); runFilter(); }}
                            dataId={cat.id}
                            dataValue={cat.name}
                            checked={cat.checked}
                          />
                          <label className="yt-filter-label" for={cat.name} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="yt-filter-divider" />
              </Fragment>
            )}

            {colorVariants?.length > 0 && (
              <Fragment>
                <div className="yt-filter-inner-wrap p-4">
                  <h4 className="yt-box-title mt-0">Color</h4>
                  <div className="yt-filter-search-wrap pb-2 mb-3">
                    <AiOutlineSearch className="yt-search-icn" />
                    <input
                      type="text"
                      placeholder={lang.get("searchColors", "Search Colors")}
                      className="yt-color-search-bar d-block py-3"
                      value={colorSearch}
                      onChange={(e) => setColorSearch(e.target.value)}
                    />
                  </div>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {colorVariants.map((color, index) => (colorSearch === "" ? true : (color.name.toLowerCase().search(colorSearch.toLowerCase()) > -1)) && (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center justify-content-between"
                      >
                        <span>
                          <div className={"pr-2 d-flex align-items-center"}>
                            <FaCircle color={typeof color.name === "string" ? color.name.split(" ").join("") : color.name} style={color.name.toLowerCase() === "white" ? { borderWidth: "1px", borderColor: "silver", borderStyle: "solid", borderRadius: "50%" } : {}} />
                            <span className="ml-3">{_.capitalize(color.name)}</span>
                          </div>
                        </span>
                        <div className="yt-filter-checkbox-wrap">
                          <input
                            name={color.name + index}
                            type="checkbox"
                            onChange={() => toggleColorAndSize(color.name)}
                            checked={qparams.getAll("color_size[]")?.includes(color.name)}
                          />
                          <label className="yt-filter-label" for={color.name + index} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="yt-filter-divider" />
              </Fragment>
            )}

            {sizeVariants?.length > 0 && (
              <Fragment>
                <div className="yt-filter-inner-wrap p-4">
                  <h4 className="yt-box-title mt-0">Size</h4>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {sizeVariants.map((size, index) => (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center justify-content-between"
                      >
                        <div className="yt-size-name">{size.name.toUpperCase()}</div>
                        <div className="yt-filter-checkbox-wrap">
                          <input
                            name={size.name + index}
                            type="checkbox"
                            onChange={() => toggleColorAndSize(size.name)}
                            checked={qparams.getAll("color_size[]")?.includes(size.name)}
                          />
                          <label className="yt-filter-label" for={size.name + index} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="yt-filter-divider" />
              </Fragment>
            )}



            {allAvailableVariants.map((variant, index) => (
              variant.variant_properties?.length > 0 && !["size", "color"].includes(variant.name) && (
                <Fragment>
                  <div className="yt-filter-inner-wrap p-4">
                    <h4 className="yt-box-title mt-0">{_.capitalize(variant.name)}</h4>
                    <ul className="p-0 m-0 yt-ul-list-none">
                      {variant.variant_properties.map((size, index) => (
                        <li
                          key={index}
                          className="pb-4 d-flex align-items-center justify-content-between"
                        >
                          <div className="yt-size-name">{_.capitalize(size.name)}</div>
                          <div className="yt-filter-checkbox-wrap">
                            <input
                              name={size.name + index}
                              type="checkbox"
                              onChange={() => toggleColorAndSize(size.name)}
                              checked={qparams.getAll("color_size[]")?.includes(size.name)}
                            />
                            <label className="yt-filter-label" for={size.name + index} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="yt-filter-divider" />
                </Fragment>
              )
            ))}


            {tags?.length > 0 && (
              <Fragment>
                <div className="yt-filter-inner-wrap p-4">
                  <h4 className="yt-box-title mt-0">{lang.get("tags", "Tags")}</h4>
                  <ul className="p-0 m-0 yt-ul-list-none">
                    {tags?.map((cat, index) => (
                      <li
                        key={index}
                        className="pb-4 d-flex align-items-center justify-content-between"
                      >
                        <div className="yt-cat-name">
                          {cat.name}
                          {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                        </div>
                        <div className="yt-filter-checkbox-wrap">
                          <input
                            type="checkbox"
                            onChange={() => { tags[index] = (cat.checked = !cat.checked, cat); setTags([...tags]); runFilter(); }}
                            dataId={cat.id}
                            dataValue={cat.name}
                            checked={cat.checked}
                          />
                          <label className="yt-filter-label" for={cat.name} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="yt-filter-divider" />
              </Fragment>
            )}
            <Row>
              <Col md={4} lg={12}>
                <div className="yt-filter-inner-wrap p-4 yt-price-filter-wrap">
                  <h4 className="yt-box-title mt-0">{lang.get("priceRange", "Price Range")}</h4>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="yt-min-price">{config.currency} {TrpeRangeDefailt.min}</span>
                    <span className="yt-max-price">{config.currency} {TrpeRangeDefailt.max}</span>
                  </div>
                  <InputRange
                    maxValue={maxProductValue}
                    minValue={0}
                    step={20}
                    value={TrpeRangeDefailt}
                    onChange={(value) => setTrpeRangeDefailt(value)}
                    onChangeComplete={(value) => addPriceFilter(value)}

                  />
                  {/* <ul className="p-0 mb-0 mt-4 yt-ul-list-none">
            {props.onOther.map((other, index) => (
              <li
                key={index}
                className="pb-4 d-flex align-items-center justify-content-between"
              >
                <div className="yt-size-name yt-color-black">{other.title}</div>
                <div className="yt-filter-checkbox-wrap">
                  <input
                    type="checkbox"
                    onChange={(e) => props.onSelect(other.id, "other")}
                    dataId={other.id}
                    dataValue={other.title}
                    checked={other.checked}
                  />
                  <label className="yt-filter-label" for={other.title} />
                </div>
              </li>
            ))}
          </ul>
        */}

                </div>
              </Col>
              <Col md={8} lg={12} className="">
                <div className="yt-filter-inner-wrap p-4 yt-discount-wrapper">
                  <ul className="p-0 mb-0 mt-4 yt-ul-list-none">
                    <li
                      className="pb-4 d-flex align-items-center justify-content-between"
                    >
                      <div className="yt-size-name yt-color-black">Discounted Items</div>
                      <div className="yt-filter-checkbox-wrap">
                        <input
                          name="discheck"
                          type="checkbox"
                          onChange={toggleDiscounted}
                          checked={showDiscounted}
                        />
                        <label className="yt-filter-label" for={"discheck"} />
                      </div>
                    </li>
                    <li
                      className="pb-4 d-flex align-items-center justify-content-between"
                    >
                      <div className="yt-size-name yt-color-black">Exclude OutofStock</div>
                      <div className="yt-filter-checkbox-wrap">
                        <input
                          name="discheck"
                          type="checkbox"
                          onChange={toggleOutofstock}
                          checked={excludeOutofstock}
                        />
                        <label className="yt-filter-label" for={"discheck"} />
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>

          </div>
        </Fragment>
      }
    </div>
  );
}
export default ProductsFilterBar;
