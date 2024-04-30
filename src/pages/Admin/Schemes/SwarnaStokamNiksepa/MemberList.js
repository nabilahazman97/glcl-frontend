// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import Breadcrumbs from '../../../../components/Common/Breadcrumb';
import TableContainer from '../../../../components/Common/TableContainer';
import axios from "axios";
import * as apiname from "../../../../helpers/url_helper";

import '../../style.scss';

function MemberList() {

  const [data, setUserData] = useState([]);

  const userScheme = {
    'scheme_id': '2'
  };


  useEffect(() => {
    // Fetch data from USER_LIST
    axios.get(apiname.base_url + apiname.USER_LIST, {
      headers: {
        'Authorization': 'Basic ' + apiname.encoded
      }
    })
    .then(res => {
      const userListData = res.data.result;
      // Fetch data from userScheme
      axios.post(apiname.base_url + apiname.userScheme, userScheme, {
        headers: {
          'Authorization': 'Basic ' + apiname.encoded
        }
      })
      .then(res => {
        const userSchemeData = res.data.result;
        console.log("userSchemeData")
        console.log(userSchemeData)
        // Merge data based on matching id and user_id values
        const mergedData = mergeData(userListData, userSchemeData);
        setUserData(mergedData);
        console.log("user")
        console.log(mergedData)
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }, []);

  
  const mergeData = (userListData, userSchemeData) => {
    const mergedData = [];
    userListData.forEach(userList => {
      const matchingUserScheme = userSchemeData.find(userScheme => userList.id === userScheme.user_id);
      if (matchingUserScheme) {
        mergedData.push({ ...userList, ...matchingUserScheme });
      }
      console.log(mergedData)
    });
    return mergedData;
    
  };

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
        Header: 'Email Address',
        accessor: 'emailid'
      },

      {
        Header: 'Savings',
        accessor: 'buyedgoldweight'
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Link to={`/admin-swarna-stokam-niksepa/member-details/${row.original.id}`} style={{ textDecoration: 'none' }}>
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

  const printInvoice = () => {
    window.print();
  };

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
        <Breadcrumbs title="Tables" breadcrumbItem="SVARNA STOKAM NIKSEPA SCHEME" />

        <Card className="defCard">
          <CardBody>
            <CardTitle>List of Members</CardTitle>
            {/* <div className="d-print-none mt-4">
              <div className="float-end ">
                <button
                  type="button"
                  className="btn btn-primary exportBtn  me-2"
                >
                  <i className="mdi mdi-upload  "></i>{" "}
                  EXPORT
                </button>

              </div>
            </div> */}
            <TableContainer
              columns={columns}
              data={filteredData}
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