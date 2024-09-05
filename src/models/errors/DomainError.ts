export abstract class DomainError extends Error {
    public readonly code?: string;

    constructor(message: string, code?: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}

export class RestaurantSummaryFetchError extends DomainError {
    constructor(message: string = 'Unable to retrieve restaurant summaries', code: string = 'SUMMARY_FETCH_ERROR') {
        super(message, code);
    }
}

export class RestaurantDetailsFetchError extends DomainError {
    constructor(message: string = 'Unable to retrieve restaurant details', code: string = 'DETAILS_FETCH_ERROR') {
        super(message, code);
    }
}

export class NoRestaurantSummariesFoundError extends DomainError {
    constructor(message: string = 'No restaurant summaries found', code: string = 'NO_SUMMARIES_FOUND') {
        super(message, code);
    }
}

export class NoRestaurantDetailsFoundError extends DomainError {
    constructor(message: string = 'No restaurant details found', code: string = 'NO_DETAILS_FOUND') {
        super(message, code);
    }
}