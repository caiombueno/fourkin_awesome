import { useSelector } from "react-redux";
import RestaurantSummaryListState from "./RestaurantSummaryListState";
import { RootState } from "@redux";

const selectRestaurantSummaryList: () => RestaurantSummaryListState = () => useSelector((state: RootState) => state.restaurantSummaryList);

export default selectRestaurantSummaryList;