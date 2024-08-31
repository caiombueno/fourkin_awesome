import { RootState } from "@redux";
import { useSelector } from "react-redux";

const selectLocationSearchInput = () => useSelector((state: RootState) => state.restaurantSummaryListSearchInput.location);

export default selectLocationSearchInput;