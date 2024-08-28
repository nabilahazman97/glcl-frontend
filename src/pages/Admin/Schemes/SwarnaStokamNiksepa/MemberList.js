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
import html2pdf from 'html2pdf.js';
import "../../style.scss";

function MemberList() {
  const [data, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  useEffect(() => {
    const userScheme = {
      scheme_id: "1",
    };

    get(apiname.ewalletlist)
      .then((res) => {
       
        if(res.status=='404'){
          setUserData('');
        }else{
        let filteredData = res.data.result;
      
        if (startDate && endDate) {
          const startTimestamp = startDate.getTime();
          const endTimestamp = endDate.getTime();
          filteredData = filteredData.filter(item => {
            const itemDate = new Date(item.createdAt).getTime();
            return itemDate >= startTimestamp && itemDate <= endTimestamp;
          });
        }
            setUserData(filteredData);
      }
         

       
      })
      .catch((err) => console.log(err));
  }, [startDate,endDate]);


 


  function getAdditionalInfo(id) {


    const getwalletbal = {
      user_id: id,
    };






    return post(apiname.walletbal, getwalletbal)
      .then((res) => {
     
        if (res.data.result != '') {
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
        Header: "No.",
        accessor: "",
        Cell: ({ row, rows }) => {
          return <span>{rows.findIndex(r => r.id === row.id) + 1}</span>;
        },
      },
      {
        Header: "Name",
        accessor: "username",
      },
   
      {
        Header: "Email Address",
        accessor: "email_id",
      },

      {
        Header: "Wallet",
        accessor: "balance",
        // Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Link
              to={`/admin-swarna-stokam-niksepa/member-details/${row.original.user_id}`}
              style={{ textDecoration: "none" }}
            >
              <i className="mdi mdi-eye" style={{ fontSize: "20px", color: 'black' }}></i>{" "}
              {/* <button type="button" className="btn btn-primary viewBtn">
             
              </button> */}
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

  const exportToPDF = () => {
    const element = document.getElementById('contentToExport'); // Replace 'contentToExport' with the ID of the element you want to export

    html2pdf()
      .from(element)
      .save('document.pdf');
  };

  document.title = "GLCL";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs
          title="Tables"
          breadcrumbItem="SVARNA STOKAM NIKSEPA SCHEME"
        />

        <Card className="defCard" id="contentToExport">
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
              <div className="float-end">
              <button
                type="button"
                className="btn btn-primary exportBtn  me-2"
                onClick={exportToPDF}
              >
                <i className="mdi mdi-upload  "></i>{" "}
                EXPORT
              </button>
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
