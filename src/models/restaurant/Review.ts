import ReviewUser from "./ReviewUser";

interface Review {
    id: string;
    rating: number;
    text: string;
    user: ReviewUser;
}

export default Review;