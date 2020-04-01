import React, { useState, useEffect } from "react";
import {
  selectedIntern,
  sendEnquiry,
  student
} from "../Utilities/StudentFunctions";
import { showAlert } from "../Utilities/Alerts";
import { load } from "../Utilities/Utils";
import $ from "jquery";
import { MdPermDeviceInformation } from "react-icons/md";
import { FaBuilding, FaGraduationCap } from "react-icons/fa";

function Example(props) {
  const [loading, setLoading] = useState("false");
  const [internship, setInternship] = useState({
    startsOn: "",
    postedOn: "",
    type: "",
    address: [],
    city: "",
    stipend: "",
    name: "",
    phone: "",
    technology: [],
    aboutCompany: "",
    website: "",
    requiredSkills: [],
    title: "",
    description: [],
    category: "",
    duration: "",
    intendedParticipants: [],
    id: ""
  });

  const [info, setInfo] = useState("");
  const [studentState, setStudentState] = useState("invalid");
  const [display, setDisplay] = useState({
    academic: "",
    personal: "",
    resSkill: ""
  });
  const id = props.location.id;
  if (props.location.id !== undefined) localStorage.setItem("internId", id);
  useEffect(() => {
    $(".port-item").click(function() {
      $(".show").removeClass("show");
      $(".show").addClass("hide");
    });

    selectedIntern(localStorage.internId).then(res => {
      if (res) {
        document.title = `InternsHub | ${res.data.title}`;
        //console.log(res.data.internship);
        const ab = res.data;
        setInternship({
          ...internship,
          startsOn: ab.starts_on.substring(0, 10),
          postedOn: ab.posted_on.substring(0, 10),
          type: ab.type_of_internship,
          stipend: ab.stipend,
          name: ab.company.user.fullname,
          photo: ab.company.user.photo,
          phone: ab.company.user.phoneNumber,
          technology: ab.company.technology.map(te => ({
            id: te._id,
            name: te.skill_name
          })),
          aboutCompany: ab.company.aboutCompany,
          website: ab.company.website,
          requiredSkills: ab.requiredSkills.map(rs => ({
            id: rs.id,
            skillName: rs.skill_name
          })),
          title: ab.title,
          description: ab.description,
          category: ab.categories,
          duration: ab.duration,
          intendedParticipants: ab.intended_participants,
          address: ab.company.address.map(id => ({
            id: id.id,
            locality: id.locality,
            city: id.city,
            state: id.state,
            country: id.country,
            pincode: id.pincode
          })),
          id: ab.id
        });
      }
    });
    setLoading("true");
    // eslint-disable-next-line
  }, []);
  const handleChange = event => {
    //const {name,value}=event.target;
    setInfo(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const information = {
      info: info,
      company: internship.companyId,
      student: localStorage.studentid,
      user: localStorage.userid,
      internship: localStorage.internId
    };
    sendEnquiry(information).then(res => {
      if (res) {
        showAlert(
          "success",
          `Successfully enquired for Internship ${internship.title}`
        );
        props.history.push("/studentHome");
        window.location.reload(false);
      }
    });
  };
  const applyBtn = (
    <button
      className="btn btn-outline-white btn-block"
      data-toggle="modal"
      data-target="#reqInternship"
      onClick={() => {
        student().then(res => {
          //console.log(props.internship._id);
          //localStorage.setItem("internshipId", props.internship._id);
          if (res) {
            //console.log(res.data.student[0]);
            const personal = res.data.student[0].personal_details;
            const academic = res.data.student[0].academic_details;
            let personalDetails = "Invalid";
            let resumeSkill = "Invalid";
            let academicDetails = "Invalid";
            if (
              res.data.student[0].user.fullname &&
              res.data.student[0].address &&
              personal.dob &&
              personal.mother_name &&
              personal.gender &&
              personal.hobbies &&
              personal.father_name !== (undefined || null || "" || [])
            ) {
              personalDetails = "Valid";
            }
            if (
              res.data.student[0].college &&
              academic.school_name &&
              academic.grade_10_per &&
              academic.pu_college_name &&
              academic.grade_12_per &&
              academic.usn &&
              academic.degree_cgpa &&
              academic.project1_undertaken &&
              academic.project2_undertaken &&
              academic.college_name &&
              academic.university_name !== (undefined || null || "" || [])
            ) {
              academicDetails = "Valid";
            }
            if (
              res.data.student[0].resume &&
              res.data.student[0].skills !== (undefined || null || "" || [])
            ) {
              resumeSkill = "Valid";
            }
            if (personalDetails === "Invalid") {
              showAlert(
                "error",
                "Please Enter your personal details before applying"
              );
              personalDetails = "Please Provide Valid Personal Information";
            } else if (academicDetails === "Invalid") {
              showAlert(
                "error",
                "Please Enter your academic details before applying"
              );
              academicDetails = "Please Provide Valid Academic Information";
            } else if (resumeSkill === "Invalid") {
              showAlert(
                "error",
                "Please update resume and skill details before applying"
              );
              resumeSkill = "Please Update Skills And Resume Information";
            } else {
              setStudentState("Valid");
            }
            setDisplay({
              ...display,
              academic: academicDetails,
              personal: personalDetails,
              resSkill: resumeSkill
            });
          }
        });
      }}
    >
      <i className="fas fa-arrow-circle-right"></i> Apply Now
    </button>
  );

  return (
    <div className="container">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <header id="main-header">
            <div className="row no-gutters">
              <div className="col-12 p-2 text-white bg-head ">
                <div className=" text-center">
                  <h1 className="display-1 head-internship">
                    {internship.title}
                  </h1>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <img
                  src={`${localStorage.ip}Images/${internship.photo}`}
                  alt=""
                />
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="d-flex flex-column">
                  <div className="bg-gray-dark text-white blockquote p-3 font-increase mb-0 ">
                    {internship.name}
                  </div>

                  <div>
                    <div className="d-flex flex-row text-white align-items-stretch text-center">
                      <div
                        className="port-item pt-2 pb-4 bg-primary"
                        data-toggle="collapse"
                        data-target="#internship"
                      >
                        <i className="fa-3x d-block" aria-hidden="true">
                          <FaGraduationCap />
                        </i>
                        <span className="d-sm-block">Internship Details</span>
                      </div>
                      <div
                        className="port-item pt-2 pb-4 bg-dark-green"
                        data-toggle="collapse"
                        data-target="#company"
                      >
                        <i className="fa-3x d-block" aria-hidden="true">
                          <FaBuilding />
                        </i>
                        <span className="d-sm-block">Company Details</span>
                      </div>
                      <div
                        className="port-item pt-2 pb-4 bg-primary"
                        data-toggle="collapse"
                        data-target="#other"
                      >
                        <i className="fa-3x d-block" aria-hidden="true">
                          <MdPermDeviceInformation />
                        </i>
                        <span className="d-sm-block">Others</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div id="internship" className="collapse show">
            <div className="card card-body bg-primary text-white py-5 rounded-0">
              <p className="lead font-weight-bold">Description: </p>
              {internship.description.map((data, index) => {
                return (
                  <div key={index}>
                    <p className="lead">
                      {index + 1}: {data}
                    </p>
                  </div>
                );
              })}
              <div className="d-flex">
                <p className="lead font-weight-bold">Duration (In Months): </p>
                <p className="lead ml-2"> {internship.duration} </p>
              </div>
              <div className="d-flex">
                <p className="lead font-weight-bold">Starts On: </p>
                <p className="lead ml-2">{internship.startsOn}</p>
              </div>
              <div className="row">
                <div className="col-md-4 offset-md-4"> {applyBtn}</div>
              </div>
            </div>
          </div>
          <div id="company" className="collapse">
            <div className="card card-body bg-dark-green text-white py-5 rounded-0">
              <p className="lead font-weight-bold">About Company: </p>

              <p className="lead">{internship.aboutCompany}</p>

              {internship.address.map(function(add) {
                return (
                  <div key={add.id}>
                    <p className="lead font-weight-bold"> Address: </p>
                    <p className="lead">
                      {add.locality}, {add.city} {add.state} <br />
                      {add.country} {add.pincode}
                    </p>
                  </div>
                );
              })}

              <p className="lead font-weight-bold">Comapany Technologies: </p>

              {internship.technology.map((tech, index) => {
                return (
                  <div key={index}>
                    <p className="lead">
                      {" "}
                      {index + 1}: {tech.name}
                    </p>
                  </div>
                );
              })}
              <div className="d-flex">
                <p className="lead font-weight-bold">Company Website: </p>
                <p className="lead ml-2"> {internship.website}</p>
              </div>
              <div className="row">
                <div className="col-md-4 offset-md-4"> {applyBtn}</div>
              </div>
            </div>
          </div>
          <div id="other" className="collapse">
            <div className="card card-body bg-primary text-white py-5 rounded-0">
              <p className="lead font-weight-bold">Intended Participants: </p>

              {internship.intendedParticipants.map((data, index) => {
                return (
                  <div key={index}>
                    <p className="lead">
                      {" "}
                      {index + 1}: {data}
                    </p>
                  </div>
                );
              })}
              <div className="d-flex">
                <p className="lead font-weight-bold"> Category: </p>
                <p className="lead ml-2">{internship.category}</p>
              </div>
              <div className="d-flex">
                <p className="lead font-weight-bold">Stipend: Rs. </p>
                <p className="lead ml-2"> {internship.stipend}/-</p>
              </div>
              <div className="d-flex">
                <p className="lead font-weight-bold">Type: </p>
                <p className="lead ml-2">{internship.type}</p>
              </div>
              <div className="row">
                <div className="col-md-4 offset-md-4"> {applyBtn}</div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="reqInternship">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-info  text-white">
                  <h5 className="modal-title">
                    Request for {internship.title}
                  </h5>
                  <button className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <p className="lead font-weight-bold">
                      Academic Information:
                    </p>
                    <p className="lead"> {display.academic}</p>
                    <p className="lead font-weight-bold">
                      Personal Information:{" "}
                    </p>
                    <p className="lead">{display.personal}</p>
                    <p className="lead font-weight-bold">
                      Skills and Resume Information:
                    </p>
                    <p className="lead"> {display.resSkill}</p>
                    <br></br>
                    <div className="form-group">
                      <p className="lead font-weight-bold">
                        <label htmlFor="info">Message: </label>
                      </p>
                      <input
                        type="text"
                        className="form-control"
                        name="info"
                        //onBlur={validate}
                        onChange={handleChange}
                        required
                        maxLength="40"
                        minLength="10"
                      />
                    </div>
                    <div className="modal-footer">
                      {studentState === "Valid" ? (
                        <button className="btn btn-success" type="submit">
                          Submit
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          type="submit"
                          disabled
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Example;
