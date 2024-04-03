import React, { useState } from "react";
import { Row, Col, Card, Form, CardBody, CardSubtitle, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";

const FormUpload = () => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      f_mykad: "",
      b_mykad: "",
    },
    validationSchema: Yup.object().shape({
      f_mykad: Yup.mixed().required("File 1 is required"),
      b_mykad: Yup.mixed().required("File 2 is required"),
    }),
    onSubmit: (values) => {
      if (!validation.errors.file1 && !validation.errors.file2) {
        console.log(values);
        // Perform your submission logic here
      }
    }
  });

  const [selectedFiles1, setselectedFiles1] = useState([]);
  const [selectedFiles2, setselectedFiles2] = useState([]);

  function handleAcceptedFiles(files, field) {
    files.forEach(file => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });
    });

    if (field === "f_mykad") {
      setselectedFiles1(files);
      validation.setFieldValue("f_mykad", files[0]);
    } else if (field === "b_mykad") {
      setselectedFiles2(files);
      validation.setFieldValue("b_mykad", files[0]);
    }
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
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <h6 className="card-title">Dropzone</h6>
                  <CardSubtitle className="mb-3">
                    DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews.
                  </CardSubtitle>
                  <Form onSubmit={validation.handleSubmit}>
                    {/* File 1 upload */}
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles, "f_mykad");
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                          </div>
                          <h4>Drop files for File 1 here or click to upload.</h4>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews1">
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

                    {/* File 2 upload */}
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles, "b_mykad");
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone" {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                          </div>
                          <h4>Drop files for File 2 here or click to upload.</h4>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews2">
                      {selectedFiles2.map((f, i) => (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={i + "-b_mykad"}
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

                    {/* Error messages */}
                    {validation.errors.f_mykad && (
                      <div className="text-danger">{validation.errors.f_mykad}</div>
                    )}
                    {validation.errors.b_mykad && (
                      <div className="text-danger">{validation.errors.b_mykad}</div>
                    )}

                    <div className="text-center mt-4">
                      {/* Render submit button if both files are uploaded */}
                      {!validation.errors.f_mykad && !validation.errors.b_mykad && (
                        console.log("submitted")
                      )}
                      <button type="submit" className="btn btn-primary">Send Files</button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default FormUpload;
