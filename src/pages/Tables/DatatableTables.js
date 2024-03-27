// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from 'prop-types';

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

function DatatableTables() {
    const columns = useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'emailid'
            },

            {
                Header: 'Age',
                accessor: 'age'
            },
            {
                Header: 'Start date',
                accessor: 'startDate'
            },
            {
                Header: 'Salary',
                accessor: 'salary'
            },
            {
                Header: 'Phone Number',
                accessor: 'phonenum'
            },
        ],
        []
    );

    const data = [
        {
            "username": "Jennifer Chang",
            "emailid": "Regional Director",
            "age": 28,
            "office": "Singapore",
            "startDate": "2010/11/14",
            "salary": "$357,650"
        },
        {
            "name": "Gavin Joyce",
            "position": "Developer",
            "age": 42,
            "office": "Edinburgh",
            "startDate": "2010/12/22",
            "salary": "$92,575"
        },
        {
            "name": "Angelica Ramos",
            "position": "Chief Executive Officer (CEO)",
            "age": 47,
            "office": "London",
            "startDate": "2009/10/09",
            "salary": "$1,200,000"
        },
       
    ];

    //meta title
    document.title = "Data Tables | Skote - React Admin & Dashboard Template";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
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