// src/components/filter.
import React, { useMemo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

// import './datatables.scss';
import '../style.scss';

function DatatableTables() {

    const [data, setdata] = useState([]);
    useEffect(() => {
        // console.log("hi");
        axios.get(apiname.base_url + apiname.USER_LIST, {
            headers: {
                'Authorization': 'Basic ' + apiname.encoded
            }
        })
            // .then(res =>console.log(res))
            .then(res => setdata(res['data']['result']))
            .catch(err => console.log(err));
    }, []);



    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'Username',
            },
            {
                Header: 'NRIC No.',
                accessor: 'icnumber'
            },
            {
                Header: 'Email Address',
                accessor: 'emailid'
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

                        {/* <Table columns={columns} data={data} /> */}
                        <TableContainer
                            columns={columns}
                            data={data}
                            isGlobalFilter={true}
                            isAddOptions={false}
                            customPageSize={10}
                            className="custom-header-css"
                        />
                    </div>
                </CardBody>
            </Card>

        </div>
    );
}
DatatableTables.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default DatatableTables;