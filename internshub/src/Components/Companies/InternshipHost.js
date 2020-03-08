import React, { useState, useEffect } from "react";
import { hostInternship } from "../Utilities/CompanyFunctions";
import { skills } from "../Utilities/CommonFunctions";
import Select from "react-select";
import "./../../CSS/company.css";

function InternshipHost(props) {
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
  //   const validate = () => {
  //     if (InternshipHostState === ' ')
  //       setInternshipHostState('Please fill the information');
  //   };

  // const options = [
  //   { value: 'html', label: 'Html' },
  //   { value: 'css', label: 'CSS' },
  //   { value: 'Javascript', label: 'Javascript' },
  //   { value: 'React', label: 'React' },
  //   { value: 'c++', label: 'C++' }
  // ];

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

    hostInternship(Internship).then(res => {
      if (res) {
        alert("Successfully hosted internship");
        props.history.push("/companyHome");
      }
    });
  };

  //console.log(internshipHostState.requiredSkills);

  return (
    <div className="container mt-3">
      <h2 className="primary">Enter the details to host a Internship</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className="form-control"
            name="title"
            //onBlur={validate}
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
            onChange={handleChangeSelect}
            options={realoptions}
          />
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
            value="fulltime"
            onChange={handleChange}
          />
          Fulltime
          <input
            type="radio"
            name="categories"
            value="parttime"
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
            value="paid"
            onChange={handleChange}
          />
          Paid
          <input
            type="radio"
            name="type_of_internship"
            value="free"
            onChange={handleChange}
          />
          Free
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

export default InternshipHost;
