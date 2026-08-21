export declare function SuccessResponse<T>(DataClass: new () => T): {
    new (): {
        success: boolean;
        data: T;
        ts: string;
    };
};
export declare function SuccessArrayResponse<T>(DataClass: new () => T): {
    new (): {
        success: boolean;
        items: T[];
        ts: string;
    };
};
export declare function PaginatedResponse<T>(DataClass: new () => T): {
    new (): {
        success: boolean;
        items: T[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        ts: string;
    };
};
export declare function CursorPaginatedResponse<T>(DataClass: new () => T): {
    new (): {
        success: boolean;
        items: T[];
        nextCursor?: string;
        ts: string;
    };
};
export declare class ErrorDetailDto {
    code: number;
    message: string;
    detail: string[];
}
export declare class ErrorResponse {
    success: boolean;
    data: ErrorDetailDto;
    ts: string;
    path: string;
}
export declare class BadRequestResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
export declare class UnauthorizedResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
export declare class ForbiddenResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
export declare class NotFoundResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
export declare class ValidationErrorResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
export declare class ConflictResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
export declare class RateLimitResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
export declare class InternalErrorResponse extends ErrorResponse {
    data: ErrorDetailDto;
}
