import React, { useState, useEffect } from "react";

import { company, editDetailsForm } from "../Utilities/CompanyFunctions";
import { editAddressForm, editUserInfo } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";
import { formatInput } from "../Utilities/Utils";
import "./../../CSS/company.css";

function CompanyProfile(props) {
  useEffect(() => {
    document.title = "InternsHub | Company Profile";

    company().then(res => {
      if (res) {
        //console.log(res.data.company[0]);
        const profile = res.data.company[0];
        setCompProfileState({
          ...compProfileState,
          fullname: profile.user.fullname,
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
      }
    });
    // eslint-disable-next-line
  }, []);
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
            const pDetails = {
              phoneNumber: compProfileState.phoneNumber
            };
            editUserInfo(pDetails).then(res => {
              if (res) {
                showAlert("success", "Successfully Updated Profile");
                props.history.push("/CompanyProfile");
              }
            });
          }
        });
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
        <div className="input-field">
          <label htmlFor="fullname">Company Name:</label>
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
        <div className="input-field">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            className="form-control"
            id="phoneNumber"
            placeholder="Phone Number"
            value={compProfileState.phoneNumber}
            onChange={handleChange}
            required
            maxLength="10"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <div className="input-field">
              <label htmlFor="gst_no">GST-NUMBER:</label>
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
                value={compProfileState.establishedYear}
                onChange={handleChange}
                // onKeyPress={keyPress}
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
            value={compProfileState.website}
            onChange={handleChange}
            required
            maxLength="30"
          />
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
                value={compProfileState.locality}
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
                value={compProfileState.city}
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
                value={compProfileState.district}
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
                value={compProfileState.state}
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
                value={compProfileState.country}
                onChange={handleChange}
                required
                maxLength="50"
              />
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
                value={compProfileState.pincode}
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
//   const [fullname, setFullname] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [roleType, setRoletype] = useState("");

//   useEffect(() => {
//     document.title = "InternsHub | Profile";
//     const token = localStorage.usertoken;
//     //console.log(token);
//     const decoded = jwt_decode(token);
//     const id = decoded.id;
//     //console.log(decoded.id);
//     const user = {
//       id: id
//     };
//     profile(user).then(res => {
//       //console.log(res);
//       //console.log(res.data.user.fullname);
//       //console.log(res.data.user.phoneNumber);
//       //console.log(res.data.user.roleType.roleName);
//       setFullname(res.data.user.fullname);
//       setPhoneNumber(res.data.user.phoneNumber);
//       setRoletype(res.data.user.roleType.roleName);
//     });
//   }, []);

//   return (
//     <div className="container">
//       <div className="jumbotron">
//         <div className="col-sm-8">
//           <h1 className="text-center">Profile</h1>
//         </div>
//         <table className="table col-md-6 mx-auto">
//           <tbody>
//             <tr>
//               <td>Full name</td>
//               <td>{fullname}</td>
//             </tr>
//             <tr>
//               <td>Phone Number</td>
//               <td>{phoneNumber}</td>
//             </tr>
//             <tr>
//               <td>Role</td>
//               <td>{roleType}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

export default CompanyProfile;
