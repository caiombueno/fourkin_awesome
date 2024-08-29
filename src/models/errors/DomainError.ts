abstract class DomainError extends Error {

}

export class RestaurantSummaryListFetchFailureError extends DomainError {
    constructor() {
        super();
        this.name = 'RestaurantSummaryListFetchFailureError';
    }
}

export class NoRestaurantSummaryListFoundError extends DomainError {
    constructor() {
        super();
        this.name = 'NoRestaurantSummaryListFoundError';
    }
}