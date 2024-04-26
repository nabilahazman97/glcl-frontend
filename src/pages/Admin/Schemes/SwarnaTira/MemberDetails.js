import React, { useMemo, useState, useEffect, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Button,
    CardTitle,
    CardSubtitle,
    Label,
    Input,
    Container,
    FormFeedback,
    Form,
} from "reactstrap";
import { format } from 'date-fns';
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Switch from "react-switch";
import avatar from "../../../../assets/images/users/avatar-1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../../helpers/url_helper";
import { useParams } from 'react-router-dom';
import TableContainer from '../../../../components/Common/TableContainer';

import coins from "../../../../assets/images/schemes/single-coin.png";
import print from "../../../../assets/images/schemes/print-icon.png";
import dload from "../../../../assets/images/schemes/download-icon.png";

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
// import '../../../style.scss';

const FormValidations = () => {

    //meta title
    document.title = "GLCL";

    

    const { Uid } = useParams();
    console.log("Uid:", Uid);

    const user = {
        'id': Uid
    };


    const [data, setdata] = useState([]);
    useEffect(() => {
        console.log(apiname.base_url);
        console.log(apiname.p_userdetails);
        console.log(user);
        axios.post(apiname.base_url + apiname.p_userdetails, user, {
            headers: {
                'Authorization': 'Basic ' + apiname.encoded
            }
        })
            // .then(res =>console.log(res))
            .then(res => setdata(res['data']['result']))
            .catch(err => console.log(err));
    }, []);
    console.log("User Data");
    console.log(data[0]);

    const userSchemeid = {
        'scheme_id': '1',
        'user_id' : Uid
      };

    const [data2, setdata2] = useState([]);
    useEffect(() => {
        console.log(apiname.base_url);
        console.log(apiname.userScheme);
        console.log(user);
        axios.post(apiname.base_url + apiname.userScheme, userSchemeid, {
            headers: {
                'Authorization': 'Basic ' + apiname.encoded
            }
        })
            // .then(res =>console.log(res))
            .then(res => setdata2(res['data']['result']))
            .catch(err => console.log(err));
    }, []);
    console.log("User Scheme");
    console.log(data2);


    const [data3, setUserData3] = useState([]);
    const schemedata = Uid - 1;
    console.log(schemedata)
    const userScheme = {
        'scheme_id': '1',
      };
  useEffect(() => {
    // Fetch data from USER_LIST
    axios.get(apiname.base_url + apiname.USER_LIST, {
      headers: {
        'Authorization': 'Basic ' + apiname.encoded
      }
    })
    .then(res => {
      const userListData = res.data.result;
      // Fetch data from userScheme
      axios.post(apiname.base_url + apiname.userScheme, userScheme, {
        headers: {
          'Authorization': 'Basic ' + apiname.encoded
        }
      })
       .then(res => setUserData3(res['data']['result']))
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }, []);
  console.log("total gram: ");
  console.log(data3);
  

  const userSchemeidzz = {
    'scheme_id': '1',
    'user_id' : Uid
  };
    const [data4, setdata4] = useState([]);
    useEffect(() => {
        console.log(apiname.base_url);
        console.log(apiname.userScheme);
        console.log(user);
        axios.post(apiname.base_url + apiname.remainGold, userSchemeidzz, {
            headers: {
                'Authorization': 'Basic ' + apiname.encoded
            }
        })
            // .then(res =>console.log(res))
            .then(res => setdata4(res['data'].remaininggold))
            .catch(err => console.log(err));
    }, []);
    console.log("Data 4");
    console.log(data4);


    const columns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'createdAt',
                Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
            },
            {
                Header: 'Purpose',
                accessor: 'gweight',
                Cell: ({ row }) => (
                  <span style={{ color: row.original.type === 1 ? '#4fb946' : 'red' }}>
                    {row.original.type === 1 ? 'Buy - ' : 'Sell - '}
                    {row.values.gweight}
                    {row.original.type === 1 ? ' g' : ' g'}
                  </span>
                )
              },
              
            {
                Header: 'Amount (RM)',
                accessor: 'total'
            },

            {
                Header: 'Status',
                accessor: ''
            },
            
            // {
            //     Header: 'Actions',
            //     accessor: 'actions',
            //     Cell: ({ row }) => (
            //         <div className="d-flex flex-wrap gap-2 justify-content-center">
            //             <Link to={`/admin-swarna-tira/member-details/${row.original.id}`} style={{ textDecoration: 'none' }}>
            //                 <button
            //                     type="button"
            //                     className="btn btn-primary rejectBtn"
            //                 >
            //                     <i className="mdi mdi-eye-outline font-size-16 align-middle me-1"></i>{" "}
            //                     View
            //                 </button>
            //             </Link>
            //         </div>
            //     )
            // },
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
        if (!startDate || !endDate) return data2; // Return all data if start or end date is not selected

        return data2.filter(item => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= startDate && createdAtDate <= new Date(endDate.getTime() + 86400000); // Adding 1 day to the end date
        });
    }, [data2, startDate, endDate]);


    return data.map((datas) => {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title="Forms" breadcrumbItem="SVARNA TIRA SCHEME" />
                        <div className="d-flex gap-3">
                            <div className="col-lg-12 p-0">
                                <Card className="defCard" style={{ background: 'linear-gradient(to bottom, white 40%, #d1b66a 40%)' }}>
                                    <CardBody>
                                        <div>
                                            {/* <div className="d-flex justify-content-end align-items-start">
                                            <Switch
                                                uncheckedIcon={<Offsymbol />}
                                                checkedIcon={<OnSymbol />}
                                                className="me-1 mb-sm-8 mb-2"
                                                onColor="#14ff00"
                                                onChange={() => {
                                                    setswitch1(!switch1);
                                                }}
                                                checked={switch1}
                                            />
                                        </div> */}
                                            <div className="d-flex justify-content-center">
                                                <div className="text-center">
                                                    <img
                                                        src={avatar}
                                                        alt=""
                                                        className="avatar-md rounded-circle img-thumbnail"
                                                    />
                                                    <div className="mt-2">
                                                        <h3 className="text-white">{datas.Username}</h3>
                                                        <h3 className="text-dark">{datas.membership_id}</h3>
                                                    </div>
                                                    {/* <div className="d-flex justify-content-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            {switch1 ? (
                                                                <span className="activeIndicator"></span>
                                                            ) : (
                                                                <span className="deactiveIndicator"></span>
                                                            )}
                                                            <div className="std_font">{switch1 ? "Active" : "Deactivated"}</div>
                                                        </div>
                                                    </div> */}

                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="defCard" style={{ background: '#090F2F' }}>
                                    <CardBody>
                                        <div>
                                            <div className="d-flex justify-content-center gap-3">
                                            <div className="text-center align-content-center">
                                                <img
                                                    src={coins}
                                                    alt=""
                                                    className="avatar-md"
                                                />
                                            </div>
                                                <div className="text-center">
                                                    <div className="mt-2">
                                                        <h4 className="text-white">Gold Coin</h4>
                                                        <h4 className="text-gold">{data4} <span className="">g</span></h4>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <CardTitle className="text-white">Transaction History</CardTitle>
                                            <Card style={{ background: 'linear-gradient(136.91deg, #FBE39A 0%, #CAAF63 100%)' }}>
                                                <CardBody>
                                                    <div className="justify-content-between d-flex">
                                                        <div>
                                                            <h5 className="inter_bold">Buy - 1 gm</h5>
                                                            <h5 className="inter_regular">12-03-2024</h5>
                                                        </div>
                                                        <div>
                                                            <h5 className="inter_bold" style={{ color: '#ff0000' }}>298.00</h5>
                                                            <h5 className="inter_regular">Processing</h5>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card style={{ background: 'linear-gradient(136.91deg, #FBE39A 0%, #CAAF63 100%)' }}>
                                                <CardBody>
                                                    <div className="justify-content-between d-flex">
                                                        <div>
                                                            <h5 className="inter_bold">Saving - CIMB Acct</h5>
                                                            <h5 className="inter_regular">12-03-2024</h5>
                                                        </div>
                                                        <div>
                                                            <h5 className="inter_bold" style={{ color: '#3B5F38' }}>298.00</h5>
                                                            <h5 className="inter_regular" style={{ color: '#0B8A00' }}>Completed</h5>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card> */}

                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle>Transaction History</CardTitle>
                                        <div className="d-print-none mt-4">
                                            <div className="float-start ">
                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        className="form-control"
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
                                                                height:'100%',
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
                                            <div className="float-end ">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary downloadBtn me-2"
                                                >
                                                    <img
                                                    src={dload}
                                                    alt=""
                                                    className="avatar-md print_icon"
                                                />

                                                </button>
                                                <Link
                                                    to="#"
                                                    onClick={printInvoice}
                                                    className="btn btn-success downloadBtn"
                                                >
                                                    <img
                                                    src={print}
                                                    alt=""
                                                    className="avatar-md print_icon"
                                                />
                                                </Link>

                                            </div>
                                        </div>
                                        <TableContainer
                                            columns={columns}
                                            data={filteredData}
                                            // isGlobalFilter={true}
                                            isAddOptions={false}
                                            customPageSize={10}
                                            className="custom-header-css"
                                        />
                                    </CardBody>
                                </Card>

                            </div>

                        </div>
                        <div className="d-flex justify-content-center gap-3 mb-3">
                            <Link to="/admin-swarna-tira/index" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary backBtn">Back</button>
                            </Link>

                            {/* <button className="btn btn-primary saveBtn">Save</button>
                            <button className="btn btn-primary deleteBtn">Delete</button> */}
                        </div>

                    </Container>
                </div>
            </React.Fragment>
        )
    })

};

export default FormValidations;
