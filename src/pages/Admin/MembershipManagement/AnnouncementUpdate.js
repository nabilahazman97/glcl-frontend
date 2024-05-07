import React, { useState, useEffect, useMemo, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    Modal
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Switch from "react-switch";
import avatar from "../../../assets/images/users/avatar-1.jpg";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
import { useParams } from 'react-router-dom';
import goldBar from "../../../assets/images/users/gold_bars.png";
import TableContainer from '../../../components/Common/TableContainer';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Dropzone from "react-dropzone";

import bell from "../../../assets/images/schemes/bell-icon.png";
import whiteprint from "../../../assets/images/schemes/white-print-icon.png";
import tag from "../../../assets/images/schemes/tag-icon.png";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import '../../style.scss';
import { del, get, post, put } from "../../../helpers/api_helper";

const AnnouncementUpdate = () => {

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

    const printInvoice = () => {
        window.print();
    };

    const ethnic_opt = [
        { value: 'malay', label: 'Malay' },
        { value: 'indian', label: 'Indian' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'otherEthnic', label: 'Other' },
    ];

    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: 'black',
            backgroundColor: 'white',
            opacity: 1,
            '&:hover': {
                color: 'white',
                backgroundColor: 'hsl( 218,81.8%,56.9% )',
            },
        }),
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-GB'); // Format the date as dd/mm/yyyy
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = () => {
        setIsOpen(false);
    };


    const filteredData = useMemo(() => {
        if (!startDate || !endDate) return data; // Return all data if start or end date is not selected

        return data.filter(item => {
            const createdAtDate = new Date(item.createdAt);
            return createdAtDate >= startDate && createdAtDate <= new Date(endDate.getTime() + 86400000); // Adding 1 day to the end date
        });
    }, [data, startDate, endDate]);


    const [modalOpen, setModalOpen] = useState(false);

    const handleIconClick = () => {
        setModalOpen(true);
    };

    const [selectedFiles, setselectedFiles] = useState([]);

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)
    }

    /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="MEMBERSHIP" breadcrumbItem="ADMIN ANNOUNCEMENTS" />
                    <div className="d-flex gap-3">
                        <div className="col-lg-12 p-0">
                            <Card className="defCard" style={{ background: '#0E174D' }}>
                                <CardBody>
                                    <div>
                                        <div className="d-flex justify-content-between p-3 line">
                                            <div className="d-flex align-items-center gap-3">
                                                <div>
                                                    <img
                                                        style={{ width: '30px', height: '30px' }}
                                                        src={bell}
                                                        alt=""
                                                        className="avatar-md "
                                                    />
                                                </div>
                                                <div>
                                                    <Button style={{ background: 'linear-gradient(95.1deg, #DDBF6A 0%, #9B7700 49.76%, #DDBF6A 100%)' }}> Make an Announcement</Button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-3">
                                                <div>
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
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary printBtn  me-2"
                                                    >
                                                        <i className="mdi mdi-upload  "></i>{" "}
                                                        EXPORT
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between p-3 line">
                                            <div className="d-flex align-items-center gap-3">
                                                <div>
                                                    <div className="float-start ">
                                                        <div className="ann" style={{ position: 'relative' }}>
                                                            <input
                                                                className="form-control announceDatePicker"
                                                                type="text"
                                                                placeholder="Filter by date range"
                                                                value={
                                                                    (startDate && endDate) ?
                                                                        `${formatDate(startDate)} - ${formatDate(endDate)}` :
                                                                        ''
                                                                }
                                                                onClick={toggleDropdown}
                                                                readOnly
                                                                style={{ cursor: 'pointer' }}
                                                            />

                                                            {isOpen && (
                                                                <div
                                                                    ref={dropdownRef}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '100%',
                                                                        height: '100%',
                                                                        left: 0,
                                                                        zIndex: 999,
                                                                        backgroundColor: '#fff',
                                                                        border: '1px solid #ccc',
                                                                        borderRadius: '4px',
                                                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                                    }}
                                                                >
                                                                    <DatePicker
                                                                        selectsRange
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        onChange={handleDateChange}
                                                                        inline
                                                                    />
                                                                    {/* <div className="text-center mb-2">
                                                                <button className="btn btn-primary" onClick={handleSelect}>Select Date</button>
                                                            </div> */}

                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-3">
                                                <form className="app-search d-none d-lg-block">
                                                    <div className="position-relative">

                                                        <input
                                                            type="text"
                                                            className="form-control announceSearch"
                                                            placeholder="Search Announcements"
                                                        />
                                                        <span className="bx bx-search-alt" />
                                                    </div>

                                                </form>
                                            </div>
                                        </div>

                                        <Card style={{ borderRadius: '0px 25px 25px 25px', backgroundColor: '#DDBF6A', marginTop: '20px' }}>
                                            <CardBody>
                                                <Row>
                                                    <Col lg="10">
                                                        <div>
                                                            <p className="font20">Title: <span>Hey, Gold's Looking Good Today!</span></p>
                                                            <div>
                                                                <p className="std_font">Add Information:</p>
                                                                <p className="std_font">Gold Price Alert! The current price of gold has reached RM300 per gram, which is within your set price range. Now's the perfect time to make a purchase!</p>
                                                            </div>
                                                            <div className="d-flex flex-wrap">
                                                                <div className="d-flex  align-items-center  col-md-4">
                                                                    <p className="std_font_bold me-2">Status: </p>
                                                                    <div>
                                                                        <Switch
                                                                            uncheckedIcon={<Offsymbol />}
                                                                            checkedIcon={<OnSymbol />}
                                                                            className="me-1 mb-sm-8 mb-2"
                                                                            onColor="#399618"
                                                                            onChange={() => {
                                                                                setswitch1(!switch1);
                                                                            }}
                                                                            checked={switch1}
                                                                        />
                                                                    </div>
                                                                    <p className="std_font ms-2">{switch1 ? "Active" : "Deactivated"}</p>

                                                                    <div className="d-flex align-items-center ">
                                                                        {/* {switch1 ? (
                                                            <span className="activeIndicator"></span>
                                                        ) : (
                                                            <span className="deactiveIndicator"></span>
                                                        )} */}

                                                                    </div>

                                                                </div>
                                                                <div className="d-flex col-md-4 justify-content-center">
                                                                    <p className="std_font_bold me-2">Announcement by: </p>
                                                                    <div className="std_font">Admin</div>
                                                                </div>
                                                                <div className="d-flex col-md-4 justify-content-center">
                                                                    <p className="std_font_bold me-2">Date: </p>
                                                                    <div className="std_font">24/3/2024</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col lg="2">
                                                        <div>
                                                            <div className="d-flex gap-2 justify-content-end">
                                                                <div className="std_font">Icon: </div>
                                                                <div className="">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary tag-icon  me-2"
                                                                    >
                                                                        <img
                                                                            src={tag}
                                                                            alt=""
                                                                            className="avatar-md rounded-circle img-thumbnail tag-img"
                                                                        />
                                                                    </button>
                                                                </div>

                                                            </div>
                                                            <div className="mt-2 tagged">
                                                                <select defaultValue="0" className="form-select">
                                                                    <option value="0">Choose...</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </select>
                                                            </div>
                                                            <div className="mt-2 text-end">
                                                                <i
                                                                    className="bx bx-edit"
                                                                    style={{ fontSize: "50px", cursor: "pointer" }}
                                                                    onClick={handleIconClick} // Attach onClick event handler
                                                                ></i>
                                                            </div>
                                                            <Modal className="modal-dialog modal-dialog-centered modal-lg" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                                                                <div class="modal-content  modalAnnounce">
                                                                    <div class="modal-header p-4">
                                                                        <div className="std_font">Make an Announcement</div>
                                                                        <button type="button" class="btn-close" onClick={() => setModalOpen(false)}></button>
                                                                    </div>
                                                                    <div class="modal-body text-center p-4">
                                                                        <div>
                                                                            <Input
                                                                                className="form-control normal-input"
                                                                                type="text"
                                                                                placeholder="Title"
                                                                            />
                                                                        </div>
                                                                        <div className="editor mt-2">
                                                                            <Editor
                                                                                toolbarClassName="toolbarClassName"
                                                                                wrapperClassName="wrapperClassName"
                                                                                editorClassName="editorClassName"
                                                                                placeholder="Add information"
                                                                            />
                                                                        </div>
                                                                        <div className="d-flex justify-content-between mt-2">
                                                                            <div className="col-md-6">
                                                                                <select defaultValue="0" className="form-select normal-input">
                                                                                    <option value="0">Select Category</option>
                                                                                    <option value="1">One</option>
                                                                                    <option value="2">Two</option>
                                                                                    <option value="3">Three</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-6 d-flex justify-content-end gap-3">
                                                                                <p className="std_font">Insert icon: </p>
                                                                                <div>
                                                                                    <Form>
                                                                                        <Dropzone

                                                                                            onDrop={acceptedFiles => {
                                                                                                handleAcceptedFiles(acceptedFiles)
                                                                                            }}
                                                                                        >
                                                                                            {({ getRootProps, getInputProps }) => (
                                                                                                <div className="dropzone dropzone2  normal-input" style={{ width: '200px' }}>
                                                                                                    <div
                                                                                                        className="dz-message needsclick "
                                                                                                        {...getRootProps()}
                                                                                                    >
                                                                                                        <input {...getInputProps()} />
                                                                                                        <div className="">
                                                                                                            <i className="display-4 text-muted bx bxs-cloud-upload p-0" />
                                                                                                        </div>
                                                                                                        <h4 className="font12">Drop files here or click to upload.</h4>
                                                                                                        <button type="button" className="btn mt-3 upload-file-btn">Upload</button>

                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Dropzone>
                                                                                        <div className="dropzone-previews mt-3 " id="file-previews">
                                                                                            {selectedFiles.map((f, i) => {
                                                                                                return (
                                                                                                    <Card
                                                                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                                                        key={i + "-file"}
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
                                                                                                                    <Link
                                                                                                                        to="#"
                                                                                                                        className="text-muted font-weight-bold"
                                                                                                                    >
                                                                                                                        {f.name}
                                                                                                                    </Link>
                                                                                                                    <p className="mb-0">
                                                                                                                        <strong>{f.formattedSize}</strong>
                                                                                                                    </p>
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </div>
                                                                                                    </Card>
                                                                                                )
                                                                                            })}
                                                                                        </div>

                                                                                    </Form>

                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                        <div className="d-flex justify-content-start align-items-center flex-wrap mt-4">
                                                                            <div className="std_font me-2">Duration of Notification: </div>
                                                                            <div className="me-2">
                                                                                <Input
                                                                                    className="form-control normal-input"
                                                                                    type="date"
                                                                                />
                                                                            </div>
                                                                            <div>-</div>
                                                                            <div className="ms-2">  <Input
                                                                                    className="form-control normal-input"
                                                                                    type="date"
                                                                                /></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                        </div>
                                                    </Col>

                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </div>
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


};

export default AnnouncementUpdate;
