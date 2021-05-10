import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/index.scoped.css";
import { useSelector } from 'react-redux'
import { AllModal } from "../../components";
import {
  UserWhishList,
  MyOrderPage,
  SavedAddress,
  ConnectAccounts,
} from "../../components";
import { Container, Row, Col, TabContent, TabPane, Button } from "reactstrap";
import classnames from "classnames";
import "./css/index.scoped.css";
import { FaCamera } from "react-icons/fa";
import ProfilePics from "./images/user-pics.png";
import ProfileBreadcrumbs from "./ProfileBreadcrumbs";
import ProfileContennt from './ProfileContennt';
import lang from "../../language";
// function ProfileContennt() {
//   const [ShowEditProfileModal, EditProfilefunc] = useState(false);
//   const openEditProfileModal = () => EditProfilefunc(!ShowEditProfileModal);
//   const [isProfilePics, setisProfilePics] = useState(false);
//   const history = useHistory();
//   const routeToChangePassword = () => {
//     let path = "/profile/changepassword";
//     history.push(path);
//   };
//   return (
//     <div className="profile-pg-inner-wrap p-4 bg-white radius-10 profile-pg-mb-30">
//       {ShowEditProfileModal ? <AllModal modalName="editprofile" /> : ""}
//       <div className="profile-pg-inner-wrapper">
//         <div className="profile-tab-content">
//           <Row>
//             <Col md={12}>
//               <div className="d-flex align-items-center mb-5">
//                 {isProfilePics ? (
//                   <div className="img-upload d-flex align-items-center justify-content-center">
//                     <img
//                       alt="Profile Pics"
//                       src={ProfilePics}
//                       className="img-fluid"
//                     />
//                   </div>
//                 ) : (
//                   <div className="img-upload d-flex align-items-center justify-content-center">
//                     <FaCamera />
//                   </div>
//                 )}
//               </div>
//             </Col>
//             <Col md={6}>
//               <div className="profile-data-wrap">
//                 <span className="profile-data-tag">Name</span>
//                 <p className="profile-user-name py-2">Sahil</p>
//               </div>
//             </Col>
//             <Col md={6}>
//               <div className="profile-data-wrap">
//                 <span className="profile-data-tag">Email</span>
//                 <p className="profile-user-name py-2">sahilhost0h@gmail.com</p>
//               </div>
//             </Col>
//             <Col md={6}>
//               <div className="profile-data-wrap">
//                 <span className="profile-data-tag">Phone No</span>
//                 <p className="profile-user-name py-2">+112910348291</p>
//               </div>
//             </Col>
//             <Col md={12}>
//               <div className="d-flex align-items-center justify-content-end">
//                 <Button
//                   color="link profile-edit-pass mr-2"
//                   onClick={routeToChangePassword}
//                 >
//                   Change Password
//                 </Button>
//                 <Button
//                   color="secondary profile-edit-btn"
//                   onClick={openEditProfileModal}
//                 >
//                   Edit Profile
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </div>
//   );
// }
function ContentSidebarTitle(activeTab) {

  const profilelang = new lang("profileScreen");
  const tabName = activeTab.tabnmae;
  if (tabName !== undefined) {
    switch (tabName) {
      case "1":
        return profilelang.get("profile", "Profile");
      case "2":
        return profilelang.get("wishlist", "Wishlist");
      case "3":
        return profilelang.get("myOrders", "My Orders");
      case "4":
        return profilelang.get("savedAddresses", "Saved Addresses");
      case "5":
        return profilelang.get("connectedAccounts", "Connected Accounts");
      default:
        return profilelang.get("profile", "Profile");
    }
  }
  return <></>;
}


function ProfileComponent(props) {

  const profilelang = new lang("profileScreen");
  const state = useSelector(state => state.logInReducer.user)
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [profileImage, setProfileImage] = useState(require("./images/user.png"));

  useEffect(() => {
    if (state && Object.keys(state).length > 0) {
      setEmail(state.email);
      setUserName(state.name);
      state.profile_picture ? setProfileImage(state.profile_picture): setProfileImage(require("./images/user.png")) ;
    }
  }, [state])

  const urlTabName = props.onProps.match.params.slug;
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const history = useHistory();
  const routeToHelpCenter = () => {
    let path = "/help-center";
    history.push(path);
  };
  const [ShowLogoutModal, Logoutfunc] = useState(false);
  const openLogoutModal = () => Logoutfunc(!ShowLogoutModal);
  const [isProfilePics, setisProfilePics] = useState(false);

  if (urlTabName !== undefined) {
    let matchTabName = "";
    switch (urlTabName) {
      case "profile":
        matchTabName = "1";
        break;
      case "wishlist":
        matchTabName = "2";
        break;
      case "myorder":
        matchTabName = "3";
        break;
      case "saveaddresses":
        matchTabName = "4";
        break;
      case "connectaccount":
        matchTabName = "5";
        break;
      default:
        matchTabName = "1";
        break;
    }
    toggle(matchTabName);
  } else {
    toggle("1");
  }
  const routeToProfile = (value) => {
    if (value !== undefined) {
      let path = "/profile/" + value;
      history.push(path);
    } else {
      let path = "/profile";
      history.push(path);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={12}>
          <ProfileBreadcrumbs onProfile={props} />
        </Col>
      </Row>
      <section className="mb-4 d-block profile-pg-mb-30">
        <AllModal modalName="logout" isOpen={ShowLogoutModal} toggle={openLogoutModal} />
        <Row className="yt-cm-row flex-wrap">
          <Col className="yt-cm-lt-col">
            <h2 className="yt-profile-mb-ttl profile-pg-title mb-4 mt-0">
              <ContentSidebarTitle tabnmae={activeTab} />
            </h2>
            <div className="profile-pg-inner-wrap profile-inner-tab-wrap p-40 bg-white radius-10 profile-pg-mb-10">
              <div className="profile-pg-inner-contnet">
                <ul className="p-0 m-0 list-style-none profile-pg-tabs-name pg-profile-box">
                  <li
                    className={classnames({
                      "pt-0 active": activeTab === "1",
                      "pt-0": activeTab !== "1",
                    })}
                    onClick={() => {
                      routeToProfile();
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="img-upload d-flex align-items-center justify-content-center">
                        <img
                          alt="Profile Pics"
                          src={profileImage}
                          className="img-fluid"
                        />
                      </div>

                      <div className="user-profileinfo ml-3">
                        <h3 className="profile-name mt-0">{userName}</h3>
                        <h5 className="profile-email mb-0">
                          {email}
                        </h5>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile-pg-inner-wrap profile-inner-tab-content p-40 bg-white radius-10 profile-pg-mb-30">
              <div className="profile-pg-inner-contnet">
                <ul className="p-0 m-0 list-style-none profile-pg-tabs-name">
                  <li
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      routeToProfile("wishlist");
                    }}
                  >
                    <div className="profile-item-wrap d-flex align-items-center">
                      <img
                        alt="Whish List"
                        src={require("./images/whish-list-icn.png")}
                        width="65"
                        height="65"
                        className="profile-item-icn img-fluid mr-4"
                      />
                      <span className="profile-item-name">
                      {profilelang.get("wishlist", "Wishlist")}
                        
                        </span>
                      {props.wishlist?.length > 0 && <span className="profile-notiy">{props.wishlist.length}</span>}
                    </div>
                  </li>
                  <li
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      routeToProfile("myorder");
                    }}
                  >
                    <div className="profile-item-wrap d-flex align-items-center">
                      <img
                        alt="My Order"
                        src={require("./images/my-order-icn.png")}
                        width="65"
                        height="65"
                        className="profile-item-icn img-fluid mr-4"
                      />
                      <span className="profile-item-name">
                      {profilelang.get("myOrders", "My Orders")}
                      
                        </span>
                    </div>
                  </li>
                  <li
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      routeToProfile("saveaddresses");
                    }}
                  >
                    <div className="profile-item-wrap d-flex align-items-center">
                      <img
                        alt="Address"
                        src={require("./images/address-icn.png")}
                        width="65"
                        height="65"
                        className="profile-item-icn img-fluid mr-4"
                      />
                      <span className="profile-item-name">
                      {profilelang.get("savedAddresses", "Saved Addresses")}                   
                        </span>
                    </div>
                  </li>
                  <li
                    className={classnames({ active: activeTab === "5" })}
                    onClick={() => {
                      routeToProfile("connectaccount");
                    }}
                  >
                    <div className="profile-item-wrap d-flex align-items-center">
                      <img
                        alt="Connect"
                        src={require("./images/connected-icn.png")}
                        width="65"
                        height="65"
                        className="profile-item-icn img-fluid mr-4"
                      />
                      <span className="profile-item-name">
                      {profilelang.get("connectedAccounts", "Connected Accounts")} 
                      </span>
                    </div>
                  </li>
                  <li
                    className={classnames({ active: activeTab === "6" })}
                    onClick={() => {
                      routeToHelpCenter();
                    }}
                  >
                    <div className="profile-item-wrap d-flex align-items-center">
                      <img
                        alt="Help Center"
                        src={require("./images/help-icn.png")}
                        width="65"
                        height="65"
                        className="profile-item-icn img-fluid mr-4"
                      />

                      <span className="profile-item-name">
                      {profilelang.get("helpCenter", "Help Center")} 
                 
                        </span>
                    </div>
                  </li>
                  <li
                    className={classnames({ active: activeTab === "7" })}
                    onClick={openLogoutModal}
                  >
                    <div className="profile-item-wrap d-flex align-items-center">
                      <img
                        alt="Logout"
                        src={require("./images/logout-icn.png")}
                        width="65"
                        height="65"
                        className="profile-item-icn img-fluid mr-4"
                      />
                      <span className="profile-item-name">
                      {profilelang.get("logout", "Logout")} 
                     
                        </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col className="yt-cm-rt-col">
            <h2 className="profile-pg-title mb-4 mt-0">
              <ContentSidebarTitle tabnmae={activeTab} />
            </h2>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <ProfileContennt userData={state} />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="2">
                <UserWhishList products={props.wishlist} {...props} />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="3">
                <MyOrderPage orders={props.order}  {...props} />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="4">
                <SavedAddress activeTab={activeTab} />
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="5">
                <ConnectAccounts  {...props}/>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default ProfileComponent;
