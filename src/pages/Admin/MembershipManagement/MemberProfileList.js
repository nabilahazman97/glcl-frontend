// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import * as apiname from "../../../helpers/url_helper";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { del, get, post, put } from "../../../helpers/api_helper";
import html2pdf from 'html2pdf.js';

// import './datatables.scss';

function MemberProfileList() {
    const [data, setUserData] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);





    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const exportToPDF = () => {
        const element = document.getElementById('contentToExport'); // Replace 'contentToExport' with the ID of the element you want to export
    
        html2pdf()
          .from(element)
          .save('document.pdf');
      };

    useEffect(() => {
        get(apiname.USER_LIST)
            .then((res) => {
                if (res.status === "204") {
                } else {
                    // const filteredData = res.data.result.filter(item => item.ustatus == 1);
                    let filteredData = res.data.result;

                    if (startDate && endDate) {
                        const startOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                        const endOfDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59);
                        filteredData = filteredData.filter((item) => {
                            const itemDate = new Date(item.createdAt);
                            return itemDate >= startOfDay && itemDate <= endOfDay;
                        });
                    }
                    filteredData = filteredData.filter(
                        (item) => item.ustatus == 1
                    );
                    setUserData(filteredData);

                }
            })
            .catch((err) => console.log(err));
    }, [startDate, endDate]);

    const columns = useMemo(
        () => [
            {
                Header: "No.",
                accessor: "",
                Cell: ({ row, rows }) => {
                    return <span>{rows.findIndex(r => r.id === row.id) + 1}</span>;
                },
            },
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

                            <i className="mdi mdi-eye" style={{ fontSize: "20px", color: 'black' }}></i>{" "}

                            {/* <button
                                type="button"
                                className="btn btn-primary viewBtn"
                            >

                                
                            </button> */}
                        </Link>


                    </div>
                )
            },
        ],
        []
    );



    //meta title
    document.title = "GLCL";

    return (
        <div className="page-content picBg">
            <div className="container-fluid">
                <Breadcrumbs title="MEMBERSHIP" breadcrumbItem="MEMBER PROFILE" />
                <Card className="defCard" id="contentToExport">
                    <CardBody >
                        <CardTitle className="mb-3 cardTitle">List of Members</CardTitle>
                        <div className="container-fluid">

                            <div className="d-print-none mt-4">
                                <div className="float-start ">
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            className="form-control filterInput"
                                            selected={startDate}
                                            onChange={handleDateChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            placeholderText="Select Date Range"
                                        />
                                    </div>

                                </div>
                                <div className="float-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary exportBtn  me-2"
                                    onClick={exportToPDF}
                                    >
                                        <i className="mdi mdi-upload  "></i>{" "}
                                        EXPORT
                                    </button>

                                </div>
                            </div>
                            <TableContainer
                                columns={columns}
                                data={data}
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




export default MemberProfileList;