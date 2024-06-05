import React, { useState, useEffect, useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    CardBody,
    Modal,
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
// import {  } from "react-router-dom";
 
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
 
const LoanApplicationDetails = () => {
    document.title = "GLCL";
    const { lid } = useParams();
    console.log("lid");
    console.log(lid);

    const navigate = useNavigate();


 
    const [username, setusername] = useState([]);
    const [membership_id, setmembership_id] = useState([]);
    const [modal_approved, setModal_approved] = useState(false);
    const [modal_reason_reject, setModal_reason_reject] = useState(false);
    const [modal_rejected, setModal_rejected] = useState(false);
    const [loandetails, setloandetails] = useState([]);
    const [profile, setprofiledetails] = useState([]);
    const [activeloan, setactiveloan] = useState([]);
    const [overdueloan, setoverdueloan] = useState([]);
    const [textvalue, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
      };


     // loaniddetails

     get(`${apiname.loaniddetails}/${lid}`)
     .then((updatereslist) => {
        if (updatereslist.status == "404") {
            setloandetails("");
        }else{
         console.log("updatereslist");
         console.log(updatereslist.data.result.Profile);
        
         setloandetails(updatereslist.data.result);
         setprofiledetails(updatereslist.data.result.Profile);
        }
     
       })

 .catch((err) => console.log(err))


//  get loan details

get(`${apiname.loandetail_userid}/${lid}`)
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
 
 
 
    function tog_approved() {

        const approveid = {
                 loanId:lid,
                action : "approve",
                comments : ""
          };

        post(apiname.loanapproval, approveid)
        .then((updateres) => {
          
  
          if (updateres.status == "200") {
  
           
            setModal_approved(!modal_approved);
            setTimeout(() => {
                setModal_approved(modal_approved);
                navigate("/admin-svarna-roka-agrima/loan-application-list");
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
            loanId:lid,
           action : "reject",
           comments :textvalue
     };

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
   
 
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs
                        title="Forms"
                        breadcrumbItem="SVARNA ROKA AGRIMA SCHEME"
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
                            <Card className="" style={{ backgroundColor: "#090f2f" }}>
 
                                <CardBody>
 
                                    <Row>
                                        <Col lg={6}>
                                            <Card className="defCard" style={{ background: "linear-gradient(90deg, rgba(212, 175, 55, 0.5) 10.69%, rgba(207, 180, 92, 0.295) 89.61%)", backgroundColor: "white" }}>
                                                <CardBody className="align-content-center">
                                                    <div>
                                                        <div className="p-2" style={{ border: "1px solid black", borderRadius: "25px" }}>
                                                            <div className="text-center">
                                                                <div className="mt-2">
                                                                    <h4 className="text-dark std_font inter_bold">
                                                                        Loan Request
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-4 smFont">
                                                                <div className="inter_regular col-md-6">
                                                                    <div className="mb-3">Loan Amount</div>
                                                                    <div className="mb-3">Loan Duration</div>
                                                                    <div className="mb-3">Interest Rate</div>
                                                                    <div className="mb-3">Preferred Bank</div>
                                                                    <div className="mb-3">Bank Number</div>
                                                                    <div className="mb-3">Name According to Bank</div>
                                                                    <div className="mb-3">Installment Amount</div>
                                                                </div>
                                                                <div className="inter_regular col-md-6 text-end">
                                                                    <div className="mb-3">{loandetails.amount}</div>
                                                                    <div className="mb-3">{loandetails.installement_months}&nbsp;months</div>
                                                                    <div className="mb-3">{loandetails.interest_rate}&nbsp; %</div>
                                                                    <div className="mb-3">{profile.bankName}</div>
                                                                    <div className="mb-3">{profile.accountNumber}</div>
                                                                    <div className="mb-3">{profile.accountHolderName}</div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center mt-3">
                                                            <button
                                                                style={{ marginRight: "5px" }}
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_approved();
                                                                  }}
                                                                className="btn btn-success approveBtn statusApproved mr-1"
 
                                                            >
                                                                <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "}
                                                                Approve
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_reason_reject();
                                                                  }}
                                                                className="btn btn-danger rejectBtn statusRejected ml-2"
 
                                                            >
                                                                <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "}
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg={6}>
                                            <Card className="defCard" style={{ background: "linear-gradient(90deg, rgba(212, 175, 55, 0.5) 10.69%, rgba(207, 180, 92, 0.295) 89.61%)", backgroundColor: "white" }}>
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
                                        </Col>
                                    </Row>
 
                                </CardBody>
                            </Card>
 
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
                            to="../../../admin-svarna-roka-agrima/loan-application-list/"
                            style={{ textDecoration: "none" }}
                        >
                            <button className="btn btn-primary backBtn">Back</button>
                        </Link>
                    </div>
                </Container>
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
             <p>The loan has been approved. An email will be sent to yusof89@gmail.com to notify them.</p>
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
                {/* <i className="mdi mdi-alert-outline font-size-16 align-middle me-1 mb-2"></i>{" "} */}
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
                Rejected
              </h5>
            </div>
            <ModalBody className="text-center">
              <p>
              The loan has been rejected
              </p>
            </ModalBody>
            <div className="text-center mb-3">
            {/* <Button
                color="primary"
                className="modalConfirmBtn"
                data-bs-target="#firstmodal"
                onClick={() => {
                    tog_rejected();(false);
                }}
              >
                Ok
              </Button> */}
            </div>
          </Modal>
            </div>
        </React.Fragment>
    );
};
 
export default LoanApplicationDetails;