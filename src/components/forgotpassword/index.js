import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import ForgotPassFields from "./ForgotPassFields";
import { useHistory } from "react-router";
import PasswordChangeSuccess from "../password-change-success";

// function ForgotPassFields() {
//   const [SendOtp, setSendOtp] = useState(false);
//   const SendOtpBtn = () => {
//     setSendOtp(!SendOtp);
//   };
//   return (
//     <div className="yt-fp-wrap">
//       <a href="/login" className="d-flex">
//         <RiArrowLeftSLine className="mr-2 yt-fp-back-icn" />
//         <h3 className="yt-fp-top-back-tag-name">Forgot Password ?</h3>
//       </a>
//       <h2 className="yt-fp-tag-line">
//         Get started and discover the best offers around you
//       </h2>
//       <h2 className="yt-fp-tag-line-2">
//         Enter your registered Email or Phone Number and we’ll sent you OTP to
//         reset your password
//       </h2>
//       <div className="yt-fp-form">
//         {SendOtp ? (
//           <OtpFields />
//         ) : (
//           <Form>
//             <FormGroup>
//               <img
//                 alt="Email Icon"
//                 src={require("./images/emal-icn.png")}
//                 className="yt-fp-icn"
//               />
//               <Input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="Email Address"
//               />
//               <span id="yt-fp-email-error" className="yt-fp-up-message-show" />
//             </FormGroup>

//             <Button color="secondary yt-fp-btn" block onClick={SendOtpBtn}>
//               Send OTP
//             </Button>
//           </Form>
//         )}
//       </div>
//       <div className="yt-forpass-bottom-info text-center">
//         {SendOtp ? (
//           <div>
//             <div className="otp-timer">00:45</div>
//             <Button color="link yt-resent-otp-btn">Resend OTP</Button>
//           </div>
//         ) : (
//           <a href="/" className="yt-fp-skip-btn">
//             Skip & Continue as Guest
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }

function ForgotPasswordComponent() {
  const history = useHistory();
  const [changed, setChanged] = useState(false);
  return (
    changed ?
      <PasswordChangeSuccess />
      :
      <Container>
        <div class="yt-forgot-pw-wrap yt-fpp-mb-5 yt-fpp-mt-5">
          <div className="d-flex flex-wrap yt-frgt-row">
            <div class="yt-fp-inner-content yt-fp-bg-banner yt-banner-col d-none">
              <div class="yt-fp-other-info">
                <p class="yt-fp-oi-tag-small">Fashion and Trend come togather</p>
                <h3 class="yt-fp-oi-tag-big">Upto 30% off</h3>
                <span class="yt-fp-bdr" />
                <Button
                  color="secondary yt-fp-sp-now"
                  onClick={() => history.push("/shop")}
                >
                  Shop Now
              </Button>
              </div>
            </div>
            <div class="yt-fp-inner-content yt-form-col">
              <ForgotPassFields onChangeSuccess={() => setChanged(true)} />
            </div>
          </div>
        </div>
      </Container>
  );
}
export default ForgotPasswordComponent;
