import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../CSS/student.css";
//import buildUrl from "build-url";
import { internshipFilter, internshipAll } from "../Utilities/StudentFunctions";

function StudentHome() {
  const [filterState, setFilterState] = useState({
    startsOn: { type: Date, default: "" },
    type: "",
    stipend1: false,
    stipend2: false,
    stipend3: false,
    stipend4: false,
    category: "",
    duration1: false,
    duration2: false,
    duration3: false
  });
  // const [internData, setInternData] = useState({
  //   startsOn: Date,
  //   type: "",
  //   category: "",
  //   title: "",
  //   duration: "",
  //   stipend: "",
  //   description: "",
  //   postedOn: Date,
  //   intendedParticipants: "",
  //   company: "",
  //   requiredSkills: []
  // });
  const [internArray, setInternArray] = useState([]);

  useEffect(() => {
    internshipAll().then(res => {
      if (res) {
        console.log(res.data.internship);
        const arr = res.data.internship.map(data => ({
          title: data.title,
          category: data.categories,
          startsOn: data.starts_on.substring(0, 10),
          type: data.type_of_internship,
          duration: data.duration,
          stipend: data.stipend,
          description: data.description,
          postedOn: data.posted_on.substring(0, 10),
          intendedParticipants: data.intended_participants,
          company: data.company.user.fullname,
          requiredSkills: data.requiredSkills,
          id: data.id
        }));
        setInternArray(arr);
      }
    });
  }, []);

  function onFilterChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? setFilterState({ ...filterState, [name]: checked })
      : setFilterState({ ...filterState, [name]: value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    // let param1, param2, param3, param4;
    // if (filterState.stipend1 === 'True') {
    //   param1 = 'stipend: 0';
    // }
    // if (filterState.stipend2 === 'True') {
    //   param2 = 'stipend: { $lt: 5000 }';
    // }
    // if (filterState.stipend3 === 'True') {
    //   param3 =
    //     '{ $and: [{ stipend: { $gte: 5000 } }, { stipend: { $lt: 10000 } }] };';
    //   console.log('hey');
    // }
    // if (filterState.stipend4 === 'True') {
    //   param4 = 'stipend: { $gte: 10000 }';
    // }

    // const stipend = [param1, param2, param3, param4];
    // const stipend = [
    //   filterState.stipend1 === 'True' ? 'stipend: 0' : '',
    //   filterState.stipend2=== 'True' ? 'stipend: { $lt: 5000 }':'',
    //   filterState.stipend3=== 'True' ?'{ $and: [{ stipend: { $gte: 5000 } }, { stipend: { $lt: 10000 } }] };':'' ,
    //   filterState.stipend4=== 'True' ? 'stipend: { $gte: 10000 }':''
    // ];
    const stipend = [
      filterState.stipend1,
      filterState.stipend2,
      filterState.stipend3,
      filterState.stipend4
    ];
    const duration = [
      filterState.duration1,
      filterState.duration2,
      filterState.duration3
    ];

    const filter = {
      stipend: stipend,
      categories: filterState.category,
      duration: duration,
      type_of_internship: filterState.type,
      starts_on: filterState.startsOn
    };
    internshipFilter(filter).then(res => {
      if (res) {
        console.log(res);
        console.log(res.data.stats[0]);
        const arr = res.data.stats.map(data => ({
          title: data.title,
          category: data.categories,
          startsOn: data.starts_on.substring(0, 10),
          type: data.type_of_internship,
          duration: data.duration,
          stipend: data.stipend,
          description: data.description,
          postedOn: data.posted_on.substring(0, 10),
          intendedParticipants: data.intended_participants,
          company: data.company.user.fullname,
          requiredSkills: data.requiredSkills,
          id: data.id
        }));
        setInternArray(arr);
        // setInternData({
        //   ...internData,
        //   title: res.data.stats[0].title,
        //   category: res.data.stats[0].categories,
        //   startsOn: res.data.stats[0].starts_on.substring(0, 10),
        //   type: res.data.stats[0].type_of_internship,
        //   duration: res.data.stats[0].duration,
        //   stipend: res.data.stats[0].stipend,
        //   description: res.data.stats[0].description,
        //   postedOn: res.data.stats[0].posted_on.substring(0, 10),
        //   intendedParticipants: res.data.stats[0].intended_participants,
        //   company: res.data.stats[0].company.user.fullname,
        //   requiredSkills: res.data.stats[0].requiredSkills
        // });
      }
    });
    // const urlQuery = buildUrl("", {
    //   queryParams: {
    //     stipend: stipend,
    //     categories: filterState.category,
    //     duration: duration,
    //     type_of_internship: filterState.type,
    //     starts_on: filterState.startsOn
    //   }
    // });
    // let queryStr = urlQuery;
    // queryStr = queryStr.replace(/%2C/g, `,`);
    // console.log(queryStr);
    // setQuery({
    //   stipend: filterState.stipend,
    //   starts_on: filterState.starts_on,
    //   type_of_internship: filterState.type,
    //   requiredSkills: filterState.requiredSkills,
    //   duration: filterState.duration
    // });
  };

  return (
    <div>
      <div className="container">
        <p>{filterState.stipend1}</p>

        <div className="col-sm-8 mx-auto display-4 text-center">
          Internships
        </div>
        <br></br>
        {/* <Link to="/selectedInternship" className="nav-link">
          Select Internship
        </Link>
        <p>USER:{localStorage.userid}</p>
        <p>STUDENT:{localStorage.studentid}</p> */}
      </div>
      <div className="container-fluid">
        <div class="row">
          <div class="col-lg-3">
            <div className="jumbotron mt-2">
              <form onSubmit={handleSubmit}>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="paid"
                    checked={filterState.type === "paid"}
                    onChange={onFilterChange}
                  />
                  Paid
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="free"
                    checked={filterState.type === "free"}
                    onChange={onFilterChange}
                  />
                  Free
                </label>
                <br />
                <br />
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="fulltime"
                    checked={filterState.category === "fulltime"}
                    onChange={onFilterChange}
                  />
                  Full Time
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="parttime"
                    checked={filterState.category === "parttime"}
                    onChange={onFilterChange}
                  />
                  Part Time
                </label>
                <br />
                <br />
                <label htmlFor="duration1">
                  <input
                    type="checkbox"
                    //className="custom-control-input"
                    name="duration1"
                    checked={filterState.duration1}
                    onChange={onFilterChange}
                    id="duration1"
                  />
                  0 to 2 Months
                </label>
                <br />
                <label htmlFor="duration2">
                  <input
                    type="checkbox"
                    //className="custom-control-input"
                    name="duration2"
                    checked={filterState.duration2}
                    onChange={onFilterChange}
                    id="duration2"
                  />
                  2 to 4 Months
                </label>
                <br />
                <label htmlFor="duration3">
                  <input
                    type="checkbox"
                    //className="custom-control-input"
                    name="duration3"
                    checked={filterState.duration3}
                    onChange={onFilterChange}
                    id="duration3"
                  />
                  4 Months and Above
                </label>
                <br />
                <br />
                <label htmlFor="stipend1">
                  <input
                    type="checkbox"
                    //className="custom-control-input"
                    name="stipend1"
                    checked={filterState.stipend1}
                    onChange={onFilterChange}
                    id="stipend1"
                  />
                  No Stipend
                </label>
                <br />
                <label htmlFor="stipend2">
                  <input
                    type="checkbox"
                    //className="custom-control-input"
                    name="stipend2"
                    checked={filterState.stipend2}
                    onChange={onFilterChange}
                    id="stipend2"
                  />
                  Below Rs.5000
                </label>
                <br />
                <label htmlFor="stipend3">
                  <input
                    type="checkbox"
                    //className="custom-control-input"
                    name="stipend3"
                    checked={filterState.stipend3}
                    onChange={onFilterChange}
                    id="stipend3"
                  />
                  Between Rs.5000 and Rs.10,000
                </label>
                <br />
                <label htmlFor="stipend4">
                  <input
                    type="checkbox"
                    //className="custom-control-input"
                    name="stipend4"
                    checked={filterState.stipend4}
                    onChange={onFilterChange}
                    id="stipend4"
                  />
                  Rs.10,000 and above
                </label>
                <br />
                <br />
                <label htmlFor="startsOn">
                  Starts On:
                  <input
                    type="date"
                    className="form-control"
                    name="startsOn"
                    //value={filterState.startsOn}
                    onChange={onFilterChange}
                  />
                </label>
                <br />
                <button className="btn btn-danger" type="reset">
                  Reset
                </button>
                <br />
                <br />

                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div class="col-sm-9">
            {internArray.map(function(intern) {
              return (
                <div key={intern.id}>
                  <div className="card">
                    <div className="card-body">
                      <h3>{intern.title}</h3>
                      <br></br>
                      <h5>Company name: {intern.company}</h5>

                      <div className="row d-flex">
                        <div className="col-sm-3 col-xs-3">
                          <p style={{ color: "grey" }}>Start Date:</p>
                          <p>{intern.startsOn}</p>
                        </div>
                        <div className="col-sm-3 col-xs-3">
                          <p style={{ color: "grey" }}>Duration:</p>
                          <p>{intern.duration} Months</p>
                        </div>
                        <div className="col-sm-3 col-xs-3">
                          <p style={{ color: "grey" }}>Category:</p>
                          <p>{intern.category}</p>
                        </div>
                        <div className="col-sm-3 col-xs-3">
                          <p style={{ color: "grey" }}>Stipend:</p>
                          <p>Rs. {intern.stipend}/-</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <Link
                        style={{ float: "right" }}
                        className="btn btn-success"
                        to={{
                          pathname: "/selectedInternship",
                          id: intern.id
                        }}
                      >
                        View Details
                      </Link>
                      {/* <button
                  type="button"
                  style={{ float: "right" }}
                  className="btn btn-success"
                >
                  View Details
                </button> */}
                    </div>
                  </div>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentHome;
