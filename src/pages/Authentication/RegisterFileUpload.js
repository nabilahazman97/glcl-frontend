import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormFeedback, Input, Label, Row, CardSubtitle, Card, CardBody, CardTitle, } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const Register3 = () => {

  const [modal_center, setmodal_center] = useState(false);
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const [selectedFiles3, setSelectedFiles3] = useState([]);



  //meta title
  document.title = "GLCL";

  //form validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

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
                          <div className="mb-3">
                            <h6 className="card-title std_font">Upload Documents</h6>
                            <h6 className="font12">File size limit is 5MB.</h6>
                            <CardSubtitle className="mb-3 std_font mt-4">
                              MyKad - Front
                            </CardSubtitle>
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
                                        <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                        <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              ))}
                            </div>

                          </div>
                          <div className="mb-3">

                            <CardSubtitle className="mb-3 std_font">
                              MyKad - Back
                            </CardSubtitle>
                            {/* Second Dropzone */}
                            <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, setSelectedFiles2)}>
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
                            {/* Display selected files for the second Dropzone */}
                            <div className="dropzone-previews mt-3" id="file-previews2">
                              {selectedFiles2.map((f, i) => (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete file-selected-box"
                                  key={i + "-file2"}
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
                                        <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                        <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              ))}
                            </div>

                          </div>
                          <div className="mb-5">

                            <CardSubtitle className="mb-3 std_font">
                              Utility Bill
                            </CardSubtitle>
                            {/* Third Dropzone */}
                            <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, setSelectedFiles3)}>
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
                            {/* Display selected files for the second Dropzone */}
                            <div className="dropzone-previews mt-3" id="file-previews2">
                              {selectedFiles3.map((f, i) => (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete file-selected-box"
                                  key={i + "-file2"}
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
                                        <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                        <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              ))}
                            </div>

                          </div>


                          <Link to="/register-declarations" style={{ textDecoration: 'none' }}>
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

export default Register3;
