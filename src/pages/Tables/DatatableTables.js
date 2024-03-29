// src/components/filter.
import React, { useMemo,useEffect,useState  } from "react";
import PropTypes from 'prop-types';
import * as apiname from "../../helpers/url_helper";
import axios, { Axios } from "axios";
//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { Button } from 'reactstrap';

import './datatables.scss';

function DatatableTables() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        // console.log("hi");
        axios.get(apiname.base_url+apiname.USER_LIST, {
          headers: {
            'Authorization': 'Basic '+ apiname.encoded
          }
        })
        .then(res =>setdata(res['data']['result']))
        .catch(err => console.log(err));
      }, []);


    const columns = useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'Username',
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
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <button
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
                        </button>
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