import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormFeedback, Tooltip, Input, Label, Row } from "reactstrap";
import Select from "react-select";


// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const Register3 = () => {

  const [icNumber, setICNumber] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [selectedEthnicOption, setSelectedEthnicOption] = useState(null);
  const [selectedReligionOption, setSelectedReligionOption] = useState(null);
  const [tethnic, settethnic] = useState(false);
  const [treligion, settreligion] = useState(false);



  //meta title
  document.title = "GLCL";

  //form validation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: '',
      icNum: '',
      homeAddress: '',
      mob_phone1: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is reuired"),
      icNum: Yup.string().required("IC number is required"),
      homeAddress: Yup.string().required("Home address is required"),
      mob_phone1: Yup.string().required("Mobile phone number is required"),
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const ethnic_opt = [
    { value: 'option1', label: 'Malay' },
    { value: 'option2', label: 'Indian' },
    { value: 'option3', label: 'Chinese' },
    { value: 'option4', label: 'Other' },
  ];

  const religion_opt = [
    { value: 'option1', label: 'Islam' },
    { value: 'option2', label: 'Hindu' },
    { value: 'option3', label: 'Buddhist' },
    { value: 'option3', label: 'Christian' },
    { value: 'option4', label: 'Other' },
  ];

  const sex_opt = [
    { value: 'option1', label: 'Male' },
    { value: 'option2', label: 'Female' },
  ];

  const marital_status_opt = [
    { value: 'option1', label: 'Single' },
    { value: 'option2', label: 'Married' },
    { value: 'option3', label: 'Widow' },
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



  const calculateAge = (year) => {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
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
    } else {
      setAge('');
    }
  };

  const handleBackspace = (e) => {
    // Allow backspace to delete the last character or hyphen
    if (e.keyCode === 8 && icNumber.charAt(icNumber.length - 1) === '-') {
      setICNumber(icNumber.slice(0, -1));
    }
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
    validationType.setFieldValue('mob_phone1', formattedPhoneNumber);
  };

  const handleEthnicChange = selectedEthnicOption => {
    setSelectedEthnicOption(selectedEthnicOption);
    setShowInput(selectedEthnicOption && selectedEthnicOption.value === 'option4'); // Show input box if 'Other' is selected
  };

  const handleReligionChange = selectedReligionOption => {
    setSelectedReligionOption(selectedReligionOption);
    setShowInput2(selectedReligionOption && selectedReligionOption.value === 'option4'); // Show input box if 'Other' is selected
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
                        <div class="d-flex text-center std_font">
                          <p className="">Already Registered? &nbsp; </p>
                          <Link to="/" style={{ textDecoration: 'none' }}>
                            <p className='text-gold'>Sign In</p>
                          </Link>
                        </div>
                      </div>

                      <div className="m-5">

                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="text-center">
                            <p className="login_title mb-4">MEMBERSHIP REGISTRATION</p>
                          </div>
                          <div className="mb-3">
                            {/* <Label className="form-label">Email</Label> */}
                            <Input
                              id="name"
                              name="name"
                              className="form-control login-input"
                              placeholder="Name"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.name || ""}
                              invalid={
                                validationType.touched.name && validationType.errors.name ? true : false
                              }
                            />
                            {validationType.touched.name && validationType.errors.name ? (
                              <FormFeedback type="invalid">{validationType.errors.name}</FormFeedback>
                            ) : null}

                          </div>

                          <div class="d-flex mb-3 justify-content-between">
                            <Col xl={5}>
                              <Input
                                className="form-control login-input"
                                name="icNum"
                                type="text"
                                placeholder="IC Number (As per IC)"
                                value={icNumber}
                                onChange={(e) => {
                                  validationType.handleChange(e); // Call the formik handleChange
                                  handleChange(e); // Call your custom handleChange
                                }}
                                onKeyDown={handleBackspace}
                                onBlur={validationType.handleBlur}
                                invalid={
                                  validationType.touched.icNum && validationType.errors.icNum ? true : false
                                }
                              />
                              {validationType.touched.icNum && validationType.errors.icNum ? (
                                <FormFeedback type="invalid">{validationType.errors.icNum}</FormFeedback>
                              ) : null}
                            </Col>
                            <Col xl={5}>
                              <Input
                                className="form-control login-input"
                                name="name"
                                type="text"
                                placeholder="Age"
                                value={age}
                                disabled
                              />
                            </Col>


                          </div>

                          <div className="mb-3">
                            <Input
                              type="textarea"
                              name="homeAddress"
                              id="textarea"
                              className="login-textarea"
                              // onChange={e => {
                              //   textareachange(e);
                              // }}
                              maxLength="50"
                              rows="4"
                              placeholder="Home Address"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.homeAddress || ""}
                              invalid={
                                validationType.touched.homeAddress && validationType.errors.homeAddress ? true : false
                              }
                            />
                            {validationType.touched.homeAddress && validationType.errors.homeAddress ? (
                              <FormFeedback type="invalid">{validationType.errors.homeAddress}</FormFeedback>
                            ) : null}


                          </div>
                          <div class="d-flex mb-3 justify-content-between">
                            <Col xl={5}>
                              <Input
                                className="form-control login-input text_1"
                                name="mob_phone1"
                                type="text"
                                placeholder="Mobile Phone 1"
                                onChange={handleChangePhone}
                                onBlur={validationType.handleBlur}
                                value={validationType.values.mob_phone1 || ""}
                                invalid={validationType.touched.mob_phone1 && validationType.errors.mob_phone1}
                              />
                              {validationType.touched.mob_phone1 && validationType.errors.mob_phone1 ? (
                                <FormFeedback type="invalid">{validationType.errors.mob_phone1}</FormFeedback>
                              ) : null}
                            </Col>
                            <Col xl={5}>
                              <Input
                                className="form-control login-input text_1"
                                name="phone2"
                                type="text"
                                placeholder="Mobile Phone 2"
                                value={phoneNumber2}
                                onChange={(event) => handleInputPhone(event, setPhoneNumber2)}
                              />
                            </Col>


                          </div>
                          <div className="mb-3">
                            {/* <Label className="form-label">Email</Label> */}
                            <Input
                              id="email"
                              name="email"
                              className="form-control login-input text_1"
                              placeholder="Email"
                              type="email"
                              onChange={(e) => {
                                validationType.handleChange(e); // Call the formik handleChange
                                handleChange(e); // Call your custom handleChange
                              }}
                              onKeyDown={handleBackspace}
                              onBlur={validationType.handleBlur}
                              invalid={
                                validationType.touched.email && validationType.errors.email ? true : false
                              }
                            />
                            {validationType.touched.email && validationType.errors.email ? (
                              <FormFeedback type="invalid">{validationType.errors.email}</FormFeedback>
                            ) : null}

                          </div>

                          <div className="d-flex justify-content-between mb-3">
                            <Col xl={6} className="d-flex justify-content-between">
                              {/* <Col xl={2} className="p-2">
                                <Label className="form-label text_1">Ethnic:</Label>
                              </Col> */}
                              <Col xl={11}>
                                <Select
                                placeholder={"Ethnicity"}
                                  options={ethnic_opt}
                                  value={selectedEthnicOption}
                                  styles={customStyles}
                                  onChange={handleEthnicChange}
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
                                        name="name"
                                        className="form-control login-input text_1"
                                        placeholder="Other ethnicity"
                                        type="text"

                                      />

                                    </Col>
                                  </Col>

                                )}

                              </Col>
                            </Col>
                            <Col xl={6} className="d-flex justify-content-between">
                              <Col xl={1} className="p-2">
                                {/* <Label className="form-label text_1">Religion:</Label> */}
                              </Col>
                              <Col xl={11}>
                                <Select
                                placeholder={"Religion"}
                                  options={religion_opt}
                                  styles={customStyles}
                                  value={selectedReligionOption}
                                  onChange={handleReligionChange}
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
                                        id="email"
                                        name="email"
                                        className="form-control login-input text_1"
                                        placeholder="Other religion"
                                        type="email"

                                      />

                                    </Col>
                                  </Col>

                                )}

                              </Col>

                            </Col>
                          </div>

                          <div className="d-flex justify-content-between mb-3 mt-3">
                            <Col xl={6} className="d-flex justify-content-between">
                              {/* <Col xl={2} className="p-2">
                                <Label className="form-label text_1">Sex:</Label>

                              </Col> */}
                              <Col xl={11}>
                                <Select
                                  placeholder={"Sex"}
                                  options={sex_opt}
                                  styles={customStyles}
                                  className="select2-selection text_1"
                                />
                              </Col>

                            </Col>
                            <Col xl={6} className="d-flex justify-content-between">
                              <Col xl={1} className="p-2">
                                {/* <Label className="form-label text_1">Marital Status:</Label> */}

                              </Col>
                              <Col xl={11}>
                                <Select
                                placeholder={"Marital Status"}
                                  options={marital_status_opt}
                                  styles={customStyles}
                                  className="select2-selection text_1"
                                />
                              </Col>

                            </Col>
                          </div>

                          <div className="mb-3">

                            <Input
                              id="email"
                              name="email"
                              className="form-control login-input text_1"
                              placeholder="Occupation"
                              type="email"

                            />
                          </div>

                          <div className="mb-3">
                            <Input
                              id="email"
                              name="email"
                              className="form-control login-input text_1"
                              placeholder="Service"
                              type="email"

                            />
                          </div>




                          <div className="mb-3">
                            <textarea
                              className="form-control login-textarea text_1"
                              placeholder="Permanent Address"
                              rows={4}
                              cols={50}
                            />
                          </div>



                          <Link to="/register-file-upload" style={{ textDecoration: 'none' }}>
                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-block signIn_btn text_1"
                                type="submit"
                              >
                                Next
                              </button>
                            </div>
                          </Link>


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
