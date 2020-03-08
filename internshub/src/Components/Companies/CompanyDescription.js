import React, { useState, useEffect } from "react";
import "./../../CSS/company.css";
import { companyDescription, company } from "../Utilities/CompanyFunctions";
import { showAlert } from "./../Utilities/Alerts";

function CompanyDescription(props) {
  const [descriptionState, setDescription] = useState({
    aboutCompany: ""
  });
  const id = localStorage.companyid;
  if (localStorage.companyid !== undefined)
    localStorage.setItem("companyId", id);

  useEffect(() => {
    company(localStorage.companyid).then(res => {
      if (res) {
        setDescription({
          ...descriptionState,
          aboutCompany: res.data.company[0].aboutCompany
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = event => {
    //const {name,value}=event.target;
    setDescription({
      ...descriptionState,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const Desc = {
      aboutCompany: descriptionState.aboutCompany
    };
    companyDescription(Desc).then(res => {
      if (res) {
        showAlert("success", "Details Recorded");
        props.history.push("/companyHome");
      }
    });
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto display-4 text-center">
            Company Description
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="aboutCompany">
            {" "}
            <b>Add/Edit Description: </b>
          </label>
          <textarea
            className="form-control"
            name="aboutCompany"
            rows="3"
            maxLength="200"
            value={descriptionState.aboutCompany}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="input-field">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto display-4 text-center">
            <p>
              <b>DESCRIPTION</b>
            </p>
          </div>
          <center>
            <br />
            {descriptionState.aboutCompany}
          </center>
        </div>
      </form>
    </div>
  );
}
export default CompanyDescription;
