// src/components/filter.
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  CardTitle,
} from "reactstrap";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
import Switch from "react-switch";
import { del, get, post, put } from "../../../helpers/api_helper";

import '../style.scss';

function ModuleManagement() {
  const [data, setdata] = useState([]);
 

  useEffect(() => {
    get(apiname.schemeList)
      .then((res) => {
        if (res.status === "204") {
        } else {
          const sortedData = res.data.result.sort((a, b) => b.id - a.id);
          setdata(sortedData);

        }
      })
      .catch((err) => console.log(err));
  }, []);




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


  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',

      },
      {
        Header: 'Name',
        accessor: 'scheme_name',
      },
      {
        Header: 'Required gold',
        accessor: '',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <span className="d-flex justify-content-center">
            {row.original.status == 1 ? (
              <span>
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
              </span>
            ) : (
              <span >
                <Switch
                  uncheckedIcon={<Offsymbol />}
                  checkedIcon={<OnSymbol />}
                  className="me-1 mb-sm-8 mb-2"
                  onColor="#14ff00"
                  onChange={() => {
                    setswitch1(!switch1);
                  }}
                  checked={!switch1}
                />

              </span>
            )}
          </span>
        )
      },

    ],
    []
  );




  //meta title
  document.title = "GLCL";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="MEMBERSHIP MANAGEMENT" breadcrumbItem="MODULE MANAGEMENT" />

        <Card className="defCard">
          <CardBody>
            <CardTitle className="cardTitle">List of Module</CardTitle>
            <div className="d-print-none mt-4">
              <div className="float-end ">
                {/* <button
                  type="button"
                  className="btn btn-primary exportBtn  me-2"
                >
                  <i className="mdi mdi-upload  "></i>{" "}
                  EXPORT
  </button>*/}

              </div>
            </div>
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
  );
}



export default ModuleManagement;