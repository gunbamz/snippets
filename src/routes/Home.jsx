import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Header from "../componentsyelp/Header";
import AddRestaurant from "../componentsyelp/AddRestaurant";
import RestaurantList from "../componentsyelp/RestaurantList";

const Home = () => {
  const { setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/restaurants");
        console.log(response.data);
        if (response == undefined) {}
        else {
          //setRestaurant(response.data);
          setRestaurants(response.data);
        }
      } catch (err) {}
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
