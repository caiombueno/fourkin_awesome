interface ReviewUser {
    id: UserId;
    imageUrl: string | null;
    name: string | null;
}

export type UserId = string;

export default ReviewUser;