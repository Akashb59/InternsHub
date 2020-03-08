import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../../CSS/company.css";
//import { deleteInternship } from '../Utilities/CompanyFunctions';
import { companyInternships } from "../Utilities/CompanyFunctions";

function CompanyHome() {
  const Internship = props => (
    <tr>
      <td>{props.internship.title}</td>
      <td>{props.internship.starts_on.substring(0, 10)}</td>
      {/* <td>{props.internship._id}</td> */}
      <td>
        <Link
          to={{
            pathname: "/editInternship",
            internship: `${props.internship._id}`
          }}
        >
          edit
        </Link>{" "}
        |{" "}
        <button
          className="link"
          onClick={() => {
            deleteInternship(props.internship._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );

  const [internshipState, setInternshipState] = useState([]);
  //const ip = "http://192.168.1.25:3000";
  useEffect(() => {
    companyInternships().then(res => {
      if (res) {
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
    <div className="container-fluid">
      <div className="jumbotron mt-5">
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
      </div>

      <div>
        <h3>Hosted Internships</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>title</th>
              <th>Starts On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{internshipList()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyHome;
