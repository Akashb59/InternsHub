import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRouteCompany, ProtectedRouteStudent } from "./ProtectedRoute";

import Landing from "./Components/General/Landing";
import Profile from "./Components/General/Profile";
import Navbar from "./Components/General/Navbar";
import Footer from "./Components/General/Footer";
import Forbidden from "./Components/General/Forbidden";
import NotFound from "./Components/General/NotFound";

import Basics from "./Components/Others/Basics";
import Check from "./Components/Others/Check";

import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import ViewInternships from "./Components/Companies/ViewInternships";
import CompanyHome from "./Components/Companies/CompanyHome";
import CompanyForm from "./Components/Companies/CompanyForm";
//import InternshipHost from "./Components/Companies/InternshipHost";
//import CompanyDescription from "./Components/Companies/CompanyDescription";
import CompanyEnquiry from "./Components/Companies/CompanyEnquiry";
//import CompanyTechnologies from "./Components/Companies/CompanyTechnologies";
//import EditInternship from "./Components/Companies/EditInternship";

import StudentHome from "./Components/Students/StudentHome";
//import StudentForm from "./Components/Students/StudentForm";
//import AcademicForm from "./Components/Students/AcademicForm";
import StudentInternSelect from "./Components/Students/StudentInternSelect";
import StudentInfo from "./Components/Students/StudentInfo";

import "./CSS/App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <div className="main">
          <div id="content-wrap">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/forbidden" component={Forbidden} />
              <Route exact path="/notFound" component={NotFound} />

              <Route exact path="/profile" component={Profile} />

              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />

              <Route exact path="/check" component={Check} />
              <Route exact path="/basics" component={Basics} />

              <ProtectedRouteCompany
                exact
                path="/companyHome"
                component={CompanyHome}
              />
              <ProtectedRouteCompany
                exact
                path="/companyForm"
                component={CompanyForm}
              />
              {/* <ProtectedRouteCompany
                exact
                path="/internshipHost"
                component={InternshipHost}
              />
              <ProtectedRouteCompany
                exact
                path="/companyDescription"
                component={CompanyDescription}
              /> */}
              <ProtectedRouteCompany
                exact
                path="/companyEnquiry"
                component={CompanyEnquiry}
              />
              {/* <ProtectedRouteCompany
                exact
                path="/companyTechnologies"
                component={CompanyTechnologies}
              /> */}
              {/* <ProtectedRouteCompany
                exact
                path="/editInternship"
                component={EditInternship}
              /> */}
              <ProtectedRouteCompany
                exact
                path="/viewInternships"
                component={ViewInternships}
              />

              <ProtectedRouteStudent
                exact
                path="/studentHome"
                component={StudentHome}
              />
              {/* <ProtectedRouteStudent
                exact
                path="/studentForm"
                component={StudentForm}
              />
              <ProtectedRouteStudent
                exact
                path="/academicForm"
                component={AcademicForm}
              /> */}
              <ProtectedRouteStudent
                exact
                path="/selectedInternship"
                component={StudentInternSelect}
              />
              <ProtectedRouteStudent
                exact
                path="/studentDetails"
                component={StudentInfo}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
