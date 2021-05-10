import React, { useEffect, useState, useCallback, Fragment } from "react";
import "./css/index.scoped.css";
import { FaBullseye, FaCamera } from "react-icons/fa";
import RemoveIcn from "./images/close-icn.png";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

import { Formik } from 'formik';
import * as validationSchemas from '../../../validationSchemas';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import commands from "../../../commands";
import { CgSpinner } from "react-icons/cg"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import lang from "../../../language";
import { RiNeteaseCloudMusicFill } from "react-icons/ri";

// import ImageUploader from "react-images-upload";

function FieldError({ error, touched }) {
  return (error && touched) ? (
    <div style={{ color: "#e65e52" }}>
      {error}
    </div>)
    : null;
}


function EditProfileModal(props) {

  const profileeditlang = new lang("editProfileScreen");
  // console.log(props);
  const history = useHistory();
  const [modal, setModal] = useState(true);
  const [deleteorder, SetDelete] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProfilePics, setisProfilePics] = useState(require("./images/user.png"));
  const [croppedImage, setCroppedImage] = useState("");
  const [cropper, setCropper] = useState(undefined);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitImage, setSubmitImage] = useState(false);
  const [removePicture, setRemovePicture] = useState(false);

  function _crop() {
    // image in dataUrl
    //console.log(this.cropper.getCroppedCanvas().toDataURL());
    setCroppedImage(this.cropper.getCroppedCanvas().toDataURL());
    setRemovePicture(false);
  }

  function onCropperInit(cropper) {
    //this.cropper = cropper;
    setCropper(cropper);
  }

  const toggle = () => setModal(!modal);

  const ConfirmSave = () => {
    SetDelete(!deleteorder);
    setTimeout(function () {
      setModal(!modal);
      return  profileeditlang.get("saveProfile", "Saved");
    }, 3000);
  };

  const dispatch = useDispatch();

  function openImageUpload() {
    var fileTag = document.getElementById("user_profile_pics");
    fileTag.addEventListener("change", function () {
      changeImage(this);
    });
    fileTag.click();
  }

  function changeImage(input) {
    var reader;
    if (input.files && input.files[0]) {
      reader = new FileReader();
      reader.onload = function (e) {
        console.log(e.target.result);
        setisProfilePics(e.target.result);
        setShowCropper(true);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  useEffect(() => {
    if (Object.keys(props.userData).length > 0) {
      setName(props.userData.user.name);
      setEmail(props.userData.user.email);
      setPhoneNumber(props.userData.user.phone_number);

      if (props.userData.user.profile_picture) {
        setisProfilePics(props.userData.user.profile_picture);
      } else {
        setRemovePicture(true);
      }

    }
  }, [props.userData]);

  const saveProfile = async ({ name, email, phoneno }) => {
    setShowSpinner(true);
    // let userDetails = { name: name, email: email, phone_number: phoneno, profile_picture: submitImage ? croppedImage || isProfilePics : undefined };
    let userDetails = { name: name, email: undefined, phone_number: phoneno };

    if (removePicture) {
      userDetails.delete_profile_picture = "1";
    } else {
      userDetails.profile_picture = submitImage ? croppedImage || isProfilePics : undefined;
    }


    commands.user.updateProfile(userDetails, () => { history.push("/profile"); setShowSpinner(false) }, (errorMessage) => { setErrorMessage(errorMessage); setShowSpinner(false) });
  };
  useEffect(() => { }, [name, email, phoneNumber]);

  /*
    <div className="w3-overlay d-block">
    <div className="" style={{ height: "100%", width: "100%", }}>
      <div style={{ height: "350px", width: "350px", marginRight: "auto", marginLeft: "auto" }}>
        <Cropper
          src={isProfilePics}
          style={{ height: "300px", width: "100%" }}
          // Cropper.js options
          initialAspectRatio={1 / 1}
          guides={false}
          crop={_crop}
          onInitialized={onCropperInit}
        />
        <div>
          <Button
            color="secondary profile-edit-profile-btn py-3"
            onClick={() => setShowCropper(false)}
            block
          >
            Done
            </Button>
        </div>
      </div>
    </div>
  </div>
  
  */

  useEffect(() => {

    if (showCropper) {
      setSubmitImage(true);
    }

  }, [showCropper]);

  return (
    showCropper ?
      <div>
        <Modal
          isOpen={showCropper}
          toggle={() => null}
          centered={true}
          className="cm-small-modal-6"
        >
          <ModalHeader className="edit-profile-title-bar p-4">
            <span>Upload Profile Image</span>
          </ModalHeader>
          <ModalBody className="yt-edit-prfl-body">

            <div class="edit-profile-body-wrap">
              <div style={{ height: "350px", width: "350px", marginRight: "auto", marginLeft: "auto" }}>
                <Cropper
                  src={isProfilePics}
                  style={{ height: "300px", width: "100%" }}
                  // Cropper.js options
                  initialAspectRatio={1 / 1}
                  aspectRatio={1 / 1}
                  guides={false}
                  crop={_crop}
                  onInitialized={onCropperInit}
                />
                <div>
                  <Button
                    color="secondary profile-edit-profile-btn py-3"
                    onClick={() => setShowCropper(false)}
                    block
                    style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
                  >
                    Done
            </Button>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
      :
      <div>
        <Modal
          isOpen={props.isOpen}
          toggle={props.toggle}
          centered={true}
          className="cm-small-modal-6"
        >
          <ModalHeader toggle={props.toggle} className="edit-profile-title-bar p-4">
            <span>
            {profileeditlang.get("editProfile", "Edit Profile")}
              </span>
          </ModalHeader>
          <ModalBody className="yt-edit-prfl-body">
            <Formik
              initialValues={{ name: name, email: email, phoneno: phoneNumber }}
              onSubmit={(values) => saveProfile(values)}
              validationSchema={validationSchemas.editProfileForm}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                  <div class="edit-profile-body-wrap">
                    <Form>
                      <FormGroup row>
                        <Col md={12}>
                          <div className="d-none">
                            <Input
                              type="file"
                              name="user_profile_pics"
                              id="user_profile_pics"
                            />
                          </div>
                          <div class="d-flex align-items-end mb-4 yt-edit-profl-img-wrap">
                            {isProfilePics ? (
                              <>
                                <div className="img-upload d-flex align-items-center justify-content-center">
                                  <img
                                    alt="Profile Pics"
                                    src={croppedImage || isProfilePics}
                                    className="img-fluid w3-"
                                    name="profile_img"
                                  />
                                  <div className="image-overlay" onClick={openImageUpload}
                                    style={{ cursor: "pointer" }}>
                                  </div>
                                  <FaCamera
                                    onClick={openImageUpload}
                                    className="text-white"
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                                {!removePicture &&
                                  <div className="yt-remove-pic-wrap ml-4" onClick={() => { setCroppedImage(""); setisProfilePics(require("./images/user.png")); setRemovePicture(true); }}>
                                    <img src={RemoveIcn} alt="Remove" />{" "}
                                    <span>
                                    {profileeditlang.get("removePicture", "Remove Picture")}
                              
                                      </span>
                                  </div>
                                }
                              </>
                            ) : (
                                <div className="img-upload d-flex align-items-center justify-content-center">
                                  <FaCamera onClick={openImageUpload} />
                                </div>
                              )}
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={12}>
                          <div class="profile-form-field fields-active">
                            <span class="profile-form-tag">
                            {profileeditlang.get("name", "Name")}</span>
                            <Input
                              className="py-3"
                              type="text"
                              name="name"
                              id="fullName"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('name')}
                              value={values.name}
                            />
                            <FieldError error={errors.name} touched={touched.name} />
                          </div>
                        </Col>
                        <Col md={12}>
                          <div class="profile-form-field fields-active">
                            <span class="profile-form-tag">
                            {profileeditlang.get("email", "Email")}</span>
                            <Input
                              className="py-3 w3-text-gray"
                              type="email"
                              name="email"
                              id="exampleEmail"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('email')}
                              value={values.email}
                              disabled={true}
                            />
                          </div>
                          <FieldError error={errors.email} touched={touched.email} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={12}>
                          <div class="profile-form-field fields-active">
                            <span class="profile-form-tag">
                               {profileeditlang.get("phno", "Phone No.")}</span>
                            <Input
                              className="py-3 w3-text-gray"
                              type="number"
                              name="phoneno"
                              id="phoneno"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('phoneno')}
                              value={values.phoneno}
                              disabled={phoneNumber}
                            />
                          </div>
                          <FieldError error={errors.phoneno} touched={touched.phoneno} />
                        </Col>
                      </FormGroup>
                      <FieldError error={errorMessage} touched={true} />
                      <FormGroup row className="m-0">
                        {showSpinner ?
                          <CgSpinner style={{ color: "black", fontSize: 32, width: "100%", margin: 10 }} class="w3-spin" />
                          :
                          <Button
                            color="secondary profile-edit-profile-btn py-3"
                            onClick={handleSubmit}
                            block
                          >
                              {profileeditlang.get("saveProfile", "Save Profile")}
                            
                          </Button>
                        }
                      </FormGroup>
                    </Form>
                  </div>

                </Fragment>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
  );
}
export default EditProfileModal;
