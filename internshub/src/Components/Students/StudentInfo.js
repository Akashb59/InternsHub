import React, { useState, useEffect } from "react";
import "./../../CSS/student.css";
//import { Link } from "react-router-dom";
import { studentform, student } from "../Utilities/StudentFunctions";
import { addressform } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";

function StudentInfo(props) {
  useEffect(() => {
    document.title = "InternsHub | Student Details";
  }, []);
  const [studFormState, setStudFormState] = useState({
    father_name: "",
    mother_name: "",
    dob: Date,
    gender: "",
    hobbies: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: ""
  });
  //const [info, setInfo] = useState("");
  const [academicFormState, setAcademicFormState] = useState({
    school_name: "",
    grade_10_per: "",
    pu_college_name: "",
    grade_12_per: "",
    college_name: "",
    university_name: "",
    usn: "",
    degree_cgpa: "",
    phone_number: "",
    website: "",
    email: "",
    project1_undertaken: "",
    project2_undertaken: ""
  });

  const handleChange = event => {
    setStudFormState({
      ...studFormState,
      [event.target.name]: event.target.value
    });
  };
  //   const validate = () => {
  //     if (studFormState === " ") setStudFormState("Please fill the information");
  //   };
  const handleChange1 = event => {
    setAcademicFormState({
      ...academicFormState,
      [event.target.name]: event.target.value
    });
  };
  //   const validate1 = () => {
  //     if (academicFormState === " ")
  //       setAcademicFormState("Please fill the information");
  //   };

  const keypress = event => {
    if (isNaN(String.fromCharCode(event.keyCode))) return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const address = {
      locality: studFormState.locality,
      city: studFormState.city,
      district: studFormState.district,
      state: studFormState.state,
      country: studFormState.country,
      pincode: studFormState.pincode,
      user: localStorage.userid
    };

    localStorage.setItem("father_name", studFormState.father_name);
    localStorage.setItem("mother_name", studFormState.mother_name);
    localStorage.setItem("dob", studFormState.dob);
    localStorage.setItem("gender", studFormState.gender);
    localStorage.setItem("hobbies", studFormState.hobbies);

    addressform(address).then(res => {
      if (res) {
        showAlert("success", "Personal Information Recorded");
        //window.location.reload(false);
        document.getElementById("filled").setAttribute("className", "nav-link");
        //setInfo("Filled");
        document
          .getElementById("fill")
          .setAttribute("className", "nav-link active");
      }
    });
  };
  const handleSubmit1 = e => {
    e.preventDefault();

    //const newadd = localStorage.address_copy;

    const det = {
      father_name: localStorage.father_name,
      mother_name: localStorage.mother_name,
      dob: localStorage.dob,
      gender: localStorage.gender,
      hobbies: localStorage.hobbies,
      school_name: academicFormState.school_name,
      grade_10_per: academicFormState.grade_10_per,
      pu_college_name: academicFormState.pu_college_name,
      grade_12_per: academicFormState.grade_12_per,
      college_name: academicFormState.college_name,
      university_name: academicFormState.university_name,
      usn: academicFormState.usn,
      degree_cgpa: academicFormState.degree_cgpa,
      phone_number: academicFormState.phone_number,
      website: academicFormState.website,
      email: academicFormState.email,
      project1_undertaken: academicFormState.project1_undertaken,
      project2_undertaken: academicFormState.project2_undertaken,
      //address: res.data.data.Address._id,
      user: localStorage.userid
    };

    studentform(det).then(res => {
      if (res) {
        student().then(res => {
          if (res) {
            showAlert("success", "Academic Information Recorded");
            props.history.push(`/studentHome`);
          }
        });
      }
    });
  };
  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-toggle="tab"
            id="filled"
            href="#per"
          >
            Personal Information
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" id="fill" href="#aca">
            Academic Information
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div id="per" className="container tab-pane active">
          <br></br>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="father_name">Father Name: </label>
              <input
                type="text"
                className="form-control"
                id="father_name"
                name="father_name"
                // onBlur={validate}
                onChange={handleChange}
                required
                maxLength="30"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mother_name">Mother Name:</label>
              <input
                type="text"
                className="form-control"
                id="mother_name"
                name="mother_name"
                //onBlur={validate}
                onChange={handleChange}
                required
                maxLength="30"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hobbies">Hobbies:</label>
              <input
                type="text"
                className="form-control"
                id="hobbies"
                name="hobbies"
                //onBlur={validate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                //onBlur={validate}
                onChange={handleChange}
                name="dob"
                required
                className="form-control"
                id="dob"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <br />
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />{" "}
              Female
            </div>

            <span className="text-success">
              <u>Address</u>
            </span>
            <div className="form-group">
              <label htmlFor="locality">Locality:</label>
              <input
                type="text"
                className="form-control"
                id="locality"
                name="locality"
                //onBlur={validate}
                onChange={handleChange}
                required
                maxLength="50"
                minLength="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                //onBlur={validate}
                onChange={handleChange}
                required
                maxLength="15"
              />
            </div>

            <div className="form-group">
              <label htmlFor="district">District:</label>
              <input
                type="text"
                className="form-control"
                id="district"
                name="district"
                //onBlur={validate}
                onChange={handleChange}
                required
                maxLength="15"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                //onBlur={validate}
                onChange={handleChange}
                required
                maxLength="20"
                minLength="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                //onBlur={validate}
                onChange={handleChange}
                required
                maxLength="63"
                minLength="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                name="pincode"
                //onBlur={validate}
                onChange={handleChange}
                required
                maxLength="6"
                minLength="2"
              />
            </div>
            {/* <Link to="./academicForm" className="nav-link">
          submit
        </Link> */}
            <div className="input-field">
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div id="aca" className="container tab-pane fade">
          <br></br>
          <form onSubmit={handleSubmit1}>
            <span className="text-success">
              <u>School</u>
            </span>
            <div className="form-group">
              <label htmlFor="schoolname">School Name:</label>
              <input
                type="text"
                className="form-control"
                id="schoolname"
                name="school_name"
                //onBlur={validate1}
                onChange={handleChange1}
                required
                maxLength="50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="10per">10th Grade Percentage:</label>
              <input
                type="text"
                onKeyPress={keypress}
                className="form-control"
                id="10per"
                name="grade_10_per"
                required
                //onBlur="return ValidateDecimal(this) ;"
                //onBlur={validate1}
                onChange={handleChange1}
                maxLength="100"
                minLength="0"
              />
            </div>

            <span className="text-success">
              <u>Pre-University/Diploma College</u>
            </span>

            <div className="form-group">
              <label htmlFor="collegename">
                Pre-University/Diploma College Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="collegename"
                name="pu_college_name"
                //onBlur={validate1}
                onChange={handleChange1}
                required
                maxLength="50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="12per">Pre-University /Diploma Percentage:</label>
              <input
                type="text"
                onKeyPress={keypress}
                className="form-control"
                id="12per"
                name="grade_12_per"
                required
                //onBlur="return ValidateDecimal(this) ;"
                //onBlur={validate1}
                onChange={handleChange1}
                maxLength="100"
                minLength="0"
              />
            </div>

            <span className="text-success">
              <u>Degree College</u>
            </span>

            <div className="form-group">
              <label htmlFor="dcollegename">Degree College Name:</label>
              <input
                type="text"
                className="form-control"
                id="dcollegename"
                name="college_name"
                //onBlur={validate1}
                onChange={handleChange1}
                required
                maxLength="50"
              />
            </div>

            <div className="form-group">
              <label htmlFor="universityname">University Name:</label>
              <input
                type="text"
                className="form-control"
                id="universityname"
                name="university_name"
                // onBlur={validate1}
                onChange={handleChange1}
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
                //onBlur={validate1}
                onChange={handleChange1}
                required
                maxLength="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="degree_cgpa">UG CGPA (Current Semester):</label>
              <input
                type="text"
                onKeyPress={keypress}
                className="form-control"
                id="degree_cgpa"
                name="degree_cgpa"
                required
                //onBlur="return ValidateDecimal(this) ;"
                //onBlur={validate1}
                onChange={handleChange1}
                maxLength="10"
                minLength="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phonenumber"> College Phone Number:</label>
              <input
                type="text"
                className="form-control"
                id="phonenumber"
                name="phone_number"
                // onBlur={validate1}
                onChange={handleChange1}
                maxLength="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Website">College Website:</label>
              <input
                type="url"
                className="form-control"
                id="url"
                name="website"
                //onBlur="checkUrl()"
                //onBlur={validate1}
                onChange={handleChange1}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Email">College Email:</label>
              <input
                type="email"
                className="form-control"
                id="Email"
                name="email"
                //onBlur={validate1}
                onChange={handleChange1}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="p1">Project 1 Undertaken:</label>
              <input
                type="text"
                className="form-control"
                id="p1"
                name="project1_undertaken"
                // onBlur={validate1}
                onChange={handleChange1}
                required
                maxLength="30"
              />
            </div>

            <div className="form-group">
              <label htmlFor="p2">Project 2 Undertaken:</label>
              <input
                type="text"
                className="form-control"
                id="p2"
                name="project2_undertaken"
                //onBlur={validate1}
                onChange={handleChange1}
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
      </div>
    </div>
  );
}

export default StudentInfo;
