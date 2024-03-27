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
                Header: 'Phone Number',
                accessor: 'phonenum'
            },
        ],
        []
    );

    const data = [
        {
            "username": "Jennifer Chang",
            "emailid": "jenn@gmail.com",
            "age": 28, 
            "phonenum": "01-12546546",
        },
        {
            "username": "Jennifer Chang",
            "emailid": "jenn@gmail.com",
            "age": 28, 
            "phonenum": "01-12546546",
        },
    
       
    ];

    //meta title
    document.title = "GLCL";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="Tables" breadcrumbItem="MEMBER REGISTRATION LIST" />
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