import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { reviews } from "../Utilities/CompanyFunctions";
function CompanyReview() {
  const Rating = (props) => (
    <div className="card p-2" key={props.reviews.id}>
      {props.reviews.photo !== "" ? (
        <img
          src={`${localStorage.ip}Images/${props.reviews.user.photo}`}
          alt=""
          className="card-img-top img-fluid p-2"
        />
      ) : (
        <p>Loading...</p>
      )}
      <h5 className="card_title">{props.reviews.user.fullname}</h5>
      <div className="card-body p-2">
        <h6 className="card-text">{props.reviews.review}</h6>
        <div className="reviews__rating">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input type="radio" name="rating" value={ratingValue} />
                <FaStar
                  className={star}
                  color={
                    ratingValue <= (hover || props.reviews.rating)
                      ? "ffc107"
                      : "#e4e5e9"
                  }
                  size={40}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    document.title = "InternsHub | Company Reviews";
    reviews().then((res) => {
      if (res) {
        console.log(res.data.review);
        setReviewData(res.data.review);
      }
    });
  }, []);
  const [hover] = useState(null);

  const [reviewData, setReviewData] = useState([]);

  return (
    <div className="container">
      <div className="card-columns">
        {reviewData.map((el) => {
          return <Rating key={el.id} reviews={el} />;
        })}
      </div>
    </div>
  );
}
export default CompanyReview;
