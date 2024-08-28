import React, { useState, useEffect, useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {
    Row,
    Modal,
    Card,
    CardBody,
    FormGroup,
    Button,
    CardTitle,
    CardSubtitle,
    Label,
    Input,
    Container,
    ModalBody,
    Form,
} from "reactstrap";
// Formik validation

import { Link } from "react-router-dom";

import * as apiname from "../../../../helpers/url_helper";
import { useParams,useNavigate } from "react-router-dom";


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
import ReactApexChart from "react-apexcharts";
import { text } from "@fortawesome/fontawesome-svg-core";
import goldBar from "../../../../assets/images/users/gold_bars.png";

const GoldPawnRequestView = () => {
  document.title = "GLCL";
  const { id } = useParams();
  const { userid } = useParams();
  console.log("lid");
  console.log(userid);

  const navigate = useNavigate();



  const [username, setusername] = useState([]);
  const [membership_id, setmembership_id] = useState([]);
  const [modal_approved, setModal_approved] = useState(false);
  const [modal_reason_reject, setModal_reason_reject] = useState(false);
  const [modal_rejected, setModal_rejected] = useState(false);
  const [loandetails, setloandetails] = useState([]);
  const [textvalue, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [modal_amount_loan, setmodal_amount_loan] = useState(false);
  const [activeloan, setactiveloan] = useState([]);
  const [overdueloan, setoverdueloan] = useState([]);
  const handleChange = (event) => {
      setValue(event.target.value);
    };


   // loaniddetails

   get(`${apiname.loaniddetails}/${id}`)
   .then((updatereslist) => {
      if (updatereslist.status == "404") {
          setloandetails("");
      }else{
       console.log("updatereslist");
       console.log(updatereslist.data.result);
       setloandetails(updatereslist.data.result);
      }
   
     })
.catch((err) => console.log(err))

//  get loan details



get(`${apiname.loandetail_userid}/${userid}`)
.then((updatereslist) => {
   if (updatereslist.status == "200") {
    setactiveloan(updatereslist.data.result.active_loan_count)
    setoverdueloan(updatereslist.data.result.overdue_loan_count)
   }
  })
.catch((err) => console.log(err))

const seriesData = [80];
const options = {
    chart: {
        type: 'radialBar',
        height: 300,
        width: 300,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '50%'
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    show: true,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    offsetY: 10,

                },
                total: {
                    show: true,
                    label: 'Total',
                    fontSize: '12px',
                    fontWeight: 'normal',
                    fontFamily: 'Arial, sans-serif',
                    color: 'black',
                    formatter: function (val) {
                        return `-`;
                    }
                },

            }
        }
    },
    colors: ['#d4a437',],
    labels: ['Series 1']
};

 
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

  function tog_amount_loan() {
    // console.log("approveidfgg");
    // console.log(approveid);
    setmodal_amount_loan(!modal_amount_loan);
    removeBodyCss();
  }

  function tog_approved() {

      const approveid = {
               loanId:id,
              action : "approve",
              comments : textvalue
        };
        console.log("approveid");
        console.log(approveid);

        
   if (!textvalue.trim()) {
    // Set error message
    setErrorMessage('Reason for rejection is required.');
    // You can return, throw an error, or handle it as per your requirement
    return;
} 
setErrorMessage('');

      post(apiname.loanapproval, approveid)
      .then((updateres) => {
      
        if (updateres.status == "200") {

         
          setModal_approved(!modal_approved);
          setTimeout(() => {
              setModal_approved(modal_approved);
              navigate("/admin-svarna-ahita/index-list");
          //   window.location.reload();
          //   window.location.href = "admin-svarna-roka-agrima/loan-application-list";
          }, 8000);
        } else {
        }
      })
      .catch((err) => console.log(err));

      
    
      removeBodyCss();
    }
  function tog_reason_reject() {

      setModal_reason_reject(!modal_reason_reject);
//         const approveid = {
//             loanId:lid,
//            action : "reject",
//            comments :textvalue
//      };

//      if (!textvalue.trim()) {
//         // Set error message
//         setErrorMessage('Reason for rejection is required.');
//         // You can return, throw an error, or handle it as per your requirement
//         return;
//     } else {
//         setErrorMessage(''); // Clear error message if textvalue is not empty
//     }

//    post(apiname.loanapproval, approveid)
//    .then((updateres) => {
   

//      if (updateres.status == "200") {

    
//         setModal_reason_reject(!modal_reason_reject);
//        setTimeout(() => {
//         setModal_reason_reject(modal_reason_reject);
//          window.location.reload();
//        }, 8000);
//      } else {
//      }
//    })
//    .catch((err) => console.log(err));



  
      removeBodyCss();
    }
  function tog_rejected() {
      // setModal_rejected(!modal_rejected);

  const approveid = {
          loanId:id,
         action : "reject",
         comments :textvalue
   };
   

   console.log(approveid);

   if (!textvalue.trim()) {
      // Set error message
      setErrorMessage('Reason for rejection is required.');
      // You can return, throw an error, or handle it as per your requirement
      return;
  } 
  setErrorMessage('');
 post(apiname.loanapproval, approveid)
 .then((updateres) => {
   

   if (updateres.status == "200") {

    
      setModal_rejected(!modal_rejected);
     setTimeout(() => {
      setModal_rejected(modal_rejected);
      //  window.location.reload();
       navigate("/admin-svarna-roka-agrima/loan-application-list");
     }, 8000);
   } else {
   }
 })
 .catch((err) => console.log(err));
      removeBodyCss();
    }

    function removeBodyCss() {
      document.body.classList.add("no_padding");
    }

    function tog_amount_loan() {
        setmodal_amount_loan(!modal_amount_loan);
        removeBodyCss();
      }
      // function tog_approved() {
      //   setModal_approved(!modal_approved);
      //   removeBodyCss();
      // }

      function tog_reason_reject() {
        setModal_reason_reject(!modal_reason_reject);
        removeBodyCss();
      }
    // function tog_rejected() {
    //     setModal_rejected(!modal_rejected);
    //     removeBodyCss();
    //   }

      function removeBodyCss() {
        document.body.classList.add("no_padding");
      }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs
                        title="Forms"
                        breadcrumbItem="SVARNA AHITA SCHEME"
                    />
                    <div className="d-flex gap-3" id="contentToExport">
                        <div className="col-lg-12 p-0">
                            <Card

                                className="m-0"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, white 40%, #d1b66a 40%)",
                                    borderRadius: "25px 25px 0px 0px"
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
                            <Card className="mt-3 col-lg-6" style={{float:"right" }}>
                            <CardBody className="align-content-center">
                                                <div>
                                                        <div className="">
                                                            <div className="text-center">
                                                                <div className="" id="radialchart-1" style={{ borderBottom: "2px solid black" }}>
                                                                    <ReactApexChart
                                                                        options={options}
                                                                        series={seriesData}
                                                                        type="radialBar"
                                                                        height={200}
                                                                        width={200}
                                                                        className="apex-charts"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-content-start p-3 gap-3">
                                                            <Card className="text-center" style={{ background: "none", backgroundColor: "none", width:'150px',border:'1px solid black' }}>                                                          
                                                             <CardBody className="">
                                                                <div className="lgFont text-dark-gold mb-2">{overdueloan}</div>
                                                                <div className="std_font inter_bold">Overdue Loan</div>
                                                            </CardBody>
                                                            </Card>
                                                            {/* <Card className="text-center" style={{ background: "none", backgroundColor: "none", width:'150px',border:'1px solid black' }}>  
                                                            <CardBody className="">
                                                                 <div className="lgFont text-dark-gold mb-2">0</div>
                                                                <div className="std_font inter_bold">Loan Period Month</div>
                                                            </CardBody>
                                                            </Card> */}
                                                            <Card className="text-center" style={{ background: "none", backgroundColor: "none", width:'150px',border:'1px solid black' }}>
                                                            <CardBody className="">
                                                            <div className="lgFont text-dark-gold mb-2">{activeloan}</div>
                                                                <div className="std_font inter_bold">Active Loan</div>
                                                            </CardBody>
                                                            </Card>
                                                            </div>
 
                                                        </div>
                                                    </div>
                                                </CardBody>
                              </Card>
                            <Card className="mt-3 col-lg-6" style={{ backgroundColor: "#090f2f" }}>

                                <CardBody>

                                <div className="card-line p-3">
                                    <div className="text-center">
                                        <CardTitle className="text-gold">Gold Coin Pawn Request</CardTitle>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3 mt-3">
                                        <div className="text-center align-content-center">
                                            <img
                                                src={goldBar}
                                                alt=""
                                                className="avatar-md"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="mt-2">
                                                <h4 className="text-white">Gold Weight</h4>
                                                <h4 className="text-gold"> {loandetails.gold_grams}<span className="">g</span></h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-3 p-3 smFont">
                                        <div>
                                            <div className="text-gold mb-3">Gold Coin Pawned</div>
                                            {/* <div className="text-gold mb-3">Gold Coin Serial Number</div> */}
                                            <div className="text-gold mb-3">Loan Period</div>
                                            <div className="text-gold mb-3">Subtotal</div>
                                        </div>
                                        <div className="mb-3 text-end">
                                            <div className="text-gold mb-3">{loandetails.gold_grams} g</div>
                                            {/* <div className="text-gold mb-3">GLCL0001-GLCL0002</div> */}
                                            <div className="text-gold mb-3">{loandetails.installement_months}</div>
                                            <div className="text-gold mb-3">{loandetails.amount} &nbsp; </div>
                                        </div>
                                    </div>
                                </div>
                                <Row className="mb-3">
                            <div className="col-md-12 text-center mt-3">
                                <button
                                    style={{ marginRight: "5px" }}
                                    type="button"
                                    className="btn btn-success approveBtn statusApproved mr-1"
                                    onClick={() => {
                                        tog_amount_loan();
                                      }}

                                >
                                    {/* <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "} */}
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger rejectBtn statusRejected ml-2"
                                    onClick={() => {
                                        tog_reason_reject();
                                      }}
                                >
                                    {/* <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "} */}
                                    Reject
                                </button>
                              

                              

                            </div>
                        </Row>

                                </CardBody>
                            </Card>
                            {/* <Card className="mt-3 col-lg-6" style={{ backgroundColor: "#090f2f" }}>
                              hyg
                            </Card> */}


                            {/* <Card className="defCard">
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
                            </Card> */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-3 mb-3">
                        <Link
                            to="/admin-svarna-ahita/index-list"
                            style={{ textDecoration: "none" }}
                        >
                            <button className="btn btn-primary backBtn">Back</button>
                        </Link>
                    </div>
                </Container>

                <Modal
            isOpen={modal_amount_loan}
            toggle={() => {
                tog_amount_loan();
            }}
            centered
          >
            {" "}
            <ModalBody>
              <div className="text-center mt-4 modal-approved-icon">
              <i className="bx bxs-check-circle font-size-16 align-middle me-1 mb-2"></i>{" "}
                <h5 className="modal-title" id="staticBackdropLabel">
                  Approval of Gold Coin Pawn. <br></br>
                  Please insert the Amount of Loan to be given.
                </h5>
              </div>
              <div>
              <Input
                          id="name"
                          name="name"
                          className="form-control normal-input mt-3"
                          type="text"
                          value={textvalue}
                          onChange={handleChange}
                          required

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
                    tog_amount_loan(false);
                }}
                
              >
                Cancel
              </Button>{" "}
              <Button
                color="primary"
                className="modalConfirmBtn"
                onClick={() => {
                    tog_approved();
                    // tog_amount_loan(false);
                }}
              >
                Submit
              </Button>
            </div>
          </Modal>

          <Modal
                      isOpen={modal_approved}
                      toggle={() => {
                        tog_approved();
                      }}
                      centered
                    >
                      <div className="text-center mt-4 modal-approved-icon">
            <i className="bx bxs-check-circle font-size-16 align-middle me-1 mb-2"></i>{" "}
            <h5 className="modal-title" id="staticBackdropLabel">
              Approved Successfully !
            </h5>
          </div>
          <ModalBody className="text-center">
             <p>The loan has been approved. <br></br> 
            </p>
          </ModalBody>
          <div className="text-center mb-3">
             <Button
                color="primary"
                className="modalConfirmBtn"
                data-bs-target="#firstmodal"
                onClick={() => {
                    tog_approved();(false);
                }}
              >
                Ok
              </Button>
          </div>
                    </Modal>

                    <Modal
            isOpen={modal_reason_reject}
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
                  Are you sure you want to reject this Gold Coin Pawn? <br></br>
                  If yes, please state a reason.
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
                  tog_rejected();
                  tog_reason_reject(false);
                }}
              >
                Submit
              </Button>
            </div>
          </Modal>

          <Modal
            isOpen={modal_rejected}
            toggle={() => {
              tog_rejected();
            }}
            centered
          >
            <div className="text-center mt-4 modal-rejected-icon">
              <i className="mdi mdi-close-circle font-size-16 align-middle me-1 mb-2"></i>{" "}
              <h5 className="modal-title" id="staticBackdropLabel">
                Rejected!
              </h5>
            </div>
            <ModalBody className="text-center">
              <p>
              
              An email will be sent to yusof69@gmail.com to notify them.
              </p>
            </ModalBody>
            <div className="text-center mb-3">
            <Button
                color="primary"
                className="modalConfirmBtn"
                data-bs-target="#firstmodal"
                onClick={() => {
                    tog_rejected();(false);
                }}
              >
                Ok
              </Button>
            </div>
          </Modal>

            </div>
        </React.Fragment>
    );
};

export default GoldPawnRequestView;