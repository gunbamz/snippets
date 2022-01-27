import React, { useEffect, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";
import { useParams, useLocation } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const Reviews = () => {
  const { reviews, setReviews } = useContext(RestaurantsContext);
  const { id } = useParams();
  const lo = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/reviews/${id}`);
        if (response.data == null) {
          console.log("no reviews");
        } else {
          setReviews(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="row row-cols-3 mb-2">
      {reviews && reviews.map((review, i) => {
        return (
          <div
            key={i}
            className="card text-white bg-primary mb-3 mr-4"
            style={{ maxWidth: "30%" }}
          >
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
