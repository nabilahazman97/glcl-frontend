import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  Tooltip,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  FormFeedback,
} from "reactstrap";
import Select from "react-select";
import PropTypes from "prop-types";
import axios from "axios";
import * as apiname from "../../helpers/url_helper";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";

import Dropzone from "react-dropzone";
import classnames from "classnames"

const Register3 = () => {

  const [icNumber, setICNumber] = useState('');
  const [declareIcNumber, setDeclareIcNumber] = useState('');
  const [age, setAge] = useState('');
  const [age1, setAge1] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [selectedEthnicOption, setSelectedEthnicOption] = useState(null);
  const [selectedReligionOption, setSelectedReligionOption] = useState(null);
  const [tethnic, settethnic] = useState(false);
  const [treligion, settreligion] = useState(false);
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const [selectedFiles3, setSelectedFiles3] = useState([]);
  const [selectedFiles4, setSelectedFiles4] = useState([]);



  //meta title
  document.title = "GLCL";

  const [selectedFiles, setselectedFiles] = useState([]);

  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: '' || '',
      icNum: '' || '',
      age: '' || '',
      homeAddress: '' || '',
      mob_phone1: '' || '',
      phone2: '' || '',
      email: '' || '',
      ethnicity: '' || '',
      religion: '' || '',
      otherEthnicity: '' || '',
      otherReligion: '' || '',
      occupation: '' || '',
      sex: '',
      mstatus: '',
      service: '',
      address: '',
      f_mykad: '',
      b_mykad: '',
      utilitybill: '',
      declareName: '',
      declareIcNum: '' || '',
      declareRelay: '',
      nomnric: '',
      declareAgree: false,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      icNum: Yup.string().required("IC number is required"),
      homeAddress: Yup.string().required("Home address is required"),
      mob_phone1: Yup.string().required("Mobile phone number is required"),
      email: Yup.string().required("Email is required"),
      f_mykad: Yup.string().required("File is required"),
      b_mykad: Yup.string().required("File is required"),
      utilitybill: Yup.string().required("File is required"),
      nomnric: Yup.string().required("File is required"),
      declareAgree: Yup.boolean().oneOf([true], 'You must agree to the declaration'),
      declareName: Yup.string().required("Name is required"),
      declareIcNum: Yup.string().required("IC number is required"),
      // utilitybill: Yup.string().required("file 3 is required"),
      // occupation: Yup.string(),
    }),
    onSubmit: (values) => {

      console.log(values);
      // const formData = new FormData();

      const formData = new FormData();
      formData.append('f_mykad', selectedFiles1[0]);
      formData.append('b_mykad', selectedFiles2[0]);
      formData.append('utilitybill', selectedFiles3[0]);
      formData.append('nomnric', selectedFiles4[0]);
      formData.append('emailid', values.email);
      formData.append('Username', values.name);
      formData.append('icnumber', values.icNum);
      formData.append('age', age1);
      formData.append('haddress', values.homeAddress);
      formData.append('phonenum', values.mob_phone1);
      formData.append('altnum', phoneNumber2);
      formData.append('ethnic', values.ethnicity);
      formData.append('religion', values.religion);
      formData.append('sex', values.sex);
      formData.append('mstatus', values.mstatus);
      formData.append('occupation', values.occupation);
      formData.append('service', values.service);
      formData.append('paddress', values.address);
      formData.append('nomname', values.declareName);
      formData.append('nomicnum', values.declareIcNum);
      formData.append('nomrelaship', values.declareRelay);
      formData.append('declarion', values.declareAgree);
      formData.append('oethnic', values.otherEthnicity);
      formData.append('oreligion', values.otherReligion);


      // formData.append('email', values.declareAgree);







      values.f_mykad = selectedFiles1;
      // 


      //  formData.append('f_mykad', selectedFiles1);

      values.b_mykad = selectedFiles2;
      values.utilitybill = selectedFiles3;
      values.nomnric = selectedFiles4;
      console.log("formData");
      console.log(formData);
      values.declareAgree = document.getElementById("defaultCheck1").checked;

      // useEffect(() => {
      // console.log("hi");
      axios.post(apiname.base_url + apiname.register, formData, {
        headers: {
          'Authorization': 'Basic ' + apiname.encoded
        }
      })
        // .then(res =>console.log(res['data']['result']))
        .then(res => {

          if (res['data']['status'] == '1') {
            toggleTab(activeTab + 2);
            console.log("success");
            //redirect to success page


          } else {
            toggleTab(activeTab + 1);
            console.log("failure");
            ///redirect to error page 

          }
        })
        .catch(err => console.log(err));
      // }, []);

    }
  });

  function handleAcceptedFiles(files, field) {
    files.forEach(file => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });
    });

    if (field === "f_mykad") {
      setSelectedFiles1(files);
      validation.setFieldValue("f_mykad", files[0]);
    } else if (field === "b_mykad") {
      setSelectedFiles2(files);
      validation.setFieldValue("b_mykad", files[0]);
    } else if (field === "utilitybill") {
      setSelectedFiles3(files);
      validation.setFieldValue("utilitybill", files[0]);
    } else if (field === "nomnric") {
      setSelectedFiles4(files);
      validation.setFieldValue("nomnric", files[0]);
    }
  }


  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }


  const [activeTab, setactiveTab] = useState(1)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [passedSteps, setPassedSteps] = useState([1])
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 5) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  const handleBackspace = (e) => {
    // Allow backspace to delete the last character or hyphen
    if (e.keyCode === 8 && icNumber.charAt(icNumber.length - 1) === '-') {
      setICNumber(icNumber.slice(0, -1));
    } else if (e.keyCode === 8 && declareIcNumber.charAt(declareIcNumber.length - 1) === '-') {
      setDeclareIcNumber(declareIcNumber.slice(0, -1));
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Remove any non-numeric characters
    const numericValue = inputValue.replace(/\D/g, '');
    // Format the IC number as "000000-00-0000" only if it's complete
    let formattedValue = '';
    if (numericValue.length > 6) {
      formattedValue = numericValue.slice(0, 6) + '-' + numericValue.slice(6, 8) + '-' + numericValue.slice(8, 12);
    } else {
      formattedValue = numericValue;
    }
    setICNumber(formattedValue);
  

    // Extract the year of birth
    let year = parseInt(formattedValue.slice(0, 2), 10);
    if (year < 30) { // Assuming the year represents a year in the 2000s for values less than 30
      year += 2000;
    } else {
      year += 1900;
    }

    if (!isNaN(year)) {
      const age = calculateAge(year);
      setAge(`${age} years old`);
      setAge1(`${age}`);

      console.log(age);
    } else {
      setAge(age);
    }

  };
  const handleChange2 = (e) => {
    const inputValue = e.target.value;
    // Remove any non-numeric characters
    const numericValue = inputValue.replace(/\D/g, '');
    // Format the IC number as "000000-00-0000" only if it's complete
    let formattedValue = '';
    if (numericValue.length > 6) {
      formattedValue = numericValue.slice(0, 6) + '-' + numericValue.slice(6, 8) + '-' + numericValue.slice(8, 12);
    } else {
      formattedValue = numericValue;
    }
    setDeclareIcNumber(formattedValue);
  };

  const calculateAge = (year) => {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  };

  const handleInputPhone = (event, setPhoneNumber) => {
    const input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedInput = input.slice(0, 11); // Limit to 11 digits
    const formattedPhoneNumber = formattedInput.replace(/(\d{3})(\d{1,4})?(\d{1,4})?/, '$1-$2$3'); // Insert hyphen after the third digit

    setPhoneNumber(formattedPhoneNumber);
  };

  const formatPhoneNumber = (input) => {
    // Remove non-numeric characters
    const phoneNumber = input.replace(/\D/g, '');
    // Truncate to 11 digits if length exceeds 11
    const truncatedPhoneNumber = phoneNumber.slice(0, 11);
    // Insert hyphen after the third digit if length is 4 or more
    if (truncatedPhoneNumber.length >= 4) {
      return truncatedPhoneNumber.slice(0, 3) + '-' + truncatedPhoneNumber.slice(3);
    }
    return truncatedPhoneNumber;
  };

  const handleChangePhone = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    validation.setFieldValue('mob_phone1', formattedPhoneNumber);
  };

  const handleEthnicChange = selectedEthnicOption => {
    validation.setFieldValue('ethnicity', selectedEthnicOption ? selectedEthnicOption.value : ''); // Set the selected ethnicity value
    setSelectedEthnicOption(selectedEthnicOption);
    setShowInput(selectedEthnicOption && selectedEthnicOption.value === 'otherEthnic'); // Show input box if 'Other' is selected
  };

  const handleReligionChange = selectedReligionOption => {
    validation.setFieldValue('religion', selectedReligionOption ? selectedReligionOption.value : '');
    setSelectedReligionOption(selectedReligionOption);
    setShowInput2(selectedReligionOption && selectedReligionOption.value === 'otherReligion'); // Show input box if 'Other' is selected
  };

  const handleSexChange = selectedSexOption => {
    validation.setFieldValue('sex', selectedSexOption ? selectedSexOption.value : '');
  };

  const handleMstatusChange = selectedmstatusOption => {
    validation.setFieldValue('mstatus', selectedmstatusOption ? selectedmstatusOption.value : '');
  };

  const ethnic_opt = [
    { value: 'malay', label: 'Malay' },
    { value: 'indian', label: 'Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'otherEthnic', label: 'Other' },
  ];

  const religion_opt = [
    { value: 'islam', label: 'Islam' },
    { value: 'hindu', label: 'Hindu' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'cristian', label: 'Christian' },
    { value: 'otherReligion', label: 'Other' },
  ];

  const sex_opt = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const marital_status_opt = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'widow', label: 'Widow' },
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


  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={6}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <div className="d-flex text-center std_font">
                          <p className="">Already Registered? &nbsp; </p>
                          <Link to="/" style={{ textDecoration: 'none' }}>
                            <p className='text-gold'>Sign In</p>
                          </Link>
                        </div>
                      </div>

                      <div className="m-1">

                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="text-center">
                            <p className="login_title mb-3 mt-5">MEMBERSHIP REGISTRATION</p>
                          </div>

                          <div className="wizard clearfix">
                            {/* <div className="steps clearfix">
                              <ul>
                                <NavItem
                                  className={classnames({ current: activeTab === 1 })}
                                >
                                  <NavLink
                                    className={classnames({ current: activeTab === 1 })}
                                    onClick={() => {
                                      setactiveTab(1)
                                    }}
                                    disabled={!(passedSteps || []).includes(1)}
                                  >
                                    <span className="number">1.</span> Basic Details
                                  </NavLink>
                                </NavItem>
                                <NavItem
                                  className={classnames({ current: activeTab === 2 })}
                                >
                                  <NavLink
                                    className={classnames({ active: activeTab === 2 })}
                                    onClick={() => {
                                      setactiveTab(2)
                                    }}
                                    disabled={!(passedSteps || []).includes(2)}
                                  >
                                    <span className="number">2.</span> Upload
                                    Document
                                  </NavLink>
                                </NavItem>
                                <NavItem
                                  className={classnames({ current: activeTab === 3 })}
                                >
                                  <NavLink
                                    className={classnames({ active: activeTab === 3 })}
                                    onClick={() => {
                                      setactiveTab(3)
                                    }}
                                    disabled={!(passedSteps || []).includes(3)}
                                  >
                                    <span className="number">3.</span> Nominee Details
                                  </NavLink>
                                </NavItem>
                                <NavItem
                                  className={classnames({ current: activeTab === 4 })}
                                >
                                  <NavLink
                                    className={classnames({ active: activeTab === 4 })}
                                    onClick={() => {
                                      setactiveTab(4)
                                    }}
                                    disabled={!(passedSteps || []).includes(4)}
                                  >
                                    <span className="number">4.</span> Confirm Detail
                                  </NavLink>
                                </NavItem>
                              </ul>
                            </div> */}
                            <div className="content clearfix">
                              <TabContent activeTab={activeTab} className="body">
                                <TabPane tabId={1}>

                                  <Row>
                                    <Col lg="12">
                                      <div className="mb-3">
                                        {/* <Label className="form-label">Email</Label> */}
                                        <Input
                                          id="name"
                                          name="name"
                                          className="form-control login-input"
                                          placeholder="Name"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={validation.values.name || ""}
                                          invalid={
                                            validation.touched.name && validation.errors.name ? true : false
                                          }
                                        />
                                        {validation.touched.name && validation.errors.name ? (
                                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                        ) : null}

                                      </div>
                                    </Col>

                                  </Row>

                                  <Row>
                                    <Col lg="6">
                                      <Input
                                        className="form-control login-input"
                                        name="icNum"
                                        type="text"
                                        placeholder="IC Number (As per IC)"
                                        value={icNumber}
                                        onChange={(e) => {
                                          validation.handleChange(e); // Call the formik handleChange
                                          handleChange(e); // Call your custom handleChange
                                        }}
                                        onKeyDown={handleBackspace}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          validation.touched.icNum && validation.errors.icNum ? true : false
                                        }
                                      />
                                      {validation.touched.icNum && validation.errors.icNum ? (
                                        <FormFeedback type="invalid">{validation.errors.icNum}</FormFeedback>
                                      ) : null}
                                    </Col>
                                    <Col lg="6">
                                      <Input
                                        className="form-control login-input"
                                        name="age"
                                        type="text"
                                        placeholder="Age"
                                        value={age}
                                        disabled
                                        onChange={validation.handleChange}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg="12">
                                      <Input
                                        type="textarea"
                                        name="homeAddress"
                                        id="textarea"
                                        className="login-textarea mt-3"
                                        // onChange={e => {
                                        //   textareachange(e);
                                        // }}
                                        maxLength="50"
                                        rows="4"
                                        placeholder="Home Address"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.homeAddress || ""}
                                        invalid={
                                          validation.touched.homeAddress && validation.errors.homeAddress ? true : false
                                        }
                                      />
                                      {validation.touched.homeAddress && validation.errors.homeAddress ? (
                                        <FormFeedback type="invalid">{validation.errors.homeAddress}</FormFeedback>
                                      ) : null}
                                    </Col>

                                  </Row>
                                  <Row className="mt-3">
                                    <Col lg="6">
                                      <Input
                                        className="form-control login-input text_1"
                                        name="mob_phone1"
                                        type="text"
                                        placeholder="Mobile Phone 1"
                                        onChange={handleChangePhone}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.mob_phone1 || ""}
                                        invalid={validation.touched.mob_phone1 && validation.errors.mob_phone1}
                                      />
                                      {validation.touched.mob_phone1 && validation.errors.mob_phone1 ? (
                                        <FormFeedback type="invalid">{validation.errors.mob_phone1}</FormFeedback>
                                      ) : null}
                                    </Col>
                                    <Col lg="6">
                                      <Input
                                        className="form-control login-input text_1"
                                        name="phone2"
                                        type="text"
                                        placeholder="Mobile Phone 2"
                                        value={phoneNumber2}
                                        onChange={(event) => handleInputPhone(event, setPhoneNumber2)}
                                      />
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col lg="12">
                                      <Input
                                        id="email"
                                        name="email"
                                        className="form-control login-input text_1 mt-3"
                                        placeholder="Email"
                                        type="email"
                                        onChange={validation.handleChange}
                                        onKeyDown={handleBackspace}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          validation.touched.email && validation.errors.email ? true : false
                                        }
                                      />
                                      {validation.touched.email && validation.errors.email ? (
                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                      ) : null}
                                    </Col>

                                  </Row>

                                  <Row className="mt-3">
                                    <Col lg="6">
                                      <Col xl={11}>
                                        <Select
                                          name="ethnicity"
                                          placeholder={"Ethnicity"}
                                          options={ethnic_opt}
                                          value={selectedEthnicOption} // Use selectedEthnicOption directly here
                                          styles={customStyles}
                                          onChange={(selectedOption) => {
                                            handleEthnicChange(selectedOption);
                                          }}
                                          className="select2-selection text_1"
                                        />

                                        {showInput && (

                                          <Col xl={12} className="d-flex justify-content-between mt-3">
                                            <Col xl={1} className="mt-3">
                                              <Tooltip
                                                placement="bottom"
                                                isOpen={tethnic}
                                                target="TooltipEthnic"
                                                toggle={() => {
                                                  settethnic(!tethnic);
                                                }}
                                              >

                                                State your ethnicity here
                                              </Tooltip>
                                              <i
                                                id="TooltipEthnic"
                                                className="bx bxs-info-circle"
                                                style={{ fontSize: '20px', color: 'blue' }}
                                              ></i>

                                            </Col>
                                            <Col xl={10}>
                                              <Input
                                                id="name"
                                                name="otherEthnicity"
                                                className="form-control login-input text_1"
                                                placeholder="Other ethnicity"
                                                type="text"
                                                onChange={validation.handleChange}

                                              />

                                            </Col>
                                          </Col>

                                        )}

                                      </Col>
                                    </Col>
                                    <Col lg="6">
                                      <Col xl={11}>
                                        <Select
                                          name="religion"
                                          placeholder={"Religion"}
                                          options={religion_opt}
                                          styles={customStyles}
                                          value={selectedReligionOption}
                                          onChange={(selectedOption) => {
                                            handleReligionChange(selectedOption);
                                          }}
                                          className="select2-selection text_1"
                                        />

                                        {showInput2 && (

                                          <Col xl={12} className="d-flex justify-content-between mt-3">
                                            <Col xl={1} className="mt-3">
                                              <Tooltip
                                                placement="bottom"
                                                isOpen={treligion}
                                                target="TooltipReligion"
                                                toggle={() => {
                                                  settreligion(!treligion);
                                                }}
                                              >

                                                State your religion here
                                              </Tooltip>
                                              <i
                                                id="TooltipReligion"
                                                className="bx bxs-info-circle"
                                                style={{ fontSize: '20px', color: 'blue' }}
                                              ></i>

                                            </Col>
                                            <Col xl={10}>
                                              <Input
                                                id=""
                                                name="otherReligion"
                                                className="form-control login-input text_1"
                                                placeholder="Other religion"
                                                type="text"
                                                onChange={validation.handleChange}
                                              />

                                            </Col>
                                          </Col>

                                        )}

                                      </Col>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3 mb-3">
                                    <Col lg="6">
                                      <Col xl={11}>
                                        <Select
                                          name="sex"
                                          placeholder={"Sex"}
                                          options={sex_opt}
                                          styles={customStyles}
                                          className="select2-selection text_1"
                                          onChange={(selectedOption) => {
                                            handleSexChange(selectedOption);
                                          }}
                                        />
                                      </Col>
                                    </Col>

                                    <Col lg="6">
                                      <Col xl={11}>
                                        <Select
                                          name="mstatus"
                                          placeholder={"Marital Status"}
                                          options={marital_status_opt}
                                          styles={customStyles}
                                          className="select2-selection text_1"
                                          onChange={(selectedOption) => {
                                            handleMstatusChange(selectedOption);
                                          }}
                                        />
                                      </Col>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg="12">
                                      <Input
                                        id="occupation"
                                        name="occupation"
                                        className="form-control login-input text_1"
                                        placeholder="Occupation"
                                        type="text"
                                        value={validation.values.occupation || ""}
                                        onChange={validation.handleChange}

                                      />
                                    </Col>


                                  </Row>
                                  <Row className="mt-3 mb-3">
                                    <Col lg="12">
                                      <Input
                                        id="email"
                                        name="service"
                                        className="form-control login-input text_1"
                                        placeholder="Service"
                                        type="text"
                                        onChange={validation.handleChange}

                                      />
                                    </Col>


                                  </Row>
                                  <Row className="mb-3">
                                    <Col lg="12">
                                      <textarea
                                        name="address"
                                        className="form-control login-textarea text_1"
                                        placeholder="Permanent Address"
                                        rows={4}
                                        cols={50}
                                        onChange={validation.handleChange}
                                      />
                                    </Col>


                                  </Row>
                                </TabPane>
                                <TabPane tabId={2}>
                                  <div>

                                    <div className="mt-4">
                                      <h6 className="card-title std_font">Upload Documents</h6>
                                      <h6 className="font12">File size limit is 5MB.</h6>
                                      <CardSubtitle className="mb-3 std_font mt-4">
                                        MyKad - Front
                                      </CardSubtitle>
                                      {/* First Dropzone */}
                                      <Dropzone
                                        onDrop={acceptedFiles => {
                                          handleAcceptedFiles(acceptedFiles, "f_mykad");
                                        }}
                                      >
                                        {({ getRootProps, getInputProps }) => (
                                          <div className="dropzone login-input">
                                            <div className="dz-message needsclick mt-2" {...getRootProps()}>
                                              <input {...getInputProps()} />
                                              <div className="mb-3">
                                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                                              </div>
                                              <h5>Drop files here or click to upload.</h5>
                                              <button type="button" className="btn mt-3 upload-file-btn">Upload</button>
                                            </div>
                                          </div>
                                        )}
                                      </Dropzone>
                                      {/* Display selected files for the first Dropzone */}
                                      <div className="dropzone-previews mt-3" id="file-previews1">
                                        {selectedFiles1.map((f, i) => (
                                          <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete file-selected-box"
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
                                                  <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                                  <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                                </Col>
                                              </Row>
                                            </div>
                                          </Card>
                                        ))}
                                      </div>

                                      {validation.errors.f_mykad && (
                                        <div className="text-danger">{validation.errors.f_mykad}</div>
                                      )}

                                    </div>


                                    <div className="mt-4">

                                      <CardSubtitle className="mb-3 std_font">
                                        MyKad - Back
                                      </CardSubtitle>
                                      {/* Second Dropzone */}
                                      <Dropzone
                                        onDrop={acceptedFiles => {
                                          handleAcceptedFiles(acceptedFiles, "b_mykad");
                                        }}
                                      >
                                        {({ getRootProps, getInputProps }) => (
                                          <div className="dropzone login-input">
                                            <div className="dz-message needsclick mt-2" {...getRootProps()}>
                                              <input {...getInputProps()} />
                                              <div className="mb-3">
                                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                                              </div>
                                              <h5>Drop files here or click to upload.</h5>
                                              <button type="button" className="btn mt-3 upload-file-btn">Upload</button>
                                            </div>
                                          </div>
                                        )}
                                      </Dropzone>
                                      {/* Display selected files for the second Dropzone */}
                                      <div className="dropzone-previews mt-3" id="file-previews2">
                                        {selectedFiles2.map((f, i) => (
                                          <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete file-selected-box"
                                            key={i + "-b_mykad"}
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
                                                  <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                                  <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                                </Col>
                                              </Row>
                                            </div>
                                          </Card>
                                        ))}
                                      </div>

                                      {validation.errors.b_mykad && (
                                        <div className="text-danger">{validation.errors.b_mykad}</div>
                                      )}

                                    </div>


                                    <div className="mt-4">

                                      <CardSubtitle className="mb-3 std_font">
                                        Utility Bill
                                      </CardSubtitle>
                                      {/* Third Dropzone */}
                                      <Dropzone
                                        onDrop={acceptedFiles => {
                                          handleAcceptedFiles(acceptedFiles, "utilitybill");
                                        }}
                                      >
                                        {({ getRootProps, getInputProps }) => (
                                          <div className="dropzone login-input">
                                            <div className="dz-message needsclick mt-2" {...getRootProps()}>
                                              <input {...getInputProps()} />
                                              <div className="mb-3">
                                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                                              </div>
                                              <h5>Drop files here or click to upload.</h5>
                                              <button type="button" className="btn mt-3 upload-file-btn">Upload</button>
                                            </div>
                                          </div>
                                        )}
                                      </Dropzone>
                                      {/* Display selected files for the second Dropzone */}
                                      <div className="dropzone-previews mt-3" id="file-previews2">
                                        {selectedFiles3.map((f, i) => (
                                          <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete file-selected-box"
                                            key={i + "-utilitybill"}
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
                                                  <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                                  <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                                </Col>
                                              </Row>
                                            </div>
                                          </Card>
                                        ))}
                                      </div>
                                      {validation.errors.utilitybill && (
                                        <div className="text-danger">{validation.errors.utilitybill}</div>
                                      )}
                                    </div>


                                  </div>
                                </TabPane>
                                <TabPane tabId={3}>
                                  <div>

                                    <Row>
                                      <Col lg="12">
                                        <div className="mb-5">
                                          <h4 className="card-title std_font text-center mb-3">DECLARATIONS</h4>
                                          <h6 className="text-left font12">1. I hereby agree to abide by the current By-Laws and Rules of the Co-operative, as well as any amendments formally made during the period of my membership.  I also declare that I am not a bankrupt, nor have any criminal proceedings been taken against me, nor has my membership been removed prematurely from any other cooperative in the last one year.
                                            <br></br><br></br>
                                            2. I am a Malaysian citizen and have reached the age of 18 years old, residing in, working in, or owning land/property in the Co-operative's area of operation.
                                            <br></br><br></br>
                                            3. I hereby name the following as my nominee to receive my shares/interest.
                                            (for Non-Muslim
                                            members only)</h6>
                                        </div>

                                        <div className=" mb-3">
                                          <Input
                                            id="name"
                                            name="declareName"
                                            className="form-control login-input text_1"
                                            placeholder="Name (As per IC)"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.declareName || ""}
                                            invalid={
                                              validation.touched.declareName && validation.errors.declareName ? true : false
                                            }
                                          />
                                          {validation.touched.declareName && validation.errors.declareName ? (
                                            <FormFeedback type="invalid">{validation.errors.declareName}</FormFeedback>
                                          ) : null}

                                        </div>
                                        <div className=" mb-3">
                                          <Input
                                            name="declareIcNum"
                                            className="form-control login-input text_1"
                                            placeholder="IC Number"
                                            type="text"
                                            value={declareIcNumber}
                                            onChange={(e) => {
                                              validation.handleChange(e); // Call the formik handleChange
                                              handleChange2(e); // Call your custom handleChange
                                            }}
                                            onKeyDown={handleBackspace}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                              validation.touched.declareIcNum && validation.errors.declareIcNum ? true : false
                                            }
                                          />
                                          {validation.touched.declareIcNum && validation.errors.declareIcNum ? (
                                            <FormFeedback type="invalid">{validation.errors.declareIcNum}</FormFeedback>
                                          ) : null}
                                        </div>
                                        <div className=" mb-3">
                                          <Input
                                            id="name"
                                            name="declareRelay"
                                            className="form-control login-input text_1"
                                            placeholder="Relationship"
                                            type="text"
                                            onChange={validation.handleChange}
                                          />
                                        </div>

                                        <div className="p-1 std_font">
                                          NRIC Copy
                                        </div>
                                        {/* First Dropzone */}
                                        <Dropzone
                                          onDrop={acceptedFiles => {
                                            handleAcceptedFiles(acceptedFiles, "nomnric");
                                          }}
                                        >
                                          {({ getRootProps, getInputProps }) => (
                                            <div className="dropzone login-input">
                                              <div className="dz-message needsclick mt-2" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <div className="mb-3">
                                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                </div>
                                                <h5>Drop files here or click to upload.</h5>
                                                <button type="button" className="btn mt-3 upload-file-btn">Upload</button>
                                              </div>
                                            </div>
                                          )}
                                        </Dropzone>
                                        {/* Display selected files for the first Dropzone */}
                                        <div className="dropzone-previews mt-3 mb-4" id="file-previews1">
                                          {selectedFiles4.map((f, i) => (
                                            <Card
                                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete file-selected-box"
                                              key={i + "-nomnric"}
                                            >
                                              <div className="p-2 ">
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
                                                    <a href="#" className="text-muted font-weight-bold">{f.name}</a>
                                                    <p className="mb-0"><strong>{f.formattedSize}</strong></p>
                                                  </Col>
                                                </Row>
                                              </div>
                                            </Card>
                                          ))}

                                          {validation.errors.nomnric && (
                                            <div className="text-danger">{validation.errors.nomnric}</div>
                                          )}
                                        </div>



                                        <div className="mb-3 font12">
                                          <p className="std_font">
                                            I have read and understood this declaration.
                                          </p>
                                          <div className="form-check mb-3 mt-2">
                                            <input
                                              name="declareAgree"
                                              className="form-check-input"
                                              type="checkbox"
                                              value={validation.values.declareAgree}
                                              onChange={validation.handleChange}
                                              id="defaultCheck1"
                                            />
                                            <label
                                              className="form-check-label std_font"
                                              htmlFor="defaultCheck1"
                                            >
                                              I agree to this declaration
                                            </label>
                                            {validation.errors.declareAgree && (
                                              <div className="text-danger">{validation.errors.declareAgree}</div>
                                            )}
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>

                                  </div>
                                </TabPane>
                                <TabPane tabId={4}>
                                  <div className="row justify-content-center">
                                    <Col lg="6">
                                      <div className="text-center">
                                        <div className="mb-4">
                                          <i className="mdi mdi-close-circle failuremsgicon display-4" />
                                        </div>
                                        <div>
                                          <h5>Registration Failed!</h5>
                                          {/* <p className="text-muted mt-3">
                                            Your registration details have been submitted for review. Once your document is verified, you will receive an email notification confirming your account activation.
                                          </p> */}
                                        </div>
                                      </div>
                                    </Col>
                                  </div>
                                </TabPane>
                                <TabPane tabId={5}>
                                  <div className="row justify-content-center">
                                    <Col lg="6">
                                      <div className="text-center">
                                        <div className="mb-4">
                                          <i className="mdi mdi-check-circle-outline text-success display-4" />
                                        </div>
                                        <div>
                                          <h5>Registration Successful!</h5>
                                          <p className="text-muted mt-3">
                                            Your registration details have been submitted for review. Once your document is verified, you will receive an email notification confirming your account activation.
                                          </p>
                                        </div>
                                      </div>
                                    </Col>
                                  </div>
                                </TabPane>
                              </TabContent>
                            </div>
                            <div className="actions clearfix">
                              <ul>
                                <li className={activeTab === 1 ? "previous disabled" : "previous"}>
                                  <Link
                                    className={` ${activeTab === 4 || activeTab === 5 ? "d-none" : ""}`}
                                    to="#"
                                    onClick={() => {
                                      toggleTab(activeTab - 1)
                                    }}
                                  >
                                    Previous
                                  </Link>
                                </li>
                                <li className={activeTab === 3 ? "next d-none" : "next"}>
                                  <Link
                                    className={` ${activeTab === 4 || activeTab === 5 ? "d-none" : ""}`}
                                    to="#"
                                    onClick={() => {
                                      toggleTab(activeTab + 1);
                                    }}
                                  >
                                    Next
                                  </Link>
                                </li>
                                <div className="col-12">
                                  <div className="text-center">

                                    <button
                                      className={`btn btn-primary btn-block mt-5 signIn_btn col-12 ${activeTab === 3 ? "" : "d-none"}`}
                                      type="submit"
                                      onClick={() => {
                                        // Validate the form
                                        validation.validateForm().then(errors => {
                                          if (Object.keys(errors).length === 0) {
                                            // If there are no validation errors, proceed to the next step
                                            console.log("no required")
                                          } else {


                                            // If there are validation errors, display them
                                            validation.setTouched({
                                              ...Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
                                            });
                                            console.log("need required")
                                            // toggleTab(activeTab + 1);
                                          }
                                        });
                                      }}
                                    >
                                      Register
                                    </button>


                                  </div>
                                </div>
                              </ul>
                            </div>

                          </div>




                        </Form>



                      </div>
                    </div>

                    {/* <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        ©{" "}
                        {new Date().getFullYear()}
                        Skote. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register3;
