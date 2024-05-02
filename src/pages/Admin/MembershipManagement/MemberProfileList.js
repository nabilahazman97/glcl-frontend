// src/components/filter.
import React, { useMemo,useState,useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { Button } from 'reactstrap';
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
import { del, get, post, put } from "../../../helpers/api_helper";

// import './datatables.scss';

function MemberList() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        get(apiname.USER_LIST)
        .then(res => {
            const filteredData = res.result.filter(item => item.ustatus === '1');
            setdata(filteredData);
        })
        .catch(err => console.log(err));
    }, []);

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
                                className="btn btn-primary rejectBtn"
                            >
                                <i className="mdi mdi-eye-outline font-size-16 align-middle me-1"></i>{" "}
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
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="Tables" breadcrumbItem="MEMBER PROFILE" />
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
        </div>
    );
}
MemberList.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default MemberList;