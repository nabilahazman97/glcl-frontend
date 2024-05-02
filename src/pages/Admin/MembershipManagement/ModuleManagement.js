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
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
import { del, get, post, put } from "../../../helpers/api_helper";

  import '../style.scss';

function ModuleManagement() {
  const [data, setdata] = useState([]);
  useEffect(() => {
      get(apiname.schemeList)
      .then(res => {
        // Sort data in descending order based on 'id' column
        if(res.result) {
          const sortedData = res.result.sort((a, b) => b.id - a.id);
          setdata(sortedData);
        }
        
      })
      .catch(err => console.log(err));
      // axios.get(apiname.base_url + apiname.schemeList, {
      //     headers: {
      //         'Authorization': 'Basic ' + apiname.encoded
      //     }
      // })
      //     // .then(res =>console.log(res))
      //     .then(res => {
      //       // Sort data in descending order based on 'id' column
      //       const sortedData = res.data.result.sort((a, b) => b.id - a.id);
      //       setdata(sortedData);
      //     })
      //     .catch(err => console.log(err));
  }, []);
  console.log("data schemes");
  console.log(data);

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'id',
                
            },
            {
                Header: 'Name',
                accessor: 'Scheme_name',
            },
            // {
            //     Header: 'Required gold',
            //     accessor: '',
            // },
            {
                Header: 'Status',
                accessor: 'status',
            },
            
        ],
        []
    );

    const printInvoice = () => {
        window.print();
      };

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
                <Breadcrumbs title="Tables" breadcrumbItem="MODULE MANAGEMENT" />
        
                <Card className="defCard">
                  <CardBody>
                    <CardTitle>List of Module</CardTitle>
                    <div className="d-print-none mt-4">
                      <div className="float-end ">
                      <button
                            type="button"
                            className="btn btn-primary exportBtn  me-2"
                          >
                            <i className="mdi mdi-upload  "></i>{" "}
                            EXPORT
                          </button>
                        {/* <Link
                          to="#"
                          onClick={printInvoice}
                          className="btn btn-success downloadBtn"
                        >
                          <i className="fa fa-print" />
                        </Link> */}
                       
                      </div>
                    </div>
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
// MemberList.propTypes = {
//     preGlobalFilteredRows: PropTypes.any,

// };


export default ModuleManagement;