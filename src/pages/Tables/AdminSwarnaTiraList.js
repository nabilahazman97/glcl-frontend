// src/components/filter.
import React, { useMemo,useState,useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Button,
    Label,
    Input,
    FormFeedback,
    Form,
    CardTitle,
  } from "reactstrap";

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import axios from "axios";
import * as apiname from "../../helpers/url_helper";

import './datatables.scss';

function MemberList() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        // console.log("hi");
        axios.get(apiname.base_url+apiname.USER_LIST, {
          headers: {
            'Authorization': 'Basic '+ apiname.encoded
          }
        })
        // .then(res =>console.log(res))
        .then(res => {
            const filteredData = res.data.result.filter(item => item.ustatus == 1);
            setdata(filteredData);
        })
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
                accessor: 'icnumber',
            },
            {
                Header: 'Email',
                accessor: 'emailid'
            },

            {
                Header: 'Gold Coin',
                accessor: 'phonenum'
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
                <Breadcrumbs title="Tables" breadcrumbItem="SWARNA TIRA SCHEME" />
                <Card>
                  <CardBody>
                    <CardTitle>Profile Information</CardTitle>
                    <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />
                  </CardBody>
                </Card>
               
            </div>
        </div>
    );
}
MemberList.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default MemberList;