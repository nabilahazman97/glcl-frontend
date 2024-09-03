// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2pdf from 'html2pdf.js';

import {
  Modal,
  Row,
  Col,
  Card,
  Nav,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ModalBody,
  CardTitle,
  Input,
  Button,
} from "reactstrap";
import { format } from "date-fns";
//import components
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TableContainer from "../../../../components/Common/TableContainer";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as apiname from "../../../../helpers/url_helper";
import { del, get, post, put } from "../../../../helpers/api_helper";
import classnames from "classnames";
import goldBar from "../../../../assets/images/users/gold_bars.png";
import Select from "react-select";

function LoanApplicationList() {
  const [data, setUserData] = useState([]);
  const [data1, setUserData1] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [transiddata, setTransidData] = useState([]);
  const [modal_transaction_summary, setmodal_transaction_summary] =
    useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [togModalAssignGold, setTogModalAssignGold] = useState(false);
  const [togModalReasonReject, setTogModalReasonReject] = useState(false);
  const [togModalApproved, setTogModalApproved] = useState(false);
  const [togModalRejected, setTogModalRejected] = useState(false);
  const [textvalue, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {


    get(apiname.loanlist)
      .then((res) => {
        if (res.status == "404") {
          setUserData("");
        } else if(res.status == "200") {
          let filteredData = res.data.result;
          let filteredData1 = res.data.result.filter(
            (item) =>
                item.status_id === 3 && item.loan_type===6
        );
          if (startDate && endDate) {
            const startTimestamp = startDate.getTime();
            const endTimestamp = endDate.getTime();
            filteredData1 = filteredData1.filter((item) => {
              const itemDate = new Date(item.createdAt).getTime();
              return itemDate >= startTimestamp && itemDate <= endTimestamp;
            });
          }

          setUserData(filteredData);
          setUserData1(filteredData1);
          // console.log("filteredData");
          // console.log(filteredData);
          // console.log(filteredData1);
        }
      })
      .catch((err) => console.log(err));

    get(apiname.Goldvaultlist)
      .then((reslist) => {
        if (reslist.status == 200) {
          let getdropdown = reslist.data.result.filter(
            (item) => item.userId == null
          );
          const dropdownOptions = getdropdown.map((item) => ({
            value: item.id,
            label: item.barcode,
          }));
          setOptions(dropdownOptions);
        } else {
          setOptions("");
        }
      })
      .catch((err) => console.log(err));
  }, [startDate, endDate]);

  const toggle = (tab) => {
    if (tab == 1) {
      const filternonapprovedadata = data.filter(
        (item) =>  item.status_id === 3 && item.loan_type===6
      );
      setUserData1(filternonapprovedadata);
    } else if (tab == 2) {
      const filterapprovedadata = data.filter(
        (item) =>
            item.status_id === 1 && item.loan_type===6
    );
      setUserData1(filterapprovedadata);
    } else if (tab == 3) {
      const filterapprovedadata = data.filter((item) => item.status_id === 2 && item.loan_type===6);
      setUserData1(filterapprovedadata);
    }

    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "User.username",
      },

      {
        Header: "Email Address",
        accessor: "User.email_id",
      },

      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => <span>{value} </span>,
      },

      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {row.original.status_id !== 3 ? (
  <Link to="">
    <button
      type="button"
      className="btn btn-primary"
      disabled
    >
      ACTION
    </button>
  </Link>
) : (
  <Link to={`/admin-svarna-roka-agrima/loan-application-details/${row.original.id}/${row.original.user_id}`} disabled>
    <button
      type="button"
      className="btn btn-primary"
      
    >
      ACTION
    </button>
  </Link>
)}
            {/* <Link to={`/admin-svarna-roka-agrima/loan-application-details/${row.original.id}`}>
            <button
              type="button"
              className="btn btn-primary "
              // onClick={() => {
              //   tog_transaction_summary(row.original.id);
              // }}
              disabled={row.original.status_id !== 3}
            >
              ACTION
            </button>
            </Link> */}
          </div>
        ),
      },
    ],
    []
  );

  const printInvoice = () => {
    window.print();
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB"); // Format the date as dd/mm/yyyy
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = () => {
    setIsOpen(false);
  };

  function tog_transaction_summary(id) {
    setmodal_transaction_summary(!modal_transaction_summary);
    removeBodyCss();
    get(`${apiname.getbytransactionid}/${id}`)
      .then((res) => {
        if (res.status == "204") {
          setTransidData("");
        } else {
          let filteredData = res.data.result;
          setTransidData(filteredData);
        }
      })
      .catch((err) => console.log(err));
  }

  function tog_assign_gold(transactionid) {
    setTogModalAssignGold(!togModalAssignGold);
    // setTogModal1(false)
    removeBodyCss();

    
  }

  function tog_reason_reject() {
    setTogModalReasonReject(!togModalReasonReject);
    // setTogModal1ReasonReject(false)
    removeBodyCss();
  }

  const handleSelectChange = (selectedOption) => {
    // console.log("selectedOption");
    // console.log(selectedOption);
    if (selectedOption) {
      setSelectedId(selectedOption);
    } else {
      setSelectedId(null);
    }
  };

  function tog_approved(transactionid, userId) {
    // setTogModal(false)
    removeBodyCss();
    function tog_varyingModal() {
      setVaryingModal(!varyingModal);
    }

    console.log("selectedId");
    console.log(selectedId.length);

    //   if (!selectedId) {
    //     // If no value is selected, set an error message
    //     setErrorMessage1('Please select an option');
    //     return;
    // }

    if (selectedId.length === 0) {
      setErrorMessage1("Please select at least one option");
      return;
    } 

    // Reset error message if validation passes
    setErrorMessage1('');
    // selectedOptions.length

   

    // approve

      const approveid1 = {
      transactionId: transactionid,
      action: "approve",
    };

    post(apiname.approval, approveid1)
      .then((res) => {
        if (res.status == "204") {
          setUserData("");
        } else {
          let filteredData = res.data.result;
          setUserData(filteredData);
        }
      })
      .catch((err) => console.log(err));

    // gold vault update & serial number allocate
    const approveid = {
      transactionId: transactionid,
      goldvault_id: selectedId,
      userId: userId,
    };

    post(apiname.assigngoldcoin, approveid)
      .then((updateres) => {
        

        if (updateres.status == "200") {

         
          setTogModalApproved(!togModalApproved);
          setTimeout(() => {
            setTogModalApproved(togModalApproved);
            window.location.reload();
          }, 8000);
        } else {
        }
      })
      .catch((err) => console.log(err));
  }
  function tog_rejected(transactionid) {
    // setTogModal(false)
    removeBodyCss();
    function tog_varyingModal() {
      setVaryingModal(!varyingModal);
    }

    const approveid = {
      transactionId: transactionid,
      action: "reject",
      reject_reason: textvalue,
    };

    if (!textvalue.trim()) {
        // Set error message
        setErrorMessage('Reason for rejection is required.');
        // You can return, throw an error, or handle it as per your requirement
        return;
    } else {
        setErrorMessage(''); // Clear error message if textvalue is not empty
    }

  

    post(apiname.approval, approveid)
      .then((updateres1) => {
        if (updateres1.status == "200") {
          //   setUserData('');
          //   setTogModalApproved(!togModalApproved);
          setTogModalRejected(!togModalRejected);
          setTimeout(() => {
            setTogModalRejected(togModalRejected);
            window.location.reload();
          }, 8000);
        } else {
        }
      })
      .catch((err) => console.log(err));
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const exportToPDF = () => {
    const element = document.getElementById('contentToExport'); // Replace 'contentToExport' with the ID of the element you want to export

    html2pdf()
      .from(element)
      .save('document.pdf');
  };

  //meta title
  document.title = "GLCL";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="SVARNA ROKA AGRIMA SCHEME" />

        <Card className="defCard" style={{ minHeight: "250px" }}  id="contentToExport">
          <CardBody>
            <CardTitle className="cardTitle">Loan Request List</CardTitle>
            <div></div>
            <div className="d-print-none mt-4 d-flex justify-content-between">
              <div className="filterDate">
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
              <div className="">
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
          </CardBody>
          <div className="p-3">
            <Nav tabs>
              <NavItem className="me-3">
                <NavLink
                  className={classnames("ms-3 Nav-link", {
                    active: activeTab === "1",
                    inactive: activeTab !== "1", // Add a class for inactive tabs
                  })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Pending loan request 
                </NavLink>
              </NavItem>
              <NavItem className="me-3">
                <NavLink
                  className={classnames("Nav-link", {
                    active: activeTab === "2",
                    inactive: activeTab !== "2", // Add a class for inactive tabs
                  })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Approved loan request
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames("Nav-link", {
                    active: activeTab === "3",
                    inactive: activeTab !== "3", // Add a class for inactive tabs
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Rejected loan request
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="p-3 text-muted">
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <TableContainer
                      columns={columns}
                      data={data1}
                      // isGlobalFilter={true}
                      isAddOptions={false}
                      customPageSize={10}
                      className="custom-header-css"
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <TableContainer
                    columns={columns}
                    data={data1}
                    // isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <TableContainer
                    columns={columns}
                    data={data1}
                    // isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </Card>

        {/* MODALS */}

        {/* PURCHASE */}

        {/* PURCHASE TRANSACTION SUMMARY */}
        <Modal
          className="modal-dialog modal-lg"
          isOpen={modal_transaction_summary}
          toggle={() => {
            // tog_center();
            tog_transaction_summary();
          }}
          centered
        >
          <div className="modal-header" style={{ backgroundColor: "#f5eded" }}>
            <h5 className="modal-title mt-0 cardTitle">Transaction Summary</h5>
            <button
              type="button"
              onClick={() => {
                setmodal_transaction_summary(false);
              }}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#f5eded" }}>
            <Card className="defCard" style={{ background: "#090F2F" }}>
              <CardBody>
                <div className="card-line p-3">
                  <div className="text-center">
                    <CardTitle className="text-gold">Payment Summary</CardTitle>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <div className="text-center align-content-center">
                      <img src={goldBar} alt="" className="avatar-md" />
                    </div>
                    <div className="text-center">
                      <div className="mt-2">
                        <h4 className="text-white">Gold Weight</h4>
                        <h4 className="text-gold">
                          {" "}
                          {transiddata.gold_grams}
                          <span className="">g</span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-between mt-3"
                    style={{ borderBottom: "2px solid #D4AF37" }}
                  >
                    <div>
                      <div className="text-gold">Gold Price</div>
                      <div className="text-gold">Weight</div>
                      <div className="text-gold">Subtotal</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-gold"> RM {transiddata.amount} </div>
                      <div className="text-gold">
                        {transiddata.gold_grams} g
                      </div>
                      <div className="text-gold">RM {transiddata.amount}</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <div className="text-gold">Grand Total</div>
                      <div className="text-gold">Payment Status</div>
                    </div>
                    <div className="mb-2">
                      <div className="text-gold">RM {transiddata.amount}</div>
                      <div className="" style={{ color: "#28be1b" }}>
                        Successful
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Row className="mb-3">
              <div className="col-md-12 text-center">
                <button
                  style={{ marginRight: "5px" }}
                  type="button"
                  className="btn btn-success approveBtn statusApproved mr-1"
                  onClick={() => {
                    tog_assign_gold(transiddata.id);
                  }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-danger rejectBtn statusRejected ml-2"
                  onClick={() => {
                    tog_reason_reject();
                  }}
                >
                  Reject
                </button>

                {/* REJECT MODAL */}

                {/* REJECT MODAL */}
              </div>
            </Row>
          </div>
        </Modal>
        {/* PURCHASE TRANSACTION SUMMARY */}

        {/* ASSIGN GOLD COIN */}
        <Modal
          isOpen={togModalAssignGold}
          toggle={() => {
            // tog_toggleModal();
            tog_assign_gold();
          }}
          centered
        >
          {" "}
          <ModalBody>
            <div className="d-flex justify-content-between mb-3">
              <h5 className="modal-title" id="staticBackdropLabel">
                Assign Gold Coin
              </h5>
            </div>

            <label>Serial Number</label>
            <div>
            <Select
              name="goldsnumber"
              options={options}
              // placeholder={"Ethnicity"}
              onChange={handleSelectChange}
              className="select2-selection text_1"
              isMulti
            />
            {errorMessage1 && <div style={{ color: 'red' }}>{errorMessage1}</div>}
            </div>
          </ModalBody>
          <div className="text-center mb-3 mt-3">
            <Button
              color="warning"
              className="modalCancelBtn me-2"
              outline
              onClick={() => {
                tog_assign_gold();
              }}
            >
              Cancel
            </Button>{" "}
            <Button
              color="primary"
              className="modalConfirmBtn"
              onClick={() => {
                tog_approved(transiddata.id, transiddata.user_id);
              }}
            >
              Submit
            </Button>
          </div>
        </Modal>
        {/* ASSIGN GOLD COIN */}

        {/* PURCHASE APPROVED */}
        <Modal
          isOpen={togModalApproved}
          toggle={() => {
            tog_approved();
          }}
          centered
        >
          <div className="text-center mt-4 modal-approved-icon">
            <i className="bx bxs-check-circle font-size-16 align-middle me-1 mb-2"></i>{" "}
            <h5 className="modal-title" id="staticBackdropLabel">
              Gold Coin Purchase Approved
            </h5>
          </div>
          <ModalBody className="text-center">
            {/* <p>The buyer will be notified regarding approval.</p> */}
          </ModalBody>
          <div className="text-center mb-3"></div>
        </Modal>
        {/* PURCHASE APPROVED */}

        {/* REASON REJECT */}
        <Modal
          isOpen={togModalReasonReject}
          toggle={() => {
            tog_reason_reject();
          }}
          centered
        >
          {" "}
          <ModalBody>
            <div className="text-center mt-4 modal-reject-icon">
              <i className="mdi mdi-alert-outline font-size-16 align-middle me-1 mb-2"></i>{" "}
              <h5 className="modal-title" id="staticBackdropLabel">
                Are you sure you want to reject this purchase? Please state the
                reason.
              </h5>
            </div>
            <div>
            <Input
              type="textarea"
              name=""
              id="textarea"
              className="login-textarea mt-3"
              value={textvalue}
              onChange={handleChange}
              maxLength="50"
              rows="4"

              // placeholder="Home Address"
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
          </ModalBody>
          <div className="text-center mb-3 mt-3">
            <Button
              color="warning"
              className="modalCancelBtn me-2"
              outline
              onClick={() => {
                tog_reason_reject(false);
              }}
            >
              Cancel
            </Button>{" "}
            <Button
              color="primary"
              className="modalConfirmBtn"
              onClick={() => {
                tog_rejected(transiddata.id);
              }}
            >
              Yes
            </Button>
          </div>
        </Modal>
        {/* REASON REJECT */}

        {/* PURCHASE REJECTED */}
        <Modal
          isOpen={togModalRejected}
          toggle={() => {
            tog_rejected();
          }}
          centered
        >
          <div className="text-center mt-4 modal-rejected-icon">
            <i className="mdi mdi-close-circle font-size-16 align-middle me-1 mb-2"></i>{" "}
            <h5 className="modal-title" id="staticBackdropLabel">
              Gold Coin Purchase Rejected
            </h5>
          </div>
          <ModalBody className="text-center">
            <p>
              {/* The buyer will be notified regarding rejection and it's reason. */}
            </p>
          </ModalBody>
          <div className="text-center mb-3">
            {/* <Button
              color="primary"
              className="modalConfirmBtn"
              data-bs-target="#firstmodal"
              onClick={() => {
                tog_reason_reject(false);
                tog_rejected(false);
                setmodal_transaction_summary(false);
              }}
            >
              Ok
            </Button> */}
          </div>
        </Modal>
        {/* PURCHASE REJECTED */}

        {/* PURCHASE */}

        {/* SELLING */}
        {/* SELLING */}

        {/* MODALS */}
      </div>
    </div>
  );
}
LoanApplicationList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};
export default LoanApplicationList;
