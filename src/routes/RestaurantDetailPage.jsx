import React, { useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "../componentsyelp/StarRating";
import Reviews from "../componentsyelp/Reviews";
import AddReview from "../componentsyelp/AddReview";

const RestaurantDetailPage = () => {
  const { selectedRestaurant } = useContext(
    RestaurantsContext
  );

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.count
                ? `(${selectedRestaurant.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
