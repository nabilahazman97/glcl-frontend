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

const GoldPawnRequestView = () => {
    document.title = "GLCL";
    const { Uid } = useParams();

    const [data, setUserData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [walletbal, setwalletbal] = useState([]);
    const [overallbal, setoverallbal] = useState([]);
    const [username, setusername] = useState([]);
    const [membership_id, setmembership_id] = useState([]);

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

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const exportToPDF = () => {
        const element = document.getElementById('contentToExport'); // Replace 'contentToExport' with the ID of the element you want to export

        html2pdf()
            .from(element)
            .save('document.pdf');
    };

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
                            <Card className="mt-3" style={{ backgroundColor: "#090f2f" }}>

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
                                                <h4 className="text-gold"> 5<span className="">g</span></h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-3">
                                        <div>
                                            <div className="text-gold">Gold Coin Pawned</div>
                                            <div className="text-gold">Gold Coin Serial Number</div>
                                            <div className="text-gold">Loan Period</div>
                                            <div className="text-gold">Subtotal</div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="text-gold">2 g</div>
                                            <div className="text-gold">GLCL0001-GLCL0002</div>
                                            <div className="text-gold">RM 596.00</div>
                                            <div className="text-gold">6 Months</div>
                                        </div>
                                    </div>
                                </div>
                                <Row className="mb-3">
                            <div className="col-md-12 text-center mt-3">
                                <button
                                    style={{ marginRight: "5px" }}
                                    type="button"
                                    className="btn btn-success approveBtn statusApproved mr-1"

                                >
                                    {/* <i className="bx bxs-check-circle font-size-16 align-middle me-1"></i>{" "} */}
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger rejectBtn statusRejected ml-2"
                                >
                                    {/* <i className="mdi mdi-close-circle font-size-16 align-middle me-1"></i>{" "} */}
                                    Reject
                                </button>
                              

                              

                            </div>
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

export default GoldPawnRequestView;
