import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, Card, Input, Modal, Row } from "reactstrap";
import Dropzone from "react-dropzone";

import CarouselPage from "../AuthenticationInner/CarouselPage";

const Declarations = () => {

    const [modal_center, setmodal_center] = useState(false);
    const [selectedFiles1, setSelectedFiles1] = useState([]);

    document.title = "GLCL";

    function tog_center() {
        setmodal_center(!modal_center);
    }

    function handleAcceptedFiles(files, setSelectedFiles) {
        const formattedFiles = files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setSelectedFiles(formattedFiles);
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
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
                                                        <p className="login_title mb-4">MEMBERSHIP REGISTRATION</p>
                                                    </div>
                                                    <div className="mb-5">
                                                        <h4 className="card-title std_font text-center mb-3">DECLARATIONS</h4>
                                                        <h6 className="text-left font12">1. I hereby agree to abide by the current By-Laws and Rules of the Co-operative, as well as any amendments formally made during the period of my membership.  I also declare that I am not a bankrupt, nor have any criminal proceedings been taken against me, nor has my membership been removed prematurely from any other cooperative in the last one year.
                                                            <br></br><br></br>
                                                            2. I am a Malaysian citizen and have reached the age of 18 years old, residing in, working in, or owning land/property in the Co-operative's area of operation.
                                                            <br></br><br></br>
                                                            3. I hereby name the following as my nominee to receive my shares/interest.
                                                            (for Non-Muslim
                                                            members only)</h6>
                                                    </div>

                                                    <div className=" mb-3">
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            className="form-control login-input text_1"
                                                            placeholder="Name (As per IC)"
                                                            type="text"

                                                        />
                                                    </div>
                                                    <div className=" mb-3">
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            className="form-control login-input text_1"
                                                            placeholder="IC Number"
                                                            type="text"

                                                        />
                                                    </div>
                                                    <div className=" mb-3">
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            className="form-control login-input text_1"
                                                            placeholder="Relationship"
                                                            type="text"

                                                        />
                                                    </div>

                                                    <div className="mb-3">

                                                        <div className="mb-3 p-1 std_font">
                                                            NRIC Copy
                                                        </div>
                                                        {/* First Dropzone */}
                                                        <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, setSelectedFiles1)}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div className="dropzone login-input">
                                                                    <div className="dz-message needsclick mt-2" {...getRootProps()}>
                                                                        <input {...getInputProps()} />
                                                                        <div className="mb-3">
                                                                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                                        </div>
                                                                        <h5>Drop files here or click to upload.</h5>
                                                                        <button type="button" className="btn mt-3 upload-file-btn">Upload</button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                        {/* Display selected files for the first Dropzone */}
                                                        <div className="dropzone-previews mt-3" id="file-previews1">
                                                            {selectedFiles1.map((f, i) => (
                                                                <Card
                                                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete file-selected-box"
                                                                    key={i + "-file1"}
                                                                >
                                                                    <div className="p-2 ">
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
                                                                                <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                                                                <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 font12">
                                                        <p className="std_font">
                                                            I have read and understood this declaration.
                                                        </p>
                                                        <div className="form-check mb-3 mt-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                id="defaultCheck1"
                                                            />
                                                            <label
                                                                className="form-check-label std_font"
                                                                htmlFor="defaultCheck1"
                                                            >
                                                                I agree to this declaration
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <Link style={{ textDecoration: 'none' }}>
                                                        <div className="mt-4 d-grid">
                                                            <button
                                                                className="btn btn-primary btn-block signIn_btn text_1"
                                                                type="submit"

                                                                onClick={() => {
                                                                    tog_center();
                                                                }}
                                                            >
                                                                Register
                                                            </button>
                                                        </div>
                                                    </Link>


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
                                                                        <h3 className="modal-title mt-0">Registration Successful !</h3>

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
                                                            <div className="modal-body text-center">
                                                                <p>
                                                                    Your registration details have been submitted for review. Once your document is verified, you will receive an email notification confirming your account activation.
                                                                </p>
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

export default Declarations;
