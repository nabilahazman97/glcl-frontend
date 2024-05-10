// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Modal,
    Row,
    Col,
    Card,
    Nav,
    CardBody,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    ModalBody,
    CardTitle,
    Input,
    Button,
} from "reactstrap";
import { format } from 'date-fns';
//import components
import Breadcrumbs from '../../../../components/Common/Breadcrumb';
import TableContainer from '../../../../components/Common/TableContainer';
import axios from "axios";
import { useParams } from 'react-router-dom';
import * as apiname from "../../../../helpers/url_helper";
import { del, get, post, put } from "../../../../helpers/api_helper";
import classnames from "classnames";
import goldBar from "../../../../assets/images/users/gold_bars.png";
import Select from "react-select";

//  import './style';

function LoanApplication() {

    const [data, setUserData] = useState([]);
    const [modal_transaction_summary, setmodal_transaction_summary] = useState(false);
    const [activeTab, setactiveTab] = useState("1");
    const [togModalAssignGold, setTogModalAssignGold] = useState(false);
    const [togModalReasonReject, setTogModalReasonReject] = useState(false);
    const [togModalApproved, setTogModalApproved] = useState(false);
    const [togModalRejected, setTogModalRejected] = useState(false);


    const toggle = tab => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    useEffect(() => {
        const userScheme = {
            'scheme_id': '1'
        };
        // Fetch data from USER_LIST
        // axios.get(apiname.base_url + apiname.USER_LIST, {
        //   headers: {
        //     'Authorization': 'Basic ' + apiname.encoded
        //   }
        // })
        get(apiname.USER_LIST)
            .then(res => {
                const userListData = res.result;
                // Fetch data from userScheme
                // axios.post(apiname.base_url + apiname.userScheme, userScheme, {
                //   headers: {
                //     'Authorization': 'Basic ' + apiname.encoded
                //   }
                // })
                post(apiname.userScheme, userScheme)
                    .then(res => {
                        const userSchemeData = res.result;
                        console.log("userSchemeData")
                        console.log(userSchemeData)
                        // Merge data based on matching id and user_id values
                        const mergedData = mergeData(userListData, userSchemeData);
                        setUserData(mergedData);
                        console.log("user")
                        console.log(mergedData)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, []);

    // const userScheme = {
    //   'scheme_id': '1'
    // };

    const Uid = 1;
    console.log("Uid:", Uid);

    const user = {
        'id': Uid
    };


    const userSchemeid = {
        'scheme_id': '1',
        'user_id': Uid
    };

    const [data4, setdata4] = useState([]);
    useEffect(() => {
        console.log(apiname.base_url);
        console.log(apiname.userScheme);
        // console.log(user);
        post(apiname.remainGold, userSchemeid)
            .then(res => setdata4(res))
            .catch(err => console.log(err));
        // axios.post(apiname.base_url + apiname.remainGold, userSchemeid, {
        //     headers: {
        //         'Authorization': 'Basic ' + apiname.encoded
        //     }
        // })
        //     // .then(res =>console.log(res))
        //     .then(res => setdata4(res['data']))
        //     .catch(err => console.log(err));
    }, []);
    console.log("Data 4");
    console.log(data4);

    const mergeData = (userListData, userSchemeData) => {
        const mergedData = [];
        userListData.forEach(userList => {
            if (userSchemeData) {
                const matchingUserScheme = userSchemeData.find(userScheme => userList.id === userScheme.user_id);
                if (matchingUserScheme) {
                    mergedData.push({ ...userList, ...matchingUserScheme });
                }
            }

            console.log(mergedData)
        });
        return mergedData;

    };


    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'username',
            },
            {
                Header: 'NRIC No.',
                accessor: 'icnumber',
            },
            {
                Header: 'Email Address',
                accessor: 'email_id'
            },

            {
                Header: 'Gold Coin',
                accessor: 'remaininggold',
                Cell: ({ value }) => (
                    <span>{value} g</span>
                )
            },
            //   {
            //     Header: 'Date',
            //     accessor: 'createdAt',
            //     Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
            // },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <Link to={`/admin-swarna-tira/member-details/${row.original.id}`} style={{ textDecoration: 'none' }}>
                            <button
                                type="button"
                                className="btn btn-primary viewBtn"
                            >
                                {/* <i className="mdi mdi-eye-outline font-size-16 align-middle me-1"></i>{" "} */}
                                View
                            </button>
                        </Link>

                        {/* <button
                            type="button"
                            className="btn btn-danger rejectBtn"
                        >
                            <i className="bx bx-trash font-size-16 align-middle me-1"></i>{" "}
                            Remove
                        </button> */}
                    </div>
                )
            },
        ],
        []
    );

    const printInvoice = () => {
        window.print();
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-GB'); // Format the date as dd/mm/yyyy
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = () => {
        setIsOpen(false);
    };


    const filteredData = useMemo(() => {
        if (!startDate || !endDate) return data; // Return all data if start or end date is not selected

        return data.filter(item => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= startDate && createdAtDate <= new Date(endDate.getTime() + 86400000); // Adding 1 day to the end date
        });
    }, [data, startDate, endDate]);

    function tog_transaction_summary() {
        setmodal_transaction_summary(!modal_transaction_summary);
        removeBodyCss();
    }



    function tog_assign_gold() {
        setTogModalAssignGold(!togModalAssignGold);
        // setTogModal1(false)
        removeBodyCss();
    }

    function tog_reason_reject() {
        setTogModalReasonReject(!togModalReasonReject);
        // setTogModal1ReasonReject(false)
        removeBodyCss();
    }

    function tog_approved() {
        setTogModalApproved(!togModalApproved);
        // setTogModal(false)
        removeBodyCss();
        function tog_varyingModal() {
            setVaryingModal(!varyingModal);
        }

    }
    function tog_rejected() {
        setTogModalRejected(!togModalRejected);
        // setTogModal(false)
        removeBodyCss();
        function tog_varyingModal() {
            setVaryingModal(!varyingModal);
        }

    }
    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    // const data = [
    //     {
    //         "name": "Tony Lee",
    //         "icNum": "873939-01-0389",
    //         "memberid": "2",
    //         "email": "tony@gmail.com",
    //     },
    //     {
    //         "name": "Sarah J",
    //         "icNum": "83939-01-0378",
    //         "memberid": "1",
    //         "email": "sarah@gmail.com",
    //     },



    // ];

    //meta title
    document.title = "GLCL";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="Tables" breadcrumbItem="SVARNA TIRA SCHEME" />

                <Card className="defCard" style={{ minHeight: '250px' }}>
                    <CardBody>
                        <CardTitle className="cardTitle">Gold Purchase</CardTitle>
                        <div>
                        </div>
                        <div className="d-print-none mt-4 d-flex justify-content-between">
                            <div className="filterDate">
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className="form-control filterInput"
                                        type="text"
                                        placeholder="Filter by date range"
                                        value={
                                            (startDate && endDate) ?
                                                `${formatDate(startDate)} - ${formatDate(endDate)}` :
                                                ''
                                        }
                                        onClick={toggleDropdown}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                    />

                                    {isOpen && (
                                        <div
                                            ref={dropdownRef}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                height: '100%',
                                                left: 0,
                                                zIndex: 999,
                                                backgroundColor: '#fff',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            <DatePicker
                                                selectsRange
                                                startDate={startDate}
                                                endDate={endDate}
                                                onChange={handleDateChange}
                                                inline
                                            />
                                            {/* <div className="text-center mb-2">
                                                                <button className="btn btn-primary" onClick={handleSelect}>Select Date</button>
                                                            </div> */}

                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="">
                                <button
                                    type="button"
                                    className="btn btn-primary exportBtn  "
                                >
                                    <i className="mdi mdi-upload  "></i>{" "}
                                    EXPORT
                                </button>
                                {/* <button
                                                    type="button"
                                                    className="btn btn-primary downloadBtn me-2"
                                                >
                                                    <img
                                                    src={dload}
                                                    alt=""
                                                    className="avatar-md print_icon"
                                                />

                                                </button> */}
                                {/* <Link
                                                    to="#"
                                                    onClick={printInvoice}
                                                    className="btn btn-success downloadBtn"
                                                >
                                                    <img
                                                    src={print}
                                                    alt=""
                                                    className="avatar-md print_icon"
                                                />
                                                </Link> */}

                            </div>
                        </div>



                    </CardBody>
                    <div className="p-3">
                        <Nav tabs>
                            <NavItem className="me-3" >
                                <NavLink
                                    className={classnames("ms-3 Nav-link", {
                                        active: activeTab === "1",
                                        inactive: activeTab !== "1", // Add a class for inactive tabs
                                    })}
                                    onClick={() => {
                                        toggle("1");
                                    }}
                                >
                                    Pending Loan Approval
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames("Nav-link", {
                                        active: activeTab === "2",
                                        inactive: activeTab !== "2", // Add a class for inactive tabs
                                    })}
                                    onClick={() => {
                                        toggle("2");
                                    }}
                                >
                                    Approved Loan Members
                                </NavLink>
                            </NavItem>
                        </Nav>


                        <TabContent activeTab={activeTab} className="p-3 text-muted">
                            <TabPane tabId="1">
                            <button
                                type="button"
                                className="btn btn-primary "
                                onClick={() => {
                                    tog_transaction_summary();
                                }}
                            >
                               PURCHASE
                            </button>
                                <Row>
                                    <Col sm="12">
                                        <TableContainer
                                            columns={columns}
                                            data={filteredData}
                                            // isGlobalFilter={true}
                                            isAddOptions={false}
                                            customPageSize={10}
                                            className="custom-header-css"
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <TableContainer
                                        columns={columns}
                                        data={filteredData}
                                        // isGlobalFilter={true}
                                        isAddOptions={false}
                                        customPageSize={10}
                                        className="custom-header-css"
                                    />
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>


                </Card>

                {/* MODALS */}

                {/* PURCHASE */}

                {/* PURCHASE TRANSACTION SUMMARY */}
                <Modal

                    className="modal-dialog modal-lg"
                    isOpen={modal_transaction_summary}
                    toggle={() => {
                        // tog_center();
                        tog_transaction_summary();
                    }}
                    centered
                >
                    <div className="modal-header" style={{ backgroundColor: '#f5eded' }}>
                        <h5 className="modal-title mt-0 cardTitle">Transaction Summary</h5>
                        <button
                            type="button"
                            onClick={() => {
                                setmodal_transaction_summary(false);
                            }}
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: '#f5eded' }}>
                        <Card className="defCard" style={{ background: '#090F2F' }}>
                            <CardBody>
                                <div className="card-line p-3">
                                    <div className="text-center">
                                        <CardTitle className="text-gold">Payment Summary</CardTitle>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3 mt-3">
                                        <div className="text-center align-content-center">
                                            <img
                                                src={goldBar}
                                                alt=""
                                                className="avatar-md"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="mt-2">
                                                <h4 className="text-white">Gold Weight</h4>
                                                <h4 className="text-gold"> 5<span className="">g</span></h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-3" style={{ borderBottom: "2px solid #D4AF37" }}>
                                        <div>
                                            <div className="text-gold">Gold Price</div>
                                            <div className="text-gold">Weight</div>
                                            <div className="text-gold">Subtotal</div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="text-gold"> RM 298.00  </div>
                                            <div className="text-gold">2 g</div>
                                            <div className="text-gold">RM 596.00</div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <div>
                                            <div className="text-gold">Grand Total</div>
                                            <div className="text-gold">Payment Status</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-gold">RM 596.00</div>
                                            <div className="" style={{ color: "#28be1b" }}>Successful</div>
                                        </div>
                                    </div>

                                </div>
                            </CardBody>
                        </Card>

                        <Row className="mb-3">
                            <div className="col-md-12 text-center">
                                <button
                                    style={{ marginRight: "5px" }}
                                    type="button"

                                    className="btn btn-success approveBtn statusApproved mr-1"
                                    onClick={() => {
                                        tog_assign_gold();
                                    }}

                                >
                                    {/* <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "} */}
                                    Approve
                                </button>
                                <button
                                    type="button"

                                    className="btn btn-danger rejectBtn statusRejected ml-2"
                                    onClick={() => {
                                        tog_reason_reject();
                                    }}

                                >
                                    {/* <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "} */}
                                    Reject
                                </button>
                              

                                {/* REJECT MODAL */}
                               

                                {/* REJECT MODAL */}

                            </div>
                        </Row>

                    </div>
                </Modal>
                {/* PURCHASE TRANSACTION SUMMARY */}

                {/* ASSIGN GOLD COIN */}
                <Modal
                                    isOpen={togModalAssignGold}
                                    toggle={() => {
                                        // tog_toggleModal();
                                        tog_assign_gold();
                                    }}
                                    centered
                                >  <ModalBody>
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="modal-title" id="staticBackdropLabel">Assign Gold Coin</h5>
                                        </div>

                                        <label>Serial Number</label>
                                        <Select
                                            name="ethnicity"
                                            // placeholder={"Ethnicity"}


                                            className="select2-selection text_1"
                                        />
                                    </ModalBody>

                                    <div className="text-center mb-3 mt-3">
                                        <Button color="warning" className="modalCancelBtn me-2" outline
                                            onClick={() => {
                                                tog_assign_gold();
                                            }}

                                        >Cancel</Button>{' '}
                                        <Button color="primary" className="modalConfirmBtn"
                                            onClick={() => {
                                                tog_approved();
                                            }}

                                        >
                                            Submit
                                        </Button>

                                    </div>

                </Modal>                
                {/* ASSIGN GOLD COIN */}

                {/* PURCHASE APPROVED */}
                <Modal
                    isOpen={togModalApproved}
                    toggle={() => {

                        tog_approved()
                    }}
                    centered
                >
                    <div className="text-center mt-4 modal-approved-icon">
                        <i className="bx bxs-check-circle font-size-16 align-middle me-1 mb-2"></i>{" "}

                        <h5 className="modal-title" id="staticBackdropLabel">Gold Coin Purchase Approved</h5>

                    </div>
                    <ModalBody className="text-center">

                        <p>The buyer will be notified regarding approval.</p>
                    </ModalBody>
                    <div className="text-center mb-3">
                        <Button color="primary" className="modalConfirmBtn"
                            data-bs-target="#firstmodal"
                            onClick={() => {
                                tog_approved(false);
                                tog_assign_gold(false);
                                setmodal_transaction_summary(false);
                            }}

                        >
                            Ok
                        </Button>
                    </div>
                </Modal>
                {/* PURCHASE APPROVED */}

                {/* REASON REJECT */}
                <Modal
                                    isOpen={togModalReasonReject}
                                    toggle={() => {

                                        tog_reason_reject();
                                    }}
                                    centered
                                >  <ModalBody>
                                        <div className="text-center mt-4 modal-reject-icon">
                                            <i className="mdi mdi-alert-outline font-size-16 align-middle me-1 mb-2"></i>{" "}

                                            <h5 className="modal-title" id="staticBackdropLabel">Are you sure you want to reject this purchase? Please state the reason.</h5>

                                        </div>

                                        <Input
                                            type="textarea"
                                            name=""
                                            id="textarea"
                                            className="login-textarea mt-3"
                                            // onChange={e => {
                                            //   textareachange(e);
                                            // }}
                                            maxLength="50"
                                            rows="4"
                                        // placeholder="Home Address"

                                        />
                                    </ModalBody>

                                    <div className="text-center mb-3 mt-3">
                                        <Button color="warning" className="modalCancelBtn me-2" outline
                                            onClick={() => {
                                                tog_reason_reject(false);
                                            }}

                                        >Cancel</Button>{' '}
                                        <Button color="primary" className="modalConfirmBtn"
                                            onClick={() => {
                                                tog_rejected();
                                            }}

                                        >
                                            Yes
                                        </Button>

                                    </div>

                </Modal>
                {/* REASON REJECT */}

                {/* PURCHASE REJECTED */}
                <Modal
                    isOpen={togModalRejected}
                    toggle={() => {

                        tog_rejected()
                    }}
                    centered
                >
                    <div className="text-center mt-4 modal-rejected-icon">
                        <i className="mdi mdi-close-circle font-size-16 align-middle me-1 mb-2"></i>{" "}

                        <h5 className="modal-title" id="staticBackdropLabel">Gold Coin Purchase Rejected</h5>

                    </div>
                    <ModalBody className="text-center">

                        <p>The buyer will be notified regarding rejection and it's reason.</p>
                    </ModalBody>
                    <div className="text-center mb-3">
                        <Button color="primary" className="modalConfirmBtn"
                            data-bs-target="#firstmodal"
                            onClick={() => {
                                tog_reason_reject(false);
                                tog_rejected(false);
                                setmodal_transaction_summary(false);
                            }}

                        >
                            Ok
                        </Button>
                    </div>
                </Modal>
                {/* PURCHASE REJECTED */}

                {/* PURCHASE */}

                {/* SELLING */}
                {/* SELLING */}

                {/* MODALS */}

            </div>
        </div>
    );
}
LoanApplication.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default LoanApplication;