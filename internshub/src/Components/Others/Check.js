import React, { useState } from 'react';
import { hostInternship } from '../Utilities/CompanyFunctions';
import Select from 'react-select';

function InternshipHost(props) {
  const [internshipHostState, setInternshipHostState] = useState({
    title: '',
    description: '',
    duration: '',
    posted_on: '',
    starts_on: '',
    maximum_seats: '',
    available_seats: '',
    intended_participants: '',
    requiredSkills: '',
    categories: '',
    type_of_internship: ''
  });

  //const [setHandleSkills] = useState('');
  const handleChange = event => {
    setInternshipHostState({
      ...internshipHostState,
      [event.target.name]: event.target.value
    });
  };
  const [requiredSkills] = useState();
  const handleChange1 = requiredSkills => {
    setInternshipHostState({ requiredSkills });
    console.log(`Option selected:`, requiredSkills);
  };

  //   const validate = () => {
  //     if (InternshipHostState === ' ')
  //       setInternshipHostState('Please fill the information');
  //   };

  const options = [
    { value: 'html', label: 'Html' },
    { value: 'css', label: 'CSS' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'React', label: 'React' },
    { value: 'c++', label: 'C++' }
  ];

  const handleSubmit = e => {
    e.preventDefault();

    const Internship = {
      title: internshipHostState.title,
      description: internshipHostState.description,
      duration: internshipHostState.duration,
      posted_on: internshipHostState.posted_on,
      starts_on: internshipHostState.starts_on,
      maximum_seats: internshipHostState.maximum_seats,
      available_seats: internshipHostState.available_seats,
      intended_participants: internshipHostState.intended_participants,
      requiredSkills: internshipHostState.requiredSkills,
      categories: internshipHostState.categories,
      type_of_internship: internshipHostState.type_of_internship,
      company: localStorage.company
    };

    hostInternship(Internship).then(res => {
      if (res) {
        alert('Successfully hosted internship');
      }
    });
  };

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
            rows="3"
            maxLength="200"
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
          <label htmlFor="posted_on">Posted On: </label>
          <input
            type="date"
            className="form-control"
            name="posted_on"
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
          <label htmlFor="maximum_seats">Maximum Seats: </label>
          <input
            type="number"
            className="form-control"
            name="maximum_seats"
            //onBlur={validate}
            onChange={handleChange}
            required
            maxLength="500"
            minLength="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="available_seats">Available Seats: </label>
          <input
            type="number"
            className="form-control"
            name="available_seats"
            //onBlur={validate}
            onChange={handleChange}
            required
            maxLength="500"
            minLength="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="intended_participants">Intended Participants: </label>
          <textarea
            className="form-control"
            rows="3"
            maxLength="200"
          ></textarea>
          <small className="form-text text-muted">Enter in points</small>
        </div>

        <div className="form-group">
          <label htmlFor="requiredSkills">Required Skills: </label>

          <Select
            isMulti
            value={requiredSkills}
            onChange={handleChange1}
            options={options}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categories">Categories: </label>
          <br />
          <input
            type="radio"
            name="categories"
            value="fulltime"
            onChange={handleChange}
          />{' '}
          Fulltime
          <input
            type="radio"
            name="categories"
            value="parttime"
            onChange={handleChange}
          />{' '}
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
          />{' '}
          Paid
          <input
            type="radio"
            name="type_of_internship"
            value="unpaid"
            onChange={handleChange}
          />{' '}
          Unpaid
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
