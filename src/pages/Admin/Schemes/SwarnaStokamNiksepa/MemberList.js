// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TableContainer from "../../../../components/Common/TableContainer";

import * as apiname from "../../../../helpers/url_helper";
import { del, get, post, put } from "../../../../helpers/api_helper";

import "../../style.scss";

function MemberList() {
  const [data, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const userScheme = {
      scheme_id: "2",
    };
    post(apiname.userScheme, userScheme)
      .then(async(res) => {

        if(res.status=='204'){
        }else{
        let filteredData = res.data.result;

        
        if (startDate && endDate) {
          const startTimestamp = startDate.getTime();
          const endTimestamp = endDate.getTime();
          filteredData = filteredData.filter((item) => {
            const itemDate = new Date(item.date).getTime();
            return itemDate >= startTimestamp && itemDate <= endTimestamp;
          });
        }

        const ids = filteredData.map(item => item.user_id);

    // Making API calls to get additional information for each item
        const additionalInfoResults = await Promise.all(ids.map(id => getAdditionalInfo(id)));
       
        const combinedData = filteredData.map((item, key) => ({
         
          ...item,
          key:key,
          additionalInfo: additionalInfoResults[key]
        }));

        console.log(combinedData);
        setUserData(combinedData);
      }

      })
      .catch((err) => console.log(err));


  }, [startDate, endDate]);


  function getAdditionalInfo(id){


    const getwalletbal = {
      user_id: id,
    };

   
    
 


    return post(apiname.walletbal, getwalletbal)
      .then((res) => {
        console.log("res.result");
        console.log(res.data.statusCode);
        if (res.data.result!='') {
          return res.data.result.walletbal;
        } else {
          throw new Error("No wallet balance found");
        }
      })
      .catch((err) => {
        console.log(err);
        throw err; // Rethrow the error to handle it elsewhere
      });
  

  }
 

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "username",
      },
      {
        Header: "NRIC No.",
        accessor: "icnumber",
      },
      {
        Header: "Email Address",
        accessor: "email_id",
      },

      {
        Header: "Wallet",
        accessor: "additionalInfo",
        // Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Link
              to={`/admin-swarna-stokam-niksepa/member-details/${row.original.id}`}
              style={{ textDecoration: "none" }}
            >
              <button type="button" className="btn btn-primary viewBtn">
                View
              </button>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  document.title = "GLCL";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs
          title="Tables"
          breadcrumbItem="SVARNA STOKAM NIKSEPA SCHEME"
        />

        <Card className="defCard">
          <CardBody>
            <CardTitle className="cardTitle">List of Members</CardTitle>

            <div className="d-print-none mt-4">
              <div className="float-start ">
                <div style={{ position: "relative" }}>
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
            </div>
            <TableContainer
              columns={columns}
              data={data}
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

export default MemberList;
