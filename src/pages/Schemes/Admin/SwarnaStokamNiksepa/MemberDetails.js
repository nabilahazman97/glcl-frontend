import React, { useState, useEffect,useMemo } from "react";

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
import * as Yup from "yup";
import { useFormik } from "formik";
import Switch from "react-switch";
import avatar from "../../../../assets/images/users/avatar-1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../../helpers/url_helper";
import { useParams } from 'react-router-dom';
import goldBar from "../../../../assets/images/users/gold_bars.png";
import TableContainer from '../../../../components/Common/TableContainer';
import { del, get, post, put } from "../../../../helpers/api_helper";


//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import '../../style.scss';

const FormValidations = () => {

    //meta title
    document.title = "GLCL";

    const [switch1, setswitch1] = useState(true);

    const Offsymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
                {/* No */}
            </div>
        );
    };

    const OnSymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
                {/* Yes */}
            </div>
        );
    };

    const { Uid } = useParams();
    console.log("Uid:", Uid);

    const user = {
        'id': Uid
    };


    const [data, setdata] = useState([]);
    useEffect(() => {
        console.log(apiname.base_url);
        console.log(apiname.p_userdetails);
        console.log(user);
        post(apiname.p_userdetails, user)
        .then(res => setdata(res.result))
        .catch(err => console.log(err));
        // axios.post(apiname.base_url + apiname.p_userdetails, user, {
        //     headers: {
        //         'Authorization': 'Basic ' + apiname.encoded
        //     }
        // })
        //     // .then(res =>console.log(res))
        //     .then(res => setdata(res['data']['result']))
        //     .catch(err => console.log(err));
    }, []);
    console.log("data userzzzz");
    console.log(data[0]);

    const columns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: '',
            },
            {
                Header: 'Purpose',
                accessor: '',
            },
            {
                Header: 'Amount (RM)',
                accessor: ''
            },

            {
                Header: 'Status',
                accessor: ''
            },
        ],
        []
    );

    return data.map((datas) => {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title="Forms" breadcrumbItem="MEMBER PROFILE" />
                        <div className="d-flex gap-3">
                            <div className="col-lg-12 p-0">
                                <Card style={{ background: 'linear-gradient(to bottom, white 40%, #d1b66a 40%)' }}>
                                    <CardBody>
                                        <div>
                                            <div className="d-flex justify-content-end align-items-start">
                                                <Switch
                                                    uncheckedIcon={<Offsymbol />}
                                                    checkedIcon={<OnSymbol />}
                                                    className="me-1 mb-sm-8 mb-2"
                                                    onColor="#14ff00"
                                                    onChange={() => {
                                                        setswitch1(!switch1);
                                                    }}
                                                    checked={switch1}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <div className="text-center">
                                                    <img
                                                        src={avatar}
                                                        alt=""
                                                        className="avatar-md rounded-circle img-thumbnail"
                                                    />
                                                    <div className="mt-2">
                                                        <h3 className="text-white">{datas.username}</h3>
                                                        <h3 className="text-dark">{datas.membership_id}</h3>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            {switch1 ? (
                                                                <span className="activeIndicator"></span>
                                                            ) : (
                                                                <span className="deactiveIndicator"></span>
                                                            )}
                                                            <div className="std_font">{switch1 ? "Active" : "Deactivated"}</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card style={{ background: '#090F2F' }}>
                                    <CardBody>
                                        <div>
                                            <div className="d-flex justify-content-center">
                                                <div className="text-center">
                                                    <div className="mt-2">
                                                        <h4 className="text-white">Gold Coin</h4>
                                                        <h4 className="text-gold">11g</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <CardTitle className="text-white">Transaction History</CardTitle>
                                            <Card style={{ background: 'linear-gradient(136.91deg, #FBE39A 0%, #CAAF63 100%)' }}>
                                                <CardBody>
                                                    <div className="justify-content-between d-flex">
                                                        <div>
                                                            <h5 className="inter_bold">Buy - 1 gm</h5>
                                                            <h5 className="inter_regular">12-03-2024</h5>
                                                        </div>
                                                        <div>
                                                            <h5 className="inter_bold" style={{ color: '#ff0000' }}>298.00</h5>
                                                            <h5 className="inter_regular">Processing</h5>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card style={{ background: 'linear-gradient(136.91deg, #FBE39A 0%, #CAAF63 100%)' }}>
                                                <CardBody>
                                                    <div className="justify-content-between d-flex">
                                                        <div>
                                                            <h5 className="inter_bold">Saving - CIMB Acct</h5>
                                                            <h5 className="inter_regular">12-03-2024</h5>
                                                        </div>
                                                        <div>
                                                            <h5 className="inter_bold" style={{ color: '#3B5F38' }}>298.00</h5>
                                                            <h5 className="inter_regular" style={{ color: '#0B8A00' }}>Completed</h5>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card style={{  }}>
                                    <CardBody>
                                    <Row>
                                    <Col lg={6}>
                                        <Card style={{ border: '3px solid #d4af37', borderRadius: '0px 25px 25px 25px', height:'150px' }}>
                                            <CardBody  className="align-content-center">
                                                <div>
                                                    <div className="d-flex justify-content-center gap-5">
                                                        <div className="text-center align-content-center">
                                                            <img
                                                                src={goldBar}
                                                                alt=""
                                                                className="avatar-md"
                                                            />
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="mt-2">
                                                                <h6 className="">Balance</h6>
                                                                <h3 className="text-dark inter_bold">250.00</h3>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg={6}>
                                        <Card style={{ border: '3px solid #d4af37', borderRadius: '0px 25px 25px 25px', backgroundColor: '#0E174D', height:'150px' }}>
                                            <CardBody>
                                                <div>
                                                    <div className="d-flex justify-content-start gap-5">
                                                        <div className="text-center align-content-center">
                                                            <img
                                                                src={goldBar}
                                                                alt=""
                                                                className="avatar-md"
                                                            />
                                                        </div>
                                                        <div className="text-start">
                                                            <div className="mt-2">
                                                                <h4 className="text-white"> Gold Coin</h4>
                                                                <h5 className="text-white">RM 48 more to buy Gold Coin.</h5>

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="mt-3">
                                                        <Progress style={{ color: '#d4af37' }} value={25} className="progress-xl bg-warning">
                                                            25%
                                                        </Progress>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>

                                <CardTitle className="">Transaction History</CardTitle>
                                <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />                 
                                    </CardBody>
                                </Card>
                               
                            </div>



                        </div>
                        <div className="d-flex justify-content-center gap-3 mb-3">
                            <Link to="/admin-swarna-stokam-niksepa/index" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary backBtn">Back</button>
                            </Link>

                            {/* <button className="btn btn-primary saveBtn">Save</button>
                            <button className="btn btn-primary deleteBtn">Delete</button> */}
                        </div>

                    </Container>
                </div>
            </React.Fragment>
        )
    })

};

export default FormValidations;
