import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import "./../../CSS/company.css";
//import { deleteInternship } from '../Utilities/CompanyFunctions';
import {
  companyInternships,
  editInternship,
  internship
} from "../Utilities/CompanyFunctions";
import { skills } from "../Utilities/CommonFunctions";
import Select from "react-select";
import { showAlert } from "../Utilities/Alerts";

function ViewInternships(props) {
  const Internship = props => (
    <tr>
      <td>{props.internship.title}</td>
      <td>{props.internship.starts_on.substring(0, 10)}</td>
      {/* <td>{props.internship._id}</td> */}
      <td>
        <button
          className="btn btn-warning btn-sm btn-block"
          data-toggle="modal"
          data-target="#editInternship"
          onClick={() => {
            internship(props.internship._id).then(res => {
              //console.log(props.internship._id);
              localStorage.setItem("internshipId", props.internship._id);
              if (res) {
                // console.log(res.data.data.internship.requiredSkills[0]._id);
                document.title = `InternsHub | Edit ${res.data.data.internship.title}`;
                setInternshipHostState({
                  ...internshipHostState,
                  title: res.data.data.internship.title,
                  description: res.data.data.internship.description,
                  stipend: res.data.data.internship.stipend,
                  type_of_internship:
                    res.data.data.internship.type_of_internship,
                  categories: res.data.data.internship.categories,
                  intended_participants:
                    res.data.data.internship.intended_participants,
                  starts_on: res.data.data.internship.starts_on.substring(
                    0,
                    10
                  ),
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

  // const id = props.location.internship;
  // if (props.location.internship !== undefined)
  //   localStorage.setItem("internshipId", id);

  const [internshipState, setInternshipState] = useState([]);
  //const ip = "http://192.168.1.25:3000";
  useEffect(() => {
    document.title = "InternsHub | Hosted Internships";
    companyInternships().then(res => {
      if (res) {
        //console.log(res.data.data.internship);
        setInternshipState(res.data.data.internship);
      }
    });
    // eslint-disable-next-line
  }, []);
  const realoptions = options.map(option => ({
    value: option.skillid,
    label: option.skill
  }));
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
        console.log(response.data);
        props.history.push("/viewInternships");
        window.location.reload(false);
      })
      .catch(err => {
        alert(err.response.data.message);
        console.log(err);
      });

    setInternshipState(internshipState.filter(el => el._id !== id));
  }

  function internshipList() {
    //console.log(internshipState);
    return internshipState.map(currentInternship => {
      return (
        <Internship
          internship={currentInternship}
          deleteInternship={deleteInternship}
          key={currentInternship._id}
        />
      );
    });
  }
  return (
    <div className="container">
      <header id="main-header" className="py-2 bg-secondary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center">
              <h1>
                <i className="fas fa-book" /> Hosted Internships
              </h1>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </header>
      <br></br>
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
        <p>COMPANY:{localStorage.companyid}</p>
      </div> */}
      <div id="delInternship" className="modal fade">
        <div className="modal-dialog modal-confirm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box">
                <i class="fa fa-times" aria-hidden="true"></i>
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
                Do you really want to delete the Internship? This process cannot
                be undone.
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
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Edit {internshipHostState.title}</h5>
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
                  <p>In months</p>
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
                  <label htmlFor="intended_participants">
                    Intended Participants:{" "}
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={internshipHostState.intended_participants}
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
                  <label htmlFor="type_of_internship">
                    Type Of Internship:{" "}
                  </label>
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
                    checked={internshipHostState.type_of_internship === "free"}
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
      <div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Starts On</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{internshipList()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewInternships;
