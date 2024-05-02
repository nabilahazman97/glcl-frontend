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
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";



const MemberApproval = () => {

  const { Uid } = useParams();
  console.log("Uid:", Uid);

  const user = {
    'id': Uid
  };



  const history = createBrowserHistory();

  console.log("user");
  console.log(user);
  const [data, setdata] = useState([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  useEffect(() => {
    console.log(apiname.base_url);
    console.log(apiname.p_userdetails);
    console.log(user);
    post(apiname.p_userdetails, user)
    .then(res => setdata(res.result))
      .catch(err => console.log(err));
    // axios.post(apiname.base_url + apiname.p_userdetails, user, {
    //   headers: {
    //     'Authorization': 'Basic ' + apiname.encoded
    //   }
    // })
    //   // .then(res =>console.log(res))
    //   .then(res => setdata(res['data']['result']))
    //   .catch(err => console.log(err));
  }, []);
  console.log("data userzzzz");
  console.log(data[0]);
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
  // data.forEach(element => {
  //   console.log("data1");
  //   console.log(element.Username);

  // });
  //meta 

  const handleInput = (e, value) => {
    const user = {
      'id': Uid,
      ustatus: e.target.value,


    };

    // useEffect(() => { 

    post(userapproval, user)
    .then(res => {
      if (e.target.value === '1') {
        toast.success('User accepted successfully!');
      } else {
        toast.error('User rejected successfully!');
      }
      setTimeout(() => {
        // Redirect to the dashboard page
        window.location.href = '/tables-datatable';
      }, 500);
    })
    // .then(res =>setdata(res['data']['result']))
    .catch(err => console.log(err));

    // axios.post(apiname.base_url + apiname.userapproval, user, {
    //   headers: {
    //     'Authorization': 'Basic ' + apiname.encoded
    //   }
    // })
    //   .then(res => {
    //     if (e.target.value === '1') {
    //       toast.success('User accepted successfully!');
    //     } else {
    //       toast.error('User rejected successfully!');
    //     }
    //     setTimeout(() => {
    //       // Redirect to the dashboard page
    //       window.location.href = '/tables-datatable';
    //     }, 500);
    //   })
    //   // .then(res =>setdata(res['data']['result']))
    //   .catch(err => console.log(err));
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
          <ToastContainer />
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Member Approval" />

            <Row>
              <Col>
                <Card>
                  <CardBody className="m-3">
                    <CardTitle className="h4 mb-3">Registration Details  </CardTitle>

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
                        <CardSubtitle className="std_font">
                          MyKad - Front
                        </CardSubtitle>
                        <img className="ic-img" src={datas.f_mykad}></img>
                      </div>
                      <div>
                      <CardSubtitle className="std_font">
                        MyKad - Back
                      </CardSubtitle>
                      <img className="ic-img" src={datas.b_mykad}></img>
                      </div>
                      <div>

                      <CardSubtitle className="std_font">
                          Utility Bill
                        </CardSubtitle>
                        <img className="ic-img" src={datas.utilitybill}></img>
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
                          disabled={buttonsDisabled}
                        >
                          <i className="bx bx-check-circle font-size-16 align-middle me-1"></i>{" "}
                          Approve
                        </button>

                        <button

                          type="button"
                          value='2'
                          onClick={e => handleInput(e, "value")}
                          className="btn btn-danger rejectBtn ml-2"
                          disabled={buttonsDisabled}
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
