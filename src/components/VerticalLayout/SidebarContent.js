import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";


// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" >
                {/* <i className="bx bx-home-circle"></i> */}
                <span>{props.t("DASHBOARD")}</span>
              </Link>
            </li>
            <li>
              <Link to="/update-gold-rate" >
                {/* <i className="bx bx-home-circle"></i> */}
                <span>{props.t("UPDATE GOLD RATE")}</span>
              </Link>
            </li>


            <li>
              <Link to="/#" className="has-arrow">
                {/* <i className="bx bx-user"></i> */}
                <span >{props.t("MEMBERSHIP MANAGEMENT")}</span>
              </Link>
              <ul className="sub-menu">
                <li  >
                  <Link to="/tables-datatable">{props.t("NEW MEMBER VERIFICATION")}</Link>
                </li>
                <li  >
                  <Link to="/member-profile-list">{props.t("MEMBER PROFILE")}</Link>
                </li>

                <li  >
                  <Link to="/admin-announcement-update">{props.t("ANNOUNCEMENT & UPDATE")}</Link>
                </li>
                <li  >
                  <Link to="/module-management">{props.t("MODULE MANAGEMENT")}</Link>
                </li>
              </ul>
            </li>

            

            <li>
              <Link to="/#" className="has-arrow ">
                {/* <i className="bx bx-file"></i> */}
                <span>{props.t("SCHEMES")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="//admin-swarna-tira/index">{props.t("SVARNA TIRA SCHEME")}</Link>
                  <ul className="sub-menu">
                  
                    <li  >
                      <Link to="/admin-swarna-tira/index">{props.t("List of Members")}</Link>
                    </li>
                    <li  >
                      <Link to="/admin-swarna-tira/gold-purchase-list">{props.t("Gold Purchase")}</Link>
                    </li>
                    <li  >
                      <Link to="/admin-swarna-tira/gold-selling-list">{props.t("Gold Selling")}</Link>
                    </li>

                  </ul>
                </li>
                <li >
                  <Link to="/admin-swarna-stokam-niksepa/index">{props.t("SVARNA STOKAM NIKSEPA SCHEME")}</Link>
                </li>
                <li>
                  <Link to="/admin-svarna-roka-agrima/loan-application-list">{props.t("SVARNA ROKA AGRIMA SCHEME")}</Link>
                  <ul className="sub-menu">
                    <li>
                    <Link to="/admin-svarna-roka-agrima/loan-application-list/">{props.t("Loan Request List")}</Link>
                    </li>

                    <li>
                    <Link to="/admin-svarna-roka-agrima/LoanApprovedList/">{props.t("Loan Approved List")}</Link>
                    </li>
                    

                  </ul>
                </li>

                <li>
                  <Link to="//admin-svarna-ahita/index-list">{props.t("SVARNA AHITA SCHEME")}</Link>
                  <ul className="sub-menu">
                    {/* <li>
                    <Link to="/admin-svarna-ahita/user-view">{props.t("Loan Request List")}</Link>
                    </li> */}

                    <li>
                    <Link to="/admin-svarna-ahita/index-list">{props.t("Loan Request List")}</Link>
                      
                    {/* <Link to="/admin-svarna-roka-agrima/LoanApprovedList/">{props.t("Loan Approved List")}</Link> */}
                    </li>
                    <li>
                    <Link to="/admin-svarna-ahita/PawnApprovedList/">{props.t("Loan Approved List")}</Link>
                    </li>
                    

                  </ul>
                </li>


                {/* <li >
                  <Link to="/admin-svarna-roka-agrima/loan-approved-details">{props.t("SVARNA ROKA AGRIMA SCHEME")}</Link>
                </li>
                <li >
                  <Link to="/admin-svarna-roka-agrima/loan-application-details">{props.t("SVARNA ROKA AGRIMA SCHEME")}</Link>
                </li> */}
                  {/* <li>
                <Link to="/admin-svarna-ahita/index-list">{props.t("SVARNA AHITA SCHEME")}</Link>
              </li> */}
                 {/* <li>
                <Link to="/admin-svarna-ahita/user-view">{props.t("SVARNA AHITA SCHEME")}</Link>
              </li>
              <li>
                <Link to="/admin-svarna-ahita/index-list">{props.t("SVARNA AHITA SCHEME")}</Link>
              </li> */}
              {/* <li>
                <Link to="/admin-svarna-ahita/request-view">{props.t("SVARNA AHITA SCHEME")}</Link>
              </li> */}
                 {/* <li  >
                <Link to="/admin-svarna-ahita/request-view">{props.t("SVARNA AHITA SCHEME")}</Link>
              </li> */}
              {/*   <li  >
                <Link to="/admin-svarna-runa/index">{props.t("SVARNA RUNA SCHEME")}</Link>
              </li>*/}
              </ul>
             
              
            

            </li>


            <li>
              <Link to="/#" className="has-arrow ">
                <span>{props.t("GOLD MANAGEMENT")}</span>
              </Link>
              <ul className="sub-menu">
                <li  >
                  <Link to="/Goldvault">{props.t("Gold Vault")}</Link>
                </li>

                {/* <li >
                  <Link to="/#">{props.t("SVARNA ROKA AGRIMA SCHEME")}</Link>
                </li>
                <li  >
                  <Link to="/#">{props.t("SVARNA AHITA SCHEME")}</Link>
                </li>
                <li  >
                  <Link to="/#">{props.t("SVARNA RUNA SCHEME")}</Link>
                </li> */}
              </ul>
            </li>


            <li>
              <Link to="/#" className="has-arrow ">
                <span>{props.t("MEMBERSHIP TIER")}</span>
              </Link>
              <ul className="sub-menu">
                <li  >
                  <Link to="/Membertier">{props.t("Membership tier")}</Link>
                </li>

                {/* <li >
                  <Link to="/#">{props.t("SVARNA ROKA AGRIMA SCHEME")}</Link>
                </li>
                <li  >
                  <Link to="/#">{props.t("SVARNA AHITA SCHEME")}</Link>
                </li>
                <li  >
                  <Link to="/#">{props.t("SVARNA RUNA SCHEME")}</Link>
                </li> */}
              </ul>
            </li>




          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
