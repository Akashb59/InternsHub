import React, { useState, useEffect } from "react";
import {
  student,
  editStudProfileAcademic
} from "../Utilities/StudentFunctions";
import { showAlert } from "../Utilities/Alerts";
import "./../../CSS/student.css";

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

  const handleChange = event => {
    setStudentProfileState({
      ...studentProfileState,
      [event.target.name]: event.target.value
    });
  };
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
      }
    });
  };
  return (
    <div className="container">
      <header id="main-header" className="py-0 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center">
              <h1>
                <i className="fas fa-pencil" /> Edit Profile
              </h1>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <span className="text-success">
          <u>School</u>
        </span>
        <div className="form-group">
          <label htmlFor="schoolName">School Name:</label>
          <input
            type="text"
            className="form-control"
            id="schoolName"
            name="schoolName"
            value={studentProfileState.schoolName}
            //onBlur={validate1}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gradeTen">10th Grade Percentage:</label>
          <input
            type="text"
            //onKeyPress={keypress}
            className="form-control"
            id="gradeTen"
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

        <span className="text-success">
          <u>Pre-University/Diploma College</u>
        </span>

        <div className="form-group">
          <label htmlFor="puCollegeName">
            Pre-University/Diploma College Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="puCollegeName"
            name="puCollegeName"
            value={studentProfileState.puCollegeName}
            //onBlur={validate1}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gradeTwelve">
            Pre-University /Diploma Percentage:
          </label>
          <input
            type="text"
            //onKeyPress={keypress}
            className="form-control"
            id="gradeTwelve"
            name="gradeTwelve"
            value={studentProfileState.gradeTwelve}
            required
            //onBlur="return ValidateDecimal(this) ;"
            //onBlur={validate1}
            onChange={handleChange}
            maxLength="100"
            minLength="0"
          />
        </div>

        <span className="text-success">
          <u>Degree College</u>
        </span>

        <div className="form-group">
          <label htmlFor="degreeCollege">Degree College Name:</label>
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

        <div className="form-group">
          <label htmlFor="universityName">University Name:</label>
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

        <div className="form-group">
          <label htmlFor="usn">USN:</label>
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

        <div className="form-group">
          <label htmlFor="degreeCgpa">UG CGPA (Current Semester):</label>
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

        <div className="form-group">
          <label htmlFor="phoneNumber"> College Phone Number:</label>
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

        <div className="form-group">
          <label htmlFor="colWebsite">College Website:</label>
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

        <div className="form-group">
          <label htmlFor="colEmail">College Email:</label>
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

        <div className="form-group">
          <label htmlFor="project1">Project 1 Undertaken:</label>
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

        <div className="form-group">
          <label htmlFor="project2">Project 2 Undertaken:</label>
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
        <div className="input-field">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default StudentAcademicProfile;
