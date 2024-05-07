// src/components/filter.
import React, { useMemo, useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import * as apiname from "../../../helpers/url_helper";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { del, get, post, put } from "../../../helpers/api_helper";

// import './datatables.scss';

function MemberProfileList() {
    const [data, setUserData] = useState([]);
    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
   
   

   

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        get(apiname.USER_LIST)
          .then((res) => {
            if (res.status === "204") {
            } else {
              const filteredData = res.data.result.filter(item => item.ustatus == 1);
              setUserData(filteredData);
            }
          })
          .catch((err) => console.log(err));
      }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'username',
            },
            {
                Header: 'NRIC No.',
                accessor: 'icnumber',
            },
            {
                Header: 'Membership ID',
                accessor: 'membership_id',
            },
            {
                Header: 'Email',
                accessor: 'email_id'
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <Link to={`/member-profile/${row.original.id}`} style={{ textDecoration: 'none' }}>
                            <button
                                type="button"
                                className="btn btn-primary viewBtn"
                            >
                                View
                            </button>
                        </Link>


                    </div>
                )
            },
        ],
        []
    );

 

    //meta title
    document.title = "GLCL";

    return (
        <div className="page-content picBg">
            <div className="container-fluid">
                <Breadcrumbs title="MEMBERSHIP" breadcrumbItem="MEMBER PROFILE" />
                <Card className="defCard">
                    <CardBody>
                        <CardTitle className="mb-3 cardTitle">List of Members</CardTitle>
                        <div className="container-fluid">

                            <div className="d-print-none mt-4">
                                <div className="filterDate">
                                    <div style={{ position: 'relative' }}>
                                        
                                    </div>
                                </div>
                                
                            </div>
                            <TableContainer
                                columns={columns}
                                data={data}
                                // isGlobalFilter={true}
                                isAddOptions={false}
                                customPageSize={10}
                                className="custom-header-css"
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}




export default MemberProfileList;