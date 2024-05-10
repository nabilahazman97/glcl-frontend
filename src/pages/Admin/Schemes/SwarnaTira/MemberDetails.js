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


  useEffect(() => {
    const userScheme = {
      scheme_id: "1",
      user_id: Uid
    };
    post(apiname.userScheme, userScheme)
      .then((res) => {
        if (res.status == '204') {
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
          setusername(filteredData[0].username)
          setmembership_id(filteredData[0].membership_id)

          
        }

      })
      .catch((err) => console.log(err));

    //to get remaining gold
    const getremaininggoldforuser = {
      user_id: Uid
    };
    post(apiname.remainGold, getremaininggoldforuser)
      .then(res => {
        if (res.status == '204') {

        } else {
          setremainggold(res.data.result.remaininggold)
        }

      })
      // .then(res => setremainggold(res.result.remaininggold))
      .catch(err => console.log(err));

  }, [startDate, endDate]);

  const comp = "Completed";
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => moment(value).format("DD/MM/YYYY")
        // Cell: ({ value }) => format(new Date(value), "dd/mm/yyyy")
      },
      {
        Header: "Purpose",
        accessor: "gweight",
        Cell: ({ row }) => (
          <span style={{ color: row.original.type === 1 ? "#4fb946" : (row.original.type === 2 ? "red" : (row.original.type === 4 ? "#4fb946" : "black")) }}>
            {row.original.type === 1 ? "Buy - " : (row.original.type === 2 ? "Sell - " : (row.original.type === 4 ? "Buyed through wallet - " : ""))}
            {row.values.gweight}
            {row.original.type === 1 ? " g" : " g"}
          </span>
        ),
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
  console.log("data");
  console.log(data);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="SVARNA TIRA SCHEME" />
          <div className="d-flex gap-3">
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
                <Card className="defCard col-12">
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
                        <Link
                          to="#"
                          className="btn btn-success downloadBtn"
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

                {/* <Card
                    className="defCard col-5 p-3 "
                    style={{ background: "#090F2F" }}
                  >
                    <div>
                      <div className="text-center mt-3">
                        <img src={goldBar} alt="" className="avatar-md" />
                      </div>
                    </div>
                  </Card> */}
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
