import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import buildUrl from "build-url";
import { internshipFilter, internshipAll } from "../Utilities/StudentFunctions";
import { load } from "../Utilities/Utils";

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
    duration3: false,
  });
  const [loading, setLoading] = useState("false");
  const [internArray, setInternArray] = useState([]);

  useEffect(() => {
    document.title = "InternsHub | Student Home";
    internshipAll().then((res) => {
      if (res) {
        //console.log(res.data.doc);
        const arr = res.data.doc.map((data) => ({
          title: data.title,
          location: data.location,
          category: data.categories,
          startsOn: data.starts_on.substring(0, 10),
          type: data.type_of_internship,
          duration: data.duration,
          stipend: data.stipend,
          description: data.description,
          postedOn: data.posted_on.substring(0, 10),
          intendedParticipants: data.intended_participants,
          company: data.company.user.fullname,
          photo: data.company.user.photo,
          requiredSkills: data.requiredSkills,
          id: data.id,
        }));
        setInternArray(arr);
        if (res.data !== undefined) setLoading("true");
      }
    });
  }, []);

  function onFilterChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? setFilterState({ ...filterState, [name]: checked })
      : setFilterState({ ...filterState, [name]: value });
  }

  let count = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const stipend = [
      filterState.stipend1,
      filterState.stipend2,
      filterState.stipend3,
      filterState.stipend4,
    ];
    const duration = [
      filterState.duration1,
      filterState.duration2,
      filterState.duration3,
    ];

    const filter = {
      stipend: stipend,
      categories: filterState.category,
      duration: duration,
      type_of_internship: filterState.type,
      starts_on: filterState.startsOn,
    };
    internshipFilter(filter).then((res) => {
      if (res) {
        //console.log(res);
        //console.log(res.data.stats[0]);
        const arr = res.data.doc.map((data) => ({
          title: data.title,
          photo: data.company.user.photo,
          location: data.location,
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
          id: data.id,
        }));
        setInternArray(arr);
      }
    });
  };
  count = internArray.length;

  return (
    <div className="container pt-4">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <h2 className="text-center display-4 bg-secondary rounded text-white small-header py-2">
            <i className="far fa-list-alt"></i> Internships
          </h2>

          <div className="row p-2">
            <div className="col-md-4 col-lg-3">
              <div className="d-lg-none d-md-none d-sm-block">
                <div id="accordion">
                  <div className="text-center">
                    <div
                      href="#collapse1"
                      data-toggle="collapse"
                      data-parent="#accordion"
                    >
                      <button className="btn px-5 btn-sm btn-outline-success rounded my-2">
                        <i className="fas fa-arrows-alt-v"></i> Filter Toggle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="collapse1" className="collapse show mt-3 sticky-top">
                <div className="card bg-body px-3 rounded-lg card-form anyClass">
                  <div className="card-body small-filter ">
                    <div className="text-center">
                      <h2 className="blockquote mb-3">
                        {" "}
                        <i className="fas fa-filter" /> Filter
                      </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="table-responsive">
                          <table className="table bg-body table-sm table-borderless filter-table">
                            <tbody>
                              <tr>
                                <td colSpan="2">
                                  <p className="font-weight-bold mb-0">
                                    Type of Internship:
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                      type="radio"
                                      name="type"
                                      value="Paid"
                                      checked={filterState.type === "Paid"}
                                      className="custom-control-input"
                                      id="defaultInline1"
                                      onChange={onFilterChange}
                                    />
                                    <label
                                      className="custom-control-label s1 no-bold"
                                      htmlFor="defaultInline1"
                                    >
                                      Paid
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                      type="radio"
                                      name="type"
                                      value="Free"
                                      checked={filterState.type === "Free"}
                                      onChange={onFilterChange}
                                      className="custom-control-input"
                                      id="defaultInline2"
                                    />
                                    <label
                                      className="custom-control-label s1 no-bold"
                                      htmlFor="defaultInline2"
                                    >
                                      Free
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <p className="font-weight-bold mb-0 mt-3">
                                    Category:
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="custom-control custom-radio">
                                    <input
                                      type="radio"
                                      name="category"
                                      value="Fulltime"
                                      checked={
                                        filterState.category === "Fulltime"
                                      }
                                      onChange={onFilterChange}
                                      className="custom-control-input"
                                      id="defaultInline3"
                                    />
                                    <label
                                      className="custom-control-label s1 no-bold"
                                      htmlFor="defaultInline3"
                                    >
                                      Full Time
                                    </label>
                                  </div>
                                </td>

                                <td>
                                  <div className="custom-control custom-radio">
                                    <input
                                      type="radio"
                                      name="category"
                                      value="Parttime"
                                      checked={
                                        filterState.category === "Parttime"
                                      }
                                      onChange={onFilterChange}
                                      className="custom-control-input"
                                      id="defaultInline4"
                                    />
                                    <label
                                      className="custom-control-label s1 no-bold"
                                      htmlFor="defaultInline4"
                                    >
                                      Part Time
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan="2">
                                  <p className="font-weight-bold mb-0 mt-3">
                                    Duration (in Months):
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      name="duration1"
                                      checked={filterState.duration1}
                                      onChange={onFilterChange}
                                      id="customCheck1"
                                    />
                                    <label
                                      className="custom-control-label no-bold"
                                      htmlFor="customCheck1"
                                    >
                                      0 - 2
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      name="duration2"
                                      checked={filterState.duration2}
                                      onChange={onFilterChange}
                                      id="customCheck2"
                                    />
                                    <label
                                      className="custom-control-label no-bold"
                                      htmlFor="customCheck2"
                                    >
                                      2 - 4
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      name="duration3"
                                      checked={filterState.duration3}
                                      onChange={onFilterChange}
                                      id="customCheck3"
                                    />
                                    <label
                                      className="custom-control-label no-bold"
                                      htmlFor="customCheck3"
                                    >
                                      > 4
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan="2">
                                  <p className="font-weight-bold mb-0 mt-3">
                                    Stipend (in ₹):
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      name="stipend1"
                                      checked={filterState.stipend1}
                                      onChange={onFilterChange}
                                      id="customCheck4"
                                    />
                                    <label
                                      className="custom-control-label no-bold"
                                      htmlFor="customCheck4"
                                    >
                                      No Stipend
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      name="stipend2"
                                      checked={filterState.stipend2}
                                      onChange={onFilterChange}
                                      id="customCheck5"
                                    />
                                    <label
                                      className="custom-control-label no-bold"
                                      htmlFor="customCheck5"
                                    >
                                      {`< 5,000`}
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      name="stipend3"
                                      checked={filterState.stipend3}
                                      onChange={onFilterChange}
                                      id="customCheck6"
                                    />
                                    <label
                                      className="custom-control-label no-bold"
                                      htmlFor="customCheck6"
                                    >
                                      {`5,000 - 10,000`}
                                    </label>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      name="stipend4"
                                      checked={filterState.stipend4}
                                      onChange={onFilterChange}
                                      id="customCheck7"
                                    />
                                    <label
                                      className="custom-control-label no-bold"
                                      htmlFor="customCheck7"
                                    >
                                      {`> 10,000`}
                                    </label>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan="2">
                                  <p className="font-weight-bold mb-0 mt-3">
                                    Starts On:
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  <input
                                    type="date"
                                    min={new Date(Date.now())
                                      .toISOString()
                                      .substring(0, 10)}
                                    className="form-control"
                                    name="startsOn"
                                    value={filterState.startsOn}
                                    onChange={onFilterChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger mt-3"
                                    type="reset"
                                    onClick={() =>
                                      window.location.reload(false)
                                    }
                                  >
                                    Reset
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-block btn-success mt-3"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 col-lg-9">
              <h2 className="text-center text-right small-header mb-3 count-disp">
                <i className="fas fa-sliders-h"></i> {count} Listings
              </h2>
              {internArray.map(function (intern) {
                return (
                  <div key={intern.id}>
                    <div className="card bg-card intern-card">
                      <div className="card-body small-intern-card">
                        <div className="row">
                          <div className="col-sm-6 col-md-8 col-lg-9">
                            <h3 className="card-title small-intern-title text-capitalize">
                              {intern.title}
                            </h3>
                            <h6 className="card-subtitle small-intern-subtitle text-muted text-capitalize">
                              Company: {intern.company}
                            </h6>
                          </div>
                          <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                            {intern.photo !== undefined ? (
                              <img
                                src={`${localStorage.ip}Images/${intern.photo}`}
                                className="card-img small-image"
                                alt="Logo"
                              />
                            ) : (
                              <p>Loading...</p>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row d-flex">
                          <div className="col-sm-4 offset-sm-2 offset-lg-0 col-lg-2 card-p">
                            <p style={{ color: "grey" }}>Start Date:</p>{" "}
                            <p>{intern.startsOn}</p>
                          </div>
                          <div className="col-sm-4 col-lg-2 card-p">
                            <p style={{ color: "grey" }}>Location:</p>{" "}
                            <p className="text-capitalize">{intern.location}</p>
                          </div>
                          <div className="col-sm-4 col-lg-2 card-p">
                            <p style={{ color: "grey" }}>Duration:</p>{" "}
                            <p>{intern.duration} Months</p>
                          </div>
                          <div className="col-sm-4 col-lg-2 card-p">
                            <p style={{ color: "grey" }}>Category:</p>{" "}
                            <p>{intern.category}</p>
                          </div>
                          <div className="col-sm-4 col-lg-2 card-p">
                            <p style={{ color: "grey" }}>Stipend:</p>{" "}
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
                            id: intern.id,
                          }}
                        >
                          View Details{" "}
                          <i className="fas fa-angle-double-right" />
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
      )}
    </div>
  );
}
export default StudentHome;
