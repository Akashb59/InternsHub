import React, { useEffect, useState } from "react";
import "./../../CSS/company.css";
import { skills } from "../Utilities/CommonFunctions";
import { companyTechnology, company } from "../Utilities/CompanyFunctions";
import Select from "react-select";

function CompanyTechnologies(props) {
  const [technologyState, setTechnology] = useState({
    technology: []
  });
  const [tech, setTech] = useState([]);
  const handleChangeSelect = selectedOption => {
    //   console.log(`Option selected:`, selectedOption);
    if (selectedOption === null) return "";
    const selected = selectedOption.map(option => option.value);
    // if (selected.length === 0) selected = [];
    // console.log(selected);
    setTechnology({
      ...technologyState,
      technology: selected
    });
  };
  const [options, setOptions] = useState([]);
  useEffect(() => {
    skills().then(res => {
      if (res) {
        //console.log(res.data.skillTypeMaster);
        const options = res.data.skillTypeMaster.map(skill => ({
          skill: skill.skill_name,
          skillid: skill._id
        }));
        setOptions(options);
        //console.log(options);
      }
    });
    const id = localStorage.companyid;
    if (localStorage.companyid !== undefined)
      localStorage.setItem("companyId", id);
    company(localStorage.companyid).then(res => {
      if (res) {
        console.log(res.data.company[0].technology);
        const technology = res.data.company[0].technology.map(
          te => `${te.skill_name}    `
        );
        setTech(technology);
        //console.log(technology)
      }
    });
  }, []);
  const realoptions = options.map(option => ({
    value: option.skillid,
    label: option.skill
  }));

  const handleSubmit = e => {
    e.preventDefault();
    const Techno = {
      technology: technologyState.technology
    };
    companyTechnology(Techno).then(res => {
      if (res) {
        alert("Successfully added changes");
        props.history.push("/companyHome");
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto display-4 text-center">
          Company Technologies
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="technology">Select Technology: </label>

          <Select
            required
            name="technology"
            isMulti
            isSearchable
            isClearable
            onChange={handleChangeSelect}
            options={realoptions}
          />
        </div>
        <div className="input-field">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>

        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto display-4 text-center">
            <p>
              <b>Technologies</b>
            </p>
          </div>
          <center>
            <br />
            {tech}
          </center>
        </div>
      </form>
    </div>
  );
}
export default CompanyTechnologies;
