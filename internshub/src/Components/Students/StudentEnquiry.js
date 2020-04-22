import React, { useState, useEffect } from "react";
import {
  studentEnquiries,
  rate,
  editReview,
  reviewInternship,
} from "../Utilities/StudentFunctions";
import { load } from "../Utilities/Utils";
import { FaStar } from "react-icons/fa";
import { showAlert } from "./../Utilities/Alerts";

function StudentEnquiry(props) {
  const [studentEnquiry, setStudentEnquiry] = useState([]);
  const [loading, setLoading] = useState("false");
  const [more, setMore] = useState({
    starts: Date,
    compName: "",
    accepted: "",
    completed: "",
    ratings: "No",
    compEmail: "",
    compPhone: "",
  });
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState({
    user: "",
    review: "",
    company: "",
    internship: "",
  });

  useEffect(() => {
    document.title = "InternsHub | Student Enquiry";
    studentEnquiries().then((res) => {
      if (res) {
        //console.log(res.data);
        const internEnq = res.data.enquiry.filter(
          (data) => data.internship !== null
        );
        //console.log(res.data.data.enquiry[0]);
        setStudentEnquiry(internEnq);
        if (res.data !== undefined) setLoading("true");
      }
    });
  }, []);
  const InternshipEnq = (props) => (
    <tr>
      <td className="text-capitalize">{props.internship.internship.title}</td>
      <td>{props.internship.reqAt.substring(0, 10)}</td>
      <td>
        <button
          className="btn btn-dark btn-sm btn-block"
          data-toggle="modal"
          data-target="#more"
          onClick={() => {
            reviewInternship(
              props.internship.user.id,
              props.internship.internship.id
            ).then((res) => {
              if (res.data.length !== 0) {
                setMore({
                  ...more,
                  ratings: "Yes",
                  starts: props.internship.internship.starts_on
                    .substring(0, 10)
                    .toString(),
                  compName: props.internship.company.user.fullname,
                  accepted: props.internship.accepted,
                  completed: props.internship.completed,
                  compEmail: props.internship.company.user.email,
                  compPhone: props.internship.company.user.phoneNumber,
                });
                setReview({
                  ...review,
                  review: res.data[0].review,
                  user: props.internship.user.id,
                  company: props.internship.company.id,
                  internship: props.internship.internship.id,
                });
                setRating(res.data[0].rating);
                localStorage.setItem("reviewid", res.data[0].id);
              } else {
                setMore({
                  ...more,
                  starts: props.internship.internship.starts_on
                    .substring(0, 10)
                    .toString(),
                  compName: props.internship.company.user.fullname,
                  accepted: props.internship.accepted,
                  completed: props.internship.completed,
                  compEmail: props.internship.company.user.email,
                  compPhone: props.internship.company.user.phoneNumber,
                });
                setReview({
                  ...review,
                  user: props.internship.user.id,
                  company: props.internship.company.id,
                  internship: props.internship.internship.id,
                });
              }
            });
          }}
        >
          <i className="fas fa-expand-arrows-alt"></i>
        </button>
      </td>
    </tr>
  );
  const None = (key) => (
    <tr key={key}>
      <td colSpan="7">
        <center>
          <h2>No Data Yet</h2>
        </center>
      </td>
    </tr>
  );
  function internshipEnquiryListReq() {
    let count = 0;
    let c = 0;
    if (studentEnquiry.length === 0) {
      return <None key="key" />;
    }
    // eslint-disable-next-line
    return studentEnquiry.map((currentInternship) => {
      var ends_on = new Date(currentInternship.internship.ends_on);
      if (ends_on > Date.now() && currentInternship.completed === "No") {
        c += 1;
        return (
          <InternshipEnq
            key={currentInternship.id}
            internship={currentInternship}
          />
        );
      } else {
        count += 1;
        if (c === 0 && studentEnquiry.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }
  function internshipEnquiryListCom() {
    let count = 0;
    let c = 0;
    if (studentEnquiry.length === 0) {
      return <None key="key" />;
    }
    // eslint-disable-next-line
    return studentEnquiry.map((currentInternship) => {
      var ends_on = new Date(currentInternship.internship.ends_on);
      if (currentInternship.completed === "Yes" || ends_on < Date.now()) {
        c += 1;
        return (
          <InternshipEnq
            key={currentInternship.id}
            internship={currentInternship}
          />
        );
      } else {
        count += 1;
        if (c === 0 && studentEnquiry.length === count) {
          //console.log(count);
          return <None key="key" />;
        }
      }
    });
  }
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setReview({
      ...review,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviews = {
      user: review.user,
      review: review.review,
      company: review.company,
      internship: review.internship,
    };
    rate(reviews, rating).then((res) => {
      if (res) {
        showAlert("success", "Thank You for your valuable Review");
        props.history.push("/studentHome");
        window.location.reload(false);
      }
    });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    const reviews = {
      user: review.user,
      review: review.review,
      company: review.company,
      internship: review.internship,
    };
    editReview(reviews, rating).then((res) => {
      if (res) {
        showAlert("success", "Thank You for your valuable Review");
        props.history.push("/studentHome");
        window.location.reload(false);
      }
    });
  };
  let method;
  more.ratings === "Yes" ? (method = handleSubmit1) : (method = handleSubmit);

  const link = (
    <div>
      {" "}
      {more.completed === "Yes" ? (
        <div>
          <form onSubmit={method}>
            <div className="reviews__rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className={star}
                      color={
                        ratingValue <= (hover || rating) ? "ffc107" : "#e4e5e9"
                      }
                      size={40}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="review">
                <b>Add A Review: </b>
              </label>
              <textarea
                className="form-control"
                name="review"
                rows="3"
                maxLength="100"
                minLength="10"
                placeholder="Enter some valuable review about your experience"
                value={review.review}
                onChange={handleChange}
              ></textarea>
              <hr />
              <button
                className="btn btn-success float-right px-5"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="reviews__rating">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  disabled
                />
                <FaStar
                  className={star}
                  color={
                    ratingValue <= (hover || rating) ? "ffc107" : "#e4e5e9"
                  }
                  size={40}
                />
              </label>
            );
          })}
          <p className="pt-2 pl-3">Only If Internship Completed</p>
        </div>
      )}
    </div>
  );
  return (
    <div className="container pt-4">
      {loading === "false" ? (
        load(loading)
      ) : (
        <div>
          <h2 className="text-center display-4 bg-secondary rounded text-white pb-3 small-header small-head-padding">
            <i className="fas fa-clipboard-check"></i> My Enquiries
          </h2>
          <div>
            <h2>Requested / Ongoing Internships</h2>
            <table className="table table-striped table-hover bg-white">
              <thead className="thead-dark">
                <tr>
                  <th>Internship</th>
                  <th>Requested On</th>
                  <th>More Info</th>
                </tr>
              </thead>
              <tbody>{internshipEnquiryListReq()}</tbody>
            </table>
            <h2>Completed / Past Internships</h2>
            <table className="table table-striped table-hover bg-white">
              <thead className="thead-dark">
                <tr>
                  <th>Internship</th>
                  <th>Requested On</th>
                  <th>More Info</th>
                </tr>
              </thead>
              <tbody>{internshipEnquiryListCom()}</tbody>
            </table>
            <div className="modal fade" id="more">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-info  text-white">
                    <h5 className="modal-title">More Information</h5>
                    <button className="close" data-dismiss="modal">
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Starts On: {more.starts.toString()}</p>
                    <p>Company Name: {more.compName}</p>
                    <p>Company Email: {more.compEmail}</p>
                    <p>Company Phone Number: {more.compPhone}</p>
                    <p>Accepted State: {more.accepted}</p>
                    <p>Completed State: {more.completed}</p>
                    {link}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentEnquiry;
