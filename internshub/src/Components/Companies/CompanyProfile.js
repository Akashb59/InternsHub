import React, { useState, useEffect } from "react";

import { company, editDetailsForm } from "../Utilities/CompanyFunctions";
import { editAddressForm, editUserInfo } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";
import { formatInput, load } from "../Utilities/Utils";

function CompanyProfile(props) {
  const [validState, setValidState] = useState({
    errors: {
      gst_no: "",
      website: "",
      locality: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: ""
    }
  });
  const [compProfileState, setCompProfileState] = useState({
    fullname: "",
    phoneNumber: "",
    photo: "",
    gst_no: "",
    website: "",
    establishedYear: Date,
    locality: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    address: ""
  });
  const [loading, setLoading] = useState("false");
  useEffect(() => {
    document.title = "InternsHub | Company Profile";

    company().then(res => {
      if (res) {
        //console.log(res.data.company[0]);
        const profile = res.data.company[0];
        setCompProfileState({
          fullname: profile.user.fullname,
          photo: profile.user.photo,
          phoneNumber: profile.user.phoneNumber,
          gst_no: profile.gst_no,
          website: profile.website,
          establishedYear:
            profile.establishedYear !== null
              ? profile.establishedYear.substring(0, 10)
              : "",
          locality: profile.address[0].locality,
          city: profile.address[0].city,
          district: profile.address[0].district,
          state: profile.address[0].state,
          country: profile.address[0].country,
          pincode: profile.address[0].pincode,
          address: profile.address[0].id
        });
        if (res.data !== undefined) setLoading("true");
      }
    });
  }, []);
  const handleChange = event => {
    const { name, value } = event.target;
    let errors = validState.errors;
    setCompProfileState({
      ...compProfileState,
      [name]: value
    });
    switch (name) {
      case "gst_no":
        errors.gst_no =
          value.length < 15 ? "GST Number must be 15 characters" : "";
        break;
      case "website":
        errors.website = value.length < 10 ? "Enter correct format of URL" : "";
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
  const { errors } = validState;
  const handleSubmit = e => {
    e.preventDefault();
    const editAddress = {
      locality: compProfileState.locality,
      city: compProfileState.city,
      district: compProfileState.district,
      state: compProfileState.state,
      country: compProfileState.country,
      pincode: compProfileState.pincode,
      addressID: compProfileState.address
    };
    editAddressForm(editAddress).then(res => {
      if (res) {
        //console.log(res);
        const editDetails = {
          gst_no: compProfileState.gst_no,
          website: compProfileState.website,
          establishedYear: compProfileState.establishedYear
          //address: res.data.data.Address._id,
        };
        editDetailsForm(editDetails).then(res => {
          if (res) {
            //console.log(res.data)
            const form = new FormData();
            form.append("photo", file);
            form.append("phoneNumber", compProfileState.phoneNumber);
            editUserInfo(form).then(res => {
              if (res) {
                showAlert("success", "Successfully Updated Profile");
                props.history.push("/CompanyProfile");
                window.location.reload(false);
              }
            });
          }
        });
      }
    });
  };
  let file;
  const handleFile = event => {
    //const {name,value}=event.target;
    file = event.target.files[0];
    // console.log(file);
  };

  return (
    <div className="container py-5">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <h2 className="text-center display-4 bg-secondary rounded text-white py-2 small-header">
            <i className="fas fa-pencil-alt" /> Edit Profile
          </h2>
          <div className="card bg-body p-3 rounded card-form">
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
                      COMPANY INFORMATION
                    </span>
                  </b>
                </center>
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
                  {compProfileState.photo !== undefined ? (
                    <img
                      className="form__user-photo ml-4"
                      src={`${localStorage.ip}Images/${compProfileState.photo}`}
                      alt=""
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <br></br>
                <div className="input-field mb-3">
                  <label htmlFor="fullname">Company Name:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-building"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="fullname"
                      className="form-control"
                      id="fullname"
                      placeholder="ABC Technologies"
                      disabled
                      value={compProfileState.fullname}
                      onChange={handleChange}
                      required
                      maxLength="50"
                    />
                  </div>
                </div>
                <div className="input-field  mb-3">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-mobile"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      onKeyDown={formatInput}
                      value={compProfileState.phoneNumber}
                      onChange={handleChange}
                      required
                      maxLength="10"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <div className="input-field">
                      <label htmlFor="gst_no">GST-Number:</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-tag"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          name="gst_no"
                          className="form-control"
                          id="gst_no"
                          placeholder="Enter GST Number"
                          disabled
                          value={compProfileState.gst_no}
                          onChange={handleChange}
                          //onBlur={validateGst}
                          required
                          maxLength="16"
                        />
                      </div>
                      {errors.gst_no.length > 0 && (
                        <small style={{ color: "red" }}>
                          <span className="error">{errors.gst_no}</span>
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <div className="input-field">
                      <label htmlFor="eyear">Established Year:</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-birthday-cake"></i>
                          </span>
                        </div>
                        <input
                          type="date"
                          name="establishedYear"
                          className="form-control"
                          id="eyear"
                          placeholder="Enter Established Year"
                          value={compProfileState.establishedYear.toString()}
                          onChange={handleChange}
                          // onKeyPress={keyPress}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <label htmlFor="website">Website:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-desktop"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="website"
                      className="form-control"
                      id="website"
                      placeholder="http://www.example.com"
                      value={compProfileState.website}
                      onChange={handleChange}
                      required
                      maxLength="30"
                    />
                  </div>
                  {errors.website.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.website}</span>
                    </small>
                  )}
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
                          name="locality"
                          className="form-control"
                          id="locality"
                          placeholder="Enter Locality"
                          value={compProfileState.locality}
                          onChange={handleChange}
                          required
                          maxLength="50"
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
                          name="city"
                          className="form-control"
                          id="city"
                          placeholder="Enter City"
                          value={compProfileState.city}
                          onChange={handleChange}
                          required
                          maxLength="50"
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
                          name="district"
                          className="form-control"
                          id="district"
                          placeholder="Enter District"
                          value={compProfileState.district}
                          onChange={handleChange}
                          required
                          maxLength="50"
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
                          name="state"
                          className="form-control"
                          id="state"
                          placeholder="Enter State"
                          value={compProfileState.state}
                          onChange={handleChange}
                          required
                          maxLength="50"
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
                          name="country"
                          className="form-control"
                          id="country"
                          placeholder="Enter Country"
                          value={compProfileState.country}
                          onChange={handleChange}
                          required
                          maxLength="50"
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
                          name="pincode"
                          className="form-control"
                          id="pincode"
                          placeholder="Enter ZIP Code"
                          value={compProfileState.pincode}
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
      )}
    </div>
  );
}

export default CompanyProfile;
