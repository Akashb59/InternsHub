import React, { useState, useEffect } from "react";
import { selectedIntern, sendEnquiry } from "../Utilities/StudentFunctions";
import "./../../CSS/student.css";
import { showAlert } from "../Utilities/Alerts";

function StudentInternSelect(props) {
  const [internship, setInternship] = useState({
    startsOn: "",
    postedOn: "",
    type: "",
    address: [],
    city: "",
    stipend: "",
    name: "",
    phone: "",
    technology: [],
    aboutCompany: "",
    website: "",
    requiredSkills: [],
    title: "",
    description: [],
    category: "",
    duration: "",
    intendedParticipants: [],
    id: "",
    companyId: ""
  });
  const [info, setInfo] = useState("");
  const id = props.location.id;
  if (props.location.id !== undefined) localStorage.setItem("internId", id);
  useEffect(() => {
    selectedIntern(localStorage.internId).then(res => {
      if (res) {
        document.title = `InternsHub | ${res.data.title}`;
        //console.log(res.data.internship);
        const ab = res.data;
        setInternship({
          ...internship,
          startsOn: ab.starts_on.substring(0, 10),
          postedOn: ab.posted_on.substring(0, 10),
          type: ab.type_of_internship,
          stipend: ab.stipend,
          name: ab.company.user.fullname,
          phone: ab.company.user.phoneNumber,
          technology: ab.company.technology.map(te => ({
            id: te._id,
            name: te.skill_name
          })),
          companyId: ab.company.id,
          aboutCompany: ab.company.aboutCompany,
          website: ab.company.website,
          requiredSkills: ab.requiredSkills.map(rs => ({
            id: rs.id,
            skillName: rs.skill_name
          })),
          title: ab.title,
          description: ab.description,
          category: ab.categories,
          duration: ab.duration,
          intendedParticipants: ab.intended_participants,
          address: ab.company.address.map(id => ({
            id: id.id,
            locality: id.locality,
            city: id.city,
            state: id.state,
            country: id.country,
            pincode: id.pincode
          })),
          id: ab.id
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = event => {
    //const {name,value}=event.target;
    setInfo(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const information = {
      info: info,
      company: internship.companyId,
      student: localStorage.studentid,
      user: localStorage.userid,
      internship: localStorage.internId
    };
    sendEnquiry(information).then(res => {
      if (res) {
        showAlert(
          "success",
          `Successfully enquired for Internship ${internship.title}`
        );
        props.history.push("/studentHome");
        window.location.reload(false);
      }
    });
  };

  //console.log(internship);
  return (
    <div className="container-fluid">
      <div className="col-sm-8 mx-auto display-4 text-center">
        {internship.title}
        <br></br>
        {internship.name}
      </div>
      <div className="jumbotron mt-5">
        <br></br>
        <div>
          <p>
            <b>About Company: </b>
            {internship.aboutCompany}
          </p>
          {internship.address.map(function(add) {
            return (
              <div key={add.id}>
                <b> Address: </b>
                <br />
                {add.locality}
                <br /> {add.city} {add.state} <br />
                {add.country} {add.pincode}
              </div>
            );
          })}
          <br></br>
          <p>
            {" "}
            <b> Category: </b>
            {internship.category}
          </p>

          <b>Description: </b>
          {internship.description.map((data, index) => {
            return (
              <div key={index}>
                {index + 1}: {data}
                <br />
              </div>
            );
          })}
          <br></br>
          <b>Intended Participants: </b>
          {internship.intendedParticipants.map((data, index) => {
            return (
              <div key={index}>
                {index + 1}: {data}
                <br />
              </div>
            );
          })}
          <br></br>
          <p>
            {" "}
            <b>Duration: </b>
            {internship.duration} In Months
          </p>
          <p>
            {" "}
            <b>Phone Number: </b>
            {internship.phone}
          </p>
          {/* <p>
            {" "}
            <b>About Company: </b>
            {internship.id}
          </p> */}

          <p>
            {" "}
            <b>Posted On </b>
            {internship.postedOn}
          </p>
          <b>Skills Required: </b>

          {internship.requiredSkills.map((rs, index) => {
            return (
              <div key={index}>
                {index + 1}: {rs.skillName}
                <br />
              </div>
            );
          })}
          <br></br>
          <p>
            {" "}
            <b>Starts On: </b>
            {internship.startsOn}
          </p>
          <p>
            {" "}
            <b>Stipend: Rs. </b>
            {internship.stipend}/-
          </p>
          <b>Comapany Technologies: </b>
          {internship.technology.map((tech, index) => {
            return (
              <div key={index}>
                {index + 1}: {tech.name}
              </div>
            );
          })}
          <br></br>
          <p>
            {" "}
            <b>Type: </b>
            {internship.type}
          </p>

          <p>
            {" "}
            <b>Company Website: </b>
            {internship.website}
          </p>
        </div>
        <button
          className="btn btn-success btn-block"
          data-toggle="modal"
          data-target="#reqInternship"
        >
          <i className="fas fa-arrow-circle-right"></i> Apply Now
        </button>
      </div>
      <div className="modal fade" id="reqInternship">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Request for {internship.title}</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="info">Message: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="info"
                    //onBlur={validate}
                    onChange={handleChange}
                    required
                    maxLength="40"
                    minLength="10"
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
  );
}
export default StudentInternSelect;
