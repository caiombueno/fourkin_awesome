export default abstract class DataSourceError extends Error {
    constructor(public readonly originalError?: any) {
        super();
        this.name = 'DataSourceError';
        if (originalError) {
            this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
        }
    }
}


export class DataSourceRequestError extends DataSourceError {
    public customMessage: string | null | undefined;
    constructor(message?: string | null) {
        super();
        this.name = 'DataSourceRequestError';
        this.customMessage = message;
    }
}

export class EmptyResultError extends DataSourceError {
    constructor(originalError?: any) {
        super(originalError);
        this.name = 'EmptyResultError';
    }
}

export class DataFormatFailureError extends Error {
    constructor(public readonly rawData?: any) {
        super();
        this.name = 'DataFormatFailureError';
    }
}
