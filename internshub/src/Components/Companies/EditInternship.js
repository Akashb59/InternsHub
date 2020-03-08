import React, { useState, useEffect } from "react";
import { editInternship, internship } from "../Utilities/CompanyFunctions";
import { skills } from "../Utilities/CommonFunctions";
import Select from "react-select";
import "./../../CSS/company.css";

function EditInternship(props) {
  const [internshipHostState, setInternshipHostState] = useState({
    title: "",
    description: "",
    duration: "",
    starts_on: "",
    intended_participants: "",
    requiredSkills: [],
    categories: "",
    type_of_internship: "",
    stipend: ""
  });
  //const [id, setId] = useState("");

  const [options, setOptions] = useState([]);

  const id = props.location.internship;
  if (props.location.internship !== undefined)
    localStorage.setItem("internshipId", id);
  useEffect(() => {
    internship(localStorage.internshipId).then(res => {
      if (res) {
        // console.log(res.data.data.internship.requiredSkills[0]._id);

        setInternshipHostState({
          ...internshipHostState,
          title: res.data.data.internship.title,
          description: res.data.data.internship.description,
          stipend: res.data.data.internship.stipend,
          type_of_internship: res.data.data.internship.type_of_internship,
          categories: res.data.data.internship.categories,
          intended_participants: res.data.data.internship.intended_participants,
          starts_on: res.data.data.internship.starts_on.substring(0, 10),
          duration: res.data.data.internship.duration
          // requiredSkills: res.data.data.internship.requiredSkills[0]._id
        });
        //setInternshipHostState(res.data);
      }
    });
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
    // eslint-disable-next-line
  }, []);
  const realoptions = options.map(option => ({
    value: option.skillid,
    label: option.skill
  }));
  //console.log(realoptions);
  //const [setHandleSkills] = useState('');
  const handleChange = event => {
    //const {name,value}=event.target;
    setInternshipHostState({
      ...internshipHostState,
      [event.target.name]: event.target.value
    });
  };
  const handleChangeSelect = selectedOption => {
    //   console.log(`Option selected:`, selectedOption);
    if (selectedOption === null) return "";
    const selected = selectedOption.map(option => option.value);
    // if (selected.length === 0) selected = [];
    // console.log(selected);
    setInternshipHostState({
      ...internshipHostState,
      requiredSkills: selected
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const Internship = {
      title: internshipHostState.title,
      description: internshipHostState.description,
      duration: internshipHostState.duration,
      starts_on: internshipHostState.starts_on,
      intended_participants: internshipHostState.intended_participants,
      requiredSkills: internshipHostState.requiredSkills,
      categories: internshipHostState.categories,
      type_of_internship: internshipHostState.type_of_internship,
      company: localStorage.companyid,
      stipend: internshipHostState.stipend
    };

    editInternship(Internship).then(res => {
      if (res) {
        alert("Successfully edited internship");
        props.history.push("/companyHome");
      }
    });
  };

  //console.log(internshipHostState.requiredSkills);
  //console.log(id);
  return (
    <div className="container mt-3">
      <h2 className="primary">Edit Internship</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className="form-control"
            name="title"
            //onBlur={validate}
            value={internshipHostState.title}
            onChange={handleChange}
            required
            maxLength="50"
            minLength="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={internshipHostState.description}
            maxLength="200"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration: </label>
          <input
            type="number"
            className="form-control"
            name="duration"
            value={internshipHostState.duration}
            //onBlur={validate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="starts_on">Starts On: </label>
          <input
            type="date"
            className="form-control"
            name="starts_on"
            value={internshipHostState.starts_on}
            //onBlur={validate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="intended_participants">Intended Participants: </label>
          <textarea
            className="form-control"
            rows="3"
            value={internshipHostState.intended_participants}
            name="intended_participants"
            maxLength="200"
            onChange={handleChange}
          ></textarea>
          <small className="form-text text-muted">Enter in points</small>
        </div>

        <div className="form-group">
          <label htmlFor="requiredSkills">Required Skills: </label>

          <Select
            required
            name="requiredSkills"
            isMulti
            isSearchable
            isClearable
            //value={internshipHostState.requiredSkills}
            onChange={handleChangeSelect}
            options={realoptions}
          />
          <p>Select the required skills again</p>
          {/* {options.map(function(requiredskill) {
              return (
                <option key={requiredskill} value={requiredskill}>
                  {requiredskill}
                </option>
              );
            })} */}
        </div>

        <div className="form-group">
          <label htmlFor="categories">Categories: </label>
          <br />
          <input
            type="radio"
            name="categories"
            checked={internshipHostState.categories === "fulltime"}
            value="fulltime"
            onChange={handleChange}
          />
          Fulltime
          <input
            type="radio"
            name="categories"
            value="parttime"
            checked={internshipHostState.categories === "parttime"}
            onChange={handleChange}
          />
          Parttime
        </div>

        <div className="form-group">
          <label htmlFor="type_of_internship">Type Of Internship: </label>
          <br />
          <input
            type="radio"
            name="type_of_internship"
            checked={internshipHostState.type_of_internship === "paid"}
            value="paid"
            onChange={handleChange}
          />
          Paid
          <input
            type="radio"
            name="type_of_internship"
            checked={internshipHostState.type_of_internship === "unpaid"}
            value="unpaid"
            onChange={handleChange}
          />
          Unpaid
        </div>
        <div className="form-group">
          <label htmlFor="stipend">Stipend: </label>
          <input
            type="number"
            className="form-control"
            name="stipend"
            //onBlur={validate}
            onChange={handleChange}
            value={internshipHostState.stipend}
            required
          />
          Enter 0 if there is no stipend
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

export default EditInternship;
