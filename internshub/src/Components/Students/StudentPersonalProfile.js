import React, { useState, useEffect } from "react";
import {
  student,
  editStudProfilePersonal
} from "../Utilities/StudentFunctions";
import { editAddressForm, editUserInfo } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";
import "./../../CSS/student.css";

function StudentPersonalProfile(props) {
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
    address: "",
    name: "",
    phone: ""
  });
  useEffect(() => {
    document.title = "InternsHub | Student Profile";
    student().then(res => {
      if (res) {
        //console.log(res.data.student[0]);
        const profile = res.data.student[0].personal_details;
        const profile1 = res.data.student[0].address[0];
        setStudentAcadProfileState({
          ...studAcadProfileState,
          name: res.data.student[0].user.fullname,
          phone: res.data.student[0].user.phoneNumber,
          fatherName: profile.father_name,
          motherName: profile.mother_name,
          hobbies: profile.hobbies,
          dob: profile.dob !== null ? profile.dob.substring(0, 10) : "",
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

    // eslint-disable-next-line
  }, []);
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
        //console.log(res.data);
        const editStudProfile = {
          hobbies: studAcadProfileState.hobbies,
          gender: studAcadProfileState.gender
        };
        editStudProfilePersonal(editStudProfile).then(res => {
          if (res) {
            const details = {
              phoneNumber: studAcadProfileState.phone
            };
            editUserInfo(details).then(res => {
              if (res) {
                showAlert(
                  "success",
                  "Successfully Updated Personal Information"
                );
                props.history.push("/StudentPersonal");
              }
            });
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
          <label htmlFor="name">Full Name: </label>
          <input
            type="text"
            className="form-control"
            placeholder="John Doe"
            disabled
            id="name"
            name="name"
            value={studAcadProfileState.name}
            onChange={handleChange}
            required
            maxLength="30"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number: </label>
          <input
            type="text"
            className="form-control"
            placeholder="0123456789"
            id="phone"
            name="phone"
            value={studAcadProfileState.phone}
            onChange={handleChange}
            required
            maxLength="30"
          />
        </div>
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            placeholder="DD-MM-YYYY"
            disabled
            value={studAcadProfileState.dob}
            id="dob"
            name="dob"
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
            placeholder="Locality"
            value={studAcadProfileState.locality}
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
            placeholder="City"
            name="city"
            value={studAcadProfileState.city}
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
            placeholder="District"
            name="district"
            value={studAcadProfileState.district}
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
            placeholder="State"
            name="state"
            value={studAcadProfileState.state}
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
            placeholder="Country"
            value={studAcadProfileState.country}
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
            placeholder="Pincode"
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
