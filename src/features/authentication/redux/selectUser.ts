import { RootState } from "@redux";
import { useSelector } from "react-redux";


export const selectCurrentUser = () => useSelector((state: RootState) => state.currentUser.user);