import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  CardSubtitle,
  Form,
  CardTitle,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";
import withRouter from "components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";

import axios from "axios";
import * as apiname from "../../helpers/url_helper";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import pdfIcon from "../../assets/images/PDF_file_icon.png";
import { del, get, post, put } from "../../helpers/api_helper";

const UserProfile = () => {
  document.title = "GLCL";
  // const [fres, setdata] = useState([]);
  const [userData, setUserData] = useState([]);
  const [fres, setdata] = useState({});
  useEffect(() => {
    var authUserData = localStorage.getItem("authUser");
    var authUserObject = JSON.parse(authUserData);

    setdata(authUserObject.data.result)
    console.log(authUserObject.data.result.id);
    var id = authUserObject.data.result.id;

    const user = {
      'id': id
    };

    post(apiname.p_userdetails, { id: id })
      .then((res) => {
        console.log("res");
        console.log(res);
        if (res.status === '204') {
          // setUserData(0);
        } else {
          let filteredData = res.data.result[0];

          console.log("filteredData");
          console.log(filteredData);
          setUserData(filteredData);
        }

      })
      .catch((err) => console.log(err));

    // post(apiname.p_userdetails, user)
    // .then((res) =>setdata(res.result))
    // .catch(err => console.log(err));
    //   axios.post(apiname.base_url + apiname.p_userdetails, user, {
    //     headers: {
    //         'Authorization': 'Basic ' + apiname.encoded
    //     }
    // })
    //     .then((res) =>setdata(res['data']['result'][0]))
    //     .catch(err => console.log(err));
  }, {});

  const textHandler = e => {
    const { name, value } = e.target;
    setValues({
      ...values1,
      [name]: value,
    });
  };
  const initialValues = fres || {};
  const [values1, setValues] = useState(initialValues);

  function handleSubmit(e) {


    console.log("df");
    e.preventDefault();
    console.log("values1");
    console.log(values1);

    var authUserData = localStorage.getItem("authUser");
    var authUserObject = JSON.parse(authUserData);
    console.log(authUserObject);
    var id = authUserObject.data.result.id;

    const formData = new FormData();

    if (values1.username != undefined) {
      formData.append('username', values1.username);
    }
    if (values1.icnumber != undefined) {
      formData.append('icnumber', values1.icnumber);
    }
    if (values1.emailid != undefined) {
      formData.append('email_id', values1.email_id);
    }
    if (values1.phonenum != undefined) {
      formData.append('phonenum', values1.phonenum);
    }
    if (values1.altnum != undefined) {
      formData.append('altnum', values1.altnum);
    }
    if (values1.ethnic != undefined) {
      formData.append('ethnic', values1.ethnic);
    }
    if (values1.haddress != undefined) {
      formData.append('haddress', values1.haddress);
    }
    if (values1.religion != undefined) {
      formData.append('religion', values1.religion);
    }
    if (values1.sex != undefined) {
      formData.append('sex', values1.sex);
    }
    if (values1.mstatus != undefined) {
      formData.append('mstatus', values1.mstatus);
    }
    if (values1.occupation != undefined) {
      formData.append('occupation', values1.occupation);
    }
    if (values1.service != undefined) {
      formData.append('service', values1.service);
    }
    if (values1.paddress != undefined) {
      formData.append('paddress', values1.paddress);
    }

    formData.append('id', id);

    console.log("formData");
    console.log(values1.length);

    post(apiname.editProfile, formData)
      .then(res => {
        console.log("resupdate");
        console.log(res);
        console.log(res.status);
        if (res.status == 200) {
          toast.success('Updated!');
        } else {
          toast.danger('Failed to Update!');
        }
        setTimeout(() => {
          // Redirect to the dashboard page
          window.location.href = '/profile';
        }, 500);

      })
      .catch(err => console.log(err));

    // axios.post(apiname.base_url + apiname.editProfile, formData, {
    //   headers: {
    //     'Authorization': 'Basic ' + apiname.encoded
    //   }
    // })
    //   .then(res => {
    //     if (res['data']['status'] == '1') {
    //       toast.success('Updated!'); 
    //     } else {
    //       toast.danger('Failed to Update!'); 
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  function handleChangePwd() {

    console.log("function");
    const oldPwdInput = document.getElementsByName('oldPwd')[0];
    const newPwdInput = document.getElementsByName('newPwd')[0];
    const confirmPwdInput = document.getElementsByName('confirmPwd')[0];
    var authUserData = localStorage.getItem("authUser");
    var authUserObject = JSON.parse(authUserData);
    var id = authUserObject.data.result.id;
    const userId = id;

    const oldPwd = oldPwdInput.value;
    const newPwd = newPwdInput.value;
    const confirmPwd = confirmPwdInput.value;

    if (newPwd !== confirmPwd) {
      toast.warning("Password doesn't match!");
      return;
    }

    var formdata = {
      'id': userId,
      'password': oldPwd,
      'confirmpassword': newPwd,
      'is_login': '2'
    };


    // Assuming you have a user ID available, you can fetch it from somewhere or directly use it
    console.log(formdata)
    post(apiname.changePwd, formdata)
      .then(response => {
        // Handle success response

        toast.success('Password changed!');
        oldPwdInput.value = '';
        newPwdInput.value = '';
        confirmPwdInput.value = '';



        // window.location.reload();


      })
      .catch(error => {

        console.error('Error occurred:', error);
        toast.warning('Failed to change password');
        oldPwdInput.value = '';
        newPwdInput.value = '';
        confirmPwdInput.value = '';

      });
    // axios.post(apiname.base_url + apiname.changePwd, formdata, {

    //   headers: {
    //     'Authorization': 'Basic ' + apiname.encoded
    //   }
    // })
    //   .then(response => {
    //     // Handle success response 
    //     toast.success('Password changed!'); 
    //     newPwdInput.value = '';
    //     confirmPwdInput.value = '';
    //     // window.location.reload();
    //   })
    //   .catch(error => {
    //     console.error('Error occurred:', error);
    //     toast.warning('Failed to change password');
    //     newPwdInput.value = '';
    //     confirmPwdInput.value = '';
    //   });
  }


  return (
    <React.Fragment>

      <div className="page-content">
        <Form
          onSubmit={handleSubmit}
          className="form-horizontal"

        >
          <ToastContainer />
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="GLCL" breadcrumbItem="Profile" />

            <div className="d-flex gap-3">
              <div className="col-lg-6 p-0">
                <Card className="defCard" style={{ background: 'linear-gradient(to bottom, white 40%, #d1b66a 40%)' }}>
                  <CardBody>
                    <div>
                      <div className="d-flex justify-content-center">
                        <div className="text-center">
                          <img
                            src={avatar}
                            alt=""
                            className="avatar-md rounded-circle img-thumbnail"
                          />
                          <div className="mt-2">
                            <h3 className="text-white">{userData.username}</h3>
                          </div>

                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="defCard">
                  <CardBody>
                    <CardTitle className="cardTitle">Profile Information</CardTitle>
                    <CardTitle></CardTitle>
                    <div>
                      <div className="mb-3 mt-3">
                        <label className="std_input_label">Name</label>
                        <Input
                          id="username"
                          name="username"
                          className="form-control normal-input"
                          type="text"
                          onChange={textHandler}
                          defaultValue={userData.username}
                          required

                        />
                      </div>
                      <div className="mb-3">
                        <label className="std_input_label">IC Number</label>
                        <Input
                          id="icnumber"
                          name="icnumber"
                          className="form-control normal-input"
                          type="text"
                          onChange={textHandler}
                          defaultValue={userData.icnumber}
                          required
                          maxlength='12'

                        />
                      </div>

                      <Row>
                        <Col lg="6">
                          <div className="mb-3">
                            <label className="std_input_label">Phone Number</label>
                            <Input
                              name="phonenum"
                              id="phonenum"
                              className="form-control normal-input"
                              type="text"
                              onChange={textHandler}
                              defaultValue={userData.phonenum}
                              required
                              maxlength="10"
                            />
                          </div>

                        </Col>

                        <Col lg="6">
                          <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                            <label className="std_input_label">Mobile Phone 2</label>
                            <Input
                              name="altnum"
                              onChange={textHandler}
                              className="form-control normal-input"
                              type="text"
                              defaultValue={userData.altnum}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="4">
                          <div className="mb-3">
                            <label className="std_input_label">Ethnic</label>
                            <Input
                             name="ethnic"
                             onChange={textHandler}
                              className="form-control normal-input"
                              type="text"
                              defaultValue={userData.ethnic}
                            />
                          </div>

                        </Col>

                        <Col lg="4">
                          <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                            <label className="std_input_label">Religion</label>
                            <Input
                             name="religion"
                             onChange={textHandler}
                              className="form-control normal-input"
                              type="text"
                              defaultValue={userData.religion}
                            />
                          </div>
                        </Col>

                        <Col lg="4">
                          <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                            <label className="std_input_label">Sex</label>
                            <Input
                             name="sex"
                             onChange={textHandler}
                              className="form-control normal-input"
                              type="text"
                              defaultValue={userData.sex}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="4">
                          <div className="mb-3">
                            <label className="std_input_label">Marital Status</label>
                            <Input
                             name="mstatus"
                             onChange={textHandler}
                              className="form-control normal-input"
                              type="text"
                              defaultValue={userData.mstatus}
                            />
                          </div>

                        </Col>

                        <Col lg="4">
                          <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                            <label className="std_input_label">Occupation</label>
                            <Input
                             name="occupation"
                             onChange={textHandler}
                              className="form-control normal-input"
                              type="text"
                              defaultValue={userData.occupation}
                            />
                          </div>
                        </Col>

                        <Col lg="4">
                          <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                            <label className="">Service</label>
                            <Input
                             name="service"
                             onChange={textHandler}
                              className="form-control normal-input"
                              type="text"
                              defaultValue={userData.service}
                            />
                          </div>
                        </Col>
                      </Row>

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
                        name="haddress"
                        id="textarea"
                        className="normal-textarea"
                        maxLength="50"
                        rows="3"
                        placeholder="Home Address"
                        onChange={textHandler}
                        defaultValue={userData.haddress}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="std_input_label">Permanent Address</label>
                      <Input
                        type="textarea"
                        name="paddress"
                        id="textarea"
                        className="normal-textarea"
                        maxLength="50"
                        rows="3"
                        placeholder="Home Address"
                        onChange={textHandler}
                        defaultValue={userData.paddress}
                      />
                    </div>

                  </CardBody>
                </Card>

              </div>
              <div className="col-lg-6 p-0">

                
              <Card className="defCard">
                  <CardBody>
                    <CardTitle className="cardTitle">Change Password</CardTitle>
                    <div className="mb-3">
                      <label className="std_input_label">Old Password</label>
                      <Input
                        name="oldPwd"
                        className="form-control normal-input"
                        type="password"
                        // value={fres.password}
                        // readOnly
                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <label className="std_input_label">New Password</label>
                      <Input
                        name="newPwd"
                        className="form-control normal-input"
                        type="password"

                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <label className="std_input_label">Confirm Password</label>
                      <Input
                        name="confirmPwd"
                        className="form-control normal-input"
                        type="password"


                      />
                    </div>

                    <div className="text-center mt-3 mb-3">
                      <Button type="submit" onClick={handleChangePwd} className="stdBtn" style={{ backgroundColor:'#DDBF6A' }}>
                        Change Password
                      </Button>


                    </div>
                  </CardBody>
                </Card>

                <Card className="defCard">
                  <CardBody>
                    <CardTitle className="cardTitle">KYC Documents</CardTitle>
                    <div className="mt-4  p-3 ">
                      <div className="mb-3">
                        <CardSubtitle className="std_input_label mb-2">
                          MyKad - Front
                        </CardSubtitle>
                        {fres.f_mykad?.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                          <div>
                            <div className="text-center">
                              <img className="ic-img" src={fres.f_mykad} style={{ display: 'none' }}></img> {/* Hide the image */}
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
                                <img className="ic-img mb-3" src={fres.f_mykad} alt="MyKad Front"></img>

                              </div>
                            </CardBody>
                          </Card>


                        )}
                      </div>
                      <div className="mb-3">
                        <CardSubtitle className="std_input_label mb-2">
                          MyKad - Back
                        </CardSubtitle>
                        {fres.b_mykad?.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                          <div>
                            <div className="text-center">
                              <img className="ic-img" src={fres.b_mykad} style={{ display: 'none' }}></img> {/* Hide the image */}
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
                                <img className="ic-img mb-3" src={fres.b_mykad} alt="MyKad Front"></img>

                              </div>
                            </CardBody>
                          </Card>
                        )}
                      </div>
                      <div className="mb-3">

                        <CardSubtitle className="std_input_label mb-2">
                          Utility Bill
                        </CardSubtitle>
                        {fres.utilitybill?.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                          <div>
                            <img className="ic-img mb-3" src={fres.utilitybill} style={{ display: 'none' }}></img> {/* Hide the image */}
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
                                <img className="ic-img" src={fres.utilitybill} alt="MyKad Front"></img>

                              </div>
                            </CardBody>
                          </Card>
                        )}                                            
                        </div>

                    </div>
                  </CardBody>
                </Card>


                <Card className="defCard">
                  <CardBody>
                    <CardTitle className="cardTitle">Membership Information</CardTitle>
                    <div>
                      <div className="mb-3 mt-3">
                        <label className="std_input_label">Email Address</label>
                        <Input
                          className="form-control normal-input"
                          type="text"
                          name="name"
                          onChange={textHandler}
                          defaultValue={fres.membership_id}
                          required
                        />
                      </div>
                      <div className="mb-3 mt-3">
                        <label className="std_input_label">Role</label>
                        <Input
                          className="form-control normal-input"
                          type="text"
                          name="name"
                          onChange={textHandler}
                          defaultValue={fres.role}
                          required
                        />
                      </div>



                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="text-center mt-3 mb-3">
              <Button
                type="submit"

                // onClick={() => {
                //   // Validate the form
                //   validation2.validateForm().then(errors => {

                //   });
                // }}
                className="stdBtn"
                style={{ backgroundColor:"#1A2B88" }}
                >
                Update
              </Button>


            </div>



          </Container>
        </Form>
      </div>
    </React.Fragment>
  );
  // })
};

export default withRouter(UserProfile);
