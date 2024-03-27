import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Button, Form, Label, Input, FormFeedback, Modal, } from "reactstrap";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const SetPassword = () => {

    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordShow2, setPasswordShow2] = useState(false);


    //meta title
    document.title = "Forget Password 2 | Skote - React Admin & Dashboard Template";

    // Form validation 
    const validationType = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            username: '',
            password: '',
            password1: '',
            email: '',
            digits: '',
            number: '',
            alphanumeric: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(
                "This value is required"
            ),
            password: Yup.string().required(
                "This value is required"
            ),
            password1: Yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                ),
            }),
            email: Yup.string()
                .email("Must be a valid Email")
                .max(255)
                .required("Email is required"),
            url: Yup.string()
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Enter correct url!"
                )
                .required("Please enter correct Url"),
            digits: Yup.number().required(
                "Please Enter Your Digits"
            ),
            number: Yup.number().required(
                "Please Enter Your Number"
            ),
            alphanumeric: Yup.string()
                .matches(
                    /^[a-z0-9]+$/i,
                    "Enter correct Alphanumeric!"
                )
                .required("Please Enter Your Alphanumeric"),
            textarea: Yup.string().required(
                "Please Enter Your Textarea"
            ),
        }),
        onSubmit: (values) => {
            console.log("values", values);
        }
    });

    const [modal_center, setmodal_center] = useState(false);


    function tog_center() {
        setmodal_center(!modal_center);
    }


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
                                            <div className="m-5">

                                                <Form className="form-horizontal"
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        validationType.handleSubmit();
                                                        return false;
                                                    }}
                                                >
                                                    <div className="text-center">
                                                        <p className="login_title mb-5">SET PASSWORD</p>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="input-group auth-pass-inputgroup">
                                                            <Input
                                                                className="login-input std_font"
                                                                name="password"
                                                                type={passwordShow ? "text" : "password"}
                                                                placeholder="Password"
                                                                onChange={validationType.handleChange}
                                                                onBlur={validationType.handleBlur}
                                                                value={validationType.values.password || ""}
                                                                invalid={
                                                                    validationType.touched.password && validationType.errors.password ? true : false
                                                                }
                                                            />
                                                            <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light eye-outline-span" type="button" id="password-addon">
                                                                <i className="mdi mdi-eye-outline"></i></button>
                                                            {validationType.touched.password && validationType.errors.password ? (
                                                                <FormFeedback type="invalid">{validationType.errors.password}</FormFeedback>
                                                            ) : null}

                                                        </div>
                                                        {validationType.touched.password && validationType.errors.password ? (
                                                            <FormFeedback type="invalid">{validationType.errors.password}</FormFeedback>
                                                        ) : null}
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="input-group auth-pass-inputgroup">
                                                            <Input
                                                                className="login-input std_font"
                                                                name="password1"
                                                                type={passwordShow2 ? "text" : "password"}
                                                                placeholder="Re-type Password"
                                                                onChange={validationType.handleChange}
                                                                onBlur={validationType.handleBlur}
                                                                value={validationType.values.password1 || ""}
                                                                invalid={
                                                                    validationType.touched.password1 && validationType.errors.password1 ? true : false
                                                                }
                                                            />
                                                            <button onClick={() => setPasswordShow2(!passwordShow2)} className="btn btn-light eye-outline-span" type="button" id="password-addon">
                                                                <i className="mdi mdi-eye-outline"></i></button>
                                                            {validationType.touched.password1 && validationType.errors.password1 ? (
                                                                <FormFeedback type="invalid">{validationType.errors.password1}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        {validationType.touched.password && validationType.errors.password ? (
                                                            <FormFeedback type="invalid">{validationType.errors.password}</FormFeedback>
                                                        ) : null}
                                                    </div>


                                                    <div className="mt-4 d-grid">
                                                        <button
                                                            className="btn btn-primary btn-block signIn_btn text_1"
                                                            type="submit"
                                                            onClick={() => {
                                                                tog_center();
                                                            }}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>



                                                </Form>

                                                {/* Modal */}
                                                <Col lg={6}>
                                                    <div>
                                                        <Modal
                                                            isOpen={modal_center}
                                                            toggle={() => {
                                                                tog_center();
                                                            }}
                                                            centered
                                                        >
                                                            
                                                            <div className="modal-body text-center m-3">
                                                             <i className="bx bx-check-circle success-alert-sign" style={{ fontSize: "80px", marginLeft:"10px", color:"#34C38F" }}></i>

                                                                <h3 className="mb-3 mt-2">
                                                                    Password reset successfully !
                                                                </h3>
                                                                <Link to="/">
                                                                    <button
                                                                        className="btn btn-primary btn-block signIn_btn mt-3"
                                                                        type="submit"
                                                                    >
                                                                        Sign In
                                                                    </button>
                                                                </Link>

                                                            </div>
                                                            
                                                        </Modal>
                                                    </div>
                                                </Col>
                                                {/* Modal */}

                                            </div>
                                        </div>


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

export default SetPassword;
