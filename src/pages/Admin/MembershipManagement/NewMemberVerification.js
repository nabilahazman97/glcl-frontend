import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button, Card, CardBody, CardTitle, Modal, ModalBody, Nav, TabContent, TabPane, Row, Col,
  NavItem,
  NavLink,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import * as apiname from "../../../helpers/url_helper";
import { get, post } from "../../../helpers/api_helper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import classnames from "classnames";
import { ToastContainer } from 'react-toastify';


import "../style.scss";

function NewMemberVerification() {
  const [data, setUserData] = useState([]);
  const [dataRejected, setRejectedData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setactiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleInput = (id, status) => {
    const user = {
      id: id,
      ustatus: status,
    };

    post(apiname.userapproval, user)
      .then((res) => {
        if (user.ustatus === "1") {
         
        } else if (user.ustatus === "2") {
        
        }
        setTimeout(() => {
          // Redirect to the dashboard page
          window.location.href = "/tables-datatable";
        }, 500);
      })
      .catch((err) => console.log(err));
  };

  const toggleModal = (id) => {
    setModalOpen(!modalOpen);
    setSelectedId(id);
  };

  const confirmAction = () => {
    toggleModal();
    if (action === "approve") {
      toast.success('User accepted!');
      handleInput(selectedId, "1");
      
    } else if (action === "reject") {
      toast.error('User rejected!');
      handleInput(selectedId, "2");
   
    }
  };

  useEffect(() => {
    get(apiname.USER_LIST)
      .then((res) => {
        if (res.status === "204") {
          // setUserData(0);
        } else {
          let filteredData = res.data.result;
          let filteredRejected = res.data.result;
          if (startDate && endDate) {
            const startTimestamp = startDate.getTime();
            const endTimestamp = endDate.getTime();
            filteredData = filteredData.filter((item) => {
              const itemDate = new Date(item.date).getTime();
              return itemDate >= startTimestamp && itemDate <= endTimestamp;
            });
          }
          filteredData = filteredData.filter(
            (item) => item.ustatus == 0 || item.ustatus == null
          );
          setUserData(filteredData);

          filteredRejected = filteredRejected.filter(
            (item) => item.ustatus == 2
          );
          setRejectedData(filteredRejected);
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
      // {
      //   Header: "Action",
      //   accessor: "",
      //   Cell: ({ row }) => (
      //     <span className="d-flex justify-content-center">
      //       <div className="col-md-12 text-center">
      //         <button
      //           style={{ marginRight: "5px" }}
      //           type="button"
      //           onClick={() => {
      //             setAction('approve');
      //             toggleModal(row.original.id); // Pass 'id' to the toggleModal function
      //           }}
      //           className="btn btn-success statusBtn statusApproved mr-1"
      //         >
      //           Approve
      //         </button>
      //         <button
      //           type="button"
      //           onClick={() => {
      //             setAction('reject');
      //             toggleModal(row.original.id); // Pass 'id' to the toggleModal function
      //           }}
      //           className="btn btn-danger statusBtn statusRejected ml-2"
      //         >
      //           Reject
      //         </button>
      //       </div>
      //     </span>
      //   ),
      // },

      {
        Header: "Status",
        accessor: "ustatus",
        Cell: ({ row }) => (
          <span className="d-flex justify-content-center">
            {row.original.ustatus == 0 || row.original.ustatus === null ? (
              <span>
                <button type="button" className="btn btn-warning statusBtn statusPending">
                  Pending
                </button>
              </span>
            ) : row.original.ustatus == 1 ? (
              <span>
                <button type="button" className="btn btn-success statusBtn statusApproved">
                  Approved
                </button>
              </span>
            ) : row.original.ustatus == 2 ? (
              <span>
                <button type="button" className="btn btn-danger statusBtn statusRejected">
                  Rejected
                </button>
              </span>
            ) : null}
          </span>
        ),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center ">
            {row.original.ustatus != 0 ? null : (
              <>
                <button
                  style={{ marginRight: "5px" }}
                  type="button"
                  onClick={() => {
                    setAction('approve');
                   
                    toggleModal(row.original.id); // Pass 'id' to the toggleModal function
                  }}
                  className="btn btn-success statusBtn statusApproved mr-1"
                >
                  <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "}

                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAction('reject');
                   
                    toggleModal(row.original.id); // Pass 'id' to the toggleModal function
                  }}
                  className="btn btn-danger statusBtn statusRejected ml-2"
                >
                  <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "}

                  Reject
                </button>
              </>
            )}
            <Link to={`/member-approval/${row.original.id}`} style={{ textDecoration: "none" }}>
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

  const columns2 = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email_id",
      },
      // {
      //   Header: "Action",
      //   accessor: "",
      //   Cell: ({ row }) => (
      //     <span className="d-flex justify-content-center">
      //       <div className="col-md-12 text-center">
      //         <button
      //           style={{ marginRight: "5px" }}
      //           type="button"
      //           onClick={() => {
      //             setAction('approve');
      //             toggleModal(row.original.id); // Pass 'id' to the toggleModal function
      //           }}
      //           className="btn btn-success statusBtn statusApproved mr-1"
      //         >
      //           Approve
      //         </button>
      //         <button
      //           type="button"
      //           onClick={() => {
      //             setAction('reject');
      //             toggleModal(row.original.id); // Pass 'id' to the toggleModal function
      //           }}
      //           className="btn btn-danger statusBtn statusRejected ml-2"
      //         >
      //           Reject
      //         </button>
      //       </div>
      //     </span>
      //   ),
      // },

      {
        Header: "Status",
        accessor: "ustatus",
        Cell: ({ row }) => (
          <span className="d-flex justify-content-center">
            {row.original.ustatus == 0 || row.original.ustatus === null ? (
              <span>
                <button type="button" className="btn btn-warning statusBtn statusPending">
                  Pending
                </button>
              </span>
            ) : row.original.ustatus == 1 ? (
              <span>
                <button type="button" className="btn btn-success statusBtn statusApproved">
                  Approved
                </button>
              </span>
            ) : row.original.ustatus == 2 ? (
              <span>
                <button type="button" className="btn btn-danger statusBtn statusRejected">
                  Rejected
                </button>
              </span>
            ) : null}
          </span>
        ),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {row.original.ustatus != 0 ? null : (
              <>
                <button
                  style={{ marginRight: "5px" }}
                  type="button"
                  onClick={() => {
                    setAction('approve');
                    toggleModal(row.original.id); // Pass 'id' to the toggleModal function
                  }}
                  className="btn btn-success statusBtn statusApproved mr-1"
                >
                  <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "}

                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAction('reject');
                    toggleModal(row.original.id); // Pass 'id' to the toggleModal function
                  }}
                  className="btn btn-danger statusBtn statusRejected ml-2"
                >
                  <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "}

                  Reject
                </button>
              </>
            )}
            <Link to={`/member-approval/${row.original.id}`} style={{ textDecoration: "none" }}>
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

  document.title = "GLCL";

  return (
    <div className="page-content picBg">
       <ToastContainer />
      <Breadcrumbs title="Tables" breadcrumbItem="NEW MEMBER VERIFICATION" />
      <Card className="defCard">
        <CardBody>
          <CardTitle className="mb-3 cardTitle">List of New Members</CardTitle>
          <div className="container-fluid">



            <div className="p-3">
              <Nav tabs>
                <NavItem className="me-3" >
                  <NavLink
                    className={classnames("ms-3 Nav-link", {
                      active: activeTab === "1",
                      inactive: activeTab !== "1", // Add a class for inactive tabs
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Pending Approval
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames("Nav-link", {
                      active: activeTab === "2",
                      inactive: activeTab !== "2", // Add a class for inactive tabs
                    })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Rejected Approval
                  </NavLink>
                </NavItem>
              </Nav>


              <TabContent activeTab={activeTab} className="p-3 text-muted">
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      {/* <div className="d-print-none mt-4">
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
                      </div> */}
                      <TableContainer columns={columns} data={data} isAddOptions={false} customPageSize={10} />

                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <TableContainer columns={columns2} data={dataRejected} isAddOptions={false} customPageSize={10} />
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal className="modal-dialog-centered" isOpen={modalOpen} toggle={toggleModal}>
        <ModalBody>
          <div>
            <div className="approval-popup">
              <i class="fas fa-question-circle"></i>
            </div>
            <div className="std_font text-center">
              Are you sure to {action === "approve" ? "approve" : "reject"} this user?
            </div>
          </div>
          <div className="approval-popup-btn">
            <Button color="warning" className="modalCancelBtn me-2" outline onClick={toggleModal}>
              Cancel
            </Button>{" "}
            <Button color="primary" className="modalConfirmBtn" onClick={confirmAction}
            >
              Confirm
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default NewMemberVerification;
