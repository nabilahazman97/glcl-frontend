// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { Button } from 'reactstrap';

import './datatables.scss';

function DatatableTables() {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'NRIC No.',
                accessor: 'icNum'
            },

            {
                Header: 'Membership ID',
                accessor: 'memberid'
            },
            {
                Header: 'Email Address',
                accessor: 'email'
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <Link to="/member-profile">
                        <button
                                type="button"
                                className="btn btn-primary rejectBtn"
                            >
                                <i className="mdi mdi-eye-outline font-size-16 align-middle me-1"></i>{" "}
                                View
                            </button>
                        </Link>
                        
                        <button
                            type="button"
                            className="btn btn-danger rejectBtn"
                        >
                            <i className="bx bx-trash font-size-16 align-middle me-1"></i>{" "}
                            Remove
                        </button>
                    </div>
                )
            },
        ],
        []
    );

    const data = [
        {
            "name": "Tony Lee",
            "icNum": "873939-01-0389",
            "memberid": "2",
            "email": "tony@gmail.com",
        },
        {
            "name": "Sarah J",
            "icNum": "83939-01-0378",
            "memberid": "1",
            "email": "sarah@gmail.com",
        },
        


    ];

    //meta title
    document.title = "GLCL";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="Tables" breadcrumbItem="LIST OF MEMBERS" />
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
DatatableTables.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default DatatableTables;