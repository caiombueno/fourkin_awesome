import { RootState } from "@redux";
import { useSelector } from "react-redux";

export const selectRestaurantDetails = () => useSelector((state: RootState) => state.restaurantDetails);