import React, { useEffect, useState } from "react";
import "./../../CSS/company.css";
import { FaInfo, FaQuestion } from "react-icons/fa";

import {
  companyEnquiries,
  internshipEnquiries,
  internshipAccept
} from "./../Utilities/CompanyFunctions";
import { showAlert } from "../Utilities/Alerts";

function CompanyEnquiry(props) {
  const [internshipEnquiry, setInternshipEnquiry] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState({
    accepted: "",
    sname: "",
    sphno: "",
    semail: "",
    sschool: "",
    sgrade10: "",
    spu: "",
    spugrade: "",
    suniv: "",
    susn: "",
    sdegcgpa: "",
    sp1: "",
    sp2: "",
    scname: "",
    sfname: "",
    smname: "",
    sdob: "",
    sgen: "",
    shob: "",
    sskill: [],
    iname: "",
    iskills: [],
    idesc: [],
    ipart: [],
    idur: "",
    istarts: "",
    icat: "",
    itype: "",
    istip: "",
    message: "",
    reqAt: "",
    completed: ""
  });
  const InternshipEnq = props => (
    <tr>
      <td>{props.internship.internship.title}</td>
      <td>{props.internship.internship.starts_on.substring(0, 10)}</td>
      <td>{props.internship.user.fullname}</td>
      <td>{props.internship.accepted}</td>
      <td>{props.internship.reqAt.substring(0, 10)}</td>
      <td>
        <button
          className="btn btn-info btn-sm btn-block"
          data-toggle="modal"
          data-target="#viewInternship"
          onClick={() => {
            internshipEnquiries(props.internship._id).then(res => {
              //console.log(props.internship._id);
              //localStorage.setItem("internshipId", props.internship._id);
              if (res) {
                const x = res.data.data;
                const skill = res.data.data.internship.requiredSkills.map(
                  el => {
                    return {
                      name: el.skill_name
                    };
                  }
                );
                const skills = res.data.data.student.skills.map(el => {
                  return el.skill_name;
                });
                //console.log(skill);
                setSelectedInternship({
                  ...selectedInternship,
                  accepted: x.accepted,
                  sname: x.user.fullname,
                  sphno: x.user.phoneNumber,
                  semail: x.user.email,
                  sschool: x.student.academic_details.school_name,
                  sgrade10: x.student.academic_details.grade_10_per,
                  spu: x.student.academic_details.pu_college_name,
                  spugrade: x.student.academic_details.grade_12_per,
                  suniv: x.student.academic_details.university_name,
                  susn: x.student.academic_details.usn,
                  sdegcgpa: x.student.academic_details.degree_cgpa,
                  sp1: x.student.academic_details.project1_undertaken,
                  sp2: x.student.academic_details.project2_undertaken,
                  scname: x.student.academic_details.college_name,
                  sfname: x.student.personal_details.father_name,
                  smname: x.student.personal_details.mother_name,
                  sdob: x.student.personal_details.dob,
                  sgen: x.student.personal_details.gender,
                  shob: x.student.personal_details.hobbies,
                  sskill: skills.name,
                  iname: x.internship.title,
                  iskills: skill,
                  idesc: x.internship.description,
                  ipart: x.internship.intended_participants,
                  idur: x.internship.duration,
                  istarts: x.internship.starts_on,
                  icat: x.internship.categories,
                  itype: x.internship.type_of_internship,
                  istip: x.internship.stipend,
                  message: x.reqMessage,
                  reqAt: x.reqAt,
                  completed: x.completed
                });
              }
            });
          }}
        >
          <FaInfo />
        </button>
      </td>
      <td>
        <button
          className="btn btn-success btn-sm btn-block"
          data-toggle="modal"
          data-target="#acceptInternship"
          onClick={() => {
            localStorage.setItem("acceptInternshipId", props.internship._id);
          }}
        >
          Accept
        </button>
      </td>
    </tr>
  );
  useEffect(() => {
    document.title = "InternsHub | Company Enquiries";
    companyEnquiries().then(res => {
      if (res) {
        //console.log(x);
        // const enq = res.data.data.enquiry.map(el => {
        //   return {
        //     accepted: el.accepted,
        //     studentName: el.user.fullname,
        //     studentEmail: el.user.studentEmail,
        //     studentPhone: el.user.phoneNumber,
        //     // studentAcademic:el.student.academic_details,
        //     // studentPersonal:el.student.personal_details,
        //     student: el.student,
        //     internship: el.internship,
        //     message: el.reqMessage
        //   };
        // });
        // console.log(enq);
        setInternshipEnquiry(res.data.data.enquiry);
      }
    });
  }, []);
  const selectLink = (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#int">
            Internship Details
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#stuAca">
            Student Academic Details
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#stuPer">
            Student Personal Details
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div id="int" className="container tab-pane active">
          <br></br>
          <p>Internship Title: {selectedInternship.iname}</p>
          <p>Student Name: {selectedInternship.sname}</p>
          <p>Accepted: {selectedInternship.accepted}</p>
          <p>Requested At: {selectedInternship.reqAt.substring(0, 10)}</p>
          <p>Completed: {selectedInternship.completed}</p>
          <p>Message: {selectedInternship.message}</p>
          <table>
            <thead className="thead-dark">
              <tr>
                <th>Required Skills</th>
                <th>Student Skills</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {selectedInternship.iskills !== undefined
                    ? selectedInternship.iskills.map((el, index) => {
                        return (
                          <div key={index}>
                            {el.name} <br />
                          </div>
                        );
                      })
                    : ""}
                </td>
                <td>
                  {selectedInternship.sskill !== undefined
                    ? selectedInternship.sskill.map(el => {
                        return el.name;
                      })
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>
          <br></br>
          <p>Internship Duration: {selectedInternship.idur}</p>
          <p>Internship Description: {selectedInternship.idesc}</p>
          <p>Internship Stipend: {selectedInternship.istip}</p>
          <p>Internship Duration: {selectedInternship.idur}</p>
          <p>Internship Intended Participants: {selectedInternship.ipart}</p>
          <p>Internship Type: {selectedInternship.itype}</p>
        </div>

        <div id="stuAca" className="container tab-pane fade">
          <br></br>
          <p>College Name: {selectedInternship.scname}</p>
          <p>Degree CGPA: {selectedInternship.sdegcgpa}</p>
          <p>Project 1: {selectedInternship.sp1}</p>
          <p>Project 2: {selectedInternship.sp2}</p>
          <p>University: {selectedInternship.suniv}</p>
          <p>USN: {selectedInternship.susn}</p>
          <p>PU College Name: {selectedInternship.spu}</p>
          <p>PU College Percentage: {selectedInternship.spugrade}</p>
          <p>School Name: {selectedInternship.sschool}</p>
          <p>School Percentage: {selectedInternship.sgrade10}</p>
        </div>

        <div id="stuPer" className="container tab-pane fade">
          <br></br>
          <p>Gender: {selectedInternship.sgen}</p>
          <p>Hobbies: {selectedInternship.shob}</p>
          <p>Father Name: {selectedInternship.sfname}</p>
          <p>Mother Name: {selectedInternship.smname}</p>
          <p>Date Of Birth: {selectedInternship.sdob}</p>
        </div>
      </div>
    </div>
  );
  function internshipEnquiryList() {
    //console.log(internshipState);
    return internshipEnquiry.map(currentInternship => {
      return (
        <InternshipEnq
          key={currentInternship.id}
          internship={currentInternship}
        />
      );
    });
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <div className="col-sm-8 mx-auto display-4 text-center">
          Company Enquiry
        </div>
      </div>
      <div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Internship</th>
              <th>Starts On</th>
              <th>Student Name</th>
              <th>Accepted</th>
              <th>Requested On</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{internshipEnquiryList()}</tbody>
        </table>
      </div>
      <div className="modal fade" id="viewInternship">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Details</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="jumbotron">
                {selectedInternship !== {} ? selectLink : <p>Loading</p>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div id="acceptInternship" className="modal fade">
        <div className="modal-dialog modal-confirm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="container">
                <h4 className="modal-title">Are you sure</h4>
                <br></br>
                <h2>
                  <FaQuestion />
                </h2>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Do you really want to accept the candidate for Internship? This
                process cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  const accept = "Yes";
                  internshipAccept(
                    localStorage.acceptInternshipId,
                    accept
                  ).then(res => {
                    //console.log(props.internship._id);
                    //localStorage.setItem("internshipId", props.internship._id);
                    if (res) {
                      props.history.push("/companyEnquiry");
                      window.location.reload(false);
                      showAlert("success", "Successfully Accpted Candidate");
                    }
                  });
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompanyEnquiry;
