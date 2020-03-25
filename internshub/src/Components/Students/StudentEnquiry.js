import React, { useState, useEffect } from "react";
import "../../CSS/student.css";
import { studentEnquiries } from "../Utilities/StudentFunctions";

function StudentEnquiry() {
  const [studentEnquiry, setStudentEnquiry] = useState([]);

  useEffect(() => {
    document.title = "InternsHub | Student Enquiry";
    studentEnquiries().then(res => {
      if (res) {
        //console.log(res.data);
        const internEnq = res.data.enquiry.filter(
          data => data.internship !== null
        );
        //console.log(res.data.data.enquiry[0]);
        setStudentEnquiry(internEnq);
      }
    });
    // eslint-disable-next-line
  }, []);
  const InternshipEnq = props => (
    <tr>
      <td>{props.internship.internship.title}</td>
      <td>{props.internship.internship.starts_on.substring(0, 10)}</td>
      <td>{props.internship.company.user.fullname}</td>
      <td>{props.internship.reqAt.substring(0, 10)}</td>
      <td>{props.internship.accepted}</td>
      <td>{props.internship.completed}</td>
    </tr>
  );
  const None = key => (
    <tr key={key}>
      <td colSpan="7">
        <center>
          <h2>No Data Yet</h2>
        </center>
      </td>
    </tr>
  );
  function internshipEnquiryListReq() {
    let count = 0;
    let c = 0;
    // eslint-disable-next-line
    return studentEnquiry.map(currentInternship => {
      var ends_on = new Date(currentInternship.internship.ends_on);
      if (ends_on > Date.now() && currentInternship.completed === "No") {
        c += 1;
        return (
          <InternshipEnq
            key={currentInternship.id}
            internship={currentInternship}
          />
        );
      } else {
        count += 1;
        if (c === 0 && studentEnquiry.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }
  function internshipEnquiryListCom() {
    let count = 0;
    let c = 0;
    // eslint-disable-next-line
    return studentEnquiry.map(currentInternship => {
      var ends_on = new Date(currentInternship.internship.ends_on);
      if (currentInternship.completed === "Yes" || ends_on < Date.now()) {
        c += 1;
        return (
          <InternshipEnq
            key={currentInternship.id}
            internship={currentInternship}
          />
        );
      } else {
        count += 1;
        if (c === 0 && studentEnquiry.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <div className="col-sm-8 mx-auto display-4 text-center">
          Student Enquiry
        </div>
      </div>
      <div>
        <h2>Requested / Ongoing Internships</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Internship</th>
              <th>Starts On</th>
              <th>Company</th>
              <th>Requested On</th>
              <th>Accepted</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>{internshipEnquiryListReq()}</tbody>
        </table>
        <h2>Completed / Past Internships</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Internship</th>
              <th>Starts On</th>
              <th>Company</th>
              <th>Requested On</th>
              <th>Accepted</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>{internshipEnquiryListCom()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentEnquiry;
