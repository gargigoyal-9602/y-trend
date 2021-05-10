import React, { useState } from "react";
import "./css/index.scoped.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { AllModal } from "../../components";

function FavouriteProductSet(props) {
  const [ShowWLModal, setShowWLModal] = useState(false);
  return (
    <>
      {ShowWLModal  ? <AllModal modalName="removewhishlist" /> : ""}
      {props.isFav ? (
        <FaHeart
          className="yt-sglproduct-fav active"
          onClick={() => props.onClick()}
        />
      ) : (
        <FaRegHeart
            className="yt-sglproduct-fav"
            onClick={() => props.onClick()}
        />
      )}
    </>
  );
}
export default FavouriteProductSet;
