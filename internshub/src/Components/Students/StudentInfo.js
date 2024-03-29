import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { studentform, student } from "../Utilities/StudentFunctions";
import { addressform } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";
import { formatInput, load } from "../Utilities/Utils";

function StudentInfo(props) {
  const [loading, setLoading] = useState("false");
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
    pincode: "",
  });
  const [more, setMore] = useState({
    father_name: "",
    mother_name: "",
    dob: Date,
    gender: "",
    hobbies: "",
  });
  const [completed, setCompleted] = useState("No");
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
    project2_undertaken: "",
  });
  useEffect(() => {
    document.title = "InternsHub | Student Details";
    setLoading("true");
  }, []);
  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const [validState, setValidState] = useState({
    errors: {
      college_name: "",
      phone_number: "",
      website: "",
      email: "",
      school_name: "",
      pu_college_name: "",
      university_name: "",
      usn: "",
      project1_undertaken: "",
      project2_undertaken: "",
      grade_10_per: "",
      grade_12_per: "",
      degree_cgpa: "",
      father_name: "",
      mother_name: "",
      locality: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    let errors = validState.errors;
    setStudFormState({
      ...studFormState,
      [name]: value,
    });

    switch (name) {
      case "father_name":
        errors.father_name =
          value.length < 5 ? "Please enter Your Father's Name" : "";
        break;
      case "mother_name":
        errors.mother_name =
          value.length < 5 ? "Please enter Your Mother's Name" : "";
        break;
      case "locality":
        errors.locality =
          value.length < 10
            ? "Locality must have length of 10 characters or more"
            : "";
        break;
      case "city":
        errors.city =
          value.length < 3
            ? "City must have length of 3 characters or more"
            : "";
        break;
      case "district":
        errors.district =
          value.length < 3
            ? "District must have length of 3 characters or more"
            : "";
        break;
      case "state":
        errors.state =
          value.length < 3
            ? "State must have length of 3 characters or more"
            : "";
        break;
      case "country":
        errors.country =
          value.length < 3
            ? "Country must have length of 3 characters or more"
            : "";
        break;
      case "pincode":
        errors.pincode =
          value.length < 6 ? "Pincode must be of length 6 characters" : "";
        break;

      default:
        break;
    }

    setValidState({ errors, [name]: value });
  };
  //   const validate = () => {
  //     if (studFormState === " ") setStudFormState("Please fill the information");
  //   };
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    let errors = validState.errors;

    setAcademicFormState({
      ...academicFormState,
      [name]: value,
    });

    switch (name) {
      case "college_name":
        errors.college_name =
          value.length < 5
            ? "College name must have length of 5 characters or more"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "school_name":
        errors.school_name =
          value.length < 5
            ? "School name must have length of 5 characters or more"
            : "";
        break;
      case "pu_college_name":
        errors.pu_college_name =
          value.length < 5
            ? "PU College name must have length of 5 characters or more"
            : "";
        break;

      case "website":
        errors.website = value.length < 10 ? "Enter correct format of URL" : "";
        break;
      case "usn":
        errors.usn = value.length < 10 ? "USN must be 10 characters long" : "";
        break;
      case "university_name":
        errors.university_name =
          value.length < 5 ? "Enter Valid University Name" : "";
        break;
      case "project1_undertaken":
        errors.project1_undertaken =
          value.length < 5
            ? "Project name must be 5 or more characters long"
            : "";
        break;
      case "project2_undertaken":
        errors.project2_undertaken =
          value.length < 5
            ? "Project name must be 5 or more characters long"
            : "";
        break;
      case "grade_10_per":
        errors.grade_10_per = value.length < 2 ? "Enter Valid Percentage" : "";
        break;
      case "grade_12_per":
        errors.grade_12_per = value.length < 2 ? "Enter Valid Percentage" : "";
        break;
      case "degree_cgpa":
        errors.degree_cgpa = value.length < 1 ? "Enter Valid CGPA" : "";
        break;
      default:
        break;
    }

    setValidState({ errors, [name]: value });
  };
  const { errors } = validState;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (studFormState.gender === "")
      showAlert("error", "Please fill in the gender details");

    const address = {
      locality: studFormState.locality,
      city: studFormState.city,
      district: studFormState.district,
      state: studFormState.state,
      country: studFormState.country,
      pincode: studFormState.pincode,
      user: localStorage.userid,
    };

    setMore({
      ...more,
      father_name: studFormState.father_name,
      mother_name: studFormState.mother_name,
      dob: studFormState.dob,
      gender: studFormState.gender,
      hobbies: studFormState.hobbies,
    });

    addressform(address).then((res) => {
      if (res) {
        showAlert("success", "Personal Information Recorded");
        //window.location.reload(false);
        setCompleted("Yes");
        document
          .getElementById("fill")
          .setAttribute("className", "nav-link active");
        document.getElementById("filled").setAttribute("className", "nav-link");
        //setInfo("Filled");
      }
    });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();

    //const newadd = localStorage.address_copy;

    const det = {
      father_name: more.father_name,
      mother_name: more.mother_name,
      dob: more.dob,
      gender: more.gender,
      hobbies: more.hobbies,
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
      user: localStorage.userid,
    };

    studentform(det).then((res) => {
      if (res) {
        student().then((res) => {
          if (res) {
            showAlert("success", "Academic Information Recorded");
            props.history.push(`/studentHome`);
          }
        });
      }
    });
  };
  return (
    <div className="container py-4">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <h2 className="text-center display-4 bg-secondary rounded text-white py-2 small-header">
            <i className="fas fa-user-circle" /> Student Information
          </h2>
          <div className="card bg-body p-2 mt-4 rounded card-form">
            <div className="card-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    id="filled"
                    href="#per"
                  >
                    Personal
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    id="fill"
                    href="#aca"
                  >
                    Academic
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="per" className="container tab-pane active">
                  <br></br>

                  <form onSubmit={handleSubmit}>
                    <center>
                      <b>
                        <span
                          className="heading-secondary"
                          style={{
                            fontSize: "150%",
                            //fontFamily: "Segoe Print"
                          }}
                        >
                          PERSONAL DETAILS
                        </span>
                      </b>
                    </center>{" "}
                    <br></br>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="father_name">Father Name: </label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-male" aria-hidden="true"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="father_name"
                            name="father_name"
                            value={studFormState.father_name}
                            placeholder="Father Name"
                            // onBlur={validate}
                            onChange={handleChange}
                            required
                            maxLength="30"
                          />
                        </div>
                        {errors.father_name.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.father_name}</span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="mother_name">Mother Name:</label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i
                                className="fa fa-female"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="mother_name"
                            name="mother_name"
                            //onBlur={validate}
                            placeholder="Mother Name"
                            value={studFormState.mother_name}
                            onChange={handleChange}
                            required
                            maxLength="30"
                          />{" "}
                        </div>
                        {errors.mother_name.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.mother_name}</span>
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="hobbies">Hobbies:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-clipboard-list"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="hobbies"
                            name="hobbies"
                            value={studFormState.hobbies}
                            placeholder="Hobbies"
                            //onBlur={validate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="dob">Date of Birth:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-birthday-cake"></i>
                            </span>
                          </div>
                          <input
                            type="date"
                            //onBlur={validate}
                            onChange={handleChange}
                            name="dob"
                            value={studFormState.dob.toString()}
                            required
                            className="form-control"
                            id="dob"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="sm-col-4">
                        <table className="table bg-card table-borderless">
                          <tbody>
                            <tr>
                              <th>Gender:</th>
                              <td>
                                {" "}
                                <div className="custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="gender"
                                    className="custom-control-input"
                                    id="defaultInline1"
                                    value="Male"
                                    onChange={handleChange}
                                  />{" "}
                                  <label
                                    className="custom-control-label"
                                    htmlFor="defaultInline1"
                                    style={{ color: "black" }}
                                  >
                                    Male
                                  </label>
                                </div>
                              </td>
                              <td>
                                {" "}
                                <div className="custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="gender"
                                    className="custom-control-input"
                                    id="defaultInline2"
                                    value="Female"
                                    onChange={handleChange}
                                  />{" "}
                                  <label
                                    className="custom-control-label"
                                    htmlFor="defaultInline2"
                                    style={{ color: "black" }}
                                  >
                                    Female
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <br></br>
                    <center>
                      <b>
                        <span
                          className="heading-secondary"
                          style={{
                            fontSize: "150%",
                            //fontFamily: "Segoe Print"
                          }}
                        >
                          ADDRESS
                        </span>
                      </b>
                    </center>{" "}
                    <br></br>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="locality">Locality:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-location-arrow"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="locality"
                            name="locality"
                            //onBlur={validate}
                            placeholder="Enter Locality"
                            onChange={handleChange}
                            value={studFormState.locality}
                            required
                            maxLength="50"
                            minLength="5"
                          />
                        </div>
                        {errors.locality.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.locality}</span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="city">City:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-location-arrow"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            placeholder="Enter City"
                            value={studFormState.city}
                            //onBlur={validate}
                            onChange={handleChange}
                            required
                            maxLength="15"
                          />
                        </div>

                        {errors.city.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.city}</span>
                          </small>
                        )}
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="district">District:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-location-arrow"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="district"
                            name="district"
                            //onBlur={validate}
                            value={studFormState.district}
                            placeholder="Enter District"
                            onChange={handleChange}
                            required
                            maxLength="15"
                          />
                        </div>
                        {errors.district.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.district}</span>
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="state">State:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-map-marker-alt"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={studFormState.state}
                            //onBlur={validate}
                            placeholder="Enter State"
                            onChange={handleChange}
                            required
                            maxLength="20"
                            minLength="3"
                          />
                        </div>
                        {errors.state.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.state}</span>
                          </small>
                        )}
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="country">Country:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-map-marker-alt"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            //onBlur={validate}
                            value={studFormState.country}
                            placeholder="Enter Country"
                            onChange={handleChange}
                            required
                            maxLength="63"
                            minLength="3"
                          />
                        </div>
                        {errors.country.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.country}</span>
                          </small>
                        )}
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="pincode">Pincode:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-map-marker-alt"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="pincode"
                            className="form-control"
                            id="pincode"
                            placeholder="Enter ZIP Code"
                            value={studFormState.pincode}
                            onChange={handleChange}
                            required
                            onKeyDown={formatInput}
                            maxLength="6"
                            minLength="2"
                          />
                        </div>
                        {errors.pincode.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.pincode}</span>
                          </small>
                        )}
                      </div>
                    </div>
                    {/* <Link to="./academicForm" className="nav-link">
          submit
        </Link> */}
                    {completed === "Yes" ? (
                      <div className="input-field col-md-6 offset-md-3 mt-2">
                        <button
                          className="btn btn-success btn-block"
                          type="submit"
                          disabled
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <div className="input-field col-md-6 offset-md-3 mt-2">
                        <button
                          className="btn btn-success btn-block"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </form>
                </div>
                <div id="aca" className="container tab-pane fade">
                  <br></br>

                  <form onSubmit={handleSubmit1}>
                    <center>
                      <b>
                        <span
                          className="heading-secondary"
                          style={{
                            fontSize: "150%",
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
                        <label htmlFor="school_name">School Name:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-school"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="schoolname"
                            name="school_name"
                            placeholder="Enter School Name"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            required
                            maxLength="50"
                            value={academicFormState.school_name}
                          />
                        </div>
                        {errors.school_name.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.school_name}</span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="grade_10_per">
                          10th Grade Percentage:
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-percentage"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="10per"
                            name="grade_10_per"
                            placeholder="Enter Percentage"
                            required
                            //onBlur="return ValidateDecimal(this) ;"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            maxLength="100"
                            minLength="0"
                            value={academicFormState.grade_10_per}
                          />
                        </div>
                        {errors.grade_10_per.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.grade_10_per}</span>
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
                            fontSize: "150%",
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
                        <label htmlFor="pu_college_name">
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
                            id="collegename"
                            name="pu_college_name"
                            placeholder="Enter College Name"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            required
                            maxLength="50"
                            value={academicFormState.pu_college_name}
                          />
                        </div>
                        {errors.pu_college_name.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">
                              {errors.pu_college_name}
                            </span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="grade_12_per">
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
                            className="form-control"
                            id="12per"
                            name="grade_12_per"
                            placeholder="Enter Percentage"
                            required
                            //onBlur="return ValidateDecimal(this) ;"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            maxLength="50"
                            value={academicFormState.grade_12_per}
                            minLength="0"
                          />
                        </div>
                        {errors.grade_12_per.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.grade_12_per}</span>
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
                            fontSize: "150%",
                            //fontFamily: "Segoe Print"
                          }}
                        >
                          DEGREE COLLEGE
                        </span>
                      </b>
                    </center>{" "}
                    <br></br>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="college_name">
                          Degree College Name:
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
                            id="dcollegename"
                            name="college_name"
                            placeholder="Enter Degree College Name"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            required
                            maxLength="50"
                            value={academicFormState.college_name}
                          />
                        </div>
                        {errors.college_name.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.college_name}</span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="university_name">
                          University Name:
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-university"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="universityname"
                            name="university_name"
                            placeholder="Enter University Name"
                            // onBlur={validate1}
                            onChange={handleChange1}
                            required
                            maxLength="50"
                            value={academicFormState.university_name}
                            // onBlur={validate1}
                          />
                        </div>
                        {errors.university_name.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">
                              {errors.university_name}
                            </span>
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
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
                            placeholder="Enter USN"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            required
                            maxLength="10"
                            value={academicFormState.usn}
                          />
                        </div>
                        {errors.usn.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.usn}</span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="degree_cgpa">
                          UG CGPA (Current Semester):
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-graduation-cap"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="degree_cgpa"
                            name="degree_cgpa"
                            placeholder="Enter CGPA"
                            required
                            //onBlur="return ValidateDecimal(this) ;"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            maxLength="10"
                            minLength="1"
                            value={academicFormState.degree_cgpa}
                          />
                        </div>
                        {errors.degree_cgpa.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.degree_cgpa}</span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="phone_number">
                          {" "}
                          College Phone Number:
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-mobile"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="phonenumber"
                            name="phone_number"
                            placeholder="0123456789"
                            // onBlur={validate1}
                            onChange={handleChange1}
                            maxLength="10"
                            value={academicFormState.phone_number}
                          />
                        </div>
                        {errors.phone_number.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.phone_number}</span>
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="website">College Website:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-desktop"></i>
                            </span>
                          </div>
                          <input
                            type="url"
                            className="form-control"
                            id="url"
                            name="website"
                            placeholder="http://www.example.com"
                            onChange={handleChange1}
                            required
                            value={academicFormState.website}
                          />
                        </div>
                        {errors.website.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.website}</span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="email">College Email:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-envelope"></i>
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            id="Email"
                            name="email"
                            placeholder="you@example.com"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            required
                            value={academicFormState.email}
                          />
                        </div>
                        {errors.email.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.email}</span>
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
                            fontSize: "150%",
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
                        <label htmlFor="project1_undertaken">
                          Project 1 Undertaken:
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-briefcase"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="p1"
                            name="project1_undertaken"
                            placeholder="Enter Project 1"
                            // onBlur={validate1}
                            onChange={handleChange1}
                            required
                            maxLength="30"
                            value={academicFormState.project1_undertaken}
                            // onBlur={validate1}
                          />
                        </div>
                        {errors.project1_undertaken.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">
                              {errors.project1_undertaken}
                            </span>
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="project2_undertaken">
                          Project 2 Undertaken:
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-briefcase"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="p2"
                            name="project2_undertaken"
                            placeholder="Enter Project 2"
                            //onBlur={validate1}
                            onChange={handleChange1}
                            required
                            maxLength="30"
                            value={academicFormState.project2_undertaken}
                            //onBlur={validate1}
                          />
                        </div>
                        {errors.project2_undertaken.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">
                              {errors.project2_undertaken}
                            </span>
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="input-field col-md-6 offset-md-3 mt-2">
                      <button
                        className="btn btn-success btn-block"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentInfo;
