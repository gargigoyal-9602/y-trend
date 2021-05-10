import React from "react";
import "./css/index.scoped.css";
import { Link } from "react-router-dom";
function ProfileBreadcrumbs(props) {
  const urlMatch = props.onProfile.onProps.match.params.slug;
  let MactchBread = "";
  if (urlMatch !== undefined) {
    switch (urlMatch) {
      case "wishlist":
        MactchBread = "Wishlist";
        break;
      case "myorder":
        MactchBread = "My Orders";
        break;
      case "saveaddresses":
        MactchBread = "Saved Addresses";
        break;
      case "connectaccount":
        MactchBread = "Connected Accounts";
        break;
      default:
        MactchBread = "";
    }
    return (
      <div className="pageroute profile-pg-breadcrumbs mt-4 yt-mb-80">
        <Link to="/">
          <span className="profile-pg-home w3-hover-opacity w3-ripple" style={{ cursor: "default" }}>Home</span>
        </Link>
        {" > "}
        <Link to="/profile">
          <span className="profile-pg-home w3-hover-opacity w3-ripple" style={{ cursor: "default" }}>Profile</span>
        </Link>
        {" > "}
        <span className="currpage profile-pg-current"> {MactchBread}</span>
      </div>
    );
  } else {
    return (
      <div className="pageroute profile-pg-breadcrumbs mt-4 yt-mb-80">
        <Link to="/">
          <span className="profile-pg-home w3-hover-opacity w3-ripple" style={{ cursor: "default" }}>Home</span>
        </Link>
        {" > "}
        <span className="currpage profile-pg-current">Profile</span>
      </div>
    );
  }
}

export default ProfileBreadcrumbs;
