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

import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import pdfIcon from "../../../assets/images/PDF_file_icon.png";

import { del, get, post, put } from "../../../helpers/api_helper";

const MemberApproval = () => {
  const { Uid } = useParams();
  const [data, setdata] = useState([]);
  const [buttonsreadOnly, setButtonsreadOnly] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState(null);
  const history = createBrowserHistory();


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
        console.log(res.data.status);
        if (res.data.status === '200') {
          toast.success('User accepted successfully!');
        } else {
          toast.error('User rejected successfully!');
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

  return data.map((datas) => (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer />
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Member Approval" />
          <Row>
            <Col>
              <Card className="defCard">
                <CardBody className="m-3">
                  <CardTitle className="cardTitle mb-4 ">Registration Details</CardTitle>
                  <Row className="mb-3">
                    {/* <label>Name</label> */}
                    <div className="col-md-12">
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.username}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      {/* <label>IC Number</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.icnumber}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <label>Age</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.age}
                        disabled
                        readOnly

                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    {/* <label>Home Address</label> */}
                    <div className="col-md-12">
                      <Input
                        className="textarea form-control normal-input"
                        type="textarea"
                        defaultValue={datas.haddress}
                        readOnly
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      {/* <label>Phone Number</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.phonenum}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <label>Phone Number 2</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.altnum}
                        readOnly
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      {/* <label>Email ID</label> */}
                      <input
                        className="form-control  normal-input"
                        type="email"
                        defaultValue={datas.email_id}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      {/* <label>Ethnicity</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.ethnic}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <label>Religion</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.religion}
                        readOnly
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      {/* <label>Sex</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.sex}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <label>Marital Status</label> */}
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.mstatus}
                        readOnly
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      {/* <label>Occupation</label> */}
                      <input
                        className="form-control  normal-input"
                        type="text"
                        defaultValue={datas.occupation}
                        readOnly
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      {/* <label>Service</label> */}
                      <input
                        className="form-control  normal-input"
                        type="text"
                        defaultValue={datas.service}
                        readOnly
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control  normal-input"
                        type="text"
                        defaultValue={datas.paddress}
                        readOnly
                      />
                    </div>
                  </Row>

                  <div className=" mt-4 mb-5">
                    <div>
                      <CardSubtitle className="std_input_label mb-3">
                        MyKad - Front
                      </CardSubtitle>
                      {datas.f_mykad.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                        <div>
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
                    <div>
                      <CardSubtitle className="std_input_label mb-3">
                        MyKad - Back
                      </CardSubtitle>
                      {datas.b_mykad.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                        <div>
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
                    <div>

                      <CardSubtitle className="std_input_label mb-3">
                        Utility Bill
                      </CardSubtitle>
                      {datas.utilitybill.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                        <div>
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
                      )}
                    </div>

                  </div>                  <Row className="mb-3">
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal className="modal-dialog-centered" isOpen={modalOpen} toggle={toggleModal}>
        {/* <ModalHeader toggle={toggleModal}>Confirmation</ModalHeader> */}
        <ModalBody>
          <div>
            <div className="approval-popup">
              <i class="fas fa-question-circle"></i>
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
