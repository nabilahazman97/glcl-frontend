// src/components/filter.
import React, { useMemo, useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { del, get, post, put } from "../../../helpers/api_helper";

// import './datatables.scss';
import '../style.scss';

function NewMemberVerification() {

    const [data, setdata] = useState([]);

    useEffect(() => {
        get(apiname.USER_LIST, {
        })
        .then(res => setdata(res.result))
        .catch(err => console.log(err));
    }, []);
    
    // useEffect(() => {
    //     // console.log("hi");
    //     get()
    //     const data = () => get(apiname.USER_LIST);
    //     axios.get(apiname.base_url + apiname.USER_LIST, {
    //         headers: {
    //             'Authorization': 'Basic ' + apiname.encoded
    //         }
    //     })
    //         // .then(res =>console.log(res))
    //         .then(res => setdata(res['data']['result']))
    //         .catch(err => console.log(err));
    // }, []);


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



    const columns = useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email_id'
            },
            {
                Header: 'Status',
                accessor: 'ustatus',
                Cell: ({ row }) => (
                    <span className="d-flex justify-content-center">
                        {row.original.ustatus == 0 || row.original.ustatus === null ? (
                            <span>
                                <button
                                    type="button"
                                    className="btn btn-warning statusBtn statusPending"
                                >
                                    <i className="mdi mdi-alert-circle font-size-16 align-middle me-1"></i>{" "}
                                    Pending&nbsp;&nbsp;&nbsp;
                                </button>
                            </span>
                        ) : row.original.ustatus == 1 ? (
                            <span >
                                <button
                                    type="button"
                                    className="btn btn-success statusBtn statusApproved"
                                >
                                    <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "}
                                    Approved
                                </button>
                            </span>
                        ) : row.original.ustatus == 2 ? (
                            <span>
                                <button
                                    type="button"
                                    className="btn btn-danger statusBtn statusRejected"
                                >
                                    <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "}
                                    Rejected
                                </button>
                            </span>
                        ) : null}
                    </span>
                )
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({ row }) => (

                    <div className="d-flex flex-wrap gap-2 justify-content-center">

                        {/* <button
                            type="button"
                            className="btn btn-success approveBtn"
                        >
                            <i className="bx bx-check-circle font-size-16 align-middle me-1"></i>{" "}
                            Approve
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger rejectBtn"
                        >
                            <i className="bx bx-x-circle font-size-16 align-middle me-1"></i>{" "}
                            Reject
                        </button> */}
                        <Link to={`/member-approval/${row.original.id}`} style={{ textDecoration: 'none' }}>
                            <button
                                type="button"
                                className="btn btn-primary viewBtn"
                            >
                                {/* <i className="mdi mdi-eye-outline font-size-16 align-middle me-1"></i>{" "} */}
                                View
                            </button>
                        </Link>

                    </div>
                )
            },
        ],
        []
    );

    // const data = [
    //     {
    //         "username": "Jennifer Chang",
    //         "emailid": "jenn@gmail.com",
    //         "age": 28,
    //         "phonenum": "019-1252546",
    //     },
    //     {
    //         "username": "Adam Harez",
    //         "emailid": "adamh@gmail.com",
    //         "age": 38,
    //         "phonenum": "012-1254646",
    //     },


    // ];

    //meta title
    document.title = "GLCL";

    return (
        <div className="page-content picBg">
            <Breadcrumbs title="Tables" breadcrumbItem="NEW MEMBER VERIFICATION" />
            <Card className="defCard">
                <CardBody>
                    <CardTitle className="mb-3 cardTitle">List of New Members</CardTitle>
                    <div className="container-fluid">

                    <div className="d-print-none mt-4">
                                            <div className="float-start ">
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

                        {/* <Table columns={columns} data={data} /> */}
                        <TableContainer
                            columns={columns}
                            data={filteredData} //data
                            // isGlobalFilter={true}
                            isAddOptions={false}
                            customPageSize={10}
                        />
                    </div>
                </CardBody>
            </Card>

        </div>
    );
}
NewMemberVerification.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default NewMemberVerification;