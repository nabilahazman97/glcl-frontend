import React, { useState } from "react";

import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Button,
    CardTitle,
    CardSubtitle,
    Label,
    Input,
    Container,
    FormFeedback,
    Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Switch from "react-switch";
import avatar from "../../assets/images/users/avatar-1.jpg";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormValidations = () => {

    //meta title
    document.title = "GLCL";


    const [switch1, setswitch1] = useState(true);

    const Offsymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
                {/* No */}
            </div>
        );
    };

    const OnSymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
                {/* Yes */}
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Forms" breadcrumbItem="MEMBER PROFILE" />
                    <Row>
                        <Col xl="6">
                            <Card style={{ background: 'linear-gradient(to bottom, white 40%, #d1b66a 40%)' }}>
                                <CardBody>
                                    <div>
                                        <div className="d-flex justify-content-end align-items-start">
                                            <Switch
                                                uncheckedIcon={<Offsymbol />}
                                                checkedIcon={<OnSymbol />}
                                                className="me-1 mb-sm-8 mb-2"
                                                onColor="#14ff00"
                                                onChange={() => {
                                                    setswitch1(!switch1);
                                                }}
                                                checked={switch1}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <div className="text-center">
                                                <img
                                                    src={avatar}
                                                    alt=""
                                                    className="avatar-md rounded-circle img-thumbnail"
                                                />
                                                <div className="mt-2">
                                                    <h3 className="text-white">Sarah Binti Khalid</h3>
                                                    <h3 className="text-dark">GLCL0001</h3>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span class="dot"></span>
                                                    <div className="std_font">Active</div>
                                                
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl="6">
                            <Card>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle>Validation type</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        Parsley is a availity reactstrap validation. It helps you
                                        provide your users with feedback on their form submission
                                        before sending it to your server.
                                    </CardSubtitle>


                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle>Range validation</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        Parsley is a availity reactstrap validation. It helps you
                                        provide your users with feedback on their form submission
                                        before sending it to your server.
                                    </CardSubtitle>


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormValidations;
