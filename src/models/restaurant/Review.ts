import { DataFormatFailureError } from "../errors";
import ReviewUser, { ReviewUserSerializable } from "./ReviewUser";

class Review {
    readonly id: ReviewId;
    readonly rating: number;
    readonly text: string;
    readonly user: ReviewUser;

    constructor({ id, rating, text, user }: {
        id: ReviewId;
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

    toSerializable(): ReviewSerializable {
        return {
            id: this.id,
            rating: this.rating,
            text: this.text,
            user: this.user.toSerializable(),
        };
    }

    static fromJson(json: ReviewJson): Review {
        const reviewUser: ReviewUser = ReviewUser.fromJson(json.user);

        const reviewId = json.id;
        if (!reviewId) throw new DataFormatFailureError();

        const review: Review = new Review({
            id: reviewId,
            rating: json.rating,
            text: json.text,
            user: reviewUser,
        });
        return review;
    }
}

type ReviewId = string;

export interface ReviewSerializable {
    id: ReviewId;
    rating: number;
    text: string;
    user: ReviewUserSerializable;
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