import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./components/common/Contact";
import About from "./components/common/About";
import Home from "./components/common/Home";
import Prediction from "./components/common/Prediction";
import Insights from "./components/common/Insights";
import Marquee from "./components/common/Marquee";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AdminHome from "./components/admin/AdminHome";
import ApprovedHome from "./components/approved/ApprovedHome";
import NormalHome from "./components/normal/NormalHome";
import AdminAbout from "./components/admin/AdminAbout";
import ApprovedAbout from "./components/approved/ApprovedAbout";
import AdminContact from "./components/admin/AdminContact";
import ApprovedContact from "./components/approved/ApprovedContact";
import NormalContact from "./components/normal/NormalContact";
import AdminInsights from "./components/admin/AdminInsights";
import ApprovedInsights from "./components/approved/ApprovedInsights";
import NormalInsights from "./components/normal/NormalInsights";
import AdminPrediction from "./components/admin/AdminPrediction";
import ApprovedPrediction from "./components/approved/ApprovedPrediction";
import AdminApprovalRequests from "./components/admin/AdminApprovalRequests";
import ApprovedRequestApprovalForm from "./components/approved/ApprovedRequestApprovalForm";
import NormalRequestApprovalForm from "./components/normal/NormalRequestApprovalForm";
import NormalPrediction from "./components/normal/NormalPrediction";
import Unauthorized from "./components/background/Unauthorised";
import NotFound from "./components/background/NotFound"

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />



        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/approved/home" element={<ApprovedHome />} />
        <Route path="/normal/home" element={<NormalHome />} />

        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/approved/about" element={<ApprovedAbout />} />

        <Route path="/admin/contact" element={<AdminContact />} />
        <Route path="/approved/contact" element={<ApprovedContact />} />
        <Route path="/normal/contact" element={<NormalContact />} />

        <Route path="/admin/insights" element={<AdminInsights />} />
        <Route path="/approved/insights" element={<ApprovedInsights />} />
        <Route path="/normal/insights" element={<NormalInsights />} />

        <Route path="/admin/prediction" element={<AdminPrediction />} />
        <Route path="/approved/prediction" element={<ApprovedPrediction />} />
        <Route path="/normal/prediction" element={<NormalPrediction />} />


        <Route path="/admin/approval-requests" element={<AdminApprovalRequests />} />
        <Route path="/approved/request-approval" element={<ApprovedRequestApprovalForm />} />
        <Route path="/normal/request-approval" element={<NormalRequestApprovalForm />} />


        {/* <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/approval-requests" element={<ApprovalRequests />} />
        <Route path="/request-approval" element={<RequestApprovals />} /> */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
