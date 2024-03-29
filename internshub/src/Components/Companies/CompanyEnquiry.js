import React, { useEffect, useState, Fragment } from "react";
import { FaQuestion } from "react-icons/fa";
import { load } from "./../Utilities/Utils";
import {
  companyEnquiries,
  internshipEnquiries,
  internshipAccept,
} from "./../Utilities/CompanyFunctions";
import { showAlert } from "../Utilities/Alerts";

function CompanyEnquiry(props) {
  let src;
  const [internshipEnquiry, setInternshipEnquiry] = useState([]);
  const [loading, setLoading] = useState("false");
  const [resume, setResume] = useState("");
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
    sdob: Date,
    sgen: "",
    shob: "",
    sskill: [],
    iname: "",
    iskills: [],
    idesc: [],
    ipart: [],
    idur: "",
    istarts: Date,
    iends: "",
    icat: "",
    iloc: "",
    itype: "",
    istip: "",
    message: "",
    reqAt: Date,
    completed: "",
    eid: "",
  });
  const None = (key) => (
    <tr key={key}>
      <td colSpan="7">
        <center>
          <h2>No Data Yet</h2>
        </center>
      </td>
    </tr>
  );
  const InternshipEnq = (props) => (
    <tr>
      <td className="text-change text-lowercase">
        {props.internship.internship.title}
      </td>
      {/* <td>{props.internship.internship.starts_on.substring(0, 10)}</td> */}
      <td className="small-table text-lowercase text-change">
        {props.internship.user.fullname.split(" ")[0]}
      </td>
      <td>
        <button
          className="btn btn-dark btn-sm btn-block"
          data-toggle="modal"
          data-target="#resume"
          onClick={() => {
            internshipEnquiries(props.internship._id).then((res) => {
              //console.log(props.internship._id);
              //localStorage.setItem("internshipId", props.internship._id);
              if (res) {
                //console.log(res.data.data.student.resume);
                setResume(res.data.data.student.resume);
              }
            });
          }}
        >
          <i className="fas fa-file-pdf"></i>
        </button>
      </td>

      <td className="small-table">{props.internship.reqAt.substring(0, 10)}</td>
      <td>
        <button
          className="btn btn-info btn-sm btn-block"
          data-toggle="modal"
          data-target="#viewInternship"
          onClick={() => {
            internshipEnquiries(props.internship._id).then((res) => {
              //console.log(props.internship._id);
              //localStorage.setItem("internshipId", props.internship._id);
              if (res) {
                const x = res.data.data;
                const skill = res.data.data.internship.requiredSkills.map(
                  (el) => {
                    return {
                      name: el.skill_name,
                    };
                  }
                );
                const skills = res.data.data.student.skills.map((el) => {
                  return {
                    name: el.skill_name,
                  };
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
                  sdob: x.student.personal_details.dob.substring(0, 10),
                  sgen: x.student.personal_details.gender,
                  shob: x.student.personal_details.hobbies,
                  sskill: skills,
                  iname: x.internship.title,
                  iskills: skill,
                  idesc: x.internship.description,
                  ipart: x.internship.intended_participants,
                  idur: x.internship.duration,
                  istarts: x.internship.starts_on.substring(0, 10),
                  iends: x.internship.ends_on,
                  icat: x.internship.categories,
                  itype: x.internship.type_of_internship,
                  iloc: x.internship.location,
                  istip: x.internship.stipend,
                  message: x.reqMessage,
                  reqAt: x.reqAt.substring(0, 10),
                  completed: x.completed,
                  eid: x.id,
                });
              }
            });
          }}
        >
          <i className="fas fa-expand-arrows-alt"></i>
        </button>
      </td>
      <td className="small-table">{props.internship.accepted}</td>
      {props.internship.accepted === "No" ? (
        props.accept === "No" && props.accepted === "Yes" ? (
          <td>
            <button className="btn btn-success btn-sm btn-block" disabled>
              <i className="fas fa-check-circle"></i>
            </button>
          </td>
        ) : (
          <td>
            <button
              className="btn btn-success btn-sm btn-block"
              data-toggle="modal"
              data-target="#acceptInternship"
              onClick={() => {
                localStorage.setItem(
                  "acceptInternshipId",
                  props.internship._id
                );
              }}
            >
              <i className="fas fa-check-circle"></i>
            </button>
          </td>
        )
      ) : props.accept === "No" ? (
        <td>Accepted</td>
      ) : (
        <Fragment></Fragment>
      )}
    </tr>
  );
  useEffect(() => {
    document.title = "InternsHub | Company Enquiries";
    companyEnquiries().then((res) => {
      if (res) {
        const internEnq = res.data.data.enquiry.filter(
          (data) => data.internship !== null
        );
        //console.log(res.data.data.enquiry[0]);
        setInternshipEnquiry(internEnq);
        if (res.data !== undefined) setLoading("true");
      }
    });
  }, []);

  if (resume !== "") {
    src = `${localStorage.ip}Resume/${resume}`;
  }

  const selectLink = (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#int">
            Internship
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#stuAca">
            Student Academic
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#stuPer">
            Student Personal
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div id="int" className="container tab-pane active">
          <br></br>
          <div className="row">
            <table className="table bg-body table-borderless">
              <tbody>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold mb-0">Title:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.iname}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Student Name:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sname}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Starts On: </p>
                  </td>
                  <td>
                    <p>{selectedInternship.istarts.toString()}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Accepted:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.accepted}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Requested At:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.reqAt.toString()}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Completed:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.completed}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Location:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.iloc}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Message:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.message}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Duration:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.idur}</p>
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Stipend:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.istip}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Type:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.itype}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Required Skills</p>

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
                    <p className="font-weight-bold">Student Skills</p>

                    {selectedInternship.sskill !== undefined
                      ? selectedInternship.sskill.map((el, index) => {
                          return (
                            <div key={index}>
                              {el.name} <br />
                            </div>
                          );
                        })
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p className="font-weight-bold">Description:</p>
                      {selectedInternship.idesc.map((data, index) => {
                        return (
                          <div key={index}>
                            {index + 1}: {data}
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-weight-bold">Intended Participants:</p>{" "}
                      {selectedInternship.ipart.map((data, index) => {
                        return (
                          <div key={index}>
                            {index + 1}: {data}
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="stuAca" className="container tab-pane fade">
          <br></br>
          <div className="row">
            <table className="table bg-body table-borderless">
              <tbody>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">College Name:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.scname}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">USN:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.susn}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Degree CGPA:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sdegcgpa}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">University:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.suniv}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Project 1:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sp1}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Project 2:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sp2}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">PU College Name:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.spu}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">PU College Percentage:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.spugrade}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">School Name:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sschool}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">School Percentage:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sgrade10}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="stuPer" className="container tab-pane fade">
          <br></br>
          <div className="row">
            <table className="table bg-body table-borderless">
              <tbody>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Student Email:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.semail}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Phone Number:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sphno}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Date Of Birth:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sdob.toString()}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Father Name:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sfname}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Mother Name:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.smname}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Gender:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.sgen}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <p className="font-weight-bold">Hobbies:</p>
                  </td>
                  <td>
                    <p>{selectedInternship.shob}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  function internshipEnquiryListYes() {
    let count = 0;
    let c = 0;
    //console.log(acceptedYes);
    let acceptedYes = internshipEnquiry;
    if (acceptedYes.length === 0) {
      return <None key="key" />;
    }
    // eslint-disable-next-line
    return acceptedYes.map((currentInternship) => {
      var created_date = new Date(currentInternship.internship.starts_on);
      var startsOn = created_date.getTime() + 7 * 24 * 60 * 60 * 1000;
      if (currentInternship.accepted === "Yes" && startsOn > Date.now()) {
        c += 1;
        return (
          <InternshipEnq
            key={currentInternship.id}
            internship={currentInternship}
          />
        );
      } else {
        count += 1;
        if (c === 0 && acceptedYes.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }
  function internshipEnquiryListNo() {
    let count = 0;
    let c = 0;
    //console.log(internshipState);
    let acceptedNo = internshipEnquiry;
    if (acceptedNo.length === 0) {
      return <None key="key" />;
    }
    // eslint-disable-next-line
    return acceptedNo.map((currentInternship) => {
      var created_date = new Date(currentInternship.internship.starts_on);
      var startsOn = created_date.getTime() + 7 * 24 * 60 * 60 * 1000;
      if (currentInternship.accepted === "No" && startsOn > Date.now()) {
        c += 1;
        return (
          <InternshipEnq
            key={currentInternship.id}
            internship={currentInternship}
            accept="Yes"
          />
        );
      } else {
        count += 1;
        if (c === 0 && acceptedNo.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }

  function internshipEnquiryListRest() {
    let count = 0;
    let c = 0;
    let rest = internshipEnquiry;
    if (rest.length === 0) {
      return <None key="key" />;
    }
    // eslint-disable-next-line
    return rest.map((currentInternship) => {
      var created_date = new Date(currentInternship.internship.starts_on);
      var startsOn = created_date.getTime() + 7 * 24 * 60 * 60 * 1000;
      // console.log(startsOn);
      // console.log(Date.now());
      if (startsOn < Date.now()) {
        c += 1;
        return (
          <InternshipEnq
            key={currentInternship.id}
            internship={currentInternship}
            accept="No"
            accepted="Yes"
          />
        );
      } else {
        count += 1;
        if (c === 0 && rest.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }

  return (
    <div className="container pt-4">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <h2 className="text-center display-4 bg-secondary rounded text-white py-2 mb-2 small-header">
            <i className="fas fa-clipboard-check"></i> Company Enquiry
          </h2>
          <div>
            <h2>Pending Enquiries</h2>
            <table className="table table-striped table-hover bg-white">
              <thead className="thead-dark">
                <tr>
                  <th>Internship</th>
                  <th className="small-table">Student Name</th>
                  <th>Resume</th>
                  <th className="small-table">Requested On</th>
                  <th>Details</th>
                  <th className="small-table">Accepted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{internshipEnquiryListNo()}</tbody>
            </table>
            <h2>Accepted Enquiries</h2>
            <table className="table table-striped table-hover bg-white">
              <thead className="thead-dark">
                <tr>
                  <th>Internship</th>
                  <th className="small-table">Student Name</th>
                  <th>Resume</th>
                  <th className="small-table">Requested On</th>
                  <th>Details</th>
                  <th className="small-table">Accepted</th>
                </tr>
              </thead>
              <tbody>{internshipEnquiryListYes()}</tbody>
            </table>
            <h2>Past Enquiries</h2>
            <table className="table table-striped table-hover bg-white">
              <thead className="thead-dark">
                <tr>
                  <th>Internship</th>
                  <th className="small-table">Student Name</th>
                  <th>Resume</th>
                  <th className="small-table">Requested On</th>
                  <th>Details</th>
                  <th className="small-table">Accepted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{internshipEnquiryListRest()}</tbody>
            </table>
          </div>
          <div className="modal fade" id="resume">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-info  text-white">
                  <h5 className="modal-title">Resume</h5>
                  <button className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <iframe
                    src={src}
                    title="student"
                    width="100%"
                    height="500px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="viewInternship">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header bg-info text-white">
                  <h5 className="modal-title">Details</h5>
                  <button className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="jumbotron">
                    {selectedInternship !== {} ? selectLink : <p>Loading</p>}
                  </div>
                  <div className="modal-footer row">
                    <div className="col-md-9">
                      {selectedInternship.accepted === "Yes" &&
                      selectedInternship.ends_on < Date.now() ? (
                        <button
                          className="btn btn-block btn-success"
                          data-toggle="modal"
                          data-target="#completedInternship"
                          onClick={() => {
                            localStorage.setItem(
                              "acceptInternshipId",
                              selectedInternship.eid
                            );
                          }}
                        >
                          <i className="fas fa-check-circle"></i> Mark Student
                          as completed Internship
                        </button>
                      ) : (
                        <button className="btn btn-block btn-success" disabled>
                          <i className="fas fa-check-circle"></i> Mark Student
                          as completed Internship
                        </button>
                      )}
                    </div>
                    <div className="col-md-3">
                      <button
                        type="button"
                        className="btn btn-block btn-danger mt-3"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="completedInternship" className="modal fade">
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
                    Do you really want to mark the candidate as "completed the
                    Internship?" This process cannot be undone.
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
                      const completed = "Yes";
                      internshipAccept(
                        localStorage.acceptInternshipId,
                        accept,
                        completed
                      ).then((res) => {
                        //console.log(props.internship._id);
                        //localStorage.setItem("internshipId", props.internship._id);
                        if (res) {
                          props.history.push("/companyEnquiry");
                          window.location.reload(false);
                          showAlert(
                            "success",
                            "Candidate Successfully Completed Internship"
                          );
                        }
                      });
                      //Adding the completed internship to student profile can be checked in enquiries
                    }}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="acceptInternship" className="modal fade">
            <div className="modal-dialog modal-confirm modal-dialog-centered">
              <div className="modal-content modal-responsive">
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
                    Do you really want to accept the candidate for Internship?
                    This process cannot be undone.
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
                      const completed = "No";
                      internshipAccept(
                        localStorage.acceptInternshipId,
                        accept,
                        completed
                      ).then((res) => {
                        //console.log(props.internship._id);
                        //localStorage.setItem("internshipId", props.internship._id);
                        if (res) {
                          props.history.push("/companyEnquiry");
                          window.location.reload(false);
                          showAlert(
                            "success",
                            "Successfully Accpted Candidate"
                          );
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
      )}
    </div>
  );
}
export default CompanyEnquiry;
