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
import _ from "lodash";
import { RiTruckLine } from "react-icons/ri";


export default function MobileFilter(props) {
    const history = useHistory();
    const data = props.data;
    const [categories, setCategories] = useState(data.categories);
    const [brands, setBrands] = useState(data.brands);
    const [tags, setTags] = useState(data.tags);
    const [colors, setColors] = useState(data.colorVariants);
    const [sizes, setSizes] = useState(data.sizeVariants);
    const [allAvailableVariants, setAllAvailableVariants] = useState(data.allAvailableVariants);
    const [priceRange, setPriceRange] = useState(data.priceRange);
    const [showDiscountedItems, setDiscountedItems] = useState(data.showDiscountedItems);
    const [excludeOutofStockItems, setExcludeOutofStockItems] = useState(data.excludeOutofStockItems);

    const toggleCategories = (id) => {
        var oldcategories = _.cloneDeep(categories);
        oldcategories.forEach((item, idx) => {
            if (id === item.id) {
                item.checked = !item.checked;
            }


            if (!item.checked) {
                item?.sub_categories?.forEach((sub, idx) => {
                    sub.checked = false;
                });
            }
        });
        setCategories(oldcategories);
    };


    const toggleBrands = (id) => {
        var oldbrands = _.cloneDeep(brands);
        oldbrands.forEach((item, idx) => {
            if (id === item.id) {
                item.checked = !item.checked;
            }
        });
        setBrands(oldbrands);
    };
    const toggleTags = (id) => {
        var oldtags = _.cloneDeep(tags);
        oldtags.forEach((item, idx) => {
            if (id === item.id) {
                item.checked = !item.checked;
            }
        });
        setTags(oldtags);
    };

    const toggleColorVariants = (name) => {
        var oldcolors = _.cloneDeep(colors);
        oldcolors.forEach((item, idx) => {
            if (name === item.name) {
                item.checked = !item.checked;
            }
        });
        setColors(oldcolors);
    };

    const toggleSizeVariants = (name) => {
        var oldsizes = _.cloneDeep(sizes);
        oldsizes.forEach((item, idx) => {
            if (name === item.name) {
                item.checked = !item.checked;
            }
        });
        setSizes(oldsizes);
    };


    const toggleAllAvailableVariants = (variantName, name) => {
        var oldvariants = _.cloneDeep(allAvailableVariants);
        oldvariants.find((variant) => variant.name === variantName)?.variant_properties.forEach((item, idx) => {
            if (name === item.name) {
                item.checked = !item.checked;
            }
        });
        setAllAvailableVariants(oldvariants);
    };



    function toggleSubCategories(id) {

        var oldcategories = _.cloneDeep(categories);

        oldcategories.forEach((category, index) => {
            category?.sub_categories?.forEach((sub, idx) => {
                if (sub.id === id) {
                    sub.checked = !sub.checked;
                }
            });
        });
        setCategories(oldcategories);
    }

    useEffect(() => {
        var qparams = new URLSearchParams(window.location.search);
        var subs = qparams.getAll("sub_category_id[]");

        var oldcategories = _.cloneDeep(data.categories);

        Array.isArray(oldcategories) && oldcategories.forEach((category, index) => {
            category?.sub_categories?.forEach((subcat, idx) => {
                if (subs.includes(String(subcat.id))) {
                    subcat.checked = true;
                } else {
                    subcat.checked = false;
                }
            });
        });

        setCategories(oldcategories);
    }, [data.categories]);

    useEffect(() => {
        setBrands(data.brands)
    }, [data.brands]);

    useEffect(() => {
        setTags(data.tags)
    }, [data.tags]);

    useEffect(() => {
        setPriceRange(data.priceRange)
    }, [data.priceRange]);

    useEffect(() => {
        setDiscountedItems(data.showDiscountedItems)
    }, [data.showDiscountedItems]);

    useEffect(() => {
        setExcludeOutofStockItems(data.excludeOutofStockItems)
    }, [data.excludeOutofStockItems]);

    useEffect(() => {
        const qparams = new URLSearchParams(window.location.search);
        const selected = qparams.getAll("color_size[]");

        var oldcolors = _.cloneDeep(data.colorVariants);
        oldcolors.forEach((item, idx) => {
            if (selected?.includes(item.name)) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });

        setColors(oldcolors)
    }, [data.colorVariants]);


    useEffect(() => {
        const qparams = new URLSearchParams(window.location.search);
        const selected = qparams.getAll("color_size[]");

        var oldsizes = _.cloneDeep(data.sizeVariants);
        oldsizes.forEach((item, idx) => {
            if (selected?.includes(item.name)) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });

        setSizes(oldsizes)
    }, [data.sizeVariants]);


    useEffect(() => {
        const qparams = new URLSearchParams(window.location.search);
        const selected = qparams.getAll("color_size[]");

        var oldvariants = _.cloneDeep(data.allAvailableVariants);
        oldvariants.forEach((variant) => {
            variant.variant_properties?.forEach((item, idx) => {
                if (selected?.includes(item.name)) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
        });

        setAllAvailableVariants(oldvariants);
    }, [data.allAvailableVariants]);

    function onApply() {

        var urlSearch = new URLSearchParams(window.location.search);

        urlSearch.delete("category_id[]");
        categories.forEach((item, idx) => {
            if (item.checked) {
                urlSearch.append("category_id[]", item.id);
            }
        });


        urlSearch.delete("sub_category_id[]");
        categories.forEach((category, index) => {
            if (category.checked) {
                category.sub_categories?.forEach((sub, idx) => {
                    if (sub.checked) {
                        urlSearch.append("sub_category_id[]", sub.id);
                    }
                });
            }
        });


        urlSearch.delete("brand_id[]");
        brands.forEach((item, idx) => {
            if (item.checked) {
                urlSearch.append("brand_id[]", item.id);
            }
        });


        urlSearch.delete("color_size[]");
        colors.forEach((item, idx) => {
            if (item.checked) {
                urlSearch.append("color_size[]", item.name);
            }
        });
        sizes.forEach((item, idx) => {
            if (item.checked) {
                urlSearch.append("color_size[]", item.name);
            }
        });

        allAvailableVariants.forEach((variant) => {
            variant.variant_properties?.forEach((item, idx) => {
                if (item.checked) {
                    urlSearch.append("color_size[]", item.name);
                }
            });
        });

        var checkedTags = tags.filter((tag) => tag.checked === true).map((tag) => tag.name).join(",");
        if (checkedTags) {
            urlSearch.set("tag", checkedTags);
        } else {
            urlSearch.delete("tag");
        }


        urlSearch.set("from", priceRange.min);
        urlSearch.set("to", priceRange.max);



        if (showDiscountedItems) {
            urlSearch.set("discounted_items", "true");
        } else {
            urlSearch.delete("discounted_items");
        }


        if (excludeOutofStockItems) {
            urlSearch.set("exclude_out_of_stock", "true");
        } else {
            urlSearch.delete("exclude_out_of_stock");
        }

        urlSearch.set("page", 1);
        urlSearch.set("per_page", 15);


        history.push(`/shop?${decodeURIComponent(urlSearch.toString())}`);
    }

    return props.content({ categories, toggleCategories, toggleSubCategories, brands, toggleBrands, tags, toggleTags, colorVariants: colors, toggleColorVariants, sizeVariants: sizes, toggleSizeVariants, allAvailableVariants, toggleAllAvailableVariants, priceRange, setPriceRange, showDiscountedItems, setDiscountedItems, excludeOutofStockItems, setExcludeOutofStockItems, onApply });

}