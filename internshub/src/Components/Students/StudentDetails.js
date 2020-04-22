import React, { useState, useEffect } from "react";
//import { showAlert } from "./../Utilities/Alerts";
//import { Link } from "react-router-dom";
import { skills } from "../Utilities/CommonFunctions";
import { load } from "../Utilities/Utils";
import {
  student,
  SkillsUpdate,
  uploadResume,
} from "../Utilities/StudentFunctions";
import Select from "react-select";
import { showAlert } from "../Utilities/Alerts";
let final;
let src;

function StudentDetails(props) {
  const [studentProfile, setStudentProfile] = useState({
    skills: [],
  });
  const [loading, setLoading] = useState("false");
  const [resume, setResume] = useState("Not Uploaded Resume");
  const [options, setOptions] = useState([]);
  const [select, setSelect] = useState([]);
  const [resumeDisplay, setResumeDisplay] = useState("");
  useEffect(() => {
    document.title = "InternsHub | Profile";
    skills().then((res) => {
      if (res) {
        //console.log(res.data.skillTypeMaster);
        const options = res.data.doc.map((skill) => ({
          skill: skill.skill_name,
          skillid: skill._id,
        }));
        setOptions(options);
        //console.log(options);

        student().then((res) => {
          if (res) {
            //console.log(res.data.student[0].skills);
            const selected = res.data.student[0].skills.map((el) => {
              return { value: el.id, label: el.skill_name };
            });
            //console.log(res.data.student[0].resume);
            if (res.data.student[0].resume !== undefined) {
              setResumeDisplay(res.data.student[0].resume);
              setResume("Resume Uploaded Successfully");
            }
            // if (selected.length === 0) selected = [];
            setStudentProfile({
              skills: selected,
            });
            setSelect(selected);
            //console.log(selected);
            final = selected;
            if (res.data !== undefined) setLoading("true");
          }
        });
      }
    });
  }, []);
  const realoptions = options.map((option) => ({
    value: option.skillid,
    label: option.skill,
  }));
  const handleChangeSelect = (selectedOption) => {
    setSelect(selectedOption);
    //console.log(select);
    if (selectedOption === null) return "";
    //if (select === null) setSelect("");
    const selected = selectedOption.map((option) => option.value);
    setStudentProfile({
      ...studentProfile,
      skills: selected,
    });
  };
  let file;
  const handleFile = (event) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    SkillsUpdate(studentProfile.skills).then((res) => {
      showAlert("success", "Skills recorded successfully");
      props.history.push("/studentProfile");
    });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    //console.log(file);
    const size = file.size;
    const form = new FormData();
    form.append("resume", file);
    //console.log(size);
    uploadResume(form, size).then((res) => {
      if (res) {
        showAlert("success", "Resume Uploaded successfully");
        props.history.push("/studentProfile");
        window.location.reload(false);
      }
    });
  };
  //console.log(`${localStorage.ip}Resume/${resumeDisplay}`);
  if (resumeDisplay !== "") {
    src = `${localStorage.ip}Resume/${resumeDisplay}`;
  }

  return (
    <div className="container pt-4">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <h2 className="text-center display-4 bg-secondary text-white py-2 rounded">
            <i className="fas fa-pencil-alt" />
            Skills and Resume
          </h2>
          {/* <header className="bg-secondary text-white" id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1>Skills and Resume</h1>
              <p>
                Please Upload your Resume and Fill in your Skills for Applying
                to Internships{" "}
              </p>
            </div>
          </div>
        </div>
      </header> */}
          <div className="row mt-4">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="col-sm-8 mx-auto display-4 text-center"></div>

                <div className="form-group">
                  <label htmlFor="skill">
                    <p className="blockquote">Add/Edit Skills: </p>
                  </label>
                  {final !== [] ? selectLink : {}}
                </div>
                <button className="btn btn-success btn-block" type="submit">
                  Submit
                </button>
              </form>
              <form onSubmit={handleSubmit1}>
                <div className="form-group mt-5">
                  <label htmlFor="resume">
                    <p className="blockquote">Add/Edit Resume: </p>
                  </label>{" "}
                  <div className="inline-block">
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      onChange={handleFile}
                      accept="application/pdf"
                    />
                    <small className="form-text text-muted" id="fileHelp">
                      Max 1Mb size
                    </small>
                  </div>
                </div>

                <button className="btn btn-success btn-block" type="submit">
                  Submit
                </button>
                <br></br>
              </form>
            </div>
            <div className="col-md-6 ml-0">
              <p className="blockquote">Status: {resume}</p>
              {resume !== "Resume Uploaded Successfully" ? (
                <div>
                  <h3 className="pt-2">
                    There is Currently No Resume to be Displayed.
                  </h3>{" "}
                  <h4 className="pt-2">Please upload your resume!</h4>
                </div>
              ) : (
                <iframe
                  className="small-resume"
                  src={src}
                  title="student"
                  width="100%"
                  height="400px"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
