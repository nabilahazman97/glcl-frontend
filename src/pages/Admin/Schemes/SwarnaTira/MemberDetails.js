import React, { useMemo, useState, useEffect, useRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";


import { Link } from "react-router-dom";

import * as apiname from "../../../../helpers/url_helper";
import { del, get, post, put } from "../../../../helpers/api_helper";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import TableContainer from "../../../../components/Common/TableContainer";

import avatar from "../../../../assets/images/users/avatar-1.jpg";
import coins from "../../../../assets/images/schemes/single-coin.png";
import print from "../../../../assets/images/schemes/print-icon.png";
import dload from "../../../../assets/images/schemes/download-icon.png";
import goldBar from "../../../../assets/images/users/gold_bars.png";
import html2pdf from 'html2pdf.js';


const MemberDetails = () => {
  //meta title
  document.title = "GLCL";
  const { Uid } = useParams();
  const [data, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [remaininggold, setremainggold] = useState([]);
  const [username, setusername] = useState([]);
  const [membership_id, setmembership_id] = useState([]);
  const [lockedSerials,setlockedSerialsgold]=useState([]);
  const [unlockedSerials,setunlockedSerialsgold]=useState([]);
  


  useEffect(() => {
    

    
    get(`${apiname.translistbyid}/${Uid}`)
      .then((res) => {
       
        if (res.status == '404') {
        } else {
          let filteredData = res.data.result;
          if (startDate && endDate) {
            const startOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const endOfDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59);
            filteredData = filteredData.filter((item) => {
              const itemDate = new Date(item.createdAt);
              return itemDate >= startOfDay && itemDate <= endOfDay;
            });
          }
          setUserData(filteredData);
          setusername(filteredData[0].User.username)
          setmembership_id(filteredData[0].User.membership_id)
        }

      })
      .catch((err) => console.log(err));

    //to get remaining gold

    get(`${apiname.goldholdingbyid}/${Uid}`)
    .then((getremaininggold) => {
      
          if (getremaininggold.status == '404') {

        } else {
          setremainggold(getremaininggold.data.result.grams)
        }

    })
    .catch((err) => console.log(err));

    get(`${apiname.goldassignedtouser}/${Uid}`)
    .then((getgoldassigned) => {

      console.log("getgoldassigned");
      console.log(getgoldassigned);
       
      
          if (getgoldassigned.status == '404') {

        } else {

         

          setlockedSerialsgold(getgoldassigned.data.result.lockedSerials)
          setunlockedSerialsgold(getgoldassigned.data.result.unlockedSerials)
        }

    })
    .catch((err) => console.log(err));

   

  }, [startDate, endDate]);

 

  const comp = "Completed";
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => moment(value).format("DD/MM/YYYY")

      },
      {
        Header: "gold",
        accessor: "gold_grams",
        Cell: ({ row }) => (
          <span style={{ 
            color: (
                row.original.type_id === 1 ? "#4fb946" :
                (row.original.type_id === 2 ? "red" :
                (row.original.type_id === 3 ? "blue" :
                (row.original.type_id === 4 ? "violet" :
                (row.original.type_id === 5 ? "#4fb946" : "black"))))
            )
        }}>
          {row.original.type_id === 1 ? "Buy - " :
    (row.original.type_id === 2 ? "Sell - " :
    ((row.original.type_id === 4 && row.original.reference_id != null)? "deducted amount from wallet" :
    (row.original.type_id === 5 ? "Buyed through wallet - " :
    ((row.original.type_id === 3 && row.original.reference_id != null && row.original.status_id==4)? "rejected purchase amount added to the wallet" :
    ((row.original.type_id === 3 && row.original.reference_id != null) ? "Added selled Amount to the Wallet" : "Top up done by user")))))}

        

            {row.values.gold_grams=='0' ?"":row.values.gold_grams}
            {row.original.type_id === 1 || row.original.type_id === 2 || row.original.type_id === 5 ? " g" : " "}
          </span>
        ),
      },

{
        Header: "Trans_Status",
        accessor: "status_id",
      },
      {
        Header: "Amount (RM)",
        accessor: "amount",
      },

      {
        Header: "Status",
        accessor: "pay_status",
        Cell: ({ value }) => comp
      },
    ],
    []
  );


  const printInvoice = () => {
    window.print();
  };

  const exportToPDF = () => {
    const element = document.getElementById('contentToExport'); // Replace 'contentToExport' with the ID of the element you want to export

    html2pdf()
      .from(element)
      .save('document.pdf');
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="SVARNA TIRA SCHEME" />
          <div className="d-flex gap-3"  id="contentToExport">
            <div className="col-12 p-0">
              <Card
              
                className="defCard"
                style={{
                  background:
                    "linear-gradient(to bottom, white 40%, #d1b66a 40%)",
                }}
              >
                <CardBody>
                  <div>
                    <div className="d-flex justify-content-center">
                      <div className="text-center">
                        <img
                          src={avatar}
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                        <div className="mt-2">
                          <h3 className="text-white">{username}</h3>
                          <h3 className="text-dark">{membership_id}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="defCard" style={{ background: "#090F2F" }}>
                <CardBody>
                  <div>
                    <div className="d-flex justify-content-center gap-3">
                      <div className="text-center align-content-center">
                        <img src={coins} alt="" className="avatar-md" />
                      </div>
                      <div className="text-center">
                        <div className="mt-2">
                          <h4 className="text-white">Gold Coin</h4>
                          <h4 className="text-gold">
                            {remaininggold} <span className="">g</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="d-flex gap-2">
                <Card className="defCard col-7">
                  <CardBody>
                    <CardTitle className="cardTitle">
                      Transaction History
                    </CardTitle>
                    <div className="d-print-none mt-4">
                      <div className=" float-start">
                        <div style={{ position: "relative" }}>
                          <DatePicker className="form-control filterInput"
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
                        <Link
                          to="#"
                          className="btn btn-success downloadBtn"
                          onClick={printInvoice}
                        >
                          <img
                            src={print}
                            alt=""
                            className="avatar-md print_icon"
                          />
                        </Link>

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

                <Card
                  className="defCard col-5 p-3 "
                  style={{ background: "#090F2F" }}
                >
                  <div>
                    <div className="text-center mt-3">
                      <img src={goldBar} alt="" className="avatar-md" />
                      <div className="text-white mt-2 std_font">Gold Coin Owned</div>
                      <div className="mt-3" style={{ backgroundColor:"#494441" }}>
                         <div className="d-flex justify-content-between p-2">
                            <div className="text-gold">Date Bought</div>
                            <div className="text-gold">Serial Number</div>
                         </div>
                      </div>
                       {/* {assignedgold.map((gold, index) => (
                      <div className="mt-3" style={{ backgroundColor: "#d6b13f", borderRadius: '5px' }}>
                          <div key={index} className="d-flex justify-content-between p-2">
                              <div className="text-black">{moment(gold.updatedAt).format("DD/MM/YYYY")}</div>
                              <div className="text-black">{gold.serialNumber}</div>
                          </div>
                     
                  </div>
                   ))} */}

<div>
      {/* Display Locked Serial Numbers */}
      <h3>Locked Serial Numbers</h3>
      {lockedSerials.length > 0 ? (
        lockedSerials.map((gold, index) => (
          <div
            key={`locked-${index}`}
            className="mt-3"
            style={{ backgroundColor: "#d6b13f", borderRadius: '5px' }}
          >
            <div className="d-flex justify-content-between p-2">
              <div className="text-black">{moment(gold.updatedAt).format("DD/MM/YYYY")}</div>
              <div className="text-black">{gold.serialNumber}</div>
              <div className="text-black">{gold.goldGram} grams</div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-3 text-white">No locked serial numbers.</div>
      )}

      {/* Display Unlocked Serial Numbers */}
      <h3 className="mt-4">Unlocked Serial Numbers</h3>
      {unlockedSerials.length > 0 ? (
        unlockedSerials.map((gold, index) => (
          <div
            key={`unlocked-${index}`}
            className="mt-3"
            style={{ backgroundColor: "#f0f0f0", borderRadius: '5px' }}
          >
            <div className="d-flex justify-content-between p-2">
              <div className="text-black">{moment(gold.updatedAt).format("DD/MM/YYYY")}</div>
              <div className="text-black">{gold.serialNumber}</div>
              <div className="text-black">{gold.goldGram} grams</div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-3 text-white">No unlocked serial numbers.</div>
      )}
    </div>
                      
                      
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <Link
              to="/admin-swarna-tira/index"
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-primary backBtn">Back</button>
            </Link>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
  //   });
};

export default MemberDetails;
