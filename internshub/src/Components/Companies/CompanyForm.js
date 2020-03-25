import React, { useState, useEffect } from "react";
import { companyform, company } from "../Utilities/CompanyFunctions";
import { addressform } from "../Utilities/CommonFunctions";
import "./../../CSS/company.css";
import { formatInput } from "../Utilities/Utils";

function CompanyForm(props) {
  useEffect(() => {
    document.title = "InternsHub | Company Details";
  }, []);
  const [compformstate, setCompFormState] = useState({
    gst_no: "",
    website: "",
    establishedYear: Date,
    locality: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: ""
  });
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
  const handleChange = event => {
    const { name, value } = event.target;
    let errors = validState.errors;
    setCompFormState({
      ...compformstate,
      [name]: value
    });
    switch (name) {
      case "gst_no":
        errors.gst_no =
          value.length < 14 ? "GST Number must be 15 characters" : "";
        break;
      case "website":
        errors.website = value.length < 10 ? "Enter correct format of URL" : "";
        break;
      case "locality":
        errors.locality =
          value.length < 5 ? "Must be 5 characters or more" : "";
        break;
      case "city":
        errors.city = value.length < 5 ? "Must be 5 characters or more" : "";
        break;
      case "district":
        errors.district =
          value.length < 5 ? " Must be 5 characters or more" : "";
        break;
      case "state":
        errors.state = value.length < 3 ? " Must be 3 characters or more" : "";
        break;
      case "country":
        errors.country =
          value.length < 3 ? " Must be 3 characters or more" : "";
        break;
      case "pincode":
        errors.pincode = value.length < 6 ? "Pincode must be 6 numbers!!" : "";
        break;
      default:
        break;
    }
    setValidState({ errors, [name]: value });
  };
  const { errors } = validState;

  const handleSubmit = e => {
    e.preventDefault();
    const address = {
      locality: compformstate.locality,
      city: compformstate.city,
      district: compformstate.district,
      state: compformstate.state,
      country: compformstate.country,
      pincode: compformstate.pincode,
      user: localStorage.userid
    };
    addressform(address).then(res => {
      if (res) {
        const details = {
          gst_no: compformstate.gst_no,
          website: compformstate.website,
          establishedYear: compformstate.establishedYear,
          address: res.data.data.Address._id,
          user: localStorage.userid
        };

        companyform(details).then(res => {
          if (res) {
            //console.log(res);
            //localStorage.setItem('companyid', res.id);
            company().then(res => {
              if (res) {
                props.history.push(`/companyHome`);
              }
            });
          }
        });
      }
    });
  };
  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
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
        <br></br>
        <div class="form-row">
          <div class="form-group col-md-6">
            <div className="input-field">
              <label htmlFor="fullname">GST-NUMBER:</label>
              <input
                type="text"
                name="gst_no"
                className="form-control"
                id="gst_no"
                placeholder="Enter GST Number"
                value={compformstate.gst_no}
                onChange={handleChange}
                required
                maxLength="15"
              />
              {errors.gst_no.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.gst_no}</span>
                </small>
              )}
            </div>
          </div>
          <div class="form-group col-md-6">
            <div className="input-field">
              <label htmlFor="eyear">Established Year:</label>
              <input
                type="date"
                name="establishedYear"
                className="form-control"
                id="eyear"
                placeholder="Enter Established Year"
                value={compformstate.establishedYear}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="website">WEBSITE:</label>
          <input
            type="text"
            name="website"
            className="form-control"
            id="website"
            placeholder="http://www.example.com"
            value={compformstate.website}
            onChange={handleChange}
            required
            maxLength="30"
          />{" "}
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
        <div class="form-row">
          <div class="form-group col-md-4">
            <div className="input-field">
              <label htmlFor="locality">Locality:</label>
              <input
                type="text"
                name="locality"
                className="form-control"
                id="locality"
                placeholder="Enter Locality"
                value={compformstate.locality}
                onChange={handleChange}
                required
                maxLength="50"
              />
              {errors.locality.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.locality}</span>
                </small>
              )}
            </div>
          </div>

          <div class="form-group col-md-4">
            <div className="input-field">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                className="form-control"
                id="city"
                placeholder="Enter City"
                value={compformstate.city}
                onChange={handleChange}
                required
                maxLength="50"
              />
              {errors.city.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.city}</span>
                </small>
              )}
            </div>
          </div>
          <div class="form-group col-md-4">
            <div className="input-field">
              <label htmlFor="district">District:</label>
              <input
                type="text"
                name="district"
                className="form-control"
                id="district"
                placeholder="Enter District"
                value={compformstate.district}
                onChange={handleChange}
                required
                maxLength="50"
              />
              {errors.district.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.district}</span>
                </small>
              )}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <div className="input-field">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                name="state"
                className="form-control"
                id="state"
                placeholder="Enter State"
                value={compformstate.state}
                onChange={handleChange}
                required
                maxLength="50"
              />
              {errors.state.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.state}</span>
                </small>
              )}
            </div>
          </div>
          <div class="form-group col-md-4">
            <div className="input-field">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                name="country"
                className="form-control"
                id="country"
                placeholder="Enter Country"
                value={compformstate.country}
                onChange={handleChange}
                required
                maxLength="50"
              />{" "}
              {errors.country.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.country}</span>
                </small>
              )}
            </div>
          </div>

          <div class="form-group col-md-4">
            <div className="input-field">
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                id="pincode"
                placeholder="Enter ZIP Code"
                value={compformstate.pincode}
                onChange={handleChange}
                required
                onKeyDown={formatInput}
                maxLength="6"
                minLength="2"
              />
              {errors.pincode.length > 0 && (
                <small style={{ color: "red" }}>
                  <span className="error">{errors.pincode}</span>
                </small>
              )}
            </div>
          </div>
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
export default CompanyForm;
