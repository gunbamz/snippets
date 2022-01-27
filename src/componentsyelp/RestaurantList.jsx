import React, { useContext} from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { responsiveFontSizes } from "@material-ui/core";

const RestaurantList = (props) => {
  let Navigate = useNavigate();
  const { restaurants, setRestaurants, setSelectedRestaurant } = useContext(RestaurantsContext);

  const handleDelete = async (e) => {
    e.stopPropagation(); 
    try {
      const response = await RestaurantFinder.delete(`/restautants/${e.target.value}`);
      setRestaurants(
        [...restaurants].filter((x) => x._id != response.data._id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    e.stopPropagation();
    Navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    let select = [...restaurants].filter(e => e._id == id)
    setSelectedRestaurant(select[0]);
    Navigate(`/reviews/${id}`);
  };

  const renderRating = (r) => {
    if (!r.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={r.id} />
        <span className="text-warning ml-1">({r.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((r, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => handleRestaurantSelect(r._id)}
                >
                  <td>{r.name}</td>
                  <td>{r.location}</td>
                  <td>{"$".repeat(r.price_range)}</td>
                  <td>{renderRating(r)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e)}
                      className="btn btn-warning"
                      value={r._id}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e)}
                      className="btn btn-danger"
                      value={r._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
