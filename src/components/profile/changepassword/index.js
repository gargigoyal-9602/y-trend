import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ChangePasswordContent from './ChangePasswordContent';
import lang from "../../../language";
// function ChangePasswordContent() {
//   const history = useHistory();
//   const routeToProfile = () => {
//     let path = "/profile";
//     history.push(path);
//   };
//   return (
//     <section class="profile-change-password-main-wrapper mb-5 pb-5">
//       <Container>
//         <Row>
//           <Col md={12}>
//             <div class="pageroute profile-pg-breadcrumbs my-3">
//               <span class="profile-pg-home">Home {">"}</span>{" "}
//               <span class="">Profile</span>
//               {">"} <span class="profile-pg-current">Change Password</span>
//             </div>
//           </Col>
//         </Row>
//         <Row className="justify-content-center">
//           <Col sm={12} md={12} >
//             <div class="cp-backfrom-ct-page d-flex align-items-center hc-mb-30">
//               <FaLongArrowAltLeft
//                 className="hcp-cp-back-arrow"
//                 onClick={() => {
//                   routeToProfile();
//                 }}
//               />{" "}
//               <span class="pl-2 hc-cp-back-tag">Change Password</span>
//             </div>
//             <div class="bg-white radius-10 mb-5 cp-main-form-wrapper">
//               <h2 class="cp-form-title mt-0 mb-4">
//                 Enter a passsword with alphabets A-z and a symbol
//               </h2>
//               <Form className="profile-change-pass-form-wrap">
//                 <FormGroup>
//                   <div class="profile-change-pass-field fields-active">
//                     <span class="profile-form-tag">Enter current password</span>
//                     <Input
//                       className="pb-2 border-0"
//                       type="password"
//                       name="oldpass"
//                       id="oldpass"
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <div class="profile-change-pass-field fields-active">
//                     <span class="profile-form-tag">Enter new password</span>
//                     <Input
//                       className="pb-2 border-0"
//                       type="password"
//                       name="newpassword"
//                       id="newpassword"
//                     />
//                   </div>
//                 </FormGroup>
//                 <FormGroup>
//                   <div class="error profile-change-pass-field fields-active">
//                     <span class="profile-form-tag">Re-enter new password</span>
//                     <Input
//                       className="pb-2 border-0"
//                       type="password"
//                       name="renewpassword"
//                     />
//                     <span class="cp-form-error-tag pt-2 d-block">
//                       Password Missmatch !
//                     </span>
//                   </div>
//                 </FormGroup>
//                 <Button color="secondary profile-chamhe-pass-submit py-3 px-4">
//                   Change Password
//                 </Button>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }
function ChangePasswordSuccess() {
  const passwordchangelang = new lang("changePasswordScreen");
  const history = useHistory();
  const routeToProfile = () => {
    let path = "/profile";
    history.push(path);
  };
  return (
    <section class="profile-change-password-main-wrapper  mb-5 pb-5">
      <Container>
        <Row>
          <Col md={12}>
            <div class="pageroute profile-pg-breadcrumbs my-3">
              <Link to="/">
                <span class="profile-pg-home w3-hover-opacity w3-ripple" style={{cursor:"default"}}>Home</span>
              </Link>
              {" > "}
              <Link to="/profile">
                <span class="profile-pg-home w3-hover-opacity w3-ripple" style={{cursor:"default"}}>Profile</span>
              </Link>
              {" > "}
              <span class="profile-pg-current">Change Password</span>
            </div>
          </Col>
        </Row>
        <Row >
          <Col md={12}>
            <div class="cp-pg-inner-wrap password-success bg-white radius-10 cart-pg-mb-30 mt-5">
              <div class="cp-pg-empty-main-wrap text-center">
                <img
                  alt="Password Icon"
                  src={require("./images/passwordchanged-icn.png")}
                  class="img-fluid"
                  width="170"
                  height="212"
                />
                <div class="cp-wrap my-5">
                  <h2 class="cp-profile-ttl mt-0 mb-3">
                    {passwordchangelang.get("passwordChangeSuccessful", "Password changed successfully !")}
                  </h2>
                  <p class="empty-cart-text mb-0">
                    {passwordchangelang.get("passwordChangeSuccessfulMessage", "You can now go back and continue browsing products")}
                    {passwordchangelang.get("enjoyShopping", "Enjoy Shopping !")}

                  </p>
                </div>
                <Button
                  color="secondary cp-go-to-back-btn py-3 "
                  onClick={routeToProfile}
                >
                  {passwordchangelang.get("gotoProfile", "GO TO PROFILE")}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
function ChangePasswordComponent() {
  //const [ShowChangePassword, setShowChangePassword] = useState(true);
  // const ShowChangePassword = true;
  const [ShowChangePassword, setShowChangePassword] = useState(true)
  const changeStatus = (status) => {
    console.log(status, "states");
    if (status) {
      setShowChangePassword(!status)
    }
  }
  return (
    <>
      {ShowChangePassword ? (
        <ChangePasswordContent changeStatus={changeStatus} />
      ) : (
          <ChangePasswordSuccess />
        )}
    </>
  );
}
export default ChangePasswordComponent;
