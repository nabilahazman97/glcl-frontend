import React, { useState, useEffect } from "react";

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
import avatar from "../../../../assets/images/users/avatar-1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../../helpers/url_helper";
import { useParams } from 'react-router-dom';
import { del, get, post, put } from "../../../../helpers/api_helper";
import whiteprint from "../../../../assets/images/schemes/white-print-icon.png";

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import pdfIcon from "../../../../assets/images/PDF_file_icon.png";

const SvarnaRunaIndex = () => {

    //meta title
    document.title = "GLCL";


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="" breadcrumbItem="SVARNA RUNA SCHEME" />

                    <Card className="defCard">
                        <CardBody>
                            <CardTitle className="cardTitle">XXXXXXXX</CardTitle>
                            <div>
                                <Row className="mt-3 mb-3">
                                    <Col lg="6">
                                        <div className="">
                                            <label className="std_input_label">Member ID</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                
                                                defaultValue={"GLCL00001"}
                                            />
                                        </div>

                                    </Col>

                                    <Col lg="6">
                                        <div className="">
                                            <label className="std_input_label">Member Name</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                disabled
                                                defaultValue={"GLCL00001"}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Jewelry Type</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                
                                                placeholder="Example: Ring"
                                            />
                                        </div>

                                    </Col>

                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Weight (gm)</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                        
                                                placeholder="Example: 5"
                                            />
                                        </div>

                                    </Col>
                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Quality</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                
                                                placeholder="Example: 916"
                                            />
                                        </div>

                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Gold Rate</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                disabled
                                            />
                                        </div>

                                    </Col>

                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Gold Value</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                disabled
                                            />
                                        </div>

                                    </Col>
                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Loan Amount</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                
                                                placeholder="Example: 1000.00"
                                            />
                                        </div>

                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Maturity Period</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                
                                            />
                                        </div>

                                    </Col>

                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Monthly Interest Saving Fee</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                disabled
                                            />
                                        </div>

                                    </Col>
                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">6 Months Interest Saving Fee</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                disabled
                                               
                                            />
                                        </div>

                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">12 Months Interest Saving Fee</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                disabled
                                            />
                                        </div>

                                    </Col>

                                    <Col lg="4">
                                        <div className="">
                                            <label className="std_input_label">Monthly Installment</label>
                                            <Input
                                                className="form-control normal-input"
                                                type="text"
                                                disabled
                                            />
                                        </div>

                                    </Col>
                                  
                                </Row>
                            
                            </div>
                        </CardBody>
                    </Card>

                </Container>
            </div>
        </React.Fragment>
    )
}

export default SvarnaRunaIndex;
