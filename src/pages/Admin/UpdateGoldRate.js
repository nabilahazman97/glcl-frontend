// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../..//components/Common/TableContainer";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as apiname from "../../helpers/url_helper";
import { del, get, post, put } from "../../helpers/api_helper";
import classnames from "classnames";
import goldBar from "../../assets/images/users/gold_bars.png";
import Select from "react-select";

//  import './style';

function UpdateGoldRate() {
  const [data, setUserData] = useState([]);
  const [modal_transaction_summary, setmodal_transaction_summary] =
    useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [togModalApproved, setTogModalApproved] = useState(false);
  const [togModalRejected, setTogModalRejected] = useState(false);
  const [valueGoldRate, setValueGoldRate] = useState("");
  const [valueGoldRate1, setValueGoldRate1] = useState("");
  const [valueGoldRate2, setValueGoldRate2] = useState("");
  const [valueGoldRate3, setValueGoldRate3] = useState("");
  const [currentgoldrate, setcurrentmarketrate] = useState("");

  const [editing, setEditing] = useState(false);
  const [editing1, setEditing1] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValueGoldRate(event.target.value);
  };

  const handleChange1 = (event) => {
    setValueGoldRate1(event.target.value);
  };

  // Function to handle span click and toggle editing state
  const handleSpanClick = () => {
    setEditing(true);
  };

  const handleSpanClick1 = () => {
    setEditing1(true);
  };

  // Function to handle input blur and update editing state
  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleInputBlur1 = () => {
    setEditing1(false);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = () => {
    setIsOpen(false);
  };

  function tog_transaction_summary() {
    setmodal_transaction_summary(!modal_transaction_summary);
    removeBodyCss();
  }

  function tog_assign_gold() {
    setTogModalAssignGold(!togModalAssignGold);
    // setTogModal1(false)
    removeBodyCss();
  }

  function tog_reason_reject() {
    setTogModalReasonReject(!togModalReasonReject);
    // setTogModal1ReasonReject(false)
    removeBodyCss();
  }

  // get current gold rate

  get(apiname.getcurrentgoldrate)
    .then((getres) => {
      if (getres.status == "201") {
        if (getres.data.data.custom_rate_916 !== null) {
          setValueGoldRate2(getres.data.data.custom_rate_999);
          setValueGoldRate3(getres.data.data.custom_rate_916);
        }
        setcurrentmarketrate(getres.data.data.rate_916);
      } else {
        console.log("failed to get data");
        // setValueGoldRate('')
        // setValueGoldRate1('')
        setcurrentmarketrate("");
      }
    })
    .catch((err) => console.log(err));

  function tog_approved() {
    let obj = {
      custom_rate_916: valueGoldRate1 ? valueGoldRate1 : valueGoldRate3,
      custom_rate_999: valueGoldRate ? valueGoldRate : valueGoldRate2,
    };

    post(apiname.updategoldrate, obj)
      .then((res) => {
        if (res.status == "201") {
          setTogModalApproved(!togModalApproved);
          setTimeout(() => {
            setTogModalApproved(togModalApproved);
            window.location.reload();
          }, 8000);
        } else {
          setTogModalRejected(!togModalRejected);
          setTimeout(() => {
            setTogModalRejected(togModalRejected);
            window.location.reload();
          }, 8000);
        }
      })
      .catch((err) => console.log(err));
  }
  function tog_rejected() {
    setTogModalRejected(!togModalRejected);
    // setTogModal(false)
    removeBodyCss();
    function tog_varyingModal() {
      setVaryingModal(!varyingModal);
    }
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  //meta title
  document.title = "GLCL";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Update Gold Rate" />
        <div className="d-flex justify-content-end mb-3">
          <div style={{ position: "relative" }}>
            <span className="tecolor">Current Gold Rate:</span> RM{" "}
            {currentgoldrate}
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            {/* Left Column */}

            <div className="col-lg-6 mb-4">
              <p style={{ color: "#090f2f" }}>
                
              </p>
              <Card
                className="defCard p-3"
                style={{
                  minHeight: "180px",
                  backgroundColor: "#090f2f",
                  color: "white",
                }}
              >
                <CardBody>
                  <div className="text-center std_font mb-4">
                    Market Gold Rate:
                    <br></br>
                    <h6>999 (24 karat)</h6>
                  </div>
                  <h1 className="text-center inter_bold">
                    <span>RM 312</span> /g
                  </h1>
                </CardBody>
              </Card>
            </div>

            {/* Right Column */}
            <div className="col-lg-6 mb-4">
              <p style={{ color: "#090f2f" }}>
                
              </p>
              <Card
                className="defCard p-3"
                style={{
                  minHeight: "180px",
                  backgroundColor: "#090f2f",
                  color: "white",
                }}
              >
                <CardBody>
                  <div className="text-center std_font mb-4">
                    Market Gold Rate:
                    <br></br>
                    <h6>916 (22 karat)</h6>
                  </div>
                  <h1 className="text-center inter_bold">
                    <span>RM 312</span> /g
                  </h1>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* 2 nd row */}
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-6 mb-4">
              <Card
                className="defCard p-3"
                style={{
                  minHeight: "180px",
                  backgroundColor: "#d4af37",
                  color: "white",
                }}
              >
                <CardBody>
                  <div className="text-center std_font mb-4">
                    GLCL Gold Rate:
                    {valueGoldRate2 ? `updated value: ${valueGoldRate2}` : ""}
                  </div>
                  <h1 className="text-center inter_bold">
                    RM{" "}
                    <span onClick={handleSpanClick}>
                      {editing ? (
                        <input
                          className="normal-input"
                          type="text"
                          value={valueGoldRate}
                          onChange={handleChange}
                          onBlur={handleInputBlur}
                          autoFocus // Focus the input field when editing starts
                          style={{ maxWidth: "150px" }}
                        />
                      ) : (
                        valueGoldRate || "__"
                      )}
                    </span>{" "}
                    <br></br>
                  </h1>
                </CardBody>
              </Card>
            </div>

            {/* Right Column */}
            <div className="col-lg-6 mb-4">
              <Card
                className="defCard p-3"
                style={{
                  minHeight: "180px",
                  backgroundColor: "#d4af37",
                  color: "white",
                }}
              >
                <CardBody>
                  <div className="text-center std_font mb-4">
                    GLCL Gold Rate:
                    {valueGoldRate3 ? `updated value: ${valueGoldRate3}` : ""}{" "}
                  </div>
                  <h1 className="text-center inter_bold">
                    RM{" "}
                    <span onClick={handleSpanClick1}>
                      {editing1 ? (
                        <input
                          className="normal-input"
                          type="text"
                          value={valueGoldRate1}
                          onChange={handleChange1}
                          onBlur={handleInputBlur1}
                          autoFocus // Focus the input field when editing starts
                          style={{ maxWidth: "150px" }}
                        />
                      ) : (
                        valueGoldRate1 || "__"
                      )}
                    </span>{" "}
                    <br></br>
                  </h1>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="stdBtn"
            onClick={() => {
              tog_transaction_summary();
            }}
            style={{ backgroundColor: "#1A2B88", color: "white" }}
          >
            Update
          </button>
        </div>

        {/* MODALS */}
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
          <div className="modal-body">
            <div className="">
              <div className="text-center"></div>

              <div className="text-center mt-4 modal-reject-icon">
                <i className="mdi mdi-alert-outline font-size-16 align-middle me-1 mb-2"></i>{" "}
                <h5 className="modal-title mb-5" id="staticBackdropLabel">
                  Are you sure you want to update gold rate for today?
                </h5>
              </div>
            </div>

            <Row className="mb-3">
              <div className="col-md-12 text-center">
                <Button
                  color="warning"
                  className="modalCancelBtn me-2"
                  outline
                  onClick={() => {
                    tog_transaction_summary(false);
                  }}
                >
                  Cancel
                </Button>{" "}
                <button
                  style={{ marginLeft: "5px" }}
                  type="button"
                  className="btn btn-success modalConfirmBtn mr-1"
                  onClick={() => {
                    tog_approved();
                  }}
                >
                  {/* <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "} */}
                  Yes
                </button>
                {/* REJECT MODAL */}
                {/* REJECT MODAL */}
              </div>
            </Row>
          </div>
        </Modal>
        {/* PURCHASE TRANSACTION SUMMARY */}

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
              Update Successful!
            </h5>
          </div>
          <ModalBody className="text-center">
            <p>The gold rate for today has been updated successfully.</p>
          </ModalBody>
        </Modal>
        {/* PURCHASE APPROVED */}

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
              Failed to update Gold coin Rate
            </h5>
          </div>
          <ModalBody className="text-center">
            <p>
              {/* The buyer will be notified regarding rejection and it's reason. */}
            </p>
          </ModalBody>
          <div className="text-center mb-3"></div>
        </Modal>
        {/* PURCHASE REJECTED */}

        {/* MODALS */}
      </div>
    </div>
  );
}
UpdateGoldRate.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default UpdateGoldRate;
