import React, { useMemo, useState, useEffect, useRef } from "react";
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

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TableContainer from "../../../../components/Common/TableContainer";
import * as apiname from "../../../../helpers/url_helper";
import { del, get, post, put } from "../../../../helpers/api_helper";
import html2pdf from 'html2pdf.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MemberList() {
  document.title = "GLCL";
  const [data, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 


  const handleDateChange = dates => {
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
  
  useEffect(() => {
    const userScheme = {
      scheme_id: "1",
    };

    get(apiname.goldholdingslist)
      .then((res) => {
        
        console.log("goldholdinglist");
        console.log(res);
        if(res.status=='204'){
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
        Header: "Gold Coin",
        accessor: "total_grams",
        Cell: ({ value }) => <span>{value} g</span>,
      },
      // {
      //   Header: "Gold Type",
      //   accessor: "gold_type",
       
      // },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Link
              to={`/admin-swarna-tira/member-details/${row.original.user_id}`}
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

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="SVARNA TIRA SCHEME" />
        <Card className="defCard" style={{ minHeight: "250px" }} id="contentToExport">
          <CardBody>
            <CardTitle className="cardTitle">List of Members</CardTitle>
            <div className="d-print-none mt-4">
              <div className="float-start ">
              <div style={{ position: 'relative' }}>
                <DatePicker className="form-control filterInput"
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  placeholderText="Select Date Range"
                />
                </div></div>
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
                {data && data.length > 0 ? (
    // Render table body if data exists and is not empty
    <TableContainer
        columns={columns}
        data={data}
        isAddOptions={false}
        customPageSize={10}
        className="custom-header-css"
    />
) : (
    // Render only table headers if data is empty or undefined
    <TableContainer
        columns={columns}
        data={[]}
        isAddOptions={false}
        customPageSize={10}
        className="custom-header-css"
    />
)}
           
          
          </CardBody>
        </Card>
        
      </div>
    </div>
  );
}

export default MemberList;
