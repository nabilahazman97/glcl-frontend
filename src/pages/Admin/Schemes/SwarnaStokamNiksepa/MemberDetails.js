import React, { useState, useEffect, useMemo, useRef } from "react";
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
  Progress,
  Form,
} from "reactstrap";
// Formik validation

import { Link } from "react-router-dom";

import * as apiname from "../../../../helpers/url_helper";
import { useParams } from "react-router-dom";

import TableContainer from "../../../../components/Common/TableContainer";
import avatar from "../../../../assets/images/users/avatar-1.jpg";
import coins from "../../../../assets/images/schemes/single-coin.png";
import dload from "../../../../assets/images/schemes/download-icon.png";
import print from "../../../../assets/images/schemes/print-icon.png";
import walletDuoTone from "../../../../assets/images/schemes/Wallet_duotone.png";
import { del, get, post, put } from "../../../../helpers/api_helper";
import html2pdf from 'html2pdf.js';
//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
// import '../../style.scss';

const MemberDetails = () => {
  document.title = "GLCL";
  const { Uid } = useParams();

  const [data, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [walletbal, setwalletbal] = useState([]);
  // const [overallbal, setoverallbal] = useState([]);
  const [username, setusername] = useState([]);
  const [membership_id, setmembership_id] = useState([]);

  useEffect(() => {
    
    get(`${apiname.translistbyid}/${Uid}`)
    .then((res) => {
     
      if (res.status == '404') {
      } else {
        let filteredData = res.data.result.filter(item=>item.type_id===3 || item.type_id===4 );
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

      get(`${apiname.walletholdingbyid}/${Uid}`)
      .then((getwalletbal) => {
        
            if (getwalletbal.status == '404') {
  
          } else {
            setwalletbal(getwalletbal.data.result.balance)
          }
  
      })
      .catch((err) => console.log(err));

     
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
        // Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
      },
      {
        Header: "Amount through",
        accessor: "reference_id",
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
            

            {(row.original.type_id === 3 && row.original.reference_id != null) ? "Added selled Amount to the Wallet" :
    ((row.original.type_id === 4 && row.original.reference_id != null) ? "Deducted amount from wallet" : "Top up done by user")}
           

           
          </span>
        ),
      },
      {
        Header: "Amount",
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Forms"
            breadcrumbItem="SVARNA STOKAM NIKSEPA SCHEME"
          />
          <div className="d-flex gap-3" id="contentToExport">
            <div className="col-lg-12 p-0">
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

              <Row>
                <Col lg={6}>
                  <Card className="div1">
                    <CardBody className="align-content-center">
                      <div>
                        <div className="d-flex justify-content-center gap-5">
                          <div className="text-center align-content-center">
                            <img
                              src={walletDuoTone}
                              alt=""
                              className="avatar-md"
                            />
                          </div>
                          <div className="text-center">
                            <div className="mt-2">
                              <h6 className="">Remaining Balance</h6>
                              <h3 className="text-dark inter_bold">
                                {walletbal}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="div2">
                    <CardBody>
                      <div>
                        <div className="d-flex justify-content-start gap-5">
                          <div className="text-center align-content-center">
                            <img src={coins} alt="" className="avatar-md" />
                          </div>
                          <div className="text-start">
                            <div className="mt-2">
                              <h4 className="text-white"> Gold Coin</h4>
                              <h5 className="text-white">
                                RM 48 more to buy Gold Coin.
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress
                            value={25}
                            className="progress-xl progress_bar"
                          >
                            25%
                          </Progress>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Card className="defCard">
                <CardBody>
                  <CardTitle className="cardTitle">
                    Transaction History
                  </CardTitle>
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
                    <div className="float-end ">

                      <button
                        type="button"
                        className="btn btn-primary exportBtn  me-2"
                        onClick={exportToPDF}
                      >
                        <i className="mdi mdi-upload  "></i>{" "}
                        EXPORT
                      </button>

                      <Link to="#" className="btn btn-success downloadBtn">
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
            </div>
          </div>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <Link
              to="/admin-swarna-stokam-niksepa/index"
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-primary backBtn">Back</button>
            </Link>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MemberDetails;
