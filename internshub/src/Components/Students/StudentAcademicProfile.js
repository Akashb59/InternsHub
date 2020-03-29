import React, { useState, useEffect } from "react";
import {
  student,
  editStudProfileAcademic
} from "../Utilities/StudentFunctions";
import { showAlert } from "../Utilities/Alerts";

function StudentAcademicProfile(props) {
  useEffect(() => {
    document.title = "InternsHub | Student Profile";
    student().then(res => {
      if (res) {
        //console.log(res.data);
        const profile = res.data.student[0].academic_details;
        const profile1 = res.data.student[0].college[0];
        setStudentProfileState({
          ...studentProfileState,
          schoolName: profile.school_name,
          gradeTen: profile.grade_10_per,
          puCollegeName: profile.pu_college_name,
          gradeTwelve: profile.grade_12_per,
          degreeCollege: profile.college_name,
          universityName: profile.university_name,
          usn: profile.usn,
          degreeCgpa: profile.degree_cgpa,
          phoneNumber: profile1.phone_number,
          colWebsite: profile1.website,
          colEmail: profile1.email,
          project1: profile.project1_undertaken,
          project2: profile.project2_undertaken
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  const [studentProfileState, setStudentProfileState] = useState({
    schoolName: "",
    gradeTen: "",
    puCollegeName: "",
    gradeTwelve: "",
    degreeCollege: "",
    universityName: "",
    usn: "",
    degreeCgpa: "",
    phoneNumber: "",
    colWebsite: "",
    colEmail: "",
    project1: "",
    project2: ""
  });
  const [validState, setValidState] = useState({
    errors: {
      degreecollege: "",
      phoneNumber: "",
      colWebsite: "",
      colEmail: "",
      schoolName: "",
      puCollegeName: "",
      universityName: "",
      usn: "",
      project1: "",
      project2: "",
      gradeTen: "",
      gradeTwelve: "",
      degreeCgpa: ""
    }
  });

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleChange = event => {
    const { name, value } = event.target;
    let errors = validState.errors;

    switch (name) {
      case "degreeCollege":
        errors.degreecollege =
          value.length < 5
            ? "College name must have length of 5 characters or more"
            : "";
        break;
      case "colEmail":
        errors.colEmail = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "schoolName":
        errors.schoolName =
          value.length < 5
            ? "School name must be 5 or more characters long!"
            : "";
        break;
      case "puCollegeName":
        errors.puCollegeName =
          value.length < 5
            ? "PU college name must be 5 or more characters long!"
            : "";
        break;

      case "colWebsite":
        errors.colWebsite =
          value.length < 10 ? "Enter correct format of URL" : "";
        break;
      case "usn":
        errors.usn = value.length < 10 ? "USN must be 10 characters long" : "";
        break;
      case "universityName":
        errors.universityName =
          value.length < 5 ? "University name must be 5 characters long" : "";
        break;
      case "project1":
        errors.project1 =
          value.length < 5
            ? "Project name must be 5 or more characters long"
            : "";
        break;
      case "project2":
        errors.project2 =
          value.length < 5
            ? "Project name must be 5 or more characters long"
            : "";
        break;
      case "gradeTen":
        errors.gradeTen = value.length < 2 ? "Enter Valid Percentage" : "";
        break;
      case "gradeTwelve":
        errors.gradeTwelve = value.length < 2 ? "Enter Valid Percentage" : "";
        break;
      case "degreeCgpa":
        errors.degreeCgpa = value.length < 1 ? "Enter Valid CGPA" : "";
        break;
      default:
        break;
    }

    setValidState({ errors, [name]: value });
    setStudentProfileState({
      ...studentProfileState,
      [name]: value
    });
  };
  const { errors } = validState;
  const handleSubmit = e => {
    e.preventDefault();
    const editStudProfile = {
      schoolName: studentProfileState.schoolName,
      gradeTen: studentProfileState.gradeTen,
      puCollegeName: studentProfileState.puCollegeName,
      gradeTwelve: studentProfileState.gradeTwelve,
      degreeCollege: studentProfileState.degreeCollege,
      universityName: studentProfileState.universityName,
      usn: studentProfileState.usn,
      degreeCgpa: studentProfileState.degreeCgpa,
      phoneNumber: studentProfileState.phoneNumber,
      colWebsite: studentProfileState.colWebsite,
      colEmail: studentProfileState.colEmail,
      project1: studentProfileState.project1,
      project2: studentProfileState.project2,
      user: localStorage.userid
    };
    editStudProfileAcademic(editStudProfile).then(res => {
      if (res) {
        //console.log(res.data);
        showAlert("success", "Successfully Updated  Academic Information");
        props.history.push("/StudentAcademic");
        window.location.reload(false);
      }
    });
  };
  return (
    <div className="container py-4">
      <h2 className="text-center display-4 bg-secondary rounded text-white py-2 small-header">
        <i className="far fa-id-card"></i> Edit Academic Information
      </h2>
      <div className="card bg-body p-2 mt-4 rounded card-form">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <center>
              <b>
                <span
                  className="heading-secondary"
                  style={{
                    fontSize: "150%"
                    //fontFamily: "Segoe Print"
                  }}
                >
                  SCHOOL
                </span>
              </b>
            </center>{" "}
            <br></br>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="schoolName">School Name:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-school"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="schoolName"
                    name="schoolName"
                    disabled
                    value={studentProfileState.schoolName}
                    //onBlur={validate1}
                    onChange={handleChange}
                    required
                    maxLength="50"
                  />
                </div>
                {errors.schoolName.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.schoolName}</span>
                  </small>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="gradeTen">10th Grade Percentage:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-percentage"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    //onKeyPress={keypress}
                    className="form-control"
                    id="gradeTen"
                    disabled
                    name="gradeTen"
                    value={studentProfileState.gradeTen}
                    required
                    //onBlur="return ValidateDecimal(this) ;"
                    //onBlur={validate1}
                    onChange={handleChange}
                    maxLength="100"
                    minLength="0"
                  />
                </div>
                {errors.gradeTen.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.gradeTen}</span>
                  </small>
                )}
              </div>
            </div>
            <br></br>
            <center>
              <b>
                <span
                  className="heading-secondary"
                  style={{
                    fontSize: "150%"
                    //fontFamily: "Segoe Print"
                  }}
                >
                  PRE-UNIVERSITY/ DIPLOMA COLLEGE
                </span>
              </b>
            </center>{" "}
            <br></br>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="puCollegeName">
                  Pre-University/Diploma College Name:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-school"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="puCollegeName"
                    disabled
                    name="puCollegeName"
                    value={studentProfileState.puCollegeName}
                    //onBlur={validate1}
                    onChange={handleChange}
                    required
                    maxLength="50"
                  />
                </div>
                {errors.puCollegeName.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.puCollegeName}</span>
                  </small>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="gradeTwelve">
                  Pre-University /Diploma Percentage:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-percentage"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    //onKeyPress={keypress}
                    className="form-control"
                    id="gradeTwelve"
                    name="gradeTwelve"
                    disabled
                    value={studentProfileState.gradeTwelve}
                    required
                    //onBlur="return ValidateDecimal(this) ;"
                    //onBlur={validate1}
                    onChange={handleChange}
                    maxLength="100"
                    minLength="0"
                  />
                </div>
                {errors.gradeTwelve.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.gradeTwelve}</span>
                  </small>
                )}
              </div>
            </div>
            <br></br>
            <center>
              <b>
                <span
                  className="heading-secondary"
                  style={{
                    fontSize: "150%"
                    //fontFamily: "Segoe Print"
                  }}
                >
                  DEGREE COLLEGE
                </span>
              </b>
            </center>{" "}
            <br></br>
            <div className="form-row mb-1">
              <div className="form-group col-md-6">
                <label htmlFor="degreeCollege">Degree College Name:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-school"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="degreeCollege"
                    name="degreeCollege"
                    value={studentProfileState.degreeCollege}
                    //onBlur={validate1}
                    onChange={handleChange}
                    required
                    maxLength="50"
                  />
                </div>
                {errors.degreecollege.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.degreecollege}</span>
                  </small>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="universityName">University Name:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-university"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="universityName"
                    name="universityName"
                    value={studentProfileState.universityName}
                    // onBlur={validate1}
                    onChange={handleChange}
                    required
                    maxLength="50"
                  />
                </div>
                {errors.universityName.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.universityName}</span>
                  </small>
                )}
              </div>
            </div>
            <div className="form-row mb-1">
              <div className="form-group col-md-4">
                <label htmlFor="usn">USN:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user-graduate"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="usn"
                    name="usn"
                    value={studentProfileState.usn}
                    //onBlur={validate1}
                    onChange={handleChange}
                    required
                    maxLength="10"
                  />
                </div>
                {errors.usn.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.usn}</span>
                  </small>
                )}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="degreeCgpa">UG CGPA (Current Semester):</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-graduation-cap"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    //onKeyPress={keypress}
                    className="form-control"
                    id="degreeCgpa"
                    name="degreeCgpa"
                    value={studentProfileState.degreeCgpa}
                    required
                    //onBlur="return ValidateDecimal(this) ;"
                    //onBlur={validate1}
                    onChange={handleChange}
                    maxLength="10"
                    minLength="1"
                  />
                </div>
                {errors.degreeCgpa.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.degreeCgpa}</span>
                  </small>
                )}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="phoneNumber"> College Phone Number:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-mobile"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={studentProfileState.phoneNumber}
                    // onBlur={validate1}
                    onChange={handleChange}
                    maxLength="10"
                  />
                </div>
                {errors.phoneNumber.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.phoneNumber}</span>
                  </small>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="colWebsite">College Website:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-desktop"></i>
                    </span>
                  </div>
                  <input
                    type="url"
                    className="form-control"
                    id="colWebsite"
                    name="colWebsite"
                    value={studentProfileState.colWebsite}
                    //onBlur="checkUrl()"
                    //onBlur={validate1}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.colWebsite.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.colWebsite}</span>
                  </small>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="colEmail">College Email:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="colEmail"
                    name="colEmail"
                    value={studentProfileState.colEmail}
                    //onBlur={validate1}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.colEmail.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.colEmail}</span>
                  </small>
                )}
              </div>
            </div>
            <br></br>
            <center>
              <b>
                <span
                  className="heading-secondary"
                  style={{
                    fontSize: "150%"
                    //fontFamily: "Segoe Print"
                  }}
                >
                  PROJECTS
                </span>
              </b>
            </center>{" "}
            <br></br>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="project1">Project 1 Undertaken:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-briefcase"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="project1"
                    name="project1"
                    value={studentProfileState.project1}
                    // onBlur={validate1}
                    onChange={handleChange}
                    required
                    maxLength="30"
                  />
                </div>
                {errors.project1.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.project1}</span>
                  </small>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="project2">Project 2 Undertaken:</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-briefcase"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="project2"
                    name="project2"
                    value={studentProfileState.project2}
                    //onBlur={validate1}
                    onChange={handleChange}
                    required
                    maxLength="30"
                  />
                </div>
                {errors.project2.length > 0 && (
                  <small style={{ color: "red" }}>
                    <span className="error">{errors.project2}</span>
                  </small>
                )}
              </div>
            </div>
            <div className="input-field col-md-6 offset-md-3 mt-2">
              <button className="btn btn-success btn-block" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default StudentAcademicProfile;
