import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import * as apiname from "../../../helpers/url_helper";
import { del, get, post, put } from "../../../helpers/api_helper";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

// Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
  
  fetchGoldvaultlist as fetchGoldvaultlist
} from "store/contacts/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const Goldvault = (props) => {
  //meta title
  document.title = "Gold Vault List | Skote - React Admin & Dashboard Template";
  const [additionalField0Value, setAdditionalField0Value] = useState('');


  const dispatch = useDispatch();
  const [contact, setContact] = useState();

  function closemodel(){
    setModal(false);
    validation.resetForm();
    window.location.reload();
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      additionalFields:[],
      additionalField_0:additionalField0Value,
    },
    validationSchema: Yup.object({
       additionalField_0: Yup.string().required("Please Enter Your Serial number"),
    }),
    onSubmit: (values) => {
      var authUserData = localStorage.getItem("authUser");
      var authUserObject = JSON.parse(authUserData);
      var user_id=authUserObject.data.result.id;
    
      if (isEdit) {
       
        const updateUser = {
          id: contact.id,
          barcode: values.additionalField_0,
          // userId: '',
          goldGram:contact.goldGram,

        };
        dispatch(onUpdateUser(updateUser));
        setIsEdit(false);
        validation.resetForm();
        setAdditionalField0Value('');

      } else {
        var authUserData = localStorage.getItem("authUser");
        var authUserObject = JSON.parse(authUserData);
        var user_id=authUserObject.data.result.id;
  
        const allAdditionalFields = [
          ...values.additionalFields, 
          ...Object.keys(values)
              .filter(key => key.startsWith('additionalField_')) 
              .map(key => values[key])
              .filter(value => value)
      ];
  
      // Convert combined fields into an array of objects
      const additionalFieldsArray = allAdditionalFields.map((field, index) => ({
        // [`additionalField_${index}`]: field,
          [`barcodes`]: field,
          // userId:user_id 
      }));

      
        dispatch(onAddNewUser(additionalFieldsArray));
        
        validation.resetForm();
      }
      toggle();
    },
  });

  const { users } = useSelector((state) => ({
    users: state.contacts.users,
  }));



  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  
  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "",
        Cell: ({ row, rows }) => {
          return <span>{rows.findIndex(r => r.id === row.id) + 1}</span>;
        },
      },
      {
        Header: "barcode",
        accessor: "barcode",
        filterable: true,

      },
      {
        Header: "goldGram",
        accessor: "goldGram",
        filterable: true,

      },
      {
        Header: "userID",
        accessor: "userId",
        filterable: true,

      },
      {
        Header: "Action",
        Cell: (cellProps) => {
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
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                />
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
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                />
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
      dispatch(fetchGoldvaultlist());
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

  const handleUserClick = (arg) => {
    const user = arg;
    setContact({
      id: user.id,
      additionalField_0: user.barcode,
      goldGram:user.goldGram,
      userId:user.userId,
    });
    setIsEdit(true);
    setAdditionalField0Value(user.barcode);
    toggle();
  };

  const onPaginationPageChange = (page) => {
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

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {

    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    // onPaginationPageChange(1);
    setDeleteModal(false);
      // toast.success('Gold Deleted Successfully!'); 
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  const [numberOfRows, setNumberOfRows] = useState(1);

  const addRow = () => {
    setNumberOfRows((prev) => prev + 1);
  };

  const deleteRow = () => {
    if (numberOfRows > 1) {
      setNumberOfRows((prev) => prev - 1);
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        // onCloseClick={() => setDeleteModal(false)}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
      <ToastContainer />
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="GoldManagement" breadcrumbItem="Gold Vault" />
          <Row>
            <Col lg="12">
            <Row>
                    <div class="col-md-4">
                      <a class="text-decoration-none" href="">
                        <div class="mini-stats-wid card blubg">
                          <div class="card-body cardbody">
                            <div class="d-flex">
                              <div class="flex-grow-1">
                                <p class="txtcolor fw-medium scheme_title">
                                  TOTAL GOLD COIN
                                </p>
                                <p class="mb-0 std_font goldvaultfsize">100</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-4">
                      <a class="text-decoration-none" href="">
                        <div class="mini-stats-wid card goldbg">
                          <div class="card-body cardbody">
                            <div class="d-flex">
                              <div class="flex-grow-1">
                                <p class="txtcolor fw-medium scheme_title">
                                  OWNED GOLD COIN
                                </p>
                                <p class="mb-0 std_font goldvaultfsize">100</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-4">
                      <a class="text-decoration-none" href="">
                        <div class="mini-stats-wid card whbg">
                          <div class="card-body cardbody">
                            <div class="d-flex">
                              <div class="flex-grow-1">
                                <p class="text-muted fw-medium scheme_title">
                                  UNOWNED GOLD COIN
                                </p>
                                <p class="mb-0 std_font goldvaultfsize">100</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </Row>
              <Card>
                <CardBody>
                
                  <TableContainer
                    columns={columns}
                    data={users}
                    // reslist={users1} 
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                 
              
               
                

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Gold Coin" : "Add New Gold Coin"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>

                          
                          <Col xs={9}>
                                    {[...Array(numberOfRows)].map((_, index) => (
                                      <Row key={index} className="align-items-center">
                                        <Col xs={9}>
                                          <div>
                                            <Label className="form-label">
                                           
                                              {/* Gold Coin{index + 1} */}
                                            </Label>
                                            <Input
                                              name={`additionalField_${index}`}
                                              type="text"
                                              placeholder={`Enter Serial Number ${index + 1}`}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={validation.values[`additionalField_${index}`] || ""}
                                              invalid={
                                                validation.touched[`additionalField_${index}`] &&
                                                validation.errors[`additionalField_${index}`]
                                              }
                                            />
                                            {validation.touched[`additionalField_${index}`] &&
                                            validation.errors[`additionalField_${index}`] && (
                                              <FormFeedback type="invalid">
                                                {validation.errors[`additionalField_${index}`]}
                                              </FormFeedback>
                                            )}
                                          </div>
                                        </Col>
                                        {index !== 0 && (
                                          <Col xs={3}>
                                            <button
                                              className="btn btn-danger goldbuttondesign"
                                              onClick={deleteRow}
                                            >
                                              <i className="fas fa-minus"></i>
                                            </button>
                                          </Col>
                                        )}
                                      </Row>
                                    ))}
                                    
                                  </Col>
                                  {!isEdit && (
                          <Col xs={3}>
                            <div className="mt-3">
                              <button
                                type="button"
                                className="btn btn-primary goldbuttondesign btnmove"
                                onClick={addRow}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </Col>
                                  )}

                        </Row>
                        <br></br>
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

export default withRouter(Goldvault);
