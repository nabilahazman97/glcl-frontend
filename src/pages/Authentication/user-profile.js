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

const UserProfile = () => {

  //meta title
  document.title = "GLCL";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {
    console.log("profiledetails");
    console.log(localStorage.getItem("authUser"));
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
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


  return (
    <React.Fragment>
      <div className="page-content">
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
                          <h3 className="text-white">Admin</h3>
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
                        className="form-control normal-input"
                        type="text"
                         

                      />
                    </div>
                    <div className="mb-3">
                      <label>IC Number</label>
                      <Input
                        className="form-control normal-input"
                        type="text"
                         

                      />
                    </div>
                    <div className="mb-3">
                      <label>Date of Birth</label>
                      <Input
                        className="form-control normal-input"
                        type="text"
                         


                      />
                    </div>
                    <div className="mb-3">
                      <label>Gender</label>
                      <Input
                        className="form-control normal-input"
                        type="text"
                         

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
                    className="form-control normal-input"
                    type="password"


                  />
                </div>
                <div className="mb-3 mt-3">
                  <label>New Password</label>
                  <Input
                    className="form-control normal-input"
                    type="password"


                  />
                </div>
                <div className="mb-3 mt-3">
                  <label>Confirm Password</label>
                  <Input
                    className="form-control normal-input"
                    type="password"


                  />
                </div>

                 <div className="text-center mt-3 mb-3">
                  <Button type="submit" color="primary">
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
                         

                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <label>Phone Number</label>
                      <Input
                        className="form-control normal-input"
                        type="text"
                         

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
                        placeholder="Home Address"
                         

                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="text-center mt-3 mb-3">
                  <Button type="submit" color="primary">
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
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
