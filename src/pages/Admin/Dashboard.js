import PropTypes from "prop-types";
import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import { del, get, post, put } from "../../helpers/api_helper";

import classNames from "classnames";

//import Charts
// import StackedColumnChart from "./StackedColumnChart";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";
import axios from "axios";
import { useParams } from 'react-router-dom';
import * as apiname from "../../helpers/url_helper";
import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";
import TableContainer from '../../components/Common/TableContainer';
import { format } from 'date-fns';

// Pages Components
// import WelcomeComp from "./WelcomeComp";
// import MonthlyEarning from "./MonthlyEarning";
// import SocialSource from "./SocialSource";
// import ActivityComp from "./ActivityComp";
// import TopCities from "./TopCities";
// import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {
  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));

  

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("yearly"));
  }, [dispatch]);

  const [dataSchemes, setDataSchemes] = useState([]);
  useEffect(() => {
      get(apiname.schemeList)
      .then(res => {

        // Sort data in descending order based on 'id' column
        if(res.data.result) {
          const sortedData = res.data.result.sort((a, b) => b.id - a.id);
          setDataSchemes(sortedData);
        }
        
      })
      .catch(err => console.log(err));
      // axios.get(apiname.base_url + apiname.schemeList, {
      //     headers: {
      //         'Authorization': 'Basic ' + apiname.encoded
      //     }
      // })
      //     // .then(res =>console.log(res))
      //     .then(res => {
      //       // Sort data in descending order based on 'id' column
      //       const sortedData = res.data.result.sort((a, b) => b.id - a.id);
      //       setdata(sortedData);
      //     })
      //     .catch(err => console.log(err));
  }, []);
  console.log("data schemes");
  console.log(dataSchemes);


  const userSchemeIds = [
    { 'scheme_id': '1' },
    { 'scheme_id': '2' },
    { 'scheme_id': '3' },
    { 'scheme_id': '4' },
    { 'scheme_id': '5' },
];

const [data2, setdata2] = useState([]);
const [reports, setReports] = useState([]);

useEffect(() => {
    console.log(apiname.base_url);
    console.log(apiname.userScheme);
    // Fetch data for each scheme ID
    // Promise.all(
    //     userSchemeIds.map(userSchemeid => axios.post(apiname.base_url + apiname.userScheme, userSchemeid, {
    //         headers: {
    //             'Authorization': 'Basic ' + apiname.encoded
    //         }
    //     }))
    Promise.all(
        userSchemeIds.map(userSchemeid => post(apiname.userScheme, userSchemeid))
    ).then(responses => {
      console.log("responses");
      console.log(responses);
        // Update reports for each scheme ID
        const updatedReports = userSchemeIds.map((userSchemeid, index) => {
            let title = '';
            if (index == 0) {
                title = 'SVARNA TIRA SCHEME';
            } else if (index == 1) {
                title = 'SVARNA STOKAM NIKSEPA SCHEME';
            } else if (index == 2) {
                title = 'SVARNA ROKA AGRIMA SCHEME';
            
            } else if (index == 3) {
                title = 'SVARNA AHITA SCHEME';
            
            } else if (index == 4) {
                title = 'SVARNA RUNA SCHEME';
            }
            const total = responses[index].data.result ? responses[index].data.result.length : 0;
            return {
              title: title,
              iconClass: "bx-copy-alt",
              total: total,
              scheme_id: userSchemeid.scheme_id
            };
        });
        setReports(updatedReports);
        // Update data for the first scheme
        setdata2(responses[0].data.result);
    }).catch(err => console.log(err));
}, []);

console.log("User Scheme");
console.log(data2);
console.log("Reports");
console.log(reports);


const user = {
  'id': 1
};


