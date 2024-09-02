import { DataFormatFailureError } from "../errors";
import ReviewUser from "./ReviewUser";

class Review {
    readonly id: string;
    readonly rating: number;
    readonly text: string;
    readonly user: ReviewUser;

    constructor({ id, rating, text, user }: {
        id: string;
        rating: number;
        text: string;
        user: ReviewUser;
    }) {
        this.id = id;
        this.rating = rating;
        this.text = text;
        this.user = user;

        Object.freeze(this);
    }

    static fromJson(json: ReviewJson): Review {
        const reviewUser: ReviewUser = ReviewUser.fromJson(json.user);

        const reviewId = json.id;
        if (!reviewId) throw new DataFormatFailureError();

        const review: Review = {
            id: reviewId,
            rating: json.rating,
            text: json.text,
            user: reviewUser,
        };
        return review;
    }
}

export interface ReviewJson {
    id: string;
    rating: number;
    text: string;
    user: {
        id: string;
        name: string | null;
        image_url: string | null;
    }
}

export default Review;