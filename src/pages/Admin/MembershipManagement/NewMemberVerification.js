// src/components/filter.
import React, { useMemo, useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import * as apiname from "../../../helpers/url_helper";

//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { del, get, post, put } from "../../../helpers/api_helper";

// import './datatables.scss';
import "../style.scss";

function NewMemberVerification() {
  const [data, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    get(apiname.USER_LIST)
      .then((res) => {
        if (res.status === "204") {
          // setUserData(0);
        } else {
          let filteredData = res.data.result;
          if (startDate && endDate) {
            const startTimestamp = startDate.getTime();
            const endTimestamp = endDate.getTime();
            filteredData = filteredData.filter((item) => {
              const itemDate = new Date(item.date).getTime();
              return itemDate >= startTimestamp && itemDate <= endTimestamp;
            });
          }
          setUserData(filteredData);
        }
      })
      .catch((err) => console.log(err));
  }, [startDate, endDate]);

  const columns = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email_id",
      },
      {
        Header: "Status",
        accessor: "ustatus",
        Cell: ({ row }) => (
          <span className="d-flex justify-content-center">
            {row.original.ustatus == 0 || row.original.ustatus === null ? (
              <span>
                <button
                  type="button"
                  className="btn btn-warning statusBtn statusPending"
                >
                  <i className="mdi mdi-alert-circle font-size-16 align-middle me-1"></i>{" "}
                  Pending&nbsp;&nbsp;&nbsp;
                </button>
              </span>
            ) : row.original.ustatus == 1 ? (
              <span>
                <button
                  type="button"
                  className="btn btn-success statusBtn statusApproved"
                >
                  <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "}
                  Approved
                </button>
              </span>
            ) : row.original.ustatus == 2 ? (
              <span>
                <button
                  type="button"
                  className="btn btn-danger statusBtn statusRejected"
                >
                  <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "}
                  Rejected
                </button>
              </span>
            ) : null}
          </span>
        ),
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Link
              to={`/member-approval/${row.original.id}`}
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

  //meta title
  document.title = "GLCL";

  return (
    <div className="page-content picBg">
      <Breadcrumbs title="Tables" breadcrumbItem="NEW MEMBER VERIFICATION" />
      <Card className="defCard">
        <CardBody>
          <CardTitle className="mb-3 cardTitle">List of New Members</CardTitle>
          <div className="container-fluid">
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
              data={data} //data
              isAddOptions={false}
              customPageSize={10}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default NewMemberVerification;
