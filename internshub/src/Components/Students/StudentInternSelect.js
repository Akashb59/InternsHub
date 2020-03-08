import React, { useState, useEffect } from "react";
import { selectedIntern } from "../Utilities/StudentFunctions";
import "./../../CSS/student.css";

function StudentHome(props) {
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
    description: "",
    category: "",
    duration: "",
    intendedParticipants: "",
    id: ""
  });
  const id = props.location.id;
  if (props.location.id !== undefined) localStorage.setItem("internId", id);
  useEffect(() => {
    selectedIntern(localStorage.internId).then(res => {
      if (res) {
        console.log(res.data.internship);
        const ab = res.data.internship;
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

  console.log(internship);
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
                {add.locality} {add.city} {add.state} {add.country}{" "}
                {add.pincode}
              </div>
            );
          })}
          <br></br>
          <p>
            {" "}
            <b> Category: </b>
            {internship.category}
          </p>

          <p>
            {" "}
            <b>Description: </b>
            {internship.description}
          </p>
          <p>
            {" "}
            <b>Duration: </b>
            {internship.duration} Months
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
          {internship.requiredSkills.map(function(rs) {
            return (
              <div key={rs.id}>
                <div>{rs.skillName}</div>
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
          {internship.technology.map(function(tech) {
            return (
              <div key={tech.id}>
                <div>{tech.name}</div>
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
      </div>
    </div>
  );
}
export default StudentHome;
