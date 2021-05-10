import React from "react";
import SingleProductComponent from "./SingleProductComponent";
function AllProducts(props) {
  console.log(props, "propss");
  return (
    <>
      <SingleProductComponent
        category={props.category}
        tags={props.tags}
        type={props.type == "" ? "NoParam" : props.type}
        brands={props.brands}
        priceRange={props.priceRange}
        sortBy={props.sortBy}
        page={props.page}
        per_page={props.per_page}
        setPaginationData={props.setPaginationData}
        paginationData={props.paginationData}
      />
    </>
  );
}

export default AllProducts;
