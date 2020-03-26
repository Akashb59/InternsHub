import React, { useState, useEffect } from "react";
import { createSkill, skills } from "./../Utilities/CommonFunctions";

import "../../CSS/App.css";
import { showAlert } from "../Utilities/Alerts";

function Admin(props) {
  const [skill, setSkill] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    document.title = "InternsHub | Company Home";
    skills().then(res => {
      if (res) {
        //console.log(res.data.skillTypeMaster);
        const options = res.data.doc.map(skill => ({
          skill: skill.skill_name,
          skillid: skill._id
        }));
        setOptions(options);
        //console.log(options);
      }
    });
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    setSkill(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const skillName = skill;
    createSkill(skillName).then(res => {
      if (res) {
        //console.log(res.data);
        showAlert("success", "Successfully created a skill");
        props.history.push("/adminHome");
        window.location.reload(false);
      }
    });
  };

  return (
    <div className="container">
      <header id="main-header" className="py-0 bg-info text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center">
              <h1>
                <i className="fas fa-cog" /> Admin Home
              </h1>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </header>
      <h2>Skills</h2>
      {options.map(el => {
        return (
          <div key={el.skillid}>
            {el.skill}
            <br />
          </div>
        );
      })}
      <br></br>
      <h2>Enter New Skill</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="skill">Enter Skill Name:</label>
          <input
            type="text"
            name="skill"
            className="form-control "
            placeholder="Enter Skill"
            value={skill}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
