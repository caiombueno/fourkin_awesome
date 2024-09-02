export default abstract class DomainError extends Error {

}

export class RestaurantSummaryListFetchFailureError extends DomainError {
    constructor(message: string = 'Failed to fetch restaurants') {
        super();
        this.message = message;
        this.name = 'RestaurantSummaryListFetchFailureError';
    }
}

export class NoRestaurantSummaryListFoundError extends DomainError {
    constructor(message: string = 'No restaurants were found') {
        super();
        this.message = message;
        this.name = 'NoRestaurantSummaryListFoundError';
    }
}

export class RestaurantDetailsFetchFailureError extends DomainError {
    constructor(message: string = 'Failed to fetch restaurant details') {
        super();
        this.message = message;
        this.name = 'RestaurantDetailsFetchFailureError';
    }
}

export class NoRestaurantDetailsFoundError extends DomainError {
    constructor(message: string = 'No restaurant details were found') {
        super();
        this.message = message;
        this.name = 'NoRestaurantDetailsFoundError';
    }
}