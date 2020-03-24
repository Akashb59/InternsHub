import React, { useState, useEffect } from "react";
import "../../CSS/student.css";
//import { showAlert } from "./../Utilities/Alerts";
//import { Link } from "react-router-dom";
import { skills } from "../Utilities/CommonFunctions";
import {
  student,
  SkillsUpdate,
  uploadResume
} from "../Utilities/StudentFunctions";
import Select from "react-select";
import { showAlert } from "../Utilities/Alerts";
let final;

function StudentDetails(props) {
  const [studentProfile, setStudentProfile] = useState({
    skills: []
  });
  const [resume, setResume] = useState("Not Uploaded Resume");
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState([]);
  useEffect(() => {
    document.title = "InternsHub | Profile";
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
    student().then(res => {
      if (res) {
        //console.log(res.data.student[0].skills);
        const selected = res.data.student[0].skills.map(el => {
          return { value: el.id, label: el.skill_name };
        });
        console.log(res.data.student[0].resume);
        if (res.data.student[0].resume !== undefined) {
          setResume("Resume Uploaded Successfully");
        }
        // if (selected.length === 0) selected = [];
        setStudentProfile({
          ...studentProfile,
          skills: selected
        });
        setSelect(selected);
        //console.log(selected);
        final = selected;
      }
    });
    // eslint-disable-next-line
  }, []);
  const realoptions = options.map(option => ({
    value: option.skillid,
    label: option.skill
  }));
  const handleChangeSelect = selectedOption => {
    setSelect(selectedOption);
    //console.log(select);
    if (selectedOption === null) return "";
    //if (select === null) setSelect("");
    const selected = selectedOption.map(option => option.value);
    setStudentProfile({
      ...studentProfile,
      skills: selected
    });
  };
  let file;
  const handleFile = event => {
    //const {name,value}=event.target;
    file = event.target.files[0];
    // console.log(file);
  };
  const selectLink = (
    <Select
      required
      name="requiredSkills"
      isMulti
      isSearchable
      isClearable
      value={select}
      onChange={handleChangeSelect}
      options={realoptions}
    />
  );
  const handleSubmit = e => {
    e.preventDefault();
    SkillsUpdate(studentProfile.skills).then(res => {
      showAlert("success", "Skills recorded successfully");
      props.history.push("/studentProfile");
    });
  };
  const handleSubmit1 = e => {
    e.preventDefault();
    //console.log(file);
    const size = file.size;
    const form = new FormData();
    form.append("resume", file);
    //console.log(size);
    uploadResume(form, size).then(res => {
      if (res) {
        showAlert("success", "Resume Uploaded successfully");
        props.history.push("/studentProfile");
      }
    });
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h3 className="text-center">
          <b>Skills and Resume</b>
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="col-sm-8 mx-auto display-4 text-center"></div>
          {/* <center>
            {select !== null
              ? select.map(el => {
                  return (
                    <div key={el.value}>
                      {el.label}
                      <br />
                    </div>
                  );
                })
              : ""}
          </center> */}
          <div className="form-group">
            <label htmlFor="skill">
              <b>Add/Edit Skills: </b>
            </label>
            {final !== [] ? selectLink : {}}
          </div>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit1}>
          <div className="col-sm-8 mx-auto display-4 text-center"></div>
          <div className="form-group">
            <label htmlFor="resume">
              <b>Add/Edit Resume: </b>
            </label>
            <br></br>
            <input
              type="file"
              name="resume"
              id="resume"
              onChange={handleFile}
              accept="application/pdf"
            />
          </div>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
          <br></br>
        </form>
        Status: {resume}
      </div>
    </div>
  );
}

export default StudentDetails;
