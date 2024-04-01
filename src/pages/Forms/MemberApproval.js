import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  CardSubtitle,
  Input,
} from "reactstrap"
import * as apiname from "../../helpers/url_helper";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";



const MemberApproval = () => {

  const { Uid } = useParams();
  console.log("Uid:", Uid);

  const user = {
    'uid':Uid
  };
  
  console.log("user");
  console.log(user);
  const [data, setdata] = useState([]);
  useEffect(() => {
      console.log(apiname.base_url);
      console.log(apiname.p_userdetails);
      console.log(user);
      axios.post(apiname.base_url+apiname.p_userdetails,user, {
        headers: {
          'Authorization': 'Basic '+ apiname.encoded
        }
      })
      // .then(res =>console.log(res))
      .then(res =>setdata(res['data']['result']))
      .catch(err => console.log(err));
    }, []);
    console.log("data");
    console.log(data[0]);
    // data.forEach(element => {
    //   console.log("data1");
    //   console.log(element.Username);
      
    // });
  //meta 
  
  function handleInput(e) {
    const user = {
      'uid':Uid,
      ustatus:e.target.value
    };

    // useEffect(() => {
     
      axios.post(apiname.base_url+apiname.userapproval,user, {
        headers: {
          'Authorization': 'Basic '+ apiname.encoded
        }
      })
      .then(res =>console.log(res))
      // .then(res =>setdata(res['data']['result']))
      .catch(err => console.log(err));
    // }, []);

    
//     console.log(e.target.value);
 }


  document.title = "GLCL"

  // const [modal_center, setmodal_center] = useState(false);
  // const [selectedFiles1, setSelectedFiles1] = useState([]);
  // const [selectedFiles2, setSelectedFiles2] = useState([]);
  // const [selectedFiles3, setSelectedFiles3] = useState([]);

  // function handleAcceptedFiles(files, setSelectedFiles) {
  //   const formattedFiles = files.map(file =>
  //     Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //       formattedSize: formatBytes(file.size),
  //     })
  //   );
  //   setSelectedFiles(formattedFiles);
  // }


  // function formatBytes(bytes, decimals = 2) {
  //   if (bytes === 0) return "0 Bytes";
  //   const k = 1024;
  //   const dm = decimals < 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // }

  
  return data.map((datas) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Member Approval" />

          <Row>
            <Col>
              <Card>
                <CardBody className="m-3">
                  <CardTitle className="h4 mb-3">Registration Details  </CardTitle>

                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.Username}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.icnumber}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.age}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.haddress}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.phonenum}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.altnum}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="email"
                        defaultValue={datas.emailid}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.ethnic}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.religion}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.sex}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue={datas.mstatus}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="text"
                        defaultValue={datas.occupation}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="text"
                        defaultValue={datas.service}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="text"
                        defaultValue={datas.paddress}
                      />
                    </div>
                  </Row>
                 
                  <CardSubtitle className="mb-3 std_font mt-4">
                    MyKad - Front
                  </CardSubtitle>
                  <img className="w-25" src={datas.f_mykad}></img>
                  {/* First Dropzone */}
                  {/* <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, setSelectedFiles1)}>
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
                  </Dropzone> */}
                  
                  {/* Display selected files for the first Dropzone */}
                  {/* <div className="dropzone-previews mt-3" id="file-previews1">
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
                  </div> */}


                  <div className="mb-3 mt-3">

                    <CardSubtitle className="mb-3 std_font">
                      MyKad - Back
                    </CardSubtitle>
                    <img className="w-25" src={datas.b_mykad}></img>
                    {/* Second Dropzone */}
                    {/* <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, setSelectedFiles2)}>
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
                    </Dropzone> */}
                    {/* Display selected files for the second Dropzone */}
                    {/* <div className="dropzone-previews mt-3" id="file-previews2">
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
                    </div> */}


                    <div className="mb-5 mt-3">

                      <CardSubtitle className="mb-3 std_font">
                        Utility Bill
                      </CardSubtitle>
                      <img className="w-25" src={datas.utilitybill}></img>
                      {/* Third Dropzone */}
                      {/* <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, setSelectedFiles3)}>
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
                      </Dropzone> */}
                      {/* Display selected files for the second Dropzone */}
                      {/* <div className="dropzone-previews mt-3" id="file-previews2">
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
                      </div> */}
                    </div>
                  </div>

                  <Row className="mb-3">
                    <div className="col-md-12 text-center">
                      <button
                    
                        style={{ marginRight: "5px" }}
                        type="button"
                        value='1'
                        onClick={e => handleInput(e, "value")}
                        className="btn btn-success approveBtn mr-1"
                      >
                        <i className="bx bx-check-circle font-size-16 align-middle me-1"></i>{" "}
                        Approve
                      </button>

                      <button
                    
                        type="button"
                        value='2'
                        onClick={e => handleInput(e, "value")}
                        className="btn btn-danger rejectBtn ml-2"
                      >
                        <i className="bx bx-x-circle font-size-16 align-middle me-1"></i>{" "}
                        Reject
                      </button>
                    </div>
                  </Row>


                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
  })
}

export default MemberApproval
