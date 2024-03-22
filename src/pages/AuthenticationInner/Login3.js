import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, Row, Input, Label, FormFeedback } from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "./CarouselPage";

const Login2 = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  //meta title
  document.title = "GLCL";

   // Form validation 
   const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
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
      console.log("values", values);
    }
  });
  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={6}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">

                    <div className="my-auto">
                      <div>

                        <div class="d-flex text-center std_font">
                          <p className="">New here? &nbsp; </p>
                          <Link to="/register" style={{ textDecoration: 'none' }}>
                            <p className='text-gold'>Register Now</p>
                          </Link>
                        </div>
                      </div>

                      <div className="m-5">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validationType.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="text-center">
                            <p className="login_title mb-4">SIGN IN</p>
                          </div>
                          <div className="mb-3">
                            
                            <Input
                            className="login-input"
                              name="email"
                              placeholder="Email"
                              type="email"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.email || ""}
                              invalid={
                                validationType.touched.email && validationType.errors.email ? true : false
                              }
                            />
                            {validationType.touched.email && validationType.errors.email ? (
                              <FormFeedback type="invalid">{validationType.errors.email}</FormFeedback>
                            ) : null}

                          </div>

                          <div className="mb-3">

                            <Input
                            className="login-input"
                              name="password"
                              type="password"
                              placeholder="Password"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.password || ""}
                              invalid={
                                validationType.touched.password && validationType.errors.password ? true : false
                              }
                            />
                            {validationType.touched.password && validationType.errors.password ? (
                              <FormFeedback type="invalid">{validationType.errors.password}</FormFeedback>
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

                          <div className="mt-4 d-grid">
                            <button
                              className="btn btn-primary btn-block signIn_btn"
                              // type="submit"
                            >
                              Log In
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

export default Login2;
