import React, { useState, useEffect } from "react";
import {
  companyDescription,
  company,
  companyTechnology,
  hostInternship,
  companyInternships,
  companyEnquiries
} from "../Utilities/CompanyFunctions";
import { showAlert } from "./../Utilities/Alerts";
import { Link } from "react-router-dom";
import { skills } from "../Utilities/CommonFunctions";
import Select from "react-select";
//import { deleteInternship } from '../Utilities/CompanyFunctions';
//import { companyInternships } from "../Utilities/CompanyFunctions";
import { GiDesk } from "react-icons/gi";

let final;
function CompanyHome(props) {
  const [descriptionState, setDescription] = useState({
    aboutCompany: ""
  });
  const [internshipHostState, setInternshipHostState] = useState({
    title: "",
    location: "",
    description: [],
    duration: "",
    starts_on: "",
    intended_participants: [],
    requiredSkills: [],
    categories: "",
    type_of_internship: "",
    stipend: ""
  });
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [countEnquiry, setcountEnquiry] = useState(0);
  const [technologyState, setTechnology] = useState({
    technology: []
  });

  const [select, setSelect] = useState([]);
  const [info, setInfo] = useState({
    desc: [],
    count: 0
  });
  const [info1, setInfo1] = useState({
    intd: [],
    count1: 0
  });
  const [validState, setValidState] = useState({
    errors: {
      title: "",
      description: "",
      intended_participants: "",
      descriptions: "",
      location: ""
    }
  });

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
    companyInternships().then(res => {
      if (res) {
        //console.log(res.data);
        setCount(res.data.results);
      }
    });
    companyEnquiries().then(res => {
      if (res) {
        const internEnq = res.data.data.enquiry.filter(
          data => data.internship !== null
        );
        setcountEnquiry(internEnq.length);
      }
    });
    company(localStorage.companyid).then(res => {
      if (res) {
        setDescription({
          ...descriptionState,
          aboutCompany: res.data.company[0].aboutCompany
        });

        const selected = res.data.company[0].technology.map(el => {
          return { value: el.id, label: el.skill_name };
        });
        // if (selected.length === 0) selected = [];
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
  //console.log(realoptions);
  //const [setHandleSkills] = useState('');
  const handleChange = event => {
    //event.preventDefault();
    //const {name,value}=event.target;
    const { name, value } = event.target;
    let errors = validState.errors;
    switch (name) {
      case "title":
        errors.title =
          value.length < 5 ? "Title must be 5 or more characters long!" : "";
        break;
      case "location":
        errors.location =
          value.length < 5 ? "Location must be 5 or more characters long!" : "";
        break;
      case "descriptions":
        errors.descriptions =
          value.length < 20
            ? "Description must be 20 to 200 characters long!"
            : "";
        break;
      default:
        break;
    }
    setValidState({ errors, [name]: value });
    setInternshipHostState({
      ...internshipHostState,
      [name]: value
    });
  };
  const handleChange1 = event => {
    event.preventDefault();
    const { name, value } = event.target;
    setDescription({
      ...descriptionState,
      [name]: value
    });
  };
  const { errors } = validState;
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
    //console.log(`Option selected:`, selectedOption);
    setSelect(selectedOption);
    //console.log(select);
    if (selectedOption === null) return "";
    //if (select === null) setSelect("");
    const selected = selectedOption.map(option => option.value);
    // if (selected.length === 0) selected = [];
    // console.log(selected);
    setTechnology({
      ...technologyState,
      technology: selected
    });
  };

  const alphas = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const addTextbox = () => {
    if (info.count >= 8) {
      showAlert("primary", "Info! Only 8 fields can be added.");
    }
    if (info.count < 8)
      setInfo({
        count: info.count + 1,
        desc: [...info.desc, ""]
      });
  };
  const removeTextbox = () => {
    if (info.count <= 3) {
      showAlert("primary", "Info! Minimum 3 fields will be added.");
    } else {
      info.desc.pop();
      if (info.count > 0)
        setInfo({
          desc: info.desc,
          count: info.count - 1
        });
    }
  };
  const addSubInfoValue = (e, index) => {
    info.desc[index] = e.target.value || "";
    //console.log(e.target.value);
    //console.log(info.subinfo);
    setInfo({ ...info, desc: info.desc });
    setInternshipHostState({
      ...internshipHostState,
      description: info.desc
    });
  };
  const addTextbox1 = () => {
    if (info1.count1 >= 8) {
      showAlert("primary", "Info! Only 8 fields can be added.");
    }
    if (info1.count1 < 8)
      setInfo1({
        count1: info1.count1 + 1,
        intd: [...info1.intd, ""]
      });
  };
  const removeTextbox1 = () => {
    if (info1.count1 <= 3) {
      showAlert("primary", "Info! Minimum 3 fields will be added.");
    } else {
      info1.intd.pop();
      if (info1.count1 > 0)
        setInfo1({
          intd: info1.intd,
          count1: info1.count1 - 1
        });
    }
  };
  const addSubIntendedValue = (e, index) => {
    info1.intd[index] = e.target.value || "";
    //console.log(e.target.value);
    //console.log(info.subinfo);
    setInfo1({ ...info1, intd: info1.intd });
    setInternshipHostState({
      ...internshipHostState,
      intended_participants: info1.intd
    });
  };
  const selectLink = (
    <Select
      required
      name="requiredSkills"
      isMulti
      isSearchable
      isClearable
      value={select}
      onChange={handleChangeSelect1}
      options={realoptions}
    />
  );
  const handleSubmit = e => {
    e.preventDefault();
    const Internship = {
      title: internshipHostState.title,
      location: internshipHostState.location,
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
      <h2 className="text-center bg-secondary text-white py-2">
        <i className="fas fa-cog" /> {localStorage.name} Dashboard
      </h2>
      <section id="actions" className="py-3 mb-3 bg-light">
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
                  <h5>Enquiries</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-hover table-striped">
                    <thead className="thead-dark thead-small">
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
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-primary text-white mb-3">
                <div className="card-body">
                  <h3>Internships</h3>
                  <h4 className="display-4">
                    <GiDesk /> {count}
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
                    <i className="fas fa-clipboard-check"></i> {countEnquiry}
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
                        minLength="20"
                        placeholder="Enter some description about your company"
                        value={descriptionState.aboutCompany}
                        onChange={handleChange1}
                      ></textarea>{" "}
                      {errors.descriptions.length > 0 && (
                        <small style={{ color: "red" }}>
                          <span className="error">{errors.descriptions}</span>
                        </small>
                      )}
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
                      {/* <center>
                        <br />

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
                    </div>

                    <div className="form-group">
                      <label htmlFor="technology">
                        {" "}
                        <b>Add/Edit Technologies: </b>
                      </label>
                      {final !== [] ? selectLink : {}}
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
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-code"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      //onBlur={validate}
                      placeholder="Enter Title"
                      onChange={handleChange}
                      required
                      maxLength="50"
                      minLength="5"
                    />
                  </div>
                  {errors.title.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.title}</span>
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location: </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      //onBlur={validate}
                      placeholder="Enter Location"
                      onChange={handleChange}
                      required
                      maxLength="50"
                      minLength="5"
                    />
                  </div>
                  {errors.location.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.location}</span>
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration (In months):</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-clock" aria-hidden="true"></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      //onBlur={validate}
                      placeholder="Enter Duration"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="starts_on">Starts On: </label>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                      </span>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      name="starts_on"
                      //onBlur={validate}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                <div className="row">
                  <div className="sm-col-4">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th>Categories:</th>
                          <td>
                            {" "}
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                className="custom-control-input"
                                id="defaultInline1"
                                name="categories"
                                value="Fulltime"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="defaultInline1"
                                style={{ color: "black" }}
                              >
                                Full Time
                              </label>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                name="categories"
                                className="custom-control-input"
                                id="defaultInline2"
                                value="Parttime"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="defaultInline2"
                                style={{ color: "black" }}
                              >
                                PartTime
                              </label>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <th>Type Of Internship:</th>
                          <td>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                name="type_of_internship"
                                value="Paid"
                                className="custom-control-input border"
                                id="defaultInline3"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-control-label s1"
                                htmlFor="defaultInline3"
                                style={{ color: "black" }}
                              >
                                Paid
                              </label>
                            </div>
                          </td>
                          <td>
                            <div className="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                name="type_of_internship"
                                value="Free"
                                className="custom-control-input"
                                id="defaultInline4"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-control-label s1"
                                htmlFor="defaultInline4"
                                style={{ color: "black" }}
                              >
                                Free
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="stipend">Stipend: </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-rupee-sign"></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      name="stipend"
                      //onBlur={validate}
                      placeholder="Enter Stipend"
                      onChange={handleChange}
                      value={internshipHostState.stipend}
                      required
                    />
                  </div>
                  <small>Enter 0 if no stipend</small>
                </div>

                <div className="form-group">
                  {info.count < 3 ? addTextbox() : ""}
                  <div className="form-group">
                    <label htmlFor="descbutton">Description:</label>
                    <br />
                    <Link
                      to="#"
                      id="descbutton"
                      className="btn btn-primary btn-sm p-2 px-4"
                      onClick={addTextbox}
                    >
                      <i className="fas fa-plus"></i>
                    </Link>
                    {` `}
                    <Link
                      to="#"
                      id="descbutton"
                      className="btn btn-primary btn-sm p-2 px-4 "
                      onClick={removeTextbox}
                    >
                      <i className="fas fa-minus"></i>
                    </Link>
                  </div>
                  <hr />
                  {info.desc.map((desc, index) => {
                    return (
                      <div className="form-row" key={index}>
                        <div className="pt-2 my-1">
                          <label htmlFor={index}>{alphas[index]}:</label>
                        </div>

                        <div className="col">
                          <input
                            id={index}
                            type="text"
                            value={desc}
                            maxLength="200"
                            className="form-control my-1"
                            minLength="20"
                            placeholder="Enter Description for Internship"
                            required
                            onChange={e => addSubInfoValue(e, index)}
                          />
                        </div>
                        {errors.description.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">{errors.description}</span>
                          </small>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="form-group">
                  {info1.count1 < 3 ? addTextbox1() : ""}
                  <div className="form-group">
                    <label htmlFor="intended">Intended Participants:</label>
                    <br />
                    <Link
                      to="#"
                      id="intended"
                      className="btn btn-primary btn-sm p-2 px-4"
                      onClick={addTextbox1}
                    >
                      <i className="fas fa-plus"></i>
                    </Link>
                    {` `}
                    <Link
                      to="#"
                      id="intended"
                      className="btn btn-primary btn-sm p-2 px-4 "
                      onClick={removeTextbox1}
                    >
                      <i className="fas fa-minus"></i>
                    </Link>
                  </div>
                  <hr />
                  {info1.intd.map((intd, index) => {
                    return (
                      <div className="form-row" key={index}>
                        <div className="pt-2 my-1">
                          <label htmlFor={index}>{alphas[index]}:</label>
                          {` `}
                        </div>
                        <div className="col">
                          <input
                            id={index}
                            type="text"
                            value={intd}
                            placeholder="Enter Intended Participants for Internship"
                            className="form-control my-1"
                            maxLength="200"
                            minLength="20"
                            required
                            onChange={e => addSubIntendedValue(e, index)}
                          />{" "}
                        </div>
                        {errors.intended_participants.length > 0 && (
                          <small style={{ color: "red" }}>
                            <span className="error">
                              {errors.intended_participants}
                            </span>
                          </small>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="modal-footer">
                  <button className="btn btn-success btn-block" type="submit">
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
