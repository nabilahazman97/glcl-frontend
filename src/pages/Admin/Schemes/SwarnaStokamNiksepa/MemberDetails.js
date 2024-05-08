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
  const[overallbal,setoverallbal]=useState([]);
  const [username, setusername] = useState([]);
  const [membership_id, setmembership_id] = useState([]);

  useEffect(() => {
    const userScheme = {
      scheme_id: "2",
      user_id: Uid,
    };
    post(apiname.userScheme, userScheme)
      .then((res) => {
        let filteredData = res.data.result;
        if (startDate && endDate) {
          const startTimestamp = startDate.getTime();
          const endTimestamp = endDate.getTime();
          filteredData = filteredData.filter((item) => {
            const itemDate = new Date(item.date).getTime();
            return itemDate >= startTimestamp && itemDate <= endTimestamp;
          });
        }
        setusername(filteredData[0].username)
        setmembership_id(filteredData[0].membership_id)
        setUserData(filteredData);
       
        //to get wallet bal

        const getwalletbal = {
          user_id: Uid,
        };
        post(apiname.walletbal, getwalletbal)
        // .then((res) => console.log(res.result.type_3_walletbal))
          .then((res) => {
            setwalletbal(res.data.result.walletbal);
            setoverallbal(res.data.result.type_3_walletbal);
          })
         
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [startDate, endDate]);
  const comp= "Completed"; 
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => moment(value).format("DD/MM/YYYY")
        // Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
      },
      {
        Header: "Amount (RM)",
        accessor: "total",
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

  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Forms"
            breadcrumbItem="SVARNA STOKAM NIKSEPA SCHEME"
          />
          <div className="d-flex gap-3">
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
                              <h6 className="">Remaining Balance/overall deposited amount</h6>
                              <h3 className="text-dark inter_bold">
                                {walletbal}/{overallbal}
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
