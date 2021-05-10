import React from "react";
import { useHistory } from "react-router-dom";
import "./css/nowishlist.scoped.css";
import { Button } from "reactstrap";

export default function NoWishlist() {

    const history = useHistory();
    const routeToshop = () => {
        let path = "/shop";
        history.push(path);
    };

    return (
        <div className="profile-pg-inner-wrap profile-pg-inner-no-order p-3 bg-white radius-10 mb-4">
            <div className="profile-pg-inner-wrapper">
                <div className="profile-pg-order-main-wrap text-center ">

                    <img
                        src={require("./images/no-order-icn.png")}
                        className="img-fluid  mb-5"
                    />
                    <div className="pp-sa-order-wrap mb-5 mt-2">
                        <h2 className="pp-od-no-ttl mt-0 mb-3">No Wishlist</h2>
                        <p className="pp-od-no-text mb-0">
                            You haven’t wishlisted any items, Browse items and wishlist it
              </p>
                    </div>
                    <Button
                        color="secondary pp-no-order-btn py-3 px-3"
                        onClick={routeToshop}
                    >
                        Browse Products
                    </Button>
                </div>
            </div>
        </div>
    );
}