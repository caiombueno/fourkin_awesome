import { RootState } from "@redux";
import { useSelector } from "react-redux";

const selectLocationSearchInput = () => useSelector((state: RootState) => state.restaurantSummaryListSearchInput.location);

const selectNameSearchInput = () => useSelector((state: RootState) => state.restaurantSummaryListSearchInput.name);

export { selectLocationSearchInput, selectNameSearchInput };