import React, { useState, useEffect } from "react";

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
    FormFeedback,
    Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Switch from "react-switch";
import avatar from "../../../assets/images/users/avatar-1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
import { useParams } from 'react-router-dom';
import { del, get, post, put } from "../../../helpers/api_helper";
import whiteprint from "../../../assets/images/schemes/white-print-icon.png";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import pdfIcon from "../../../assets/images/PDF_file_icon.png";

const MemberProfileDetails = () => {

    //meta title
    document.title = "GLCL";

    const selectedFiles1 = [
        {
            name: 'example.jpg',
            formattedSize: '2.5 MB',
            preview: '/assets/example.jpg'
        },
    ];


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

    const printInvoice = () => {
        window.print();
    };

    const { id } = useParams();
    console.log("Uid:", id);

    const user = {
        'id': id
    };

    const [data, setdata] = useState([]);
    useEffect(() => {
        // console.log(apiname.base_url);
        // console.log(apiname.p_userdetails);
       

        post(apiname.p_userdetails,user)
        // .then(res => console.log(res.data.result))
        .then(res => setdata(res.data.result))
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
    console.log("data user");
    console.log(data[0]);





    let numIc = '';

    if (data.length > 0) {
        const icNum = data[0];
        console.log(icNum);
        numIc = icNum.icnumber;
        console.log("This is numIc:", numIc);
    } else {
        console.log("No data available");
    }

    console.log("Outside if block:", numIc);


    let globalBirthDate = null;

    function getBirthDate(icNumber) {
        const birthDateDigits = icNumber.substring(0, 6);
        const year = parseInt(birthDateDigits.substring(0, 2), 10);
        const month = parseInt(birthDateDigits.substring(2, 4), 10);
        const day = parseInt(birthDateDigits.substring(4, 6), 10);

        let century;
        if (year >= 0 && year <= 21) {
            century = 2000;
        } else if (year >= 22 && year <= 99) {
            century = 1900;
        } else if (year >= 1700 && year <= 1799) {
            century = 1700;
        } else if (year >= 1800 && year <= 1899) {
            century = 1800;
        } else if (year >= 1900 && year <= 1999) {
            century = 1900;
        } else {
            console.error("Invalid year:", year);
            return null;
        }

        const birthDate = new Date(century + year, month - 1, day + 1);

        if (isNaN(birthDate.getTime())) {
            console.error("Invalid date:", birthDate);
            return null;
        }

        globalBirthDate = birthDate.toISOString().split('T')[0];

        return globalBirthDate;
    }


    const icNumber = numIc.toString();
    if (icNumber && typeof icNumber === 'string' && icNumber.length >= 6) {
        getBirthDate(icNumber);
        console.log("Global Birth Date:", globalBirthDate);
    } else {
        console.error("Invalid IC number:", icNumber);
    }


    const downloadPDF = (pdfUrl) => {
        console.log("url");
        console.log(pdfUrl);
        fetch(pdfUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.blob();
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.pdf'); // Set the filename for the downloaded file
            document.body.appendChild(link);
            link.click();
            link.remove(); // Clean up and remove the link
            window.URL.revokeObjectURL(url); // Release the object URL
          })
          .catch((error) => console.error('Error downloading PDF:', error));
    };
    



    return data.map((datas) => {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title="" breadcrumbItem="MEMBER PROFILE" />
                        <div className="d-flex justify-content-end mb-3">
                                                    <Link
                                                        to="#"
                                                        onClick={printInvoice}
                                                        className="btn btn-success printBtn"
                                                    >
                                                        <img
                                                            src={whiteprint}
                                                            alt=""
                                                            className="avatar-md whiteprint_icon"
                                                        />
                                                    </Link>
                                                </div>
                        <div className="d-flex gap-3">
                            <div className="col-lg-6 p-0">
                                <Card className="defCard" style={{ background: 'linear-gradient(to bottom, white 40%, #d1b66a 40%)' }}>
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
                                                    <div className="d-flex justify-content-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            {/* <span class="dot"></span> */}
                                                            {/* <div className="std_font">Active</div> */}

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>


                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">Profile Information</CardTitle>
                                        <div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Name (As per IC)</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.username}
                                                />
                                            </div>
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">IC Number</label>                                                        <Input
                                                            className="form-control normal-input"
                                                            type="text"
                                                            disabled
                                                            defaultValue={datas.icnumber}
                                                        />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="6">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Age</label>
                                                        <Input
                                                            className="form-control normal-input"
                                                            type="text"
                                                            disabled
                                                            defaultValue={datas.age}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                           
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">Mobile Phone 1</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.phonenum}
                                                />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="6">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Mobile Phone 2</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.altnum}
                                                />
                                                    </div>
                                                </Col>
                                            </Row>
                                           
                                            <div className="mb-3">
                                                <label className="std_input_label">Email Address</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="email"
                                                    disabled
                                                    defaultValue={datas.email_id}
                                                />
                                            </div>
                                            <Row>
                                                <Col lg="4">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">Ethnic</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.ethnic}
                                                />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Religion</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.religion}
                                                />
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Sex</label>
                                                    <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.sex}
                                                />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col lg="4">
                                                    <div className="mb-3">
                                                    <label className="std_input_label">Marital Status</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.mstatus}
                                                />
                                                    </div>
                                                  
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="std_input_label">Occupation</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.occupation}
                                                />
                                                    </div>
                                                </Col>

                                                <Col lg="4">
                                                    <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                                                    <label className="">Service</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.service}
                                                />
                                                    </div>
                                                </Col>
                                            </Row>

                                            {/* <div className="mb-3">
                                                <label>Date of Birth</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={globalBirthDate}

                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Gender</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.sex}
                                                />
                                            </div> */}
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">Address Information</CardTitle>
                                         <div className="mb-3">
                                                <label className="std_input_label">Address</label>
                                                <Input
                                                    type="textarea"
                                                    name="address"
                                                    id="textarea"
                                                    className="normal-textarea"
                                                    maxLength="50"
                                                    rows="3"
                                                    placeholder="Home Address"
                                                    disabled
                                                    defaultValue={datas.haddress}
                                                />
                                            </div>
                                        <div className="mb-3">
                                                <label className="std_input_label">Permanent Address</label>
                                                <Input
                                                    type="textarea"
                                                    name="address"
                                                    id="textarea"
                                                    className="normal-textarea"
                                                    maxLength="50"
                                                    rows="3"
                                                    placeholder="Home Address"
                                                    disabled
                                                    defaultValue={datas.paddress}
                                                />
                                            </div>
                                            
                                        </CardBody>
                                </Card>


                            </div>
                            <div className="col-lg-6 p-0">

                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">KYC Documents</CardTitle>
                                        <div className="mt-4 mb-5 p-3 ">
                                            <div className="mb-3">
                                                <CardSubtitle className="std_input_label mb-2">
                                                    MyKad - Front
                                                </CardSubtitle>
                                                {datas.f_mykad.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                                                    <div onClick={() => downloadPDF('/api/'+'uploads/'+datas.f_mykad)}>
                                                        <div className="text-center">
                                                            <img className="ic-img" src={'/api/'+'uploads/'+datas.f_mykad} style={{ display: 'none' }}></img> {/* Hide the image */}
                                                        </div>

                                                        <Card className="pdfInput">
                                                            <CardBody className="m-3">
                                                                <div className="text-center">
                                                                    <img className="pdfIcon" src={pdfIcon}></img>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                ) : (
                                                    <Card className="pdfInput">
                                                        <CardBody className="m-3">
                                                            <div className="text-center">
                                                                <img className="ic-img mb-3" src={'/api/'+'uploads/'+datas.f_mykad} alt="MyKad Front"></img>

                                                            </div>
                                                        </CardBody>
                                                    </Card>


                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <CardSubtitle className="std_input_label mb-2">
                                                    MyKad - Back
                                                </CardSubtitle>
                                                {datas.b_mykad.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                                                    <div onClick={() => downloadPDF('/api/'+'uploads/'+datas.b_mykad)}>
                                                        <div className="text-center">
                                                            <img className="ic-img" src={'/api/'+'uploads/'+datas.b_mykad} style={{ display: 'none' }}></img> {/* Hide the image */}
                                                        </div>                          <Card className="pdfInput">
                                                            <CardBody className="m-3">
                                                                <div className="text-center">
                                                                    <img className="pdfIcon" src={pdfIcon}></img>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                ) : (
                                                    <Card className="pdfInput">
                                                        <CardBody className="m-3">
                                                            <div className="text-center">
                                                                <img className="ic-img mb-3" src={'/api/'+'uploads/'+datas.b_mykad} alt="MyKad Front"></img>

                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                )}
                                            </div>
                                            <div className="mb-3">

                                                <CardSubtitle className="std_input_label mb-2">
                                                    Utility Bill
                                                </CardSubtitle>
                                                {datas.utilitybill.endsWith('.pdf') ? ( // Check if the file ends with '.pdf'
                                                    <div onClick={() => downloadPDF('/api/'+'uploads/'+datas.utilitybill)}>
                                                        <img className="ic-img mb-3" src={'/api/'+'uploads/'+datas.utilitybill} style={{ display: 'none' }}></img> {/* Hide the image */}
                                                        <Card className="pdfInput">
                                                            <CardBody className="m-3">
                                                                <div className="text-center">
                                                                    <img className="pdfIcon" src={pdfIcon}></img>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                ) : (
                                                    <Card className="pdfInput">
                                                        <CardBody className="m-3">
                                                            <div className="text-center">
                                                                <img className="ic-img" src={'/api/'+'uploads/'+datas.utilitybill} alt="MyKad Front"></img>

                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                )}                                            </div>

                                        </div>
                                    </CardBody>
                                </Card>

                                <Card className="defCard">
                                    <CardBody>
                                        <CardTitle className="cardTitle">Membership Information</CardTitle>
                                        <div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Membership Status</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue="Active"
                                                />
                                            </div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Membership Number</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.membership_id}
                                                />
                                            </div>
                                            <div className="mb-3 mt-3">
                                                <label className="std_input_label">Date of Joining</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={datas.createdAt}
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                {/* <Card>
                                    <CardBody>
                                        <CardTitle>Membership Information</CardTitle>
                                        <div>
                                            <div className="mb-3 mt-3">
                                                <label>Membership Status</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={"Sarah"}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Membership Number</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="text"
                                                    disabled
                                                    defaultValue={"028484-01-8383"}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Date of Joining</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="date"
                                                    disabled

                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Renewal Date</label>
                                                <Input
                                                    className="form-control normal-input"
                                                    type="date"
                                                    disabled

                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card> */}
                                {/* <Card>
                                    <CardBody>
                                        <CardTitle>KYC Documents</CardTitle>
                                        <div className="mb-3 mt-3">
                                            <label>NRIC Copy</label>
                                            <div className="dropzone-previews" id="file-previews1">
                                                {selectedFiles1.map((f, i) => (
                                                    <Card
                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                        key={i + "-f_mykad"}
                                                    >
                                                        <div className="p-2">
                                                            <Row className="align-items-center">
                                                                <Col className="col-auto">
                                                                    <img
                                                                        data-dz-thumbnail=""
                                                                        height="80"
                                                                        className="avatar-sm rounded bg-light"
                                                                        alt={f.name}
                                                                        src={f.preview}
                                                                    />
                                                                </Col>
                                                                <Col>
                                                                    <Link to="#" className="text-muted font-weight-bold">{f.name}</Link>
                                                                    <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>

                                    </CardBody>
                                </Card> */}

                            </div>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mb-3">
                            <Link to="/member-profile-list" style={{ textDecoration: 'none' }}>
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

export default MemberProfileDetails;