const [data, setdata] = useState([]);
useEffect(() => {
  console.log(apiname.base_url);
  console.log(apiname.p_userdetails);
  console.log(user);
  post(apiname.p_userdetails, user)
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
console.log("User Data");
console.log(data[0]);

const [Uid, setUid] = useState(0);
const [SchemeIdAll, setSchemeIdAll] = useState(1,2);
const updateUid = (newUid) => {
  setUid(newUid);
};
const allSchemeId = (newSchemeIdAll) => {
  setSchemeIdAll(newSchemeIdAll);
};

const userSchemeid5 = {
  'scheme_id': SchemeIdAll,
  'user_id' : Uid
};

const [data5, setdata5] = useState([]);
useEffect(() => {
  console.log(apiname.base_url);
  console.log(apiname.userScheme);
  console.log(user);
  // axios.post(apiname.base_url + apiname.userScheme, userSchemeid5, {
  //     headers: {
  //         'Authorization': 'Basic ' + apiname.encoded
  //     }
  // })
  post(apiname.userScheme, userSchemeid5)
      // .then(res =>console.log(res))
      .then(res => setdata5(res.result))
      .catch(err => console.log(err));
}, []);
console.log("data5");
console.log(data5);


const columns = useMemo(
  () => [
      {
          Header: 'Date',
          accessor: 'createdAt',
          Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy')
      },
      {
          Header: 'Purpose',
          accessor: 'gweight',
          Cell: ({ row }) => (
            <span style={{ color: row.original.type === 1 ? '#4fb946' : 'red' }}>
              {row.original.type === 1 ? 'Buy - ' : 'Sell - '}
              {row.values.gweight}
              {row.original.type === 1 ? ' g' : ' g'}
            </span>
          )
        },
        
      {
          Header: 'Amount (RM)',
          accessor: 'total'
      },

      {
          Header: 'Status',
          accessor: ''
      },
      
      // {
      //     Header: 'Actions',
      //     accessor: 'actions',
      //     Cell: ({ row }) => (
      //         <div className="d-flex flex-wrap gap-2 justify-content-center">
      //             <Link to={`/admin-swarna-tira/member-details/${row.original.id}`} style={{ textDecoration: 'none' }}>
      //                 <button
      //                     type="button"
      //                     className="btn btn-primary rejectBtn"
      //                 >
      //                     <i className="mdi mdi-eye-outline font-size-16 align-middle me-1"></i>{" "}
      //                     View
      //                 </button>
      //             </Link>
      //         </div>
      //     )
      // },
  ],
  []
);

  //meta title
  document.title = "GLCL";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                     <Link to={generatePath(report.scheme_id)} className="text-decoration-none">
                    <Card className="mini-stats-wid" style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)', borderRadius: '20px' }}>
                      <CardBody>
                      <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium scheme_title">
                              {report.title}
                            </p>
                            <p className="mb-0 std_font">{report.total}<span className=""> members</span></p>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    </Link>
                  </Col>
                ))}
              </Row>

              {/* <Card className="defCard">
          <CardBody>
            <CardTitle>Latest Transaction</CardTitle>
              <div className="container-fluid">
                <Table columns={columns} data={data} />
                <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />
            </div>
            </CardBody>
            </Card> */}
            </Col>
          </Row>

         

         
        </Container>
      </div>

      {/* subscribe ModalHeader */}
      {/* <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal);
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubscribemodal(!subscribemodal);
            }}
          ></ModalHeader>
        </div>
        <div className="modal-body">
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light  rounded-circle text-primary h1">
                <i className="mdi mdi-email-open"></i>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-10">
                <h4 className="text-primary">Subscribe !</h4>
                <p className="text-muted font-size-14 mb-4">
                  Subscribe our newletter and get notification to stay update.
                </p>

                <div
                  className="input-group rounded bg-light"
                >
                  <Input
                    type="email"
                    className="form-control bg-transparent border-0"
                    placeholder="Enter Email address"
                  />
                  <Button color="primary" type="button" id="button-addon2">
                    <i className="bx bxs-paper-plane"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal> */}

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div>
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const generatePath = (schemeId) => {
  if (schemeId === '1') {
    return '/admin-swarna-tira/index';
  } else if (schemeId === '2') {
    return '/admin-swarna-stokam-niksepa/index';
  } else {
    return ''; // Handle other scheme IDs here
  }
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
