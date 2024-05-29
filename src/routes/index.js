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
import UpdateGoldRate from "../pages/Admin/UpdateGoldRate";

import AdminSwarnaTira from "../pages/Admin/Schemes/SwarnaTira/MemberList";


import AdminSwarnaTiraMemberDetails from "../pages/Admin/Schemes/SwarnaTira/MemberDetails";
import AdminSwarnaTiraGoldPurchaseList from "../pages/Admin/Schemes/SwarnaTira/GoldPurchase";
import AdminSwarnaTiraGoldSellingList from "../pages/Admin/Schemes/SwarnaTira/GoldSelling";
import AdminSwarnaStokamNiksepa from "../pages/Admin/Schemes/SwarnaStokamNiksepa/MemberList";
import AdminSwarnaStokamNiksepaMemberDetails from "../pages/Admin/Schemes/SwarnaStokamNiksepa/MemberDetails";
import AdminSvarnaRokaAgrima from "../pages/Admin/Schemes/SvarnaRokaAgrima/LoanApplicationList";
import AdminSvarnaRokaAgrimaLoanApprovedDetails from "../pages/Admin/Schemes/SvarnaRokaAgrima/LoanApprovedDetails";
import AdminSvarnaRokaAgrimaLoanApplicationDetails from "../pages/Admin/Schemes/SvarnaRokaAgrima/LoanApplicationDetails";
import AdminSvarnaAhitaList from "../pages/Admin/Schemes/SvarnaAhita/index";
import AdminSvarnaAhitaRequestView from "../pages/Admin/Schemes/SvarnaAhita/RequestView";
import AdminSvarnaAhitaUserView from "../pages/Admin/Schemes/SvarnaAhita/UserView";
<<<<<<< HEAD

import AdminSvarnaAhitaPawnApprovedList from "../pages/Admin/Schemes/SvarnaAhita/PawnApprovedList";

=======
import AdminSvarnaRunaIndex from "../pages/Admin/Schemes/SvarnaRuna/index";
>>>>>>> c8277073f1c227c225c38b96db0a84a03d52dec5
import AnouncementUpdate from "../pages/Admin/MembershipManagement/AnnouncementUpdate";
import ModuleManagement from "../pages/Admin/MembershipManagement/ModuleManagement";
import Goldvault from "../pages/Admin/GoldManagement/Goldvault";

import Membertier from  "../pages/Admin/MemberTier/Membertier";

import AdminSvarnaRokaAgrimaapprovedlist from "../pages/Admin/Schemes/SvarnaRokaAgrima/LoanApprovedList";



//ADMIN

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardAdmin /> },
  { path: "/member-approval/:Uid", component: <MemberApproval /> },

  { path: "/Goldvault", component: <Goldvault /> },

  { path: "/Membertier", component: <Membertier /> },

  





  { path: "/admin-swarna-tira/index", component: <AdminSwarnaTira /> },
  { path: "/admin-swarna-tira/member-details/:Uid", component: <AdminSwarnaTiraMemberDetails /> },
  { path: "/admin-swarna-tira/gold-purchase-list", component: <AdminSwarnaTiraGoldPurchaseList /> },
  { path: "/admin-swarna-tira/gold-selling-list", component: <AdminSwarnaTiraGoldSellingList /> },
  { path: "/admin-swarna-stokam-niksepa/index", component: <AdminSwarnaStokamNiksepa /> },
  { path: "/admin-swarna-stokam-niksepa/member-details/:Uid", component: <AdminSwarnaStokamNiksepaMemberDetails /> },

  { path: "/admin-svarna-roka-agrima/loan-application-list", component: <AdminSvarnaRokaAgrima /> },

  { path: "/admin-svarna-roka-agrima/LoanApprovedList", component: <AdminSvarnaRokaAgrimaapprovedlist /> },

  { path: "/admin-svarna-roka-agrima/loan-approved-details/:id", component: <AdminSvarnaRokaAgrimaLoanApprovedDetails /> },
  { path: "/admin-svarna-roka-agrima/loan-application-details/:lid", component: <AdminSvarnaRokaAgrimaLoanApplicationDetails /> },
  { path: "/admin-svarna-ahita/index-list", component: <AdminSvarnaAhitaList /> },
<<<<<<< HEAD
  { path: "/admin-svarna-ahita/request-view/:id", component: <AdminSvarnaAhitaRequestView /> },
  { path: "/admin-svarna-ahita/user-view/:id", component: <AdminSvarnaAhitaUserView /> },

  
  { path: "/admin-svarna-ahita/PawnApprovedList", component: <AdminSvarnaAhitaPawnApprovedList /> },


=======
  { path: "/admin-svarna-ahita/request-view", component: <AdminSvarnaAhitaRequestView /> },
  { path: "/admin-svarna-ahita/user-view", component: <AdminSvarnaAhitaUserView /> },
  { path: "/admin-svarna-runa/index", component: <AdminSvarnaRunaIndex /> },
>>>>>>> c8277073f1c227c225c38b96db0a84a03d52dec5
  { path: "/admin-announcement-update", component: <AnouncementUpdate /> },
  { path: "/module-management", component: <ModuleManagement /> },
  { path: "/update-gold-rate", component: <UpdateGoldRate /> },
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
