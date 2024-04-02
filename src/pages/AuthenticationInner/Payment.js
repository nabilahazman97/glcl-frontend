import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, Row, } from "reactstrap";


// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "./CarouselPage";

const Payment = () => {

    document.title = "GLCL";

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
                                                <div className="d-flex text-center std_font">
                                                    <p className="">Already Registered? &nbsp; </p>
                                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                                        <p className='text-gold'>Sign In</p>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="m-5">

                                                <Form className="form-horizontal"
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        validation.handleSubmit();
                                                        return false;
                                                    }}
                                                >
                                                    <div className="text-center">
                                                        <p className="login_title mb-4">PAYMENT</p>
                                                    </div>
                                                    <div className="mb-3 mt-5 d-flex justify-content-between col-12">

                                                        <div className="payment-opt col-3">
                                                            <div className="form-check form-radio-primary mb-3">
                                                                <input
                                                                    type="radio"
                                                                    id="customRadiocolor1"
                                                                    name="customRadiocolor1"
                                                                    className="form-check-input"
                                                                    defaultChecked
                                                                />
                                                               
                                                                    Radio Primary
                                                               
                                                            </div>
                                                        </div>
                                                        <div className="payment-opt col-3">FPX</div>
                                                        <div className="payment-opt col-3">FPX</div>

                                                    </div>

                                                    <Link to="/register-file-upload" style={{ textDecoration: 'none' }}>
                                                        <div className="mt-5 d-grid">
                                                            <button
                                                                className="btn btn-primary btn-block signIn_btn text_1"
                                                                type="submit"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </Form>
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

export default Payment;
