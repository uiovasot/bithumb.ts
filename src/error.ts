import type { ApiError } from './types';

export class BithumbApiError extends Error {
    public readonly code: number;
    public readonly message: string;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
        this.name = 'BithumbApiError';
    }

    static fromApiError({ error }: ApiError): BithumbApiError {
        return new BithumbApiError(error.name, error.message);
    }
}

export class BithumbApiKeyError extends Error {
    constructor() {
        super('Invalid API Key');
        this.name = 'BithumbApiKeyError';
    }
}

export class BithumbWSNotConnectedError extends Error {
    constructor() {
        super('WebSocket is not connected');
        this.name = 'BithumbWSNotConnectedError';
    }
}
