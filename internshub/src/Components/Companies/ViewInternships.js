import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../../CSS/company.css";
//import { deleteInternship } from '../Utilities/CompanyFunctions';
import { companyInternships } from "../Utilities/CompanyFunctions";

function ViewInternships() {
  const Internship = props => (
    <tr>
      <td>{props.internship.title}</td>
      <td>{props.internship.starts_on.substring(0, 10)}</td>
      {/* <td>{props.internship._id}</td> */}
      <td>
        <Link
          className="btn btn-warning btn-sm btn-block"
          to={{
            pathname: "/editInternship",
            internship: `${props.internship._id}`
          }}
        >
          <i className="fas fa-pencil-alt pl-2 pr-2"></i>
        </Link>{" "}
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm btn-block"
          onClick={() => {
            deleteInternship(props.internship._id);
          }}
        >
          <i className="fas fa-trash pl-2 pr-2"></i>
        </button>
      </td>
    </tr>
  );

  const [internshipState, setInternshipState] = useState([]);
  //const ip = "http://192.168.1.25:3000";
  useEffect(() => {
    document.title = "InternsHub | Hosted Internships";
    companyInternships().then(res => {
      if (res) {
        console.log(res.data.data.internship);
        setInternshipState(res.data.data.internship);
      }
    });
  }, []);

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
      })
      .catch(err => {
        alert(err.response.data.message);
        console.log(err);
      });

    setInternshipState(internshipState.filter(el => el._id !== id));
  }

  function internshipList() {
    console.log(internshipState);
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
