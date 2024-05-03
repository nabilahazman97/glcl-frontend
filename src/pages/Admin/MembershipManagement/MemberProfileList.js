// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { del, get, post, put } from "../../../helpers/api_helper";

// import './datatables.scss';

function MemberProfileList() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        // console.log("hi");
        // axios.get(apiname.base_url + apiname.USER_LIST, {
        //     headers: {
        //         'Authorization': 'Basic ' + apiname.encoded
        //     }
        // })
        get(apiname.USER_LIST)
            // .then(res =>console.log(res))
            .then(res => {
                const filteredData = res.result.filter(item => item.ustatus == 1);
                setdata(filteredData);
            })
            .catch(err => console.log(err));
    }, []);


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
                Header: 'Name',
                accessor: 'username',
            },
            {
                Header: 'NRIC No.',
                accessor: 'icnumber',
            },
            {
                Header: 'Membership ID',
                accessor: 'membership_id',
            },
            {
                Header: 'Email',
                accessor: 'email_id'
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <Link to={`/member-profile/${row.original.id}`} style={{ textDecoration: 'none' }}>
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
        <div className="page-content picBg">
            <div className="container-fluid">
                <Breadcrumbs title="Tables" breadcrumbItem="MEMBER PROFILE" />
                <Card className="defCard">
                    <CardBody>
                        <CardTitle className="mb-3 cardTitle">List of Members</CardTitle>
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
                                data={filteredData}
                                // isGlobalFilter={true}
                                isAddOptions={false}
                                customPageSize={10}
                                className="custom-header-css"
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
MemberProfileList.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default MemberProfileList;