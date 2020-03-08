import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./Components/General/Landing";
import Profile from "./Components/General/Profile";
import Navbar from "./Components/General/Navbar";

import Basics from "./Components/Others/Basics";
import Check from "./Components/Others/Check";
import Check1 from "./Components/Others/Check1";

import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";

import CompanyHome from "./Components/Companies/CompanyHome";
import CompanyForm from "./Components/Companies/CompanyForm";
import InternshipHost from "./Components/Companies/InternshipHost";
import CompanyDescription from "./Components/Companies/CompanyDescription";
import CompanyEnquiry from "./Components/Companies/CompanyEnquiry";
import CompanyTechnologies from "./Components/Companies/CompanyTechnologies";
import EditInternship from "./Components/Companies/EditInternship";

import StudentHome from "./Components/Students/StudentHome";
import StudentForm from "./Components/Students/StudentForm";
import AcademicForm from "./Components/Students/AcademicForm";
import StudentInternSelect from "./Components/Students/StudentInternSelect";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="main">
          <Route exact path="/profile" component={Profile} />

          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/check" component={Check} />
          <Route exact path="/check1" component={Check1} />
          <Route exact path="/basics" component={Basics} />

          <Route exact path="/companyHome" component={CompanyHome} />
          <Route exact path="/companyForm" component={CompanyForm} />
          <Route exact path="/internshipHost" component={InternshipHost} />
          <Route
            exact
            path="/companyDescription"
            component={CompanyDescription}
          />
          <Route exact path="/companyEnquiry" component={CompanyEnquiry} />
          <Route
            exact
            path="/companyTechnologies"
            component={CompanyTechnologies}
          />
          <Route exact path="/editInternship" component={EditInternship} />

          <Route exact path="/studentHome" component={StudentHome} />
          <Route exact path="/studentForm" component={StudentForm} />
          <Route exact path="/academicForm" component={AcademicForm} />
          <Route
            exact
            path="/selectedInternship"
            component={StudentInternSelect}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
