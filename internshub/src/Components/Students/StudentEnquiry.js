import React, { useState, useEffect } from "react";
import { studentEnquiries } from "../Utilities/StudentFunctions";

function StudentEnquiry() {
  const [studentEnquiry, setStudentEnquiry] = useState([]);
  const [more, setMore] = useState({
    starts: Date,
    compName: "",
    accepted: "",
    completed: "",
    compEmail: "",
    compPhone: ""
  });

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
      <td>{props.internship.reqAt.substring(0, 10)}</td>
      <td>
        <button
          className="btn btn-secondary btn-sm btn-block"
          data-toggle="modal"
          data-target="#more"
          onClick={() => {
            setMore({
              ...more,
              starts: props.internship.internship.starts_on
                .substring(0, 10)
                .toString(),
              compName: props.internship.company.user.fullname,
              accepted: props.internship.accepted,
              completed: props.internship.completed,
              compEmail: props.internship.company.user.email,
              compPhone: props.internship.company.user.phoneNumber
            });
          }}
        >
          More Info
        </button>
      </td>
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
              <th>Requested On</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>{internshipEnquiryListReq()}</tbody>
        </table>
        <h2>Completed / Past Internships</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Internship</th>
              <th>Requested On</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>{internshipEnquiryListCom()}</tbody>
        </table>
        <div className="modal fade" id="more">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">More Information</h5>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Starts On: {more.starts}</p>
                <p>Company Name: {more.compName}</p>
                <p>Company Email: {more.compEmail}</p>
                <p>Company Phone Number: {more.compPhone}</p>
                <p>Accepted State: {more.accepted}</p>
                <p>Completed State: {more.completed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEnquiry;
