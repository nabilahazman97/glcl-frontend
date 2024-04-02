import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Label,
  Input,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";



const MemberApproval = () => {

  //meta title
  document.title = "GLCL"

  const [customchkPrimary, setcustomchkPrimary] = useState(true);
  const [customchkSuccess, setcustomchkSuccess] = useState(true);
  const [customchkInfo, setcustomchkInfo] = useState(true);
  const [customchkWarning, setcustomchkWarning] = useState(true);
  const [customchkDanger, setcustomchkDanger] = useState(true);
  const [customOutlinePrimary, setcustomOutlinePrimary] = useState(true);
  const [customOutlineSuccess, setcustomOutlineSuccess] = useState(true);
  const [customOutlineInfo, setcustomOutlineInfo] = useState(true);
  const [customOutlineWarning, setcustomOutlineWarning] = useState(true);
  const [customOutlineDanger, setcustomOutlineDanger] = useState(true);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Member Approval" />

          <Row>
            <Col>
              <Card>
                <CardBody className="m-3">
                  <CardTitle className="h4 mb-3">Registration Details</CardTitle>

                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="Artisanal kale"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="004503-01-0783"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="24"
                        disabled
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="Petaling Jaya, Selangor"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="013-7672262"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="012-3536373"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="email"
                        defaultValue="Artisan@gmail.com"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="Indian"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="Hindu"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="Male"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control login-input"
                        type="text"
                        defaultValue="Married"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="text"
                        defaultValue="Doctor"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="text"
                        defaultValue="Service"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12">
                      <input
                        className="form-control login_input login-input"
                        type="text"
                        defaultValue="Kuala Lumpur"
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <div className="col-md-12 text-center">
                       <button
                       style={{ marginRight:"5px" }}
                            type="button"
                            className="btn btn-success approveBtn mr-1"
                        >
                            <i className="bx bx-check-circle font-size-16 align-middle me-1"></i>{" "}
                            Approve
                        </button>

                        <button
                            type="button"
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
}

export default MemberApproval
