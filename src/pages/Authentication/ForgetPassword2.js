import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Button, Form, Label, Input, FormFeedback, Modal, } from "reactstrap";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import * as apiname from "../../helpers/url_helper";
import axios, { Axios } from "axios";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";
import { del, get, post, put } from "../../helpers/api_helper";

const ForgetPassword3 = () => {

    //meta title
    document.title = "GLCL";
   
    // Form validation 
    // let {email} = this.state;
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

            var newobj={
                emailid:values.email
            };
           sendemail(newobj);
  
        }
    });
    const [modal_center, setmodal_center] = useState(false);
    const [modal_centerfailure, setmodal_centerfailure] = useState(false);
    
    function sendemail(values){
        post(apiname.forgotpassword,values)
        .then(res => {
            if(res.status == '1'){
            setmodal_center(!modal_center);
        setTimeout(() => {
            setmodal_center(modal_center);
            window.location.reload();
          }, 3000);
          }else{
            setmodal_centerfailure(!modal_centerfailure);
            // alert("Failed to send Mail");
            setTimeout(() => {
                setmodal_centerfailure(modal_centerfailure);
                window.location.reload();
              }, 8000);
          }
        })
        .catch(err => {
          console.error(err);
        });

        // axios.post(apiname.base_url+apiname.forgotpassword,values,{
        //     headers: {
        //       'Authorization': 'Basic '+ apiname.encoded
        //     }
        //   })
        //     .then(res => {
        //         if(res['data']['status'] == '1'){
        //         setmodal_center(!modal_center);
        //     setTimeout(() => {
        //         setmodal_center(modal_center);
        //         window.location.reload();
        //       }, 3000);
        //       }else{
        //         setmodal_centerfailure(!modal_centerfailure);
        //         // alert("Failed to send Mail");
        //         setTimeout(() => {
        //             setmodal_centerfailure(modal_centerfailure);
        //             window.location.reload();
        //           }, 8000);
        //       }
        //     })
        //     .catch(err => {
        //       console.error(err);
        //     });

    }
    function tog_center() {
        setmodal_center(!modal_center);
    }


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
                                                            // onClick={() => {
                                                            //     tog_center();
                                                            // }}
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

                                                               
                                                            </div>


                                                        </Modal>
                                                        <Modal
                                                            isOpen={modal_centerfailure}
                                                            toggle={() => {
                                                                tog_center();
                                                            }}
                                                            centered
                                                        >

                                                            <div className="text-center m-3">
                                                                <i className="mdi mdi-close-circle" style={{ fontSize: "80px", marginLeft: "10px", color: "#FF5733" }}></i>
                                                                <div className="d-flex justify-content-center">

                                                                    <div className="d-flex align-items-center">
                                                                        <h3 className="modal-title mt-0">Failed to send reset link to your mailid</h3>

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
