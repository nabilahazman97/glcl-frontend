import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    Input,
    Label,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
} from "reactstrap";


// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";
import classnames from "classnames"
import mydebit from "../../assets/images/payments/debitCard.png";
import visaMaster from "../../assets/images/payments/visaMastercard.png";
import tng from "../../assets/images/payments/tng.png";
import fpx from "../../assets/images/payments/onlineBanking.png";


const Payment = () => {

    document.title = "GLCL";

    const [activeTab, setactiveTab] = useState(1)
    const [activeTabVartical, setoggleTabVertical] = useState(1)

    const [passedSteps, setPassedSteps] = useState([1])
    const [passedStepsVertical, setPassedStepsVertical] = useState([1])

    function toggleTab(tab) {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab]
            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab)
                setPassedSteps(modifiedSteps)
            }
        }
    }

    function toggleTabVertical(tab) {
        if (activeTabVartical !== tab) {
            var modifiedSteps = [...passedStepsVertical, tab]

            if (tab >= 1 && tab <= 4) {
                setoggleTabVertical(tab)
                setPassedStepsVertical(modifiedSteps)
            }
        }
    }

    return (
        <React.Fragment>
            <div>
                <Container fluid className="p-0">
                    <Row className="g-0">
                        <CarouselPage />

                        <Col xl={6}>
                            <div className="auth-full-page-content p-md-5 p-4">
                                <div className="w-100">
                                    <div className="d-flex flex-column h-100">
                                        <div className="my-auto">
                                            <div>
                                                <div className="d-flex text-center std_font">
                                                    <p className="">Already Registered? &nbsp; </p>
                                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                                        <p className='text-gold'>Sign In</p>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="m-5">

                                                <Form className="form-horizontal"
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        validation.handleSubmit();
                                                        return false;
                                                    }}
                                                >
                                                    <div className="text-center">
                                                        <p className="login_title mb-4">PAYMENT</p>
                                                    </div>
                                                    {/* <div className="mb-3 mt-5 d-flex justify-content-between col-12">

                                                        <div className="payment-opt col-3">
                                                            <div className="form-check form-radio-primary mb-3">
                                                                <input
                                                                    type="radio"
                                                                    id="customRadiocolor1"
                                                                    name="customRadiocolor1"
                                                                    className="form-check-input"
                                                                    defaultChecked
                                                                />

                                                                Radio Primary

                                                            </div>
                                                        </div>
                                                        <div className="payment-opt col-3">FPX</div>
                                                        <div className="payment-opt col-3">FPX</div>



                                                    </div> */}

                                                

                                                    <Col lg="12">
                                                        
                                                                <div className="wizard clearfix">
                                                                    {/* <div className="steps clearfix">
                                                                        <ul>
                                                                            <NavItem
                                                                                className={classnames({ current: activeTab === 1 })}
                                                                            >
                                                                                <NavLink
                                                                                    className={classnames({ current: activeTab === 1 })}
                                                                                    onClick={() => {
                                                                                        setactiveTab(1)
                                                                                    }}
                                                                                    disabled={!(passedSteps || []).includes(1)}
                                                                                >
                                                                                    <span className="number">1.</span> Seller Details
                                                                                </NavLink>
                                                                            </NavItem>
                                                                            <NavItem
                                                                                className={classnames({ current: activeTab === 2 })}
                                                                            >
                                                                                <NavLink
                                                                                    className={classnames({ active: activeTab === 2 })}
                                                                                    onClick={() => {
                                                                                        setactiveTab(2)
                                                                                    }}
                                                                                    disabled={!(passedSteps || []).includes(2)}
                                                                                >
                                                                                    <span className="number">2.</span> Company
                                                                                    Document
                                                                                </NavLink>
                                                                            </NavItem>
                                                                            <NavItem
                                                                                className={classnames({ current: activeTab === 3 })}
                                                                            >
                                                                                <NavLink
                                                                                    className={classnames({ active: activeTab === 3 })}
                                                                                    onClick={() => {
                                                                                        setactiveTab(3)
                                                                                    }}
                                                                                    disabled={!(passedSteps || []).includes(3)}
                                                                                >
                                                                                    <span className="number">3.</span> Bank Details
                                                                                </NavLink>
                                                                            </NavItem>
                                                                            <NavItem
                                                                                className={classnames({ current: activeTab === 4 })}
                                                                            >
                                                                                <NavLink
                                                                                    className={classnames({ active: activeTab === 4 })}
                                                                                    onClick={() => {
                                                                                        setactiveTab(4)
                                                                                    }}
                                                                                    disabled={!(passedSteps || []).includes(4)}
                                                                                >
                                                                                    <span className="number">4.</span> Confirm Detail
                                                                                </NavLink>
                                                                            </NavItem>
                                                                        </ul>
                                                                    </div> */}
                                                                    <div className="content clearfix">
                                                                        <TabContent activeTab={activeTab} className="body">
                                                                            <TabPane tabId={1}>
                                                                                <Form>
                                                                                <div className="mb-2">
                                                        {/* <Label>Payment method :</Label> */}

                                                        <Row>
                                                            <Col xl="4" sm="4">
                                                                <Label className="card-radio-label mb-3">
                                                                    <Input
                                                                        type="radio"
                                                                        name="pay-method"
                                                                        id="pay-methodoption1"
                                                                        className="card-radio-input"
                                                                    />

                                                                    <div className="card-radio p-2" style={{ height: '60px' }}>
                                                                        {/* <i className="fab fa-cc-mastercard font-size-24 text-primary align-middle me-2" />{" "} */}
                                                                        <div className="d-flex">
                                                                            <img
                                                                                style={{ width: '70px', height: '40px' }}
                                                                                src={mydebit}
                                                                                alt=""
                                                                                className="avatar-md"
                                                                            />
                                                                            <img
                                                                                style={{ width: '70px', height: '40px' }}
                                                                                src={visaMaster}
                                                                                alt=""
                                                                                className="avatar-md"
                                                                            />
                                                                        </div>


                                                                        {/* <span>Credit / Debit Card</span> */}
                                                                    </div>
                                                                </Label>
                                                            </Col>

                                                            <Col xl="4" sm="4">
                                                                <Label className="card-radio-label mb-3">
                                                                    <Input
                                                                        type="radio"
                                                                        name="pay-method"
                                                                        id="pay-methodoption3"
                                                                        className="card-radio-input"
                                                                        defaultChecked
                                                                        readOnly
                                                                    />

                                                                    <div className="card-radio text-center p-2" style={{ height: '60px' }}>
                                                                        {/* <i className="fab fa-cc-paypal font-size-24 text-primary align-middle me-2" />{" "}

                                                                        <span>Paypal</span> */}

                                                                        <img
                                                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                                                            src={tng}
                                                                            alt=""
                                                                            className="avatar-md"
                                                                        />

                                                                    </div>
                                                                </Label>
                                                            </Col>
                                                            <Col xl="4" sm="4">
                                                                <Label className="card-radio-label mb-3">
                                                                    <Input
                                                                        type="radio"
                                                                        name="pay-method"
                                                                        id="pay-methodoption3"
                                                                        className="card-radio-input"
                                                                        defaultChecked
                                                                        readOnly
                                                                    />

                                                                    <div className="card-radio text-center p-0" style={{ height: '60px' }}>
                                                                        {/* <i className="fab fa-cc-paypal font-size-24 text-primary align-middle me-2" />{" "}

                                                                        <span>Paypal</span> */}
                                                                        <img
                                                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                                                            src={fpx}
                                                                            alt=""
                                                                            className="avatar-md"
                                                                        />
                                                                    </div>
                                                                </Label>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                                                </Form>
                                                                            </TabPane>
                                                                            <TabPane tabId={2}>
                                                                                <div>
                                                                                    <Form>
                                                                                        <Row>
                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-pancard-input5">
                                                                                                        PAN Card
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-pancard-input5"
                                                                                                        placeholder="Enter Your PAN No."
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>

                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-vatno-input6">
                                                                                                        VAT/TIN No.
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-vatno-input6"
                                                                                                        placeholder="Enter Your VAT/TIN No."
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                        <Row>
                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-cstno-input7">
                                                                                                        CST No.
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-cstno-input7"
                                                                                                        placeholder="Enter Your CST No."
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>

                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-servicetax-input8">
                                                                                                        Service Tax No.
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-servicetax-input8"
                                                                                                        placeholder="Enter Your Service Tax No."
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                        <Row>
                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-companyuin-input9">
                                                                                                        Company UIN
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-companyuin-input9"
                                                                                                        placeholder="Enter Your Company UIN"
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>

                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-declaration-input10">
                                                                                                        Declaration
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-Declaration-input10"
                                                                                                        placeholder="Declaration Details"
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Form>
                                                                                </div>
                                                                            </TabPane>
                                                                            <TabPane tabId={3}>
                                                                                <div>
                                                                                    <Form>
                                                                                        <Row>
                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-namecard-input11">
                                                                                                        Name on Card
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-namecard-input11"
                                                                                                        placeholder="Enter Your Name on Card"
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>

                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label>Credit Card Type</Label>
                                                                                                    <select className="form-select">
                                                                                                        <option defaultValue>
                                                                                                            Select Card Type
                                                                                                        </option>
                                                                                                        <option value="AE">
                                                                                                            American Express
                                                                                                        </option>
                                                                                                        <option value="VI">Visa</option>
                                                                                                        <option value="MC">MasterCard</option>
                                                                                                        <option value="DI">Discover</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                        <Row>
                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-cardno-input12">
                                                                                                        Credit Card Number
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-cardno-input12"
                                                                                                        placeholder="Credit Card Number"
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>

                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-card-verification-input0">
                                                                                                        Card Verification Number
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-card-verification-input0"
                                                                                                        placeholder="Credit Verification Number"
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                        <Row>
                                                                                            <Col lg="6">
                                                                                                <div className="mb-3">
                                                                                                    <Label for="basicpill-expiration-input13">
                                                                                                        Expiration Date
                                                                                                    </Label>
                                                                                                    <Input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basicpill-expiration-input13"
                                                                                                        placeholder="Card Expiration Date"
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Form>
                                                                                </div>
                                                                            </TabPane>
                                                                            <TabPane tabId={4}>
                                                                                <div className="row justify-content-center">
                                                                                    <Col lg="6">
                                                                                        <div className="text-center">
                                                                                            <div className="mb-4">
                                                                                                <i className="mdi mdi-check-circle-outline text-success display-4" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <h5>Confirm Detail</h5>
                                                                                                <p className="text-muted">
                                                                                                    If several languages coalesce, the grammar
                                                                                                    of the resulting
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Col>
                                                                                </div>
                                                                            </TabPane>
                                                                        </TabContent>
                                                                    </div>
                                                                    <div className="actions clearfix">
                                                                        <ul>
                                                                            <li
                                                                                className={
                                                                                    activeTab === 1 ? "previous disabled" : "previous"
                                                                                }
                                                                            >
                                                                                <Link
                                                                                    to="#"
                                                                                    onClick={() => {
                                                                                        toggleTab(activeTab - 1)
                                                                                    }}
                                                                                >
                                                                                    Previous
                                                                                </Link>
                                                                            </li>
                                                                            <li
                                                                                className={activeTab === 4 ? "next disabled" : "next"}
                                                                            >
                                                                                <Link
                                                                                    to="#"
                                                                                    onClick={() => {
                                                                                        toggleTab(activeTab + 1)
                                                                                    }}
                                                                                >
                                                                                    Next
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                           
                                                    </Col>

                                                    <Link to="/register-file-upload" style={{ textDecoration: 'none' }}>
                                                        <div className="mt-5 d-grid">
                                                            <button
                                                                className="btn btn-primary btn-block signIn_btn text_1"
                                                                type="submit"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Payment;
