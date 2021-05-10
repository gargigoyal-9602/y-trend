import React, { useState, useEffect } from "react";
import "./css/social-connects.scoped.css";
import { Container, Row, Col, Button } from "reactstrap";
import AllModal from "../../modal";
import classnames from "classnames";
import UserState from "../../../redux/states/user";
import { useHistory } from "react-router-dom";


export default function NoSocialConnects() {
    const [ShowCAModal, setShowCAModal] = useState(false);

    const history = useHistory();
    const routeToshop = () => {
        let path = "/shop";
        history.push(path);
    };

    return (
        <div className="profile-pg-inner-wrap profile-pg-inner-no-order p-3 bg-white radius-10 mb-4">
            <div className="profile-pg-inner-wrapper">
                <div className="profile-pg-order-main-wrap text-center ">
                    <AllModal modalName="ConnectAccount" isOpen={ShowCAModal} toggle={() => setShowCAModal(!ShowCAModal)} />
                    <img
                        src={require("./images/no-order-icn.png")}
                        className="img-fluid  mb-5"
                    />
                    <div className="pp-sa-order-wrap mb-5 mt-2">
                        <h2 className="pp-od-no-ttl mt-0 mb-3">No Accounts</h2>
                        <p className="pp-od-no-text mb-0">
                            You haven’t connected any social account yet.
              </p>
                    </div>
                    <Button
                        color="secondary pp-no-order-btn py-3 px-3"
                        onClick={() => setShowCAModal(true)}
                    >
                        Add Account
            </Button>
                </div>
            </div>
        </div>
    );
}
