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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import * as apiname from "../../../helpers/url_helper";

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import avatar from "../../../assets/images/users/avatar-1.jpg";
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import pdfIcon from "../../../assets/images/PDF_file_icon.png";
import Switch from "react-switch";
import { del, get, post, put } from "../../../helpers/api_helper";

const MemberApproval = () => {
  const { Uid } = useParams();
  const [data, setdata] = useState([]);
  const [buttonsreadOnly, setButtonsreadOnly] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState(null);
  const history = createBrowserHistory();

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

  useEffect(() => {
    const userScheme = {
      scheme_id: "1",
    };

    post(apiname.p_userdetails, { id: Uid })
      .then((res) => {
        console.log("res");
        console.log(res);
        if(res.status==='204'){
          // setUserData(0);
        }else{
        let filteredData = res.data.result;
       
        setdata(filteredData);
      }

      })
      .catch((err) => console.log(err));

         if (data.length > 0) {
      console.log("Data:", data[0].ustatus);
      // Update button disablement based on ustatus value
      if (data[0].ustatus == 0 || data[0].ustatus == null) {
        setButtonsreadOnly(false); // Enable buttons if ustatus is 0
        console.log("enabled")
      } else {
        setButtonsreadOnly(true); // Disable buttons for any other value
        console.log("disabled")
      }
    } 

  }, [data]);

  const handleInput = (status) => {
    const user = {
      'id': Uid,
      ustatus: status,handleInput
    };

    post(apiname.userapproval, user)
      .then(res => {
        
        if(user.ustatus=='1') {
          toast.success('User accepted!');
        }else if(user.ustatus=='2'){
          toast.error('User rejected!');
        }
        setTimeout(() => {
          // Redirect to the dashboard page
          window.location.href = '/tables-datatable';
        }, 500);
      })
      .catch(err => console.log(err));


  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const confirmAction = () => {
    toggleModal();
    if (action === 'approve') {
      handleInput('1');
    } else if (action === 'reject') {
      handleInput('2');
    }
  };

  const downloadPDF = (pdfUrl) => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.pdf','image.png'); // Set the filename for the downloaded file
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error('Error downloading PDF:', error));
  };
  

  return data.map((datas) => (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer />
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Register Details" />
        
          <div className="d-flex gap-3">
                            <div className="col-lg-6 p-0">
                                <Card className="defCard" style={{ background: 'linear-gradient(to bottom, white 40%, #d1b66a 40%)' }}>
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
                                                        <h3 className="text-white">{datas.username}</h3>
                                                        <h3 className="text-dark">{datas.membership_id}</h3>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            {switch1 ? (
                                                                <span className="activeIndicator"></span>
                                                            ) : (
                                                                <span className="deactiveIndicator"></span>
                                                            )}
                                                            <div className="std_font">{switch1 ? "Active" : "Deactivated"}</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            {/* <span class="dot"></span> */}
                                                            {/* <div className="std_font">Active</div> */}

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>


                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">Profile Information</CardTitle>
                                        <div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Name (As per IC)</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.username}
                                                />
                                            </div>
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">IC Number</label>                                                        <Input
                                                            className="form-control normal-input"
                                                            type="text"
                                                            
                                                            defaultValue={datas.icnumber}
                                                        />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="6">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Age</label>
                                                        <Input
                                                            className="form-control normal-input"
                                                            type="text"
                                                            
                                                            defaultValue={datas.age}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                           
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">Mobile Phone 1</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.phonenum}
                                                />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="6">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Mobile Phone 2</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.altnum}
                                                />
                                                    </div>
                                                </Col>
                                            </Row>
                                           
                                            <div className="mb-3">
                                                <label className="std_input_label">Email Address</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="email"
                                                    
                                                    defaultValue={datas.email_id}
                                                />
                                            </div>
                                            <Row>
                                                <Col lg="4">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">Ethnic</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.ethnic}
                                                />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Religion</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.religion}
                                                />
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Sex</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.sex}
                                                />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col lg="4">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">Marital Status</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.mstatus}
                                                />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Occupation</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.occupation}
                                                />
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="">Service</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    
                                                    defaultValue={datas.service}
                                                />
                                                    </div>
                                                </Col>
                                            </Row>

                                            {/* <div className="mb-3">
                                                <label>Date of Birth</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={globalBirthDate}

                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Gender</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.sex}
                                                />
                                            </div> */}
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">Address Information</CardTitle>
                                         <div className="mb-3">
                                                <label className="std_input_label">Address</label>
                                                <Input
                                                    type="textarea"
                                                    name="address"
                                                    id="textarea"
                                                    className="normal-textarea"
                                                    maxLength="50"
                                                    rows="3"
                                                    placeholder="Home Address"
                                                    
                                                    defaultValue={datas.haddress}
                                                />
                                            </div>
                                        <div className="mb-3">
                                                <label className="std_input_label">Permanent Address</label>
                                                <Input
                                                    type="textarea"
                                                    name="address"
                                                    id="textarea"
                                                    className="normal-textarea"
                                                    maxLength="50"
                                                    rows="3"
                                                    placeholder="Home Address"
                                                    
                                                    defaultValue={datas.paddress}
                                                />
                                            </div>
                                            
                                        </CardBody>
                                </Card>


                            </div>
                            <div className="col-lg-6 p-0">

                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">KYC Documents</CardTitle>
                                        <div className="mt-4 mb-5 p-3 ">
                                            <div className="mb-3">
                                                <CardSubtitle className="std_input_label mb-2">
                                                    MyKad - Front
                                                </CardSubtitle>
                                                {datas.f_mykad.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                                                    <div  onClick={() => downloadPDF(datas.f_mykad)}>
                                                        <div className="text-center">
                                                            <img className="ic-img" src={datas.f_mykad} style={{ display: 'none' }}></img> {/* Hide the image */}
                                                        </div>

                                                        <Card className="pdfInput">
                                                            <CardBody className="m-3">
                                                                <div className="text-center">
                                                                    <img className="pdfIcon" src={pdfIcon}></img>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                ) : (
                                                    <Card className="pdfInput">
                                                        <CardBody className="m-3">
                                                            <div className="text-center">
                                                                <img className="ic-img mb-3" src={datas.f_mykad} alt="MyKad Front"></img>

                                                            </div>
                                                        </CardBody>
                                                    </Card>


                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <CardSubtitle className="std_input_label mb-2">
                                                    MyKad - Back
                                                </CardSubtitle>
                                                {datas.b_mykad.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                                                    <div onClick={() => downloadPDF(datas.b_mykad)}>
                                                        <div className="text-center">
                                                            <img className="ic-img" src={datas.b_mykad} style={{ display: 'none' }}></img> {/* Hide the image */}
                                                        </div>                          <Card className="pdfInput">
                                                            <CardBody className="m-3">
                                                                <div className="text-center">
                                                                    <img className="pdfIcon" src={pdfIcon}></img>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                ) : (
                                                    <Card className="pdfInput">
                                                        <CardBody className="m-3">
                                                            <div className="text-center">
                                                                <img className="ic-img mb-3" src={datas.b_mykad} alt="MyKad Front"></img>

                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                )}
                                            </div>
                                            <div className="mb-3">

                                                <CardSubtitle className="std_input_label mb-2">
                                                    Utility Bill
                                                </CardSubtitle>
                                                {datas.utilitybill.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                                                    <div onClick={() => downloadPDF(datas.utilitybill)}>
                                                        <img className="ic-img mb-3" src={datas.utilitybill} style={{ display: 'none' }}></img> {/* Hide the image */}
                                                        <Card className="pdfInput">
                                                            <CardBody className="m-3">
                                                                <div className="text-center">
                                                                    <img className="pdfIcon" src={pdfIcon}></img>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                ) : (
                                                    <Card className="pdfInput">
                                                        <CardBody className="m-3">
                                                            <div className="text-center">
                                                                <img className="ic-img" src={datas.utilitybill} alt="MyKad Front"></img>

                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                )}                                            </div>

                                        </div>
                                    </CardBody>
                                </Card>

                                {/* <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">Membership Information</CardTitle>
                                        <div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Membership Status</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue="Active"
                                                />
                                            </div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Membership Number</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.membership_id}
                                                />
                                            </div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Date of Joining</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.createdAt}
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card> */}
                                {/* <Card>
                                    <CardBody>
                                        <CardTitle>Membership Information</CardTitle>
                                        <div>
                                            <div className="mb-3 mt-3">
                                                <label>Membership Status</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={"Sarah"}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Membership Number</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={"028484-01-8383"}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Date of Joining</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="date"
                                                    disabled

                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Renewal Date</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="date"
                                                    disabled

                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card> */}
                                {/* <Card>
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
                                </Card> */}

                            </div>
                        </div>
                        <Row className="mb-3">
                    <div className="col-md-12 text-center">
                      <button
                        style={{ marginRight: "5px" }}
                        type="button"
                        onClick={() => {
                          setAction('approve');
                          toggleModal();
                        }}
                        className="btn btn-success approveBtn statusApproved mr-1"
                        disabled={buttonsreadOnly}
                      >
                        <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "}
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAction('reject');
                          toggleModal();
                        }}
                        className="btn btn-danger rejectBtn statusRejected ml-2"
                        disabled={buttonsreadOnly}
                      >
                        <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "}
                        Reject
                      </button>
                    </div>
                  </Row>
        </Container>
      </div>
      <Modal className="modal-dialog-centered" isOpen={modalOpen} toggle={toggleModal}>
        {/* <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader> */}
        <ModalBody>
          <div>
            <div className="approval-popup">
              <i class="fas fa-question-circle" style={{ color:'#0e174d' }}></i>
            </div>
            <div className="std_font text-center">
              Are you sure to {action === 'approve' ? 'approve' : 'reject'} this user?
            </div>
          </div>

          <div className="approval-popup-btn">
            <Button color="warning" className="modalCancelBtn me-2" outline onClick={toggleModal}>Cancel</Button>{' '}
            <Button color="primary" className="modalConfirmBtn" onClick={confirmAction}>Confirm</Button>

          </div>
        </ModalBody>




      </Modal>
    </React.Fragment>
  ));
};

export default MemberApproval;
