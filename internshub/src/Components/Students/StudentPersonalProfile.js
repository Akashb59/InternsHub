import React, { useState, useEffect } from "react";
import {
  student,
  editStudProfilePersonal
} from "../Utilities/StudentFunctions";
import { editAddressForm, editUserInfo } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";
import { formatInput } from "../Utilities/Utils";

function StudentPersonalProfile(props) {
  const [studPersonalProfile, setStudPersonal] = useState({
    fatherName: "",
    motherName: "",
    hobbies: "",
    photo: "",
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
    phoneNumber: ""
  });
  const [validState, setValidState] = useState({
    errors: {
      fullname: "",
      phoneNumber: "",
      father_name: "",
      mother_name: "",
      locality: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: ""
    }
  });
  useEffect(() => {
    document.title = "InternsHub | Student Profile";
    student().then(res => {
      if (res) {
        //console.log(res.data.student[0]);
        const profile = res.data.student[0].personal_details;
        const profile1 = res.data.student[0].address[0];
        setStudPersonal({
          ...studPersonalProfile,
          name: res.data.student[0].user.fullname,
          photo: res.data.student[0].user.photo,
          phoneNumber: res.data.student[0].user.phoneNumber,
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
    const { name, value } = event.target;
    let errors = validState.errors;

    switch (name) {
      case "fullname":
        errors.fullname = value.length < 5 ? "Please enter Your Full Name" : "";
        break;
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
    setStudPersonal({
      ...studPersonalProfile,
      [name]: value
    });
  };
  let file;
  const handleFile = event => {
    //const {name,value}=event.target;
    file = event.target.files[0];
    // console.log(file);
  };
  const { errors } = validState;
  const handleSubmit = e => {
    e.preventDefault();
    const editAddress = {
      locality: studPersonalProfile.locality,
      city: studPersonalProfile.city,
      district: studPersonalProfile.district,
      state: studPersonalProfile.state,
      country: studPersonalProfile.country,
      pincode: studPersonalProfile.pincode,
      addressID: studPersonalProfile.address
    };
    editAddressForm(editAddress).then(res => {
      if (res) {
        //console.log(res.data);
        const editStudProfile = {
          hobbies: studPersonalProfile.hobbies,
          gender: studPersonalProfile.gender,
          father_name: studPersonalProfile.fatherName,
          mother_name: studPersonalProfile.motherName,
          dob: studPersonalProfile.dob,
          fullname: studPersonalProfile.name
        };
        editStudProfilePersonal(editStudProfile).then(res => {
          if (res) {
            const form = new FormData();
            form.append("photo", file);
            form.append("phoneNumber", studPersonalProfile.phoneNumber);
            editUserInfo(form).then(res => {
              if (res) {
                showAlert(
                  "success",
                  "Successfully Updated Personal Information"
                );
                props.history.push("/StudentPersonal");
                window.location.reload(false);
              }
            });
          }
        });
      }
    });
  };

  return (
    <div className="container py-5">
      {/* <p>{console.log(studPersonalProfile.dob)}</p> */}
      <h2 className="text-center display-4 bg-secondary text-white py-2 rounded small-header">
        <i className="fas fa-user-edit"></i> Edit Personal Information
      </h2>
      <div className="card bg-body p-3 rounded card-form">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
                  PERSONAL INFORMATION
                </span>
              </b>
            </center>{" "}
            <br></br>
            <div className="form__photo-upload ">
              <input
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                className="form__upload"
                onChange={handleFile}
              />
              <label className="ml-auto" htmlFor="photo">
                Choose new photo
              </label>
              <img
                className="form__user-photo ml-4"
                src={`${localStorage.ip}/Images/${studPersonalProfile.photo}`}
                alt=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name: </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  disabled
                  id="name"
                  name="name"
                  value={studPersonalProfile.name}
                  onChange={handleChange}
                  required
                  maxLength="30"
                />
              </div>
              {errors.fullname.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.fullname}</span>
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number: </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-mobile"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0123456789"
                  onKeyDown={formatInput}
                  id="phoneNumber"
                  name="phoneNumber"
                  value={studPersonalProfile.phoneNumber}
                  onChange={handleChange}
                  required
                  maxLength="10"
                />
              </div>
              {errors.phoneNumber.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.phoneNumber}</span>
                </small>
              )}
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="fatherName">Father Name: </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-male" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Father name"
                    disabled
                    id="fatherName"
                    name="fatherName"
                    value={studPersonalProfile.fatherName}
                    onChange={handleChange}
                    required
                    maxLength="30"
                  />{" "}
                  {errors.father_name.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.father_name}</span>
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="motherName">Mother Name:</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-female" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mother Name"
                    disabled
                    id="motherName"
                    name="motherName"
                    value={studPersonalProfile.motherName}
                    onChange={handleChange}
                    required
                    maxLength="30"
                  />
                </div>
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
                    placeholder="Hobbies"
                    id="hobbies"
                    name="hobbies"
                    value={studPersonalProfile.hobbies}
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
                    className="form-control"
                    disabled
                    id="dob"
                    name="dob"
                    onChange={handleChange}
                    value={studPersonalProfile.dob.toString()}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="sm-col-4">
                <table className="table bg-white table-borderless">
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
                            checked={studPersonalProfile.gender === "Male"}
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
                            checked={studPersonalProfile.gender === "Female"}
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
                    fontSize: "150%"
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
                <div className="input-field">
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
                      placeholder="Locality"
                      value={studPersonalProfile.locality}
                      onChange={handleChange}
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
              </div>

              <div className="form-group col-md-4">
                <div className="input-field">
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
                      placeholder="City"
                      name="city"
                      value={studPersonalProfile.city}
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
              </div>
              <div className="form-group col-md-4">
                <div className="input-field">
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
                      placeholder="District"
                      name="district"
                      value={studPersonalProfile.district}
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
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <div className="input-field">
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
                      placeholder="State"
                      name="state"
                      value={studPersonalProfile.state}
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
              </div>
              <div className="form-group col-md-4">
                <div className="input-field">
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
                      placeholder="Country"
                      value={studPersonalProfile.country}
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
              </div>
              <div className="form-group col-md-4">
                <div className="input-field">
                  <label htmlFor="pincode">Pincode:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      placeholder="Pincode"
                      name="pincode"
                      value={studPersonalProfile.pincode}
                      //onBlur={validate}
                      onChange={handleChange}
                      required
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
            </div>
            {/* <Link to="./academicForm" className="nav-link">
          submit
        </Link> */}
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
export default StudentPersonalProfile;
