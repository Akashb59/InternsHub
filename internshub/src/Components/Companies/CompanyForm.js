import React, { useState, useEffect } from "react";
import { companyform, company } from "../Utilities/CompanyFunctions";
import { addressform } from "../Utilities/CommonFunctions";
import "./../../CSS/company.css";

function CompanyForm(props) {
  useEffect(() => {
    document.title = "InternsHub | Company Details";
  }, []);
  const [compformstate, setCompFormState] = useState({
    gst_no: "",
    website: "",
    establishedYear: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: ""
  });
  const [handleGst, setHandleGst] = useState("");
  const handleChange = event => {
    setCompFormState({
      ...compformstate,
      [event.target.name]: event.target.value
    });
  };

  const keyPress = event => {
    if (isNaN(String.fromCharCode(event.keyCode))) return false;
  };

  const validateGst = () => {
    const gst_no = compformstate.gst_no;
    if (gst_no === "") setHandleGst("Please enter valid GST number");
  };

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
        <div className="input-field">
          <label htmlFor="fullname">GST-NUMBER:</label>
          <input
            type="text"
            name="gst_no"
            className="form-control"
            id="gst_no"
            placeholder="gst-number"
            value={compformstate.gst_no}
            onChange={handleChange}
            onBlur={validateGst}
            required
            maxLength="16"
          />
        </div>
        <div id="div1">{handleGst}</div>

        <div className="input-field">
          <label htmlFor="website">WEBSITE:</label>
          <input
            type="text"
            name="website"
            className="form-control"
            id="website"
            placeholder="website"
            value={compformstate.website}
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
            value={compformstate.establishedYear}
            onChange={handleChange}
            onKeyPress={keyPress}
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
            value={compformstate.locality}
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
            value={compformstate.city}
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
            value={compformstate.district}
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
            value={compformstate.state}
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
            value={compformstate.country}
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
            value={compformstate.pincode}
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
export default CompanyForm;
