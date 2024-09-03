import React, { useState, useEffect, useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
// import html2pdf from 'html2pdf.js';
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

const LoanApprovedDetails = () => {
    document.title = "GLCL";
    // const { Uid } = useParams();

    const { id } = useParams();
    const { userid } = useParams();
    console.log("lid");
    console.log(id);

    const [data, setUserData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [walletbal, setwalletbal] = useState([]);
    const [overallbal, setoverallbal] = useState([]);
    const [username, setusername] = useState([]);
    const [membership_id, setmembership_id] = useState([]);
    const [loandetails, setloandetails] = useState([]);
    const [profile, setprofiledetails] = useState([]);
    const [totalpaid, SetTotalpaid] = useState([]);
    const [totalOutstanding, settotalpending] = useState([]);
    const [overallamount, setoverallamount] = useState([]);
    const [curmpayamount, setcurrentMonthPayAmount] = useState([]);
    const [paymentstatus,setdaysLeftToPay]= useState([]);
    const [duedate,setdueDate]= useState([]);
    

    post(apiname.p_userdetails, { id: userid })
    .then((res) => {
     
      if (res.status === '204') {
          setusername('');
        setmembership_id('');
      } else {
        let filteredData = res.data.result[0];
        setusername(filteredData.username);
        setmembership_id(filteredData.membership_id);

     
      }

    })
    .catch((err) => console.log(err));


    get(`${apiname.loaniddetails}/${id}`)
    .then((updatereslist) => {

       
       
       if (updatereslist.status == "404") {
           setloandetails("");
           setUserData('')
       }else{
        
        setloandetails(updatereslist.data.result);
        

      let  loanTransactions=updatereslist.data.result.LoanTransactions;

   
let totalPaid = 0;
let totalOutstanding = 0;
let overallamount=0;

for (const transaction of loanTransactions) {
    overallamount += parseFloat(transaction.total_amount);
    setoverallamount(overallamount);
    // if (transaction.transaction_id) {
        if (transaction.status_id === 7) {
        totalPaid += parseFloat(transaction.total_amount);
        SetTotalpaid(totalPaid.toFixed(2));
        }
    // } else {
        if (transaction.status_id === 6) {
        totalOutstanding += parseFloat(transaction.total_amount);
        settotalpending(totalOutstanding.toFixed(2));
        }
    // }
}

// const currentMonth1 = new Date().getMonth() + 1; // Get the current month (1-based index)
// const currentYear1 = new Date().getFullYear(); // Get the current year

// const currentMonthTransactions = loanTransactions.filter(transaction => {
//     const dueDate = new Date(transaction.payment_due_date);

//     console.log("dueDate");
// console.log(currentMonth1 );


//     return dueDate.getMonth() + 1 === currentMonth1 && dueDate.getFullYear() === currentYear1;
// });

// if(!(currentMonthTransactions)){
// let currentMonthPayAmount = 0;
// for (const transaction of currentMonthTransactions) {
//     currentMonthPayAmount += parseFloat(transaction.total_amount);
//     setcurrentMonthPayAmount(currentMonthPayAmount);
// }

// let daysLeftToPay = null;
// let status = '';

// if (currentMonthTransactions.some(transaction => !transaction.transaction_id)) {
//     // Calculate days left until payment due date
//     const dueDate = new Date(currentMonthTransactions[0].payment_due_date);
//     const currentDate = new Date();
//     daysLeftToPay = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
//     setdaysLeftToPay(daysLeftToPay);
//     setdueDate(moment(currentMonthTransactions[0].payment_due_date).format('YYYY-MM-DD'));
// } else {
//     daysLeftToPay = 'Paid';
//     const dueDate = new Date(currentMonthTransactions[0].payment_due_date);
//     setdaysLeftToPay(daysLeftToPay);
//     setdueDate(moment(currentMonthTransactions[0].payment_due_date).format('YYYY-MM-DD'));
// }
// }


        if(updatereslist.data.result.LoanTransactions.length>0){
            console.log("updatereslist");
            console.log(updatereslist.data.profile);

            setUserData(updatereslist.data.result.LoanTransactions)
            setprofiledetails(updatereslist.data.profile);
        }else{
            setUserData("");
            setprofiledetails("");
        }
      
       }
    
      })
.catch((err) => console.log(err))


const exportToPDF = () => {
    const element = document.getElementById('contentToExport'); // Replace 'contentToExport' with the ID of the element you want to export

    html2pdf()
      .from(element)
      .save('document.pdf');
  };





const percentage = ((totalpaid / overallamount) * 100).toFixed(2);

const seriesData = [percentage,totalpaid];


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
                        return `${totalpaid}`; // Print totalpaid here
                    }
                },
            }
        }
    },
    colors: ['#d4a437'],
    labels: ['percentage','totalpaid']
};








 
       
        
    const comp = "Completed";
    const columns = useMemo(
        () => [
            {
                Header: "Date",
                accessor: "payment_due_date",
                Cell: ({ value }) => moment(value).format("DD/MM/YYYY")
                // Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
            },
            {
                Header: "Amount (RM)",
                accessor: "total_amount",
            },

            {
                Header: "Status",
                accessor: "status_id",
                Cell: ({ value }) => {
                    return value === 7 ? "Paid" : "Not Paid";
                  }
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
                                                    <div className="p-3">
                                                        <div className="">
                                                            <div className="text-center">
                                                                <div className="mt-3">
                                                                    <h4 className="text-dark std_font inter_bold">
                                                                        Loan Application
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-5 smFont">
                                                                <div className="inter_regular col-md-6">
                                                                    <div className="mb-3">Loan Amount</div>
                                                                    <div className="mb-3">Loan Duration</div>
                                                                    <div className="mb-3">Interest Rate</div>
                                                                    <div className="mb-3">Preferred Bank</div>
                                                                    <div className="mb-3">Bank Number</div>
                                                                    <div className="mb-3">Name According to Bank</div>
                                                                    {/* <div className="mb-3">Installment Amount</div> */}
                                                                </div>
                                                                <div className="inter_regular col-md-6 text-end">
                                                                <div className="mb-3">{loandetails.amount}</div>
                                                                    <div className="mb-3">{loandetails.installement_months}&nbsp;months</div>
                                                                    <div className="mb-3">{loandetails.interest_rate}&nbsp; %</div>
                                                                    <div className="mb-3">{profile.bankName}</div>
                                                                    <div className="mb-3">{profile.accountNumber}</div>
                                                                    <div className="mb-3">{profile.accountHolderName}</div>
                                                                    {/* <div className="mb-3">RM 337.33</div> */}
                                                                </div>
                                                            </div>
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
                                                            {/* <div className="d-flex justify-content-between align-content-start p-3 gap-3"> */}
                                                            <div className="row text-gold p-2 smFont" style={{ border: "2px solid #9b7700", borderRadius: "15px" }}>
                                                                <div className="text-center col-4 ">
                                                                    Total Loan Paid
                                                                    <div className="text-white">{totalpaid}</div>
                                                                </div>
                                                                <div className="text-center col-4">
                                                                    Loan Unpaid
                                                                    <div className="text-white">{totalOutstanding}</div>
                                                                </div>

                                                                <div className="text-center col-4">
                                                                Loan Period
                                                                    <div className="text-white">{loandetails.installement_months} months</div>
                                                                </div>


                                                            </div>
                                                            {/* <div className="row text-gold mt-3 p-2 smFont" style={{ border: "2px solid #9b7700", borderRadius: "15px" }}>
                                                                <div className="text-center col-4"> */}
                                                                    {/* <div className="text-white">Current Monthly Payment</div>
                                                                    <div className=""> {curmpayamount}</div> */}
                                                                   
                                                                {/* </div>
                                                                <div className="text-center col-4"> */}
                                                                {/* <div className="text-white">Current Monthly Payment</div>
                                                                {duedate}
                                                                    <br></br>
                                                                    In {paymentstatus} days */}
                                                                {/* </div>
                                                                <div className="text-center col-4">
                                                                <div className="text-white">Loan Period</div>
                                                                  
                                                                   <br></br>
                                                                   {loandetails.installement_months} months
                                                                </div>
                                                            </div> */}
                                                            {/* <Card className="text-center" style={{ background: "none", backgroundColor: "none", width:'150px',border:'1px solid black' }}>                                                           
                                                             <CardBody className="">
                                                                <div className="lgFont text-dark-gold mb-2">0</div>
                                                                <div className="std_font inter_bold">Overdue Loan</div>
                                                            </CardBody>
                                                            </Card>
                                                            <Card className="text-center" style={{ background: "none", backgroundColor: "none", width:'150px',border:'1px solid black' }}>  
                                                            <CardBody className="">
                                                                 <div className="lgFont text-dark-gold mb-2">4/15</div>
                                                                <div className="std_font inter_bold">Loan Period Month</div>
                                                            </CardBody>
                                                            </Card>
                                                            <Card className="text-center" style={{ background: "none", backgroundColor: "none", width:'150px',border:'1px solid black' }}>
                                                            <CardBody className="">
                                                            <div className="lgFont text-dark-gold mb-2">1</div>
                                                                <div className="std_font inter_bold">Active Loan</div>
                                                            </CardBody>
                                                            </Card> */}
                                                            {/* </div> */}

                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
                         
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
                            to="../../admin-svarna-roka-agrima/LoanApprovedList"
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

export default LoanApprovedDetails;
