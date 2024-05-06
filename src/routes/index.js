import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Logout from "../pages/Authentication/Logout";

//Login & Register //Badrul
import Login_1 from "../pages/Authentication/Login";
import Register_1 from "../pages/Authentication/Register";
import ForgetPwd3 from "../pages/Authentication/ForgetPassword";
import UserProfile from "../pages/Authentication/user-profile";


//ADMIN
import DashboardAdmin from "../pages/Admin/Dashboard";
import MemberProfileList from "../pages/Admin/MembershipManagement/MemberProfileList";
import MemberProfile from "../pages/Admin/MembershipManagement/MemberProfileDetails";
import DatatableTables from "../pages/Admin/MembershipManagement/NewMemberVerification";
import MemberApproval from "../pages/Admin/MembershipManagement/MemberApproval";

import AdminSwarnaTira from "../pages/Admin/Schemes/SwarnaTira/MemberList";


import AdminSwarnaTiraMemberDetails from "../pages/Admin/Schemes/SwarnaTira/MemberDetails";

import AdminSwarnaStokamNiksepa from "../pages/Admin/Schemes/SwarnaStokamNiksepa/MemberList";
import AdminSwarnaStokamNiksepaMemberDetails from "../pages/Admin/Schemes/SwarnaStokamNiksepa/MemberDetails";
import AnouncementUpdate from "../pages/Admin/MembershipManagement/AnnouncementUpdate";
import ModuleManagement from "../pages/Admin/MembershipManagement/ModuleManagement";
//ADMIN

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardAdmin /> },
  { path: "/member-approval/:Uid", component: <MemberApproval /> },




  { path: "/admin-swarna-tira/index", component: <AdminSwarnaTira /> },
  { path: "/admin-swarna-tira/member-details/:Uid", component: <AdminSwarnaTiraMemberDetails /> },




  { path: "/admin-swarna-stokam-niksepa/index", component: <AdminSwarnaStokamNiksepa /> },
  { path: "/admin-swarna-stokam-niksepa/member-details/:Uid", component: <AdminSwarnaStokamNiksepaMemberDetails /> },
  { path: "/admin-announcement-update", component: <AnouncementUpdate /> },
  { path: "/module-management", component: <ModuleManagement /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/tables-datatable", component: <DatatableTables /> },
  { path: "/member-profile-list", component: <MemberProfileList /> },
  { path: "/member-profile/:id", component: <MemberProfile /> },
  {
    path: "/",
    exact: true,
    component: < Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login_1 /> },
  { path: "/register", component: <Register_1 /> },



  // Authentication Inner
  { path: "/auth-recoverpw-3", component: <ForgetPwd3 /> },

];

export { authProtectedRoutes, publicRoutes };
