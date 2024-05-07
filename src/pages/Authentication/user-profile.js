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
import { del, get, post, put } from "../../helpers/api_helper";

const UserProfile = () => {
  document.title = "GLCL";
  // const [fres, setdata] = useState([]);
  const [fres, setdata] = useState({});
  useEffect(() => {
    var authUserData = localStorage.getItem("authUser");
    var authUserObject = JSON.parse(authUserData);

    setdata(authUserObject.data.result)
    console.log(authUserObject.data.result.id);
    var id=authUserObject.data.result.id;
    
    const user = {
        'id': id
    };

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
  },{});

  const textHandler = e => {
    const { name, value } = e.target;
    setValues({
      ...values1,
      [name]: value,
    });
  };
  const initialValues =fres || {};
  const [values1, setValues] = useState(initialValues);

  function handleSubmit(e) { 
    e.preventDefault(); 
    console.log("values1");
    console.log(values1);

        var authUserData = localStorage.getItem("authUser");
        var authUserObject = JSON.parse(authUserData);
        console.log(authUserObject);
        var id=authUserObject.data.result.id;

        const formData = new FormData();

        if(values1.username!=undefined){
        formData.append('username', values1.username);
        }
        if(values1.icnumber!=undefined){
        formData.append('icnumber', values1.icnumber);
        }
        if(values1.emailid!=undefined){
          formData.append('email_id', values1.email_id);
          }
        if(values1.phonenum!=undefined){
            formData.append('phonenum', values1.phonenum);
            }
        if(values1.haddress!=undefined){
              formData.append('haddress', values1.haddress);
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
        })
        .catch(err => toast.error('Nothing changed!'));
      
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
  const oldPwdInput = document.getElementsByName('oldPwd')[0];
  const newPwdInput = document.getElementsByName('newPwd')[0];
  const confirmPwdInput = document.getElementsByName('confirmPwd')[0];
  var authUserData = localStorage.getItem("authUser");
  var authUserObject = JSON.parse(authUserData);
  var id=authUserObject.data.result.id;
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
    newPwdInput.value = '';
    confirmPwdInput.value = '';
    // window.location.reload();
   

  })
  .catch(error => {
    console.error('Error occurred:', error);
    toast.warning('Failed to change password');
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
            <Breadcrumb title="glcl" breadcrumbItem="Profile" />

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
                            <h3 className="text-white">{fres.username}</h3>
                          </div>

                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="defCard">
                  <CardBody>
                    <CardTitle>Profile Information</CardTitle>
                    <div>
                      <div className="mb-3 mt-3">
                        <label>Name</label>
                        <Input
                        id="username"
                          name="username"
                          className="form-control normal-input"
                          type="text"
                          onChange={textHandler}
                          defaultValue={fres.username}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label>IC Number</label>
                        <Input
                          id="icnumber"
                          name="icnumber"
                          className="form-control normal-input"
                          type="text"
                          onChange={textHandler}
                          defaultValue={fres.icnumber}
                          required
                          maxlength='12'    
                        />
                      </div>

                    </div>
                  </CardBody>
                </Card>

              </div>
              <div className="col-lg-6 p-0">

                <Card className="defCard">
                  <CardBody>
                    <CardTitle>Change Password</CardTitle>
                    <div className="mb-3" style={{ display: 'none' }}>
                      <label>Old Password</label>
                      <Input
                        name="oldPwd"
                        className="form-control normal-input"
                        type="password"
                        value={fres.password}
                        readOnly
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
                      <Button type="submit" onClick={handleChangePwd}  color="primary">
                        Update Password
                      </Button>


                    </div>
                  </CardBody>
                </Card>

                <Card className="defCard">
                  <CardBody>
                    <CardTitle>Contact Information</CardTitle>
                    <div>
                      <div className="mb-3 mt-3">
                        <label>Email Address</label>
                        <Input
                          className="form-control normal-input"
                          type="email"
                          name="email_id"
                          id="email_id"
                          onChange={textHandler}
                          defaultValue={fres.email_id}
                          required
                        />
                      </div>
                      <div className="mb-3 mt-3">
                        <label>Phone Number</label>
                        <Input
                         name="phonenum"
                         id="phonenum"
                          className="form-control normal-input"
                          type="text"
                          onChange={textHandler}
                          defaultValue={fres.phonenum}
                            required
                            maxlength="10" 
                        />
                      </div>
                      <div className="mb-3 mt-3">
                        <label>Address</label>
                        <Input
                          type="textarea"
                          name="haddress"
                          id="haddress"
                          className="login-textarea mt-3"
                          maxLength="50"
                          rows="4"
                          onChange={textHandler}
                          defaultValue={fres.haddress}
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
                color="primary">
                Update data
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
