import { DataFormatFailureError } from "../errors";


export interface ReviewUserJson {
    id: UserId;
    image_url: string | null;
    name: string | null;
}

class ReviewUser {
    readonly id: UserId;
    readonly imageUrl: string | null;
    readonly name: string | null;

    constructor({ id, imageUrl, name }: { id: UserId, imageUrl: string | null, name: string | null }) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;

        Object.freeze(this);
    }

    static fromJson(json: ReviewUserJson): ReviewUser {

        const id = json.id;

        if (!id) throw new DataFormatFailureError();
        const imageUrl = json.image_url;
        const name = json.name;

        return new ReviewUser(
            { id, imageUrl, name }
        );
    }
}

export type UserId = string;

export default ReviewUser;