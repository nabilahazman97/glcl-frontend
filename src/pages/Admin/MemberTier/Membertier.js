import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  CardTitle,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

// import { Name, Email, Tags, Projects } from "./contactlistCol";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";

import {
  getUsers1 as onGetUsers,
  addNewUser1 as onAddNewUser,
  updateUser1 as onUpdateUser,
  deleteUser1 as onDeleteUser,
   
  fetchGoldvaultlist1 as fetchGoldvaultlist1
} from "store/membershiptier/actions";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const Membertier = props => {

  //meta title
  document.title = "MEMBER TIER";

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
    tierName: (contact && contact.tierName) || "",
    totalGold: (contact && contact.totalGold) || "",
    discountPrice: (contact && contact.discountPrice) || "",
    
    },
    validationSchema: Yup.object({
      tierName: Yup.string().required("Please Enter Your tiername"),
      totalGold: Yup.string().required("Please Enter Your totalgold"),
      discountPrice: Yup.string().required("Please Enter discountprice"),
    //   email: Yup.string().matches(
    //     /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     "Please Enter Valid Email"
    //   ).required("Please Enter Your Email"),
    //   projects: Yup.string().required("Please Enter Your Project"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          tierName: values.tierName,
          totalGold: values.totalGold,
          discountPrice: values.discountPrice,
          
        };
        // update user
        dispatch(onUpdateUser(updateUser));
        setIsEdit(false);
        validation.resetForm();
      } else {
        const newUser = {
        //   id: Math.floor(Math.random() * (30 - 20)) + 20,
          tierName: values["tierName"],
          totalGold: values["totalGold"],
          discountPrice: values["discountPrice"],
         
        };
        // save new user
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const { users } = useSelector(state => ({
    users: state.membershiptier.users,
  }));

  function closemodel(){
    setModal(false);
  }


  
//   const { users1 } = useSelector(state => console.log(state));


//   console.log("users");
//   console.log(users1);

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
    //   {
    //     Header: "#",
    //     Cell: () => {
    //       return <input type="checkbox" className="form-check-input" />;
    //     },
    //   },
    //   {
    //     Header: "Img",
    //     // accessor: "name",
    //     disableFilters: true,
    //     filterable: true,
    //     accessor: (cellProps) => (
    //       <>
    //         {!cellProps.img ? (
    //           <div className="avatar-xs">
    //             <span className="avatar-title rounded-circle">
    //               {/* {cellProps.name.charAt(0)} */}
    //             </span>
    //           </div>
    //         ) : (
    //           <div>
    //             <img
    //               className="rounded-circle avatar-xs"
    //               src={cellProps.img}
    //               alt=""
    //             />
    //           </div>
    //         )}
    //       </>
    //     ),
    //   },
    {
      Header: "No.",
      accessor: "",
      Cell: ({ row, rows }) => {
        return <span>{rows.findIndex(r => r.id === row.id) + 1}</span>;
      },
    },
      {
        Header: "Tier Name",
        accessor: "tierName",
        filterable: true,
        // Cell: cellProps => {
        //   return <tierName {...cellProps} />;
        // },
      },
      {
        Header: "Total Gold Coin (gm)",
        accessor: "totalGold",
        filterable: true,
        // Cell: cellProps => {
        //   return <totalGold {...cellProps} />;
        // },
      },
      {
        Header: "Gold Price Discount (%)",
        accessor: "discountPrice",
        filterable: true,
        // Cell: cellProps => {
        //   return <discountPrice {...cellProps} />;
        // },
      },
    //   {
    //     Header: "Projects",
    //     accessor: "projects",
    //     filterable: true,
    //     Cell: cellProps => {
    //       return (
    //         <>
    //           {" "}
    //           <Projects {...cellProps} />{" "}
    //         </>
    //       );
    //     },
    //   },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3 justify-content-center">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(fetchGoldvaultlist1());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };



  const handleUserClick = arg => {
    const user = arg;

    setContact({
      id: user.id,
      tierName: user.tierName,
      totalGold: user.totalGold,
      discountPrice: user.discountPrice,

    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = users => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
      <ToastContainer />
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Membershiptier" breadcrumbItem="MEMBER TIER" />
          <Row>
            <Col lg="12">
              <Card className="defCard">
                <CardBody>
                <CardTitle className="mb-3 cardTitle">List of Member Tier</CardTitle>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddtier={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit New Tier" : "Add New Tier"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label"> Tier Name</Label>
                              <Input
                                name="tierName"
                                type="tierName"
                                placeholder="TierName"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tierName || ""}
                                invalid={
                                  validation.touched.tierName &&
                                    validation.errors.tierName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.tierName &&
                                validation.errors.tierName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tierName}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Total Gold Coin</Label>
                              <Input
                                name="totalGold"
                                label="totgoldcoin"
                                placeholder="Totgoldcoin"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.totalGold || ""}
                                invalid={
                                  validation.touched.totalGold &&
                                    validation.errors.totalGold
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.totalGold &&
                                validation.errors.totalGold ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.totalGold}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Gold Price Discount</Label>
                              <Input
                                name="discountPrice"
                                label="discountPrice"
                                type="text"
                                placeholder="DiscountPrice"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.discountPrice || ""}
                                invalid={
                                  validation.touched.discountPrice &&
                                    validation.errors.discountPrice
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.discountPrice &&
                                validation.errors.discountPrice ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.discountPrice}
                                </FormFeedback>
                              ) : null}
                            </div>
                            
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-button">
                              <button
                                type="submit"
                                className="btn btn-success save-user savebustyle"
                              >
                                Save
                              </button>
                              &nbsp;&nbsp;
                              <button type="button" class="btn btn-secondary bu_yle"  onClick={closemodel}>Cancel</button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Membertier);
