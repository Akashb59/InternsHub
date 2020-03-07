import React, { useState } from 'react';
import { studentform, student } from '../Utilities/StudentFunctions';

import '../../CSS/student.css';

function AcademicForm(props) {
  const [academicFormState, setAcademicFormState] = useState({
    school_name: '',
    grade_10_per: '',
    pu_college_name: '',
    grade_12_per: '',
    college_name: '',
    university_name: '',
    usn: '',
    degree_cgpa: '',
    phone_number: '',
    website: '',
    email: '',
    project1_undertaken: '',
    project2_undertaken: ''
  });

  const handleChange = event => {
    setAcademicFormState({
      ...academicFormState,
      [event.target.name]: event.target.value
    });
  };
  const validate = () => {
    if (academicFormState === ' ')
      setAcademicFormState('Please fill the information');
  };

  const keypress = event => {
    if (isNaN(String.fromCharCode(event.keyCode))) return false;
  };

  const handleSubmit = e => {
    e.preventDefault();

    //const newadd = localStorage.address_copy;

    const det = {
      father_name: localStorage.father_name,
      mother_name: localStorage.mother_name,
      dob: localStorage.dob,
      gender: localStorage.gender,
      hobbies: localStorage.hobbies,
      school_name: academicFormState.school_name,
      grade_10_per: academicFormState.grade_10_per,
      pu_college_name: academicFormState.pu_college_name,
      grade_12_per: academicFormState.grade_12_per,
      college_name: academicFormState.college_name,
      university_name: academicFormState.university_name,
      usn: academicFormState.usn,
      degree_cgpa: academicFormState.degree_cgpa,
      phone_number: academicFormState.phone_number,
      website: academicFormState.website,
      email: academicFormState.email,
      project1_undertaken: academicFormState.project1_undertaken,
      project2_undertaken: academicFormState.project2_undertaken,
      //address: res.data.data.Address._id,
      user: localStorage.userid
    };

    studentform(det).then(res => {
      if (res) {
        student().then(res => {
          if (res) {
            props.history.push(`/studentHome`);
          }
        });
      }
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="primary">ACADEMIC DETAILS</h2>

      <form onSubmit={handleSubmit}>
        <span className="text-success">
          <u>School</u>
        </span>
        <div className="form-group">
          <label htmlFor="schoolname">School Name:</label>
          <input
            type="text"
            className="form-control"
            id="schoolname"
            name="school_name"
            onBlur={validate}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="10per">10th Grade Percentage:</label>
          <input
            type="text"
            onKeyPress={keypress}
            className="form-control"
            id="10per"
            name="grade_10_per"
            required
            //onBlur="return ValidateDecimal(this) ;"
            onBlur={validate}
            onChange={handleChange}
            maxLength="100"
            minLength="0"
          />
        </div>

        <span className="text-success">
          <u>Pre-University/Diploma College</u>
        </span>

        <div className="form-group">
          <label htmlFor="collegename">
            Pre-University/Diploma College Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="collegename"
            name="pu_college_name"
            onBlur={validate}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="12per">Pre-University /Diploma Percentage:</label>
          <input
            type="text"
            onKeyPress={keypress}
            className="form-control"
            id="12per"
            name="grade_12_per"
            required
            //onBlur="return ValidateDecimal(this) ;"
            onBlur={validate}
            onChange={handleChange}
            maxLength="100"
            minLength="0"
          />
        </div>

        <span className="text-success">
          <u>Degree College</u>
        </span>

        <div className="form-group">
          <label htmlFor="dcollegename">Degree College Name:</label>
          <input
            type="text"
            className="form-control"
            id="dcollegename"
            name="college_name"
            onBlur={validate}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="universityname">University Name:</label>
          <input
            type="text"
            className="form-control"
            id="universityname"
            name="university_name"
            onBlur={validate}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="usn">USN:</label>
          <input
            type="text"
            className="form-control"
            id="usn"
            name="usn"
            onBlur={validate}
            onChange={handleChange}
            required
            maxLength="10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ugper">UG Percentage:</label>
          <input
            type="text"
            onKeyPress={keypress}
            className="form-control"
            id="ugper"
            name="degree_cgpa"
            required
            //onBlur="return ValidateDecimal(this) ;"
            onBlur={validate}
            onChange={handleChange}
            maxLength="10"
            minLength="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phonenumber"> College Phone Number:</label>
          <input
            type="text"
            className="form-control"
            id="phonenumber"
            name="phone_number"
            onBlur={validate}
            onChange={handleChange}
            maxLength="10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Website">College Website:</label>
          <input
            type="url"
            className="form-control"
            id="url"
            name="website"
            //onBlur="checkUrl()"
            onBlur={validate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Email">College Email:</label>
          <input
            type="email"
            className="form-control"
            id="Email"
            name="email"
            onBlur={validate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="p1">Project1 Undertaken:</label>
          <input
            type="text"
            className="form-control"
            id="p1"
            name="project1_undertaken"
            onBlur={validate}
            onChange={handleChange}
            required
            maxLength="30"
          />
        </div>

        <div className="form-group">
          <label htmlFor="p2">Project2 Undertaken:</label>
          <input
            type="text"
            className="form-control"
            id="p2"
            name="project2_undertaken"
            onBlur={validate}
            onChange={handleChange}
            required
            maxLength="30"
          />
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
export default AcademicForm;
