import React, { useState, useEffect } from "react";

import { company, editDetailsForm } from "../Utilities/CompanyFunctions";
import { editAddressForm, editUserInfo } from "../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";
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
          establishedYear: profile.establishedYear,
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

  const [compProfileState, setCompProfileState] = useState({
    fullname: "",
    phoneNumber: "",
    gst_no: "",
    website: "",
    establishedYear: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    address: ""
  });
  const handleChange = event => {
    setCompProfileState({
      ...compProfileState,
      [event.target.name]: event.target.value
    });
  };

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
        <div className="input-field">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            name="fullname"
            className="form-control"
            id="fullname"
            placeholder="Full name"
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
        <div className="input-field">
          <label htmlFor="gst_no">GST-NUMBER:</label>
          <input
            type="text"
            name="gst_no"
            className="form-control"
            id="gst_no"
            placeholder="gst-number"
            disabled
            value={compProfileState.gst_no}
            onChange={handleChange}
            //onBlur={validateGst}
            required
            maxLength="16"
          />
        </div>
        {/* <div id="div1">{handleGst}</div> */}

        <div className="input-field">
          <label htmlFor="website">WEBSITE:</label>
          <input
            type="text"
            name="website"
            className="form-control"
            id="website"
            placeholder="website"
            value={compProfileState.website}
            onChange={handleChange}
            required
            maxLength="30"
          />
        </div>

        <div className="input-field">
          <label htmlFor="eyear">Established Year:</label>
          <input
            type="text"
            name="establishedYear"
            className="form-control"
            id="eyear"
            placeholder="establishedYear"
            value={compProfileState.establishedYear.substring(0, 10)}
            onChange={handleChange}
            // onKeyPress={keyPress}
            required
            maxLength={4}
          />
        </div>

        <p>Address</p>
        <div className="input-field">
          <label htmlFor="locality">Locality:</label>
          <input
            type="text"
            name="locality"
            className="form-control"
            id="locality"
            placeholder="locality"
            value={compProfileState.locality}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="input-field">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            className="form-control"
            id="city"
            placeholder="city"
            value={compProfileState.city}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="input-field">
          <label htmlFor="district">District:</label>
          <input
            type="text"
            name="district"
            className="form-control"
            id="district"
            placeholder="district"
            value={compProfileState.district}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="input-field">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            className="form-control"
            id="state"
            placeholder="state"
            value={compProfileState.state}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="input-field">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            className="form-control"
            id="country"
            placeholder="country"
            value={compProfileState.country}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="input-field">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            name="pincode"
            className="form-control"
            id="pincode"
            placeholder="pincode"
            value={compProfileState.pincode}
            onChange={handleChange}
            required
            maxLength="6"
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
