interface User {
    uid: UserId;
    email: string | null;
}

type UserId = string;

export { User, UserId };