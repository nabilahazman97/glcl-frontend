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

const ForgetPassword3 = () => {

    //meta title
    document.title = "Forget Password 2 | Skote - React Admin & Dashboard Template";

    // Form validation 
    const validationType = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(
                "Email is required"
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
                                                        <p className="login_title mb-5">FORGOT PASSWORD</p>
                                                    </div>
                                                    <div className="text-center mb-4">
                                                        <h6 className="card-title text_1">Enter your email to reset your password</h6>
                                                    </div>

                                                    <div className="mb-4">
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

                                                            <div className="text-center m-3">
                                                                <i className="bx bx-check-circle success-alert-sign" style={{ fontSize: "80px", marginLeft: "10px", color: "#34C38F" }}></i>
                                                                <div className="d-flex justify-content-center">

                                                                    <div className="d-flex align-items-center">
                                                                        <h3 className="modal-title mt-0">Check email for reset link</h3>

                                                                    </div>
                                                                </div>


                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setmodal_center(false);
                                                                    }}
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"
                                                                >
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>

                                                                <div className="modal-body text-center">
                                                                    <p>
                                                                    An email has been sent to the administrative email address on file.  Check the inbox of the administrator’s email account, and click the reset link provided                                                                     </p>
                                                                    <div class="d-flex text-center">
                                                                        <p className="">Reset&nbsp;</p>
                                                                        <Link to="/set-password" >
                                                                            <p style={{ textDecoration: 'underline' }} className=''>link</p>
                                                                        </Link>
                                                                        <p className="">&nbsp;will become invalid in 58:00.</p>
                                                                    </div>

                                                                    <Link >
                                                                        <p style={{ textDecoration: 'underline' }}>
                                                                            Didn't receive an email?
                                                                        </p>
                                                                    </Link>
                                                                </div>
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

export default ForgetPassword3;
