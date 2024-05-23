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
import ReactApexChart from "react-apexcharts";
import { text } from "@fortawesome/fontawesome-svg-core";
import goldBar from "../../../../assets/images/users/gold_bars.png";

const GoldPawnUserView = () => {
    document.title = "GLCL";
    const { id } = useParams();

    const [data, setUserData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [walletbal, setwalletbal] = useState([]);
    const [overallbal, setoverallbal] = useState([]);
    const [username, setusername] = useState([]);
    const [membership_id, setmembership_id] = useState([]);

    const [loandetails, setloandetails] = useState([]);

    get(`${apiname.loaniddetails}/${id}`)
    .then((updatereslist) => {
       if (updatereslist.status == "404") {
           setloandetails("");
       }else{
        // console.log("updatereslist");
        // console.log(updatereslist.data.result);
        setloandetails(updatereslist.data.result);
        setUserData(updatereslist.data.result.LoanTransactions)
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
                            return `MYR 667.00`;
                        }
                    },

                }
            }
        },
        colors: ['#d4a437',],
        labels: ['Series 1']
    };

    
 

   

    

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
                            <Card className="mt-3" style={{ backgroundColor: "#090f2f" }}>

                                <CardBody>

                                    <Row>
                                        <Col lg={6}>
                                            <Card className="defCard" style={{ background: "none", border: "2px solid #9b7700" }}>
                                                <CardBody className="align-content-center">
                                                    <div>
                                                        <div className="text-gold">
                                                            <div className="text-center">
                                                                <div className="mt-2">
                                                                    <h4 className=" std_font inter_bold">
                                                                        Gold Coin Pawn Request
                                                                    </h4>
                                                                </div>
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
                                                                        <h4 className="">Gold Weight</h4>
                                                                        <h4 className="text-white"> {loandetails.gold_grams}<span className="">g</span></h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-5 smFont" style={{ borderBottom: "1px solid" }}>
                                                                <div className="inter_regular">
                                                                    <div className="mb-3">Gold Coin Pawned</div>
                                                                    <div className="mb-3">Gold Coin Serial Number</div>
                                                                    <div className="mb-3">Subtotal</div>
                                                                </div>
                                                                <div className="inter_regular mb-2 text-end">
                                                                    <div className="mb-3">{loandetails.gold_grams} g</div>
                                                                    {/* <div className="mb-3">GLCL0001-GLCL0002</div> */}
                                                                    <div className="mb-3">{loandetails.amount} </div>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-3 smFont">
                                                                <div className="inter_regular">
                                                                    <div>Amount Loaned</div>
                                                                </div>
                                                                <div className="inter_regular mb-2 text-end">
                                                                    <div>{loandetails.amount} </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg={6}>
                                            <Card className="defCard" style={{ background: "none", border: "2px solid #9b7700" }}>
                                                <CardBody className="align-content-center">
                                                    <div>
                                                        <div className="">
                                                            <div className="text-center">
                                                                <div className="" id="radialchart-1" >
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
                                                            <div className="row text-gold p-2 smFont" style={{ border: "2px solid #9b7700", borderRadius: "15px" }}>
                                                                <div className="text-center col-6 ">
                                                                    Total Loan Paid
                                                                    <div className="text-white">RM 447.00</div>
                                                                </div>
                                                                <div className="text-center col-6">
                                                                    Loan Unpaid
                                                                    <div className="text-white">RM 149.00</div>
                                                                </div>
                                                            </div>
                                                            <div className="row text-gold mt-3 p-2 smFont" style={{ border: "2px solid #9b7700", borderRadius: "15px" }}>
                                                                <div className="text-center col-4">
                                                                    <div className="text-white">Current Monthly Payment</div>
                                                                    <div className=""> RM 100.00</div>
                                                                   
                                                                </div>
                                                                <div className="text-center col-4">
                                                                <div className="text-white">Current Monthly Payment</div>
                                                                    Mon, 28 July 
                                                                    <br></br>
                                                                    In 17 days
                                                                </div>
                                                                <div className="text-center col-4">
                                                                <div className="text-white">Loan Period</div>
                                                                  
                                                                   <br></br>
                                                                   {loandetails.installement_months} months
                                                                </div>
                                                            </div>
                                                         

                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
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
            </div>
        </React.Fragment>
    );
};

export default GoldPawnUserView;
