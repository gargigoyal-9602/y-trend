import React, { useState, Fragment, useEffect } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col, Button, Form } from "reactstrap";
import Ripple from "react-ripples";
import * as validationSchemas from '../../validationSchemas';
import { Formik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import commands from "../../commands";
import SuccessBlock from "../success-block";
import { CgSpinner } from 'react-icons/cg';
import langg from "../../language";
import AuthState from "../../redux/states/auth";

function FieldError({ error, touched }) {
  return (error && touched) ? (
    <div style={{ color: "#e65e52" }}>
      {error}
    </div>)
    : null;
}

function ContactForm(props) {

  const [values, setValues] = useState(undefined);
  const [messageSent, setMessageSent] = useState(false);
  const authState = AuthState.get();
  const lang = new langg("contactUsScreen");

  var initialData={ name: "", email: "", phone: "", title: "", message: "" };

  if(commands.user.isLoggedIn()){
    initialData={ name: authState.user?.name || "", email: authState.user?.email || "", phone: authState.user?.phone_number || "", title: "", message: "" };
  }

  async function sendMessage(values) {
    const sent = await commands.user.sendContactMessage(values);

    setMessageSent(sent);
    setValues(undefined);

  }

  useEffect(() => {
    if (values != undefined) {
      sendMessage(values);
    }
  }, [values]);

  const sending = !!values;

  return (!messageSent ?
    <section class="contactform yt-main-contact-us-pg">
      <Container>
        <div className="yt-cm-mobile-bread">
          <div className="pageroute profile-pg-breadcrumbs">
            <span className="profile-pg-home">Home {">"}</span>{" "}
            <span className="">Contact Us</span>
          </div>
        </div>
        <div className="yt-main-wrapper">
          <div class="title">{lang.get("contactUs", "Contact us")}</div>
          <Formik
            initialValues={initialData}
            onSubmit={(values) => setValues(values)}
            validationSchema={validationSchemas.contactForm}
          >
            {({ values, setValues, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => {
              const cacheState = useSelector((state) => state.cache);

              useEffect(() => {
                setValues(values);
              }, [cacheState?.language]);


              return (

                <Fragment>
                  <Form>
                    <div class="form group contact-border">
                      <Row>
                        <Col xs={12} md={6}>
                          <div class="group">
                            <input type="text" required
                              name={"name"}
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('name')}
                              value={values.name}
                            />
                            <span class="highlight" />
                            <span class="bar" />
                            <label>{lang.get("name", "Name")}</label>
                            <FieldError error={errors.name} touched={touched.name} />
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div class="group">
                            <input type="text" required
                              name={"email"}
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('email')}
                              value={values.email}
                            />
                            <span class="highlight" />
                            <span class="bar" />
                            <label>{lang.get("email", "Email")}</label>
                            <FieldError error={errors.email} touched={touched.email} />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <div class="group">
                            <input type="text" required
                              name={"phone"}
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('phone')}
                              value={values.phone}
                            />
                            <span class="highlight" />
                            <span class="bar" />
                            <label>{lang.get("phoneNumber", "Phone Number")}</label>
                            <FieldError error={errors.phone} touched={touched.phone} />
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div class="group">
                            <input type="text" required
                              name={"title"}
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('title')}
                              value={values.title}
                            />
                            <span class="highlight" />
                            <span class="bar" />
                            <label>{lang.get("purpose", "Purpose of Contact")}</label>
                            <FieldError error={errors.title} touched={touched.title} />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <textarea
                          placeholder={lang.get("writeMessage", "Write your message here...")}
                          name={"message"}
                          onChange={handleChange}
                          onBlur={() => setFieldTouched('message')}
                          value={values.message}
                        />
                        <div style={{ padding: "0px 20px" }}>
                          <FieldError error={errors.message} touched={touched.message} />
                        </div>
                      </Row>
                      {!sending ?
                        <Button color="secondary yt-contact-send-btn" onClick={handleSubmit}>{lang.get("send", "Send")}</Button>
                        :
                        <div class="yt-contact-send-btn" style={{ backgroundColor: "transparent" }}>
                          <CgSpinner style={{ color: "black", fontSize: 32 }} class="w3-spin" />
                        </div>
                      }
                    </div>
                  </Form>
                </Fragment>
              );
            }}
          </Formik>
        </div>
      </Container>
    </section>
    :
    <SuccessBlock title={lang.get("titleSuccessMessage", "Message Sent Successfully")} message={lang.get("successMessage", "We will connect with you soon regarding your query.")} />
  );
}

export default ContactForm;
