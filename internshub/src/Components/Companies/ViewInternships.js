import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import { deleteInternship } from '../Utilities/CompanyFunctions';
import {
  companyInternships,
  editInternship,
  internship
} from "../Utilities/CompanyFunctions";
import { skills } from "../Utilities/CommonFunctions";
import { load } from "./../Utilities/Utils";
import Select from "react-select";
import { showAlert } from "../Utilities/Alerts";
let final;

function ViewInternships(props) {
  const Internship = props => (
    <tr>
      <td>{props.internship.title}</td>
      <td className="small-table">
        {props.internship.starts_on.substring(0, 10)}
      </td>
      {/* <td>{props.internship._id}</td> */}
      <td>
        <button
          className="btn btn-info btn-sm btn-block"
          data-toggle="modal"
          data-target="#editInternship"
          onClick={() => {
            internship(props.internship._id).then(res => {
              //console.log(props.internship._id);
              localStorage.setItem("internshipId", props.internship._id);
              if (res) {
                // console.log(res.data.data.internship.requiredSkills[0]._id);
                document.title = `InternsHub | Edit ${res.data.data.title}`;
                //console.log(res.data);
                const selected = res.data.data.requiredSkills.map(el => {
                  return { value: el.id, label: el.skill_name };
                });
                // if (selected.length === 0) selected = [];
                setSelect(selected);
                //console.log(selected);
                final = selected;
                //console.log(select);
                setInternshipHostState({
                  ...internshipHostState,
                  title: res.data.data.title,
                  location: res.data.data.location,
                  description: res.data.data.description,
                  stipend: res.data.data.stipend,
                  type_of_internship: res.data.data.type_of_internship,
                  categories: res.data.data.categories,
                  intended_participants: res.data.data.intended_participants,
                  starts_on: res.data.data.starts_on.substring(0, 10),
                  duration: res.data.data.duration
                  // requiredSkills: res.data.data.internship.requiredSkills[0]._id
                });
                setInfo({
                  ...info,
                  desc: res.data.data.description
                });
                setInfo1({
                  ...info1,
                  intd: res.data.data.intended_participants
                });
              }
            });
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
          }}
        >
          <i className="fas fa-pencil-alt pl-2 pr-2"></i>
        </button>
        {/* <Link
          className="btn btn-warning btn-sm btn-block"
          to={{
            pathname: "/editInternship",
            internship: `${props.internship._id}`
          }}
        >
          <i className="fas fa-pencil-alt pl-2 pr-2"></i>
        </Link>{" "} */}
      </td>
      <td>
        <button
          onClick={() => {
            localStorage.setItem("internshipId", props.internship._id);
          }}
          className="btn btn-danger btn-sm btn-block"
          data-toggle="modal"
          data-target="#delInternship"
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
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
  const [validState, setValidState] = useState({
    errors: {
      title: "",
      description: "",
      intended_participants: "",
      location: "",
      descriptions: ""
    }
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState("false");
  const [select, setSelect] = useState([]);
  const [info, setInfo] = useState({
    desc: [],
    count: 0
  });
  const [info1, setInfo1] = useState({
    intd: [],
    count1: 0
  });
  // const id = props.location.internship;
  // if (props.location.internship !== undefined)
  //   localStorage.setItem("internshipId", id);

  const [internshipState, setInternshipState] = useState([]);
  //const ip = "http://192.168.1.25:3000";
  useEffect(() => {
    document.title = "InternsHub | Hosted Internships";
    companyInternships().then(res => {
      if (res) {
        //console.log(res.data.data.internship[0].requiredSkills);
        setInternshipState(res.data.data.internship);
        if (res.data !== undefined) setLoading("true");
      }
    });
  }, []);
  const realoptions = options.map(option => ({
    value: option.skillid,
    label: option.skill
  }));
  //const [setHandleSkills] = useState('');
  const handleChange = event => {
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
  const { errors } = validState;
  const handleChangeSelect = selectedOption => {
    //console.log(`Option selected:`, selectedOption);
    setSelect(selectedOption);
    //console.log(select);
    if (selectedOption === null) return "";
    //if (select === null) setSelect("");
    const selected = selectedOption.map(option => option.value);
    setInternshipHostState({
      ...internshipHostState,
      requiredSkills: selected
    });
    //console.log(select);
  };
  //console.log(select);
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
      showAlert("primary", "Info! Cannot remove any more fields.");
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
      showAlert("primary", "Info! Cannot remove any more fields.");
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

    editInternship(Internship).then(res => {
      if (res) {
        showAlert("success", "Successfully edited internship");
        props.history.push("/viewInternships");
        window.location.reload(false);
      }
    });
  };

  function deleteInternship(id) {
    axios({
      method: "delete",
      url: `${localStorage.ip}/api/v1/internships/deleteHostedInternship/` + id,
      //withCredentials: true,
      headers: {
        jwt: localStorage.usertoken
      }
      // headers: {
      //   Cookie: `jwt=${localStorage.usertoken}`
      // }
    })
      .then(response => {
        //console.log(response.data);
        props.history.push("/viewInternships");
        window.location.reload(false);
      })
      .catch(err => {
        alert(err.response.data.message);
        console.log(err);
      });

    setInternshipState(internshipState.filter(el => el._id !== id));
  }

  function internshipListActive() {
    let count = 0;
    let c = 0;
    if (internshipState.length === 0) {
      return <None key="key" />;
    }
    // eslint-disable-next-line
    return internshipState.map(currentInternship => {
      const active = currentInternship.ends_on;

      if (active >= Date.now()) {
        c += 1;
        return (
          <Internship
            internship={currentInternship}
            deleteInternship={deleteInternship}
            key={currentInternship._id}
          />
        );
      } else {
        count += 1;
        if (c === 0 && internshipState.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }
  const None = key => (
    <tr key={key}>
      <td colSpan="7">
        <center>
          <h2>No Data Yet</h2>
        </center>
      </td>
    </tr>
  );
  function internshipListPast() {
    let count = 0;
    let c = 0;
    if (internshipState.length === 0) {
      return <None key="key" />;
    }
    // eslint-disable-next-line
    return internshipState.map(currentInternship => {
      const inactive = currentInternship.ends_on;
      //console.log(inactive);
      if (inactive < Date.now()) {
        c += 1;
        return (
          <Internship
            internship={currentInternship}
            deleteInternship={deleteInternship}
            key={currentInternship._id}
          />
        );
      } else {
        count += 1;
        if (c === 0 && internshipState.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }
  return (
    <div className="container pt-4">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <h2 className="text-center display-4 bg-secondary rounded text-white py-2 mb-2 small-header">
            <i className="fas fa-book" /> Hosted Internships
          </h2>
          <div id="delInternship" className="modal fade">
            <div className="modal-dialog modal-confirm modal-dialog-centered">
              <div className="modal-content modal-responsive">
                <div className="modal-header">
                  <div className="icon-box">
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </div>
                  <h4 className="modal-title">Are you sure?</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Do you really want to delete the Internship? This process
                    cannot be undone.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-info"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteInternship(localStorage.internshipId);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="editInternship">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-info  text-white">
                  <h5 className="modal-title">
                    Edit {internshipHostState.title}
                  </h5>
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
                            <i className="fas fa-clipboard"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          disabled
                          //onBlur={validate}
                          value={internshipHostState.title}
                          onChange={handleChange}
                          required
                          maxLength="50"
                          minLength="5"
                          placeholder="Enter Title"
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
                          disabled
                          //onBlur={validate}
                          value={internshipHostState.location}
                          onChange={handleChange}
                          required
                          maxLength="50"
                          minLength="5"
                          placeholder="Enter Location"
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
                          disabled
                          //onBlur={validate}
                          value={internshipHostState.duration}
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
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <input
                          type="date"
                          className="form-control"
                          name="starts_on"
                          min={new Date(Date.now())
                            .toISOString()
                            .substring(0, 10)}
                          value={internshipHostState.starts_on}
                          disabled
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="requiredSkills">Required Skills: </label>

                      {final !== [] ? selectLink : <p>Loading</p>}
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
                        <table className="table bg-white table-borderless">
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
                                    checked={
                                      internshipHostState.categories ===
                                      "Fulltime"
                                    }
                                    value="Fulltime"
                                    disabled
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
                                    checked={
                                      internshipHostState.categories ===
                                      "Parttime"
                                    }
                                    value="Parttime"
                                    disabled
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
                                    checked={
                                      internshipHostState.type_of_internship ===
                                      "Paid"
                                    }
                                    value="Paid"
                                    disabled
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
                                    checked={
                                      internshipHostState.type_of_internship ===
                                      "Free"
                                    }
                                    value="Free"
                                    disabled
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
                          placeholder="Enter Stipend"
                          onChange={handleChange}
                          value={internshipHostState.stipend}
                          required
                          disabled
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
                          <div className="form-group" key={index}>
                            <label htmlFor={index}>{alphas[index]}:</label>
                            {` `}
                            <input
                              id={index}
                              type="text"
                              value={desc}
                              maxLength="200"
                              minLength="20"
                              required
                              onChange={e => addSubInfoValue(e, index)}
                            />
                            {errors.description.length > 0 && (
                              <small style={{ color: "red" }}>
                                <span className="error">
                                  {errors.description}
                                </span>
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
                          <div className="form-group" key={index}>
                            <label htmlFor={index}>{alphas[index]}:</label>
                            {` `}
                            <input
                              id={index}
                              type="text"
                              value={intd}
                              maxLength="200"
                              minLength="20"
                              required
                              onChange={e => addSubIntendedValue(e, index)}
                            />
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
                      <button
                        className="btn btn-success btn-block"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <h2>Active Internships</h2>
          <table className="table table-striped table-hover bg-white">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th className="small-table">Starts On</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{internshipListActive()}</tbody>
          </table>
          <h2>Past Internships</h2>
          <table className="table table-striped table-hover bg-white">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th className="small-table">Starts On</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{internshipListPast()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewInternships;
