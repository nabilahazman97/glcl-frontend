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
  FormFeedback,
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

const UserProfile = () => {

  //meta title
  document.title = "GLCL";

  const dispatch = useDispatch();
 
  const [idx, setidx] = useState(1);
  const [name, setname] = useState("");
  const [icNum, seticNum] = useState("");
  const [sex, setsex] = useState("");
  const [email, setemail] = useState("");
  const [phoneNum, sethpNum] = useState("");
  const [addr, setaddress] = useState("");
  const [dob, setDob] = useState("");


  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {
    console.log("profiledetails");
    console.log(localStorage.getItem("authUser"));

    var authUserData = localStorage.getItem("authUser");
    var authUserObject = JSON.parse(authUserData);
    var username = setname(authUserObject.result[0].Username);
    var icnum = seticNum(authUserObject.result[0].icnumber);
    var sex = setsex(authUserObject.result[0].sex);
    var email = setemail(authUserObject.result[0].emailid);
    var phone = sethpNum(authUserObject.result[0].phonenum);
    var addr = setaddress(authUserObject.result[0].haddress);

    // Extract the first 6 characters of the IC number
    var icNumber = authUserObject.result[0].icnumber;
    var firstSixChars = icNumber.substring(0, 6);

    // Extract year, month, and day from the first six characters
    var year = firstSixChars.substring(0, 2);
    var month = firstSixChars.substring(2, 4);
    var day = firstSixChars.substring(4, 6);

    // Assuming the current century
    var fullYear = parseInt(year) + 2000;

    // Create a Date object for the calculated date of birth
    var dateOfBirth = new Date(fullYear, month - 1, day);

    // Format the date of birth as "DD/MM/YYYY"
    var formattedDateOfBirth = dateOfBirth.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');

    setDob(formattedDateOfBirth);
    console.log("Date of Birth:", formattedDateOfBirth);

  }, [dispatch, success]);


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || '',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });

  function handleChangePwd() {

    const oldPwdInput = document.getElementsByName('oldPwd')[0];
    const newPwdInput = document.getElementsByName('newPwd')[0];
    const confirmPwdInput = document.getElementsByName('confirmPwd')[0];
    const userId = idx;

    const oldPwd = oldPwdInput.value;
    const newPwd = newPwdInput.value;
    const confirmPwd = confirmPwdInput.value;

    // Validate if new password and confirm password match
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




    // Make a POST request to your backend API endpoint
    axios.post(apiname.base_url + apiname.changePwd, formdata, {

      headers: {
        'Authorization': 'Basic ' + apiname.encoded
      }
    }


    )
      .then(response => {
        // Handle success response
        console.log(response.data);
        toast.success('Password changed!'); // Display success message

        oldPwdInput.value = '';
        newPwdInput.value = '';
        confirmPwdInput.value = '';
      })
      .catch(error => {
        // Handle error
        console.error('Error occurred:', error);
        toast.danger('Failed to change password');
      });
  }


  const validation2 = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // name: '' || '',
      // icNum: '' || '',
      // age: '' || '',
      // homeAddress: '' || '',
      // mob_phone1: '' || '',
      // phone2: '' || '',
      // email: '' || '',
      // ethnicity: '' || '',
      // religion: '' || '',
      // otherEthnicity: '' || '',
      // otherReligion: '' || '',
      // occupation: '' || '',
      // sex: '',
      // mstatus: '',
      // service: '',
      // address: '',
      // f_mykad: '',
      // b_mykad: '',
      // utilitybill: '',
      // declareName: '',
      // declareIcNum: '',
      // declareRelay: '',
      // nomnric: '',
      // declareAgree: false,
    },
    validationSchema: Yup.object().shape({
      // name: Yup.string().required("Name is required"),
      // email: Yup.string().required("Email is required"),
    }),
    onSubmit: (values) => {

      // values.b_mykad = selectedFiles2;
      // values.utilitybill = selectedFiles3;
      // values.nomnric = selectedFiles4;
      
      // values.declareAgree = document.getElementById("defaultCheck1").checked;

      // const formData = new FormData();
      console.log(values.name)
      if (values.f_mykad == '') {
        values.f_mykad = undefined;
      } else {



        values.f_mykad = selectedFiles1[0];
        // 
      }

      if (values.b_mykad == '') {
        values.b_mykad = undefined;
      } else {



        values.b_mykad = selectedFiles2[0];
        // 
      }

      if (values.utilitybill == '') {
        values.utilitybill = undefined;
      } else {



        values.utilitybill = selectedFiles3[0];
        // 
      }
      if (values.nomnric == '') {
        values.nomnric = undefined;
      } else {



        values.nomnric = selectedFiles4[0];
        // 
      }

      const formData = new FormData();
      formData.append('f_mykad', values.f_mykad);
      formData.append('b_mykad', values.b_mykad);
      formData.append('utilitybill', values.utilitybill);
      formData.append('nomnric', values.nomnric);
      formData.append('emailid', values.email);
      formData.append('Username', values.name);
      formData.append('icnumber', values.icNum);
      formData.append('age', values.age);
      formData.append('haddress', values.homeAddress);
      formData.append('phonenum', values.mob_phone1);
      formData.append('altnum', values.altnum);
      formData.append('ethnic', values.ethnicity);
      formData.append('religion', values.religion);
      formData.append('sex', values.sex);
      formData.append('mstatus', values.mstatus);
      formData.append('occupation', values.occupation);
      formData.append('service', values.service);
      formData.append('paddress', values.address);
      formData.append('nomname', values.declareName);
      formData.append('nomicnum', values.declareIcNum);
      formData.append('nomrelaship', values.declareRelay);
       formData.append('id', idx);
      // formData.append('email', values.declareAgree);

 console.log("formData");
       console.log(idx);




      //  formData.append('f_mykad', selectedFiles1);

      

      // useEffect(() => {
      // console.log("hi");
      axios.post(apiname.base_url + apiname.editProfile, formData, {
        headers: {
          'Authorization': 'Basic ' + apiname.encoded
        }
      })
        // .then(res =>console.log(res['data']['result']))
        .then(res => {

          if (res['data']['status'] == '1') {
            // toggleTab(activeTab + 2);
            console.log("success");
            //redirect to success page


          } else {
            // toggleTab(activeTab + 1);
            console.log("failure");
            ///redirect to error page 

          }
        })
        .catch(err => console.log(err));
      // }, []);

    }
  });


  return (
    <React.Fragment>
      <div className="page-content">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation2.handleSubmit();
            return false;
          }}
          className="form-horizontal"

        >
          <ToastContainer />
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="Skote" breadcrumbItem="Profile" />

            <div className="d-flex gap-3">
              <div className="col-lg-6 p-0">
                <Card style={{ background: 'linear-gradient(to bottom, white 40%, #d1b66a 40%)' }}>
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
                            <h3 className="text-white">{name}</h3>
                            <h3 className="text-dark">GLCL0001</h3>
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
                        id="name"
                          name="name"
                          className="form-control normal-input"
                          type="text"
                          value={name}

                        />
                      </div>
                      <div className="mb-3">
                        <label>IC Number</label>
                        <Input
                          className="form-control normal-input"
                          type="text"
                          defaultValue={icNum}

                        />
                      </div>
                      <div className="mb-3">
                        <label>Date of Birth</label>
                        <Input
                          className="form-control normal-input"
                          type="text"
                          defaultValue={dob}


                        />
                      </div>
                      <div className="mb-3">
                        <label>Gender</label>
                        <Input
                          className="form-control normal-input"
                          type="text"
                          defaultValue={sex}

                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>

              </div>
              <div className="col-lg-6 p-0">

                <Card>
                  <CardBody>
                    <CardTitle>Change Password</CardTitle>
                    <div className="mb-3">
                      <label>Old Password</label>
                      <Input
                        name="oldPwd"
                        className="form-control normal-input"
                        type="password"


                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <label>New Password</label>
                      <Input
                        name="newPwd"
                        className="form-control normal-input"
                        type="password"


                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <label>Confirm Password</label>
                      <Input
                        name="confirmPwd"
                        className="form-control normal-input"
                        type="password"


                      />
                    </div>

                    <div className="text-center mt-3 mb-3">
                      <Button type="submit" onClick={handleChangePwd} color="primary">
                        Update Password
                      </Button>


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
                          className="form-control normal-input"
                          type="email"
                          defaultValue={email}

                        />
                      </div>
                      <div className="mb-3 mt-3">
                        <label>Phone Number</label>
                        <Input
                          className="form-control normal-input"
                          type="text"
                          defaultValue={phoneNum}

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
                          defaultValue={addr}


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

                onClick={() => {
                  // Validate the form
                  validation2.validateForm().then(errors => {
                    if (Object.keys(errors).length === 0) {
                      // If there are no validation errors, proceed to the next step
                      console.log("no required")
                    } else {


                      // If there are validation errors, display them
                      validation2.setTouched({
                        ...Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
                      });
                      console.log("need required")
                      // toggleTab(activeTab + 1);
                    }
                  });
                }}
                color="primary">
                Update data
              </Button>


            </div>
            {/* <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
           

          <Card>
          <h4 className="card-title mb-3">Change User Name</h4>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group col-md-6">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control normal-input"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />




                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>


                </div>
              </Form>
            </CardBody>
          </Card>
            </Col>
          </Row> */}


          </Container>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
