import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import { del, get, post, put } from "../../../helpers/api_helper";
import axios from "axios";
import * as apiname from "../../../helpers/url_helper";
// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [userData, setUserData] = useState([]);
  const [Uid, setUid] = useState([]);
  const [name, setname] = useState("");

  useEffect(() => {
    // console.log("header name")
    var authUserData = localStorage.getItem("authUser");
   
    var authUserObject = JSON.parse(authUserData);
    // console.log("authUserData");
    // console.log(authUserObject);
    setUid(authUserObject.data.result.id);
    var username = setname(authUserObject.data.result.username);
    var id = authUserObject.data.result.id;
    const user = {
      'id': id
    };
    // console.log(localStorage.getItem("authUser"))
    // if (localStorage.getItem("authUser")) {
    //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //     const obj = JSON.parse(localStorage.getItem("authUser"));
    //     setusername(obj.displayName);
    //   } else if (
    //     process.env.REACT_APP_DEFAULTAUTH === "fake" ||
    //     process.env.REACT_APP_DEFAULTAUTH === "jwt"
    //   ) {
    //     const obj = JSON.parse(localStorage.getItem("authUser"));
    //     setusername(obj.username);
    //   }
    // }

    post(apiname.p_userdetails, { id: id })
      .then((res) => {
        // console.log("res");
        // console.log(res);
        if (res.status === '204') {
          // setUserData(0);
        } else {
          let filteredData = res.data.result[0];

          // console.log("filteredData");
          // console.log(filteredData);
          setUserData(filteredData.username);
        }

      })
      .catch((err) => console.log(err));

  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{userData}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Settings")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
