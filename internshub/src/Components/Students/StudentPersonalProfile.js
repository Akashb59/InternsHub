import React, { useState, useEffect } from "react";
import {
  student,
  profileAddress,
  editStudProfilePersonal
} from "../Utilities/StudentFunctions";
import { editAddressForm } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";
import "./../../CSS/company.css";

function StudentPersonalProfile(props) {
  useEffect(() => {
    document.title = "InternsHub | Student Profile";
    student().then(res => {
      if (res) {
        console.log(res.data);
        const profile = res.data.student[0].personal_details;
        //     const profile1 = res.data.student[0].college[0];
        profileAddress().then(res => {
          if (res) {
            console.log(res.data);
            // const profile = res.data.student[0].personal_details;
            const profile1 = res.data.address[0];
            setStudentAcadProfileState({
              ...studAcadProfileState,
              fatherName: profile.father_name,
              motherName: profile.mother_name,
              hobbies: profile.hobbies,
              dob: profile.dob.substring(0, 10),
              gender: profile.gender,
              locality: profile1.locality,
              city: profile1.city,
              district: profile1.district,
              state: profile1.state,
              country: profile1.country,
              pincode: profile1.pincode,
              address: profile1.id
            });
          }
        });
      }
    });

    // eslint-disable-next-line
  }, []);

  const [studAcadProfileState, setStudentAcadProfileState] = useState({
    fatherName: "",
    motherName: "",
    hobbies: "",
    dob: Date,
    gender: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    address: ""
  });

  const handleChange = event => {
    setStudentAcadProfileState({
      ...studAcadProfileState,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const editAddress = {
      locality: studAcadProfileState.locality,
      city: studAcadProfileState.city,
      district: studAcadProfileState.district,
      state: studAcadProfileState.state,
      country: studAcadProfileState.country,
      pincode: studAcadProfileState.pincode,
      addressID: studAcadProfileState.address
    };
    editAddressForm(editAddress).then(res => {
      if (res) {
        console.log(res.data);
        const editStudProfile = {
          fatherName: studAcadProfileState.fatherName,
          motherName: studAcadProfileState.motherName,
          hobbies: studAcadProfileState.hobbies,
          dob: studAcadProfileState.dob,
          gender: studAcadProfileState.gender
        };
        editStudProfilePersonal(editStudProfile).then(res => {
          if (res) {
            console.log(res.data);
            showAlert("success", "Successfully Updated Personal Information");
            props.history.push("/StudentPersonal");
          }
        });
      }
    });
  };
  return (
    <div className="container">
      {/* <p>{console.log(studAcadProfileState.dob)}</p> */}
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
        <div className="form-group">
          <label htmlFor="fatherName">Father Name: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Father name"
            disabled
            id="fatherName"
            name="fatherName"
            value={studAcadProfileState.fatherName}
            // onBlur={validate}
            onChange={handleChange}
            required
            maxLength="30"
          />
        </div>

        <div className="form-group">
          <label htmlFor="motherName">Mother Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Mother Name"
            disabled
            id="motherName"
            name="motherName"
            value={studAcadProfileState.motherName}
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
            placeholder="Hobbies"
            id="hobbies"
            name="hobbies"
            value={studAcadProfileState.hobbies}
            //onBlur={validate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            placeholder="DOB"
            disabled
            id="dob"
            name="dob"
            //value={studAcadProfileState.dob}
            //onBlur={validate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <br />
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={studAcadProfileState.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={studAcadProfileState.gender === "Female"}
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
            value={studAcadProfileState.locality}
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
            value={studAcadProfileState.city}
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
            value={studAcadProfileState.district}
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
            value={studAcadProfileState.state}
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
            value={studAcadProfileState.country}
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
            value={studAcadProfileState.pincode}
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
  );
}
export default StudentPersonalProfile;
