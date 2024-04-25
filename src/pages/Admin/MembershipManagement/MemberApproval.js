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
import axios from "axios";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const MemberApproval = () => {
  const { Uid } = useParams();
  const [data, setdata] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState(null);
  const history = createBrowserHistory();

  useEffect(() => {
    axios.post(apiname.base_url + apiname.p_userdetails, { id: Uid }, {
      headers: {
        'Authorization': 'Basic ' + apiname.encoded
      }
    })
      .then(res => setdata(res.data.result))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      console.log("Data:", data[0].ustatus);
      // Update button disablement based on ustatus value
      if (data[0].ustatus == 0 || data[0].ustatus == null) {
        setButtonsDisabled(false); // Enable buttons if ustatus is 0
      } else {
        setButtonsDisabled(true); // Disable buttons for any other value
      }
    } else {
      console.log("Data is empty.");
    }
  }, [data]);

  const handleInput = (status) => {
    const user = {
      'id': Uid,
      ustatus: status,
    };

    axios.post(apiname.base_url + apiname.userapproval, user, {
      headers: {
        'Authorization': 'Basic ' + apiname.encoded
      }
    })
      .then(res => {
        if (status === '1') {
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
                  <CardTitle className="h4 mb-4">Registration Details</CardTitle>
                  <Row className="mb-3">
                    <label>Name</label>
                    <div className="col-md-12">
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.Username}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <label>IC Number</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.icnumber}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Age</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.age}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label>Home Address</label>
                    <div className="col-md-12">
                      <Input
                        className="textarea form-control normal-input"
                        type="textarea"
                        defaultValue={datas.haddress}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <label>Phone Number</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.phonenum}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Phone Number 2</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.altnum}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <label>Email ID</label>
                      <input
                        className="form-control  normal-input"
                        type="email"
                        defaultValue={datas.emailid}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <label>Ethnicity</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.ethnic}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Religion</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.religion}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <label>Sex</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.sex}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Marital Status</label>
                      <input
                        className="form-control normal-input"
                        type="text"
                        defaultValue={datas.mstatus}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <label>Occupation</label>
                      <input
                        className="form-control  normal-input"
                        type="text"
                        defaultValue={datas.occupation}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <label>Service</label>
                      <input
                        className="form-control  normal-input"
                        type="text"
                        defaultValue={datas.service}
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control  normal-input"
                        type="text"
                        defaultValue={datas.paddress}
                        disabled
                      />
                    </div>
                  </Row>

                  <div className="d-flex justify-content-between mt-4 mb-5">
                    <div>
                      <CardSubtitle className="std_font mb-3">
                        MyKad - Front
                      </CardSubtitle>
                      <img className="ic-img" src={datas.f_mykad}></img>
                    </div>
                    <div>
                      <CardSubtitle className="std_font mb-3">
                        MyKad - Back
                      </CardSubtitle>
                      <img className="ic-img" src={datas.b_mykad}></img>
                    </div>
                    <div>

                      <CardSubtitle className="std_font mb-3">
                        Utility Bill
                      </CardSubtitle>
                      <img className="ic-img" src={datas.utilitybill}></img>
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
                        className="btn btn-success approveBtn mr-1"
                        disabled={buttonsDisabled}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAction('reject');
                          toggleModal();
                        }}
                        className="btn btn-danger rejectBtn ml-2"
                        disabled={buttonsDisabled}
                      >
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
            <Button color="primary" onClick={confirmAction}>Confirm</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </div>
        </ModalBody>
        
        

       
      </Modal>
    </React.Fragment>
  ));
};

export default MemberApproval;
