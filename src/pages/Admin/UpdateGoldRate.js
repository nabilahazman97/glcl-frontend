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
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../..//components/Common/TableContainer';
import axios from "axios";
import { useParams } from 'react-router-dom';
import * as apiname from "../../helpers/url_helper";
import { del, get, post, put } from "../../helpers/api_helper";
import classnames from "classnames";
import goldBar from "../../assets/images/users/gold_bars.png";
import Select from "react-select";

//  import './style';

function UpdateGoldRate() {

    const [data, setUserData] = useState([]);
    const [modal_transaction_summary, setmodal_transaction_summary] = useState(false);
    const [activeTab, setactiveTab] = useState("1");
    const [togModalApproved, setTogModalApproved] = useState(false);
    const [togModalRejected, setTogModalRejected] = useState(false);
    const [valueGoldRate, setValueGoldRate] = useState('');  
    const [currentgoldrate, setcurrentmarketrate] = useState('');  
    
    const [editing, setEditing] = useState(false);
    
    const handleChange = (event) => {
        setValueGoldRate(event.target.value);
    };

    // Function to handle span click and toggle editing state
    const handleSpanClick = () => {
        setEditing(true);
    };

    // Function to handle input blur and update editing state
    const handleInputBlur = () => {
        setEditing(false);
    };


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
                        // console.log("userSchemeData")
                        // console.log(userSchemeData)
                        // Merge data based on matching id and user_id values
                        const mergedData = mergeData(userListData, userSchemeData);
                        setUserData(mergedData);
                        // console.log("user")
                        // console.log(mergedData)
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
        // console.log(apiname.base_url);
        // console.log(apiname.userScheme);
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
    // console.log("Data 4");
    // console.log(data4);

    const mergeData = (userListData, userSchemeData) => {
        const mergedData = [];
        userListData.forEach(userList => {
            if (userSchemeData) {
                const matchingUserScheme = userSchemeData.find(userScheme => userList.id === userScheme.user_id);
                if (matchingUserScheme) {
                    mergedData.push({ ...userList, ...matchingUserScheme });
                }
            }

            // console.log(mergedData)
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

    // get current gold rate

    
    get(apiname.getcurrentgoldrate)
    .then((getres) => {
       
        if (getres.status == "201") {
            setValueGoldRate(getres.data.data.custom_rate_916)
            setcurrentmarketrate(getres.data.data.rate_916)
        }else{
            console.log("failed to get data");
            setValueGoldRate('')
            setcurrentmarketrate('')
        }

    })
    .catch((err) => console.log(err));


    function tog_approved() {

        let obj={
            "custom_rate_916":valueGoldRate,
            "custom_rate_999": 351.19
        };

        post(apiname.updategoldrate,obj)
        .then((res) => {
      
           
            if (res.status == "201") {
                setTogModalApproved(!togModalApproved);
                    setTimeout(() => {
                        setTogModalApproved(togModalApproved);
                        window.location.reload();
                    }, 8000);


               
            }else{
                setTogModalRejected(!togModalRejected);
                setTimeout(() => {
                    setTogModalRejected(togModalRejected);
                    window.location.reload();
                }, 8000);
            }
        })
        .catch((err) => console.log(err));


        // setTogModalApproved(!togModalApproved);
        // // setTogModal(false)
        // removeBodyCss();
        // function tog_varyingModal() {
        //     setVaryingModal(!varyingModal);
        // }

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
                <Breadcrumbs title="Tables" breadcrumbItem="Update Gold Rate" />
                 <div className="d-flex justify-content-end mb-3">
                          <div style={{ position: "relative" }}>

                           <span className="tecolor">Current Gold Rate:</span> RM {currentgoldrate}
                            {/* <DatePicker
                              className="form-control filterInput"
                              selected={startDate}
                              onChange={handleDateChange}
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                              placeholderText="Select Date Range"
                            /> */}
                          </div>
                        </div>
                <Card className="defCard p-3" style={{ minHeight: '180px', backgroundColor:'#090f2f', color:"white" }}>
                    <CardBody>
                        <div className="text-center std_font mb-4">Market Gold Rate:</div>
                        <h1 className="text-center inter_bold"><span> 916</span> /g</h1>

                    </CardBody>
                </Card>
                <Card className="defCard p-3" style={{ minHeight: '180px', backgroundColor:'#d4af37', color:"white" }}>
                    <CardBody>
                        <div className="text-center std_font mb-4">GLCL Gold Rate:</div>
                         <h1 className="text-center inter_bold">
            RM{' '}
            <span onClick={handleSpanClick}>
                {editing ? (
                    <input
                    className="normal-input"
                        type="text"
                        value={valueGoldRate}
                        onChange={handleChange}
                        onBlur={handleInputBlur}
                        autoFocus // Focus the input field when editing starts
                        style={{ maxWidth:"150px" }}
                    />
                ) : (
                    valueGoldRate || '__'
                )}
            </span>{' '}
            
        </h1>
                    </CardBody>
                </Card>
               
                <div className="text-center">
                <button
                    type="button"
                    className="stdBtn"
                    onClick={() => {
                        tog_transaction_summary();
                    }}
                    style={{ backgroundColor: "#1A2B88", color: 'white' }}
                >
                    Update
                </button>
                </div>
               

                {/* MODALS */}
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
                    <div className="modal-body">
                       
                                <div className="">
                                    <div className="text-center">
                                    </div>
                                  
                                    <div className="text-center mt-4 modal-reject-icon">
                                            <i className="mdi mdi-alert-outline font-size-16 align-middle me-1 mb-2"></i>{" "}

                                            <h5 className="modal-title mb-5" id="staticBackdropLabel">Are you sure you want to update gold rate for today to RM {valueGoldRate} /g ?</h5>

                                        </div>
                                </div>
                    
                        <Row className="mb-3">
                            <div className="col-md-12 text-center">
                                
                            <Button color="warning" className="modalCancelBtn me-2" outline
                            onClick={() => {
                                tog_transaction_summary(false);
                            }}

                        >Cancel</Button>{' '}
                               
                                <button
                                    style={{ marginLeft: "5px" }}
                                    type="button"

                                    className="btn btn-success modalConfirmBtn mr-1"
                                    onClick={() => {
                                        tog_approved();
                                    }}

                                >
                                    {/* <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "} */}
                                    Yes
                                </button>

                                {/* REJECT MODAL */}


                                {/* REJECT MODAL */}

                            </div>
                        </Row>

                    </div>
                </Modal>
                {/* PURCHASE TRANSACTION SUMMARY */}

            
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

                        <h5 className="modal-title" id="staticBackdropLabel">Update Successful!</h5>

                    </div>
                    <ModalBody className="text-center">

                        <p>The gold rate for today has been updated successfully to RM {valueGoldRate} /g.</p>
                    </ModalBody>
                    <div className="text-center mb-3">
                        <Button color="primary" className="modalConfirmBtn"
                            data-bs-target="#firstmodal"
                            onClick={() => {
                                tog_approved(false);
                                setmodal_transaction_summary(false);
                            }}

                        >
                            Ok
                        </Button>
                    </div>
                </Modal>
                {/* PURCHASE APPROVED */}

                 {/* PURCHASE REJECTED */}
        <Modal
          isOpen={togModalRejected}
          toggle={() => {
            tog_rejected();
          }}
          centered
        >
          <div className="text-center mt-4 modal-rejected-icon">
            <i className="mdi mdi-close-circle font-size-16 align-middle me-1 mb-2"></i>{" "}
            <h5 className="modal-title" id="staticBackdropLabel">
              Failed to update Gold coin Rate
            </h5>
          </div>
          <ModalBody className="text-center">
            <p>
              {/* The buyer will be notified regarding rejection and it's reason. */}
            </p>
          </ModalBody>
          <div className="text-center mb-3">
            
          </div>
        </Modal>
        {/* PURCHASE REJECTED */}

                {/* MODALS */}

            </div>
        </div>
    );
}
UpdateGoldRate.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default UpdateGoldRate;