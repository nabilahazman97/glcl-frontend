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
import { Link } from "react-router-dom";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormValidations = () => {

    //meta title
    document.title = "GLCL";

    const selectedFiles1 = [
        {
          name: 'example.jpg',
          formattedSize: '2.5 MB',
          preview: '/assets/example.jpg' 
        },
      ];


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
                    <div className="d-flex gap-3">
                        <div className="col-lg-6 p-0">
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

                            <Card>
                                <CardBody>
                                    <CardTitle>Profile Information</CardTitle>
                                    <div>
                                        <div className="mb-3 mt-3">
                                            <label>Name</label>
                                            <Input
                                                className="form-control login-input"
                                                type="text"
                                                disabled
                                                defaultValue={"Sarah"}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>IC Number</label>
                                            <Input
                                                className="form-control login-input"
                                                type="text"
                                                disabled
                                                defaultValue={"028484-01-8383"}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Date of Birth</label>
                                            <Input
                                                className="form-control login-input"
                                                type="date"
                                                disabled

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Gender</label>
                                            <Input
                                                className="form-control login-input"
                                                type="text"
                                                disabled
                                                defaultValue={"Male"}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <CardTitle>Contact Information</CardTitle>
                                    <div>
                                        <div className="mb-3 mt-3">
                                            <label>Email Address</label>
                                            <Input
                                                className="form-control login-input"
                                                type="email"
                                                disabled
                                                defaultValue={"sarah@11.com"}
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label>Phone Number</label>
                                            <Input
                                                className="form-control login-input"
                                                type="text"
                                                disabled
                                                defaultValue={"012-2233456"}
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label>Address</label>
                                            <Input
                                        type="textarea"
                                        name="address"
                                        id="textarea"
                                        className="login-textarea mt-3"
                                        maxLength="50"
                                        rows="4"
                                        placeholder="Home Address"
                                        disabled
                                      />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-lg-6 p-0">
                            <Card>
                                <CardBody>
                                    <CardTitle>Membership Information</CardTitle>
                                    <div>
                                        <div className="mb-3 mt-3">
                                            <label>Membership Status</label>
                                            <Input
                                                className="form-control login-input"
                                                type="text"
                                                disabled
                                                defaultValue={"Sarah"}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Membership Number</label>
                                            <Input
                                                className="form-control login-input"
                                                type="text"
                                                disabled
                                                defaultValue={"028484-01-8383"}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Date of Joining</label>
                                            <Input
                                                className="form-control login-input"
                                                type="date"
                                                disabled

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Renewal Date</label>
                                            <Input
                                                className="form-control login-input"
                                                type="date"
                                                disabled

                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <CardTitle>KYC Documents</CardTitle>
                                    <div className="mb-3 mt-3">
                                        <label>NRIC Copy</label>
                                        <div className="dropzone-previews" id="file-previews1">
                                            {selectedFiles1.map((f, i) => (
                                                <Card
                                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                    key={i + "-f_mykad"}
                                                >
                                                    <div className="p-2">
                                                        <Row className="align-items-center">
                                                            <Col className="col-auto">
                                                                <img
                                                                    data-dz-thumbnail=""
                                                                    height="80"
                                                                    className="avatar-sm rounded bg-light"
                                                                    alt={f.name}
                                                                    src={f.preview}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Link to="#" className="text-muted font-weight-bold">{f.name}</Link>
                                                                <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <CardTitle>Change Password</CardTitle>
                                    <div>
                                        <div className="mb-3 mt-3">
                                            <label>Old Password</label>
                                            <Input
                                                className="form-control login-input"
                                                type="password"
                                                disabled
                                                defaultValue={"12345"}
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label>New Password</label>
                                            <Input
                                                className="form-control login-input"
                                                type="password"
                                                disabled
                                                defaultValue={"123456"}
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label>Confirm Password</label>
                                            <Input
                                                className="form-control login-input"
                                                type="password"
                                                disabled
                                                defaultValue={"123456"}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-3 mb-3">
                        <button className="btn btn-primary rejectBtn">Back</button>
                        <button className="btn btn-primary rejectBtn">Save</button>
                        <button className="btn btn-primary rejectBtn">Delete</button>
                    </div>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormValidations;
