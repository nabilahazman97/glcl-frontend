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
    InputGroup
} from "reactstrap";
import * as Yup from "yup";
import avatar from "../../../assets/images/users/avatar-1.jpg";
import tripleNote from "../../../assets/images/users/triple-note.png";
import getCash from "../../../assets/images/users/get-cash.png";
import moneyTo from "../../../assets/images/users/money-to.png";
import treasure from "../../../assets/images/users/treasure.png";
import jewel from "../../../assets/images/users/jewel.png";
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
import { useParams } from 'react-router-dom';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FaLock } from 'react-icons/fa';

function SvarnaTiraIndex() {

    document.title = "GLCL";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Forms" breadcrumbItem="SWARNA TIRA SCHEME" />
                    <Row>
                        <Col lg={12}>
                            <Card style={{ border: '3px solid #d4af37', borderRadius: '0px 25px 25px 25px' }}>
                                <CardBody>
                                    <div>
                                        <div className="d-flex justify-content-center gap-5">
                                            <div className="text-center align-content-center">
                                                <img
                                                    src={avatar}
                                                    alt=""
                                                    className="avatar-md rounded-circle img-thumbnail"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <div className="mt-2">
                                                    <h6 className="">Your Gold Coin</h6>
                                                    <h3 className="text-dark">10 Gm</h3>
                                                </div>
                                            </div>
                                            <div className="text-center align-content-center">
                                                <Button className=" buyBtn">Buy</Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <CardTitle className="mb-3">Gold Coin Options   </CardTitle>
                        <Col xl={6}>
                            <Card style={{ backgroundColor: '#343434', color: '#ddbf6a', borderRadius: '25px 25px 25px 25px', height: '252px' }}>
                                <CardBody className="align-content-center">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-center gap-5">
                                            <div className="col-md-6 text-end">
                                                <img
                                                    src={tripleNote}
                                                    alt=""
                                                    className="avatar-md"
                                                />
                                            </div>
                                            <div className="text-start align-content-center col-md-6">

                                                <h4 className="">Sell Back</h4>

                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card style={{ backgroundColor: '#343434', color: '#ddbf6a', borderRadius: '25px 25px 25px 25px', height: '252px' }}>
                                <CardBody className="align-content-center">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-center gap-5">
                                            <div className="col-md-6 text-end">
                                                <img
                                                    src={jewel}
                                                    alt=""
                                                    className="avatar-md"
                                                />
                                            </div>
                                            <div className="text-start align-content-center col-md-6">

                                                <h4 className="">Convert to Jewellery</h4>

                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card style={{ backgroundColor: '#343434', color: '#ddbf6a', borderRadius: '25px 25px 25px 25px', height: '252px' }}>
                                <CardBody className="align-content-center">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-center gap-5">
                                            <div className="col-md-6 text-end">
                                                <img
                                                    src={getCash}
                                                    alt=""
                                                    className="avatar-md "
                                                />
                                            </div>
                                            <div className="text-start align-content-center col-md-6">

                                                <h4 className="">Get Cash Advance</h4>

                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card style={{ backgroundColor: '#343434', color: '#ddbf6a', borderRadius: '25px 25px 25px 25px', height: '252px' }}>
                                <CardBody className="align-content-center">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-center gap-5">
                                            <div className="col-md-6 text-end">
                                                <img
                                                    src={treasure}
                                                    alt=""
                                                    className="avatar-md"
                                                />
                                            </div>
                                            <div className="text-start align-content-center col-md-6">
                                                <h4 className="">Pawn Gold</h4>
                                                <div className="d-flex align-items-center">
                                                <FaLock size={24} style={{ marginRight: '5px' }} />
                                                    <span>Locked</span> {/* Optionally, add text indicating it's locked */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                    {/* <div className="d-flex justify-content-center gap-3 mb-3">
                        <Link to="/member-profile-list" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-primary backBtn">Back</button>
                        </Link>

                    </div> */}

                </Container>
            </div>
        </React.Fragment>
    )

};

export default SvarnaTiraIndex;
