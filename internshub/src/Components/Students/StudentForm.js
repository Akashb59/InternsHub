import React, { useState, useEffect } from "react";
//import { Link } from 'react-router-dom';
import "./../../CSS/student.css";
import { addressform } from "../Utilities/CommonFunctions";

function StudentForm(props) {
  useEffect(() => {
    document.title = "InternsHub | Student Details";
  }, []);
  const [studFormState, setStudFormState] = useState({
    father_name: "",
    mother_name: "",
    dob: "",
    gender: "",
    hobbies: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: ""
  });

  const handleChange = event => {
    setStudFormState({
      ...studFormState,
      [event.target.name]: event.target.value
    });
  };
  const validate = () => {
    if (studFormState === " ") setStudFormState("Please fill the information");
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
        props.history.push("/academicForm");
      }
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="primary">PERSONAL DETAILS</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="father_name">Father Name: </label>
          <input
            type="text"
            className="form-control"
            id="father_name"
            name="father_name"
            onBlur={validate}
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
            onBlur={validate}
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
            onBlur={validate}
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
            onBlur={validate}
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
            onBlur={validate}
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
            onBlur={validate}
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
            onBlur={validate}
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
            onBlur={validate}
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
            onBlur={validate}
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
  );
}
export default StudentForm;
