import React, { useState, useEffect } from "react";
import "./../../CSS/company.css";
import {
  companyDescription,
  company,
  companyTechnology
} from "../Utilities/CompanyFunctions";
import { showAlert } from "./../Utilities/Alerts";
import { Link } from "react-router-dom";
import { hostInternship } from "../Utilities/CompanyFunctions";
import { skills } from "../Utilities/CommonFunctions";
import Select from "react-select";
//import { deleteInternship } from '../Utilities/CompanyFunctions';
//import { companyInternships } from "../Utilities/CompanyFunctions";

function CompanyHome(props) {
  const [descriptionState, setDescription] = useState({
    aboutCompany: ""
  });
  const id = localStorage.companyid;
  if (localStorage.companyid !== undefined)
    localStorage.setItem("companyId", id);
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
  const [technologyState, setTechnology] = useState({
    technology: []
  });
  const [tech, setTech] = useState([]);

  useEffect(() => {
    document.title = "InternsHub | Company Home";
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
        setDescription({
          ...descriptionState,
          aboutCompany: res.data.company[0].aboutCompany
        });
        const technology = res.data.company[0].technology.map(
          te => `${te.skill_name}    `
        );
        setTech(technology);
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
  const handleChange1 = event => {
    //const {name,value}=event.target;
    setDescription({
      ...descriptionState,
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
  const handleChangeSelect1 = selectedOption => {
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
        showAlert("success", "Successfully hosted internship");
        props.history.push("/companyHome");
        window.location.reload(false);
      }
    });
  };
  const handleSubmit1 = e => {
    e.preventDefault();
    const Desc = {
      aboutCompany: descriptionState.aboutCompany
    };
    companyDescription(Desc).then(res => {
      if (res) {
        showAlert("success", "Details Recorded");
        props.history.push("/companyHome");
        window.location.reload(false);
      }
    });
  };
  const handleSubmit2 = e => {
    e.preventDefault();
    const Techno = {
      technology: technologyState.technology
    };
    companyTechnology(Techno).then(res => {
      if (res) {
        showAlert("success", "Changed successfully");
        props.history.push("/companyHome");
        window.location.reload(false);
      }
    });
  };

  return (
    <div className="container">
      {/* <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto display-4 text-center">WELCOME</div>
        <Link to="/internshipHost" className="nav-link">
          Host Internship
        </Link>
        <Link to="/companyTechnologies" className="nav-link">
          Company Technologies
        </Link>
        <Link to="/companyEnquiry" className="nav-link">
          Company Enquiry
        </Link>
        <Link to="/companyDescription" className="nav-link">
          Company Description
        </Link>
        <p>USER:{localStorage.userid}</p>
        <p>{localStorage.name}</p>
        <p>COMPANY:{localStorage.companyid}</p>
      </div> */}
      <div>
        <header id="main-header" className="py-2 bg-secondary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 text-center">
                <h1>
                  <i className="fas fa-cog" /> {localStorage.name} Dashboard
                </h1>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </header>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <button
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#hostNewInternship"
                >
                  <i className="fas fa-plus-circle"></i> Host New Internship
                </button>
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#editInfoModal"
                >
                  <i className="fas fa-pencil-alt"></i> Add/Edit Company
                  Information
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>Enquiries</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Post One</td>
                        <td>Web Development</td>
                        <td>May 10 2018</td>
                        <td>
                          <a href="details.html" className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Post Two</td>
                        <td>Tech Gadgets</td>
                        <td>May 11 2018</td>
                        <td>
                          <a href="details.html" className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>Internships</h3>
                    <h4 className="display-4">
                      <i className="fa fa-globe" /> 6
                    </h4>
                    <Link
                      to="viewInternships"
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Enquiries</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder" /> 4
                    </h4>
                    <Link
                      to="companyEnquiry"
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="modal fade" id="editInfoModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">{localStorage.name} Information</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#desc">
                  Description
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tech">
                  Technologies
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="desc" className="container tab-pane active">
                <br></br>
                <form onSubmit={handleSubmit1}>
                  <div className="modal-body">
                    <div className="jumbotron mt-2">
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
                        onChange={handleChange1}
                      ></textarea>
                    </div>

                    <div className="modal-footer">
                      <button className="btn btn-success" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div id="tech" className="container tab-pane fade">
                <br></br>
                <form onSubmit={handleSubmit2}>
                  <div className="modal-body">
                    <div className="jumbotron mt-2">
                      <div className="col-sm-8 mx-auto display-4 text-center">
                        <p>
                          <b>TECHNOLOGIES</b>
                        </p>
                      </div>
                      <center>
                        <br />
                        {tech}
                      </center>
                    </div>

                    <div className="form-group">
                      <label htmlFor="technology">
                        {" "}
                        <b>Add/Edit Technologies: </b>
                      </label>
                      <Select
                        required
                        name="technology"
                        isMulti
                        isSearchable
                        isClearable
                        onChange={handleChangeSelect1}
                        options={realoptions}
                      />
                    </div>

                    <div className="modal-footer">
                      <button className="btn btn-success" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="hostNewInternship">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">New Internship</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
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
                  <p>In months</p>
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
                  <label htmlFor="intended_participants">
                    Intended Participants:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="intended_participants"
                    maxLength="200"
                    onChange={handleChange}
                  ></textarea>
                  <small className="form-text text-muted">
                    Enter in points
                  </small>
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
                  <label htmlFor="type_of_internship">
                    Type Of Internship:{" "}
                  </label>
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
                <div className="input-field"></div>

                <div className="modal-footer">
                  <button className="btn btn-success" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyHome;
