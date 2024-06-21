import PropTypes from "prop-types";
import React, { useState,useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import axios, { Axios } from "axios";
// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logo.svg";

//Import config
import { facebook, google } from "../../config";
import { Buffer } from 'buffer';
import * as apiname from "../../helpers/url_helper";
import { del, get, post, put } from "../../helpers/api_helper";

import '../Authentication/AuthStyle.scss';


const Login = props => {
useEffect(() => {
  // axios.get(apiname.base_url+apiname.USER_LIST, {
  //   headers: {
  //     'Authorization': 'Basic '+ apiname.encoded
  //   }
  // })
  get(apiname.USER_LIST)
  .then(res => console.log(res))
  .catch(err => console.log(err));
}, []);

    document.title = "GLCL";

    const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);

  //meta title


   // Form validation 
   const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
    email: "" || '',
      password: "" || '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(
        "Email is required"
      ),
      password: Yup.string().required(
        "Password is required"
      ),
      
  
    }),
    onSubmit: (values) => {
      console.log(values);
        dispatch(loginUser(values, props.router.navigate));
      }
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));
  console.log("err");
  console.log(error);

  return (
    <React.Fragment>
      <div className="whiteBg">
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={6}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">

                    <div className="my-auto">
                      <div>

                        <div className="d-flex text-center std_font">
                          <p className="">New here? &nbsp; </p>
                          <Link to="/register" style={{ textDecoration: 'none' }}>
                            <p className='text-gold'>Register Now</p>
                          </Link>

                          {/* <Link to="/register" style={{ textDecoration: 'none' }}>
                            <p className='text-gold'>Register Now</p>
                          </Link> */}
                        </div>
                      </div>

                      <div className="m-5">
                      <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">Invalid Username and password </Alert> : null}

                          <div className="text-center mb-3">
                            <p className="login_title mb-4">SIGN IN</p>
                          </div>
                          <div className="mb-3">

                          <Input
                           className="form-contro login-input"
                          name="email"
                          placeholder="Email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
                            
                           

                          <div className="mb-3">

                          <Input
                           className="login-input"
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}

                    

                          </div>

                          {/* <div className="form-check m-2">
                            <Input
                              type="checkbox"
                              className="form-check-input text_1"
                              id="auth-remember-check"
                            />
                            <label
                              className="form-check-label std_font"
                              htmlFor="auth-remember-check"
                            >
                              Remember me
                            </label>
                          </div> */}

                          <div className="mt-5 text-center">
                            <button
                              className="btn btn-primary btn-block signIn_btn"
                              type="submit"
                            >
                              Sign In
                            </button>

                          </div>


                        </Form>



                        {/* <Form action="dashboard">
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">
                              Sign in with
                            </h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary me-1"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info me-1"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            Don&apos;t have an account ?
                            <Link
                              to="pages-register-2"
                              className="fw-medium text-primary"
                            >
                              Signup now
                            </Link>
                          </p>
                        </div> */}
                      </div>
                      <div className="float-start mt-4">
                        <Link to="/auth-recoverpw-3" >
                          <p className="std_font text-gold">Forgot password?</p>
                        </Link>
                      </div>
                    </div>

                    {/* <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Skote. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
    history: PropTypes.object,
  };
