type ServerResponse<T> =
    | { successMessage: string; data: T; status: "Success"; statusCode: number }
    | { errorMessage: string; status: "Error"; statusCode: number }

type Metadata<T extends object> = {
    [K in keyof T]: T[K]
} & {
    metadata: {
        hasNextPage: boolean
        totalPages: number
    }
}


type PaginationMetadata = {
    hasNextPage: boolean
    totalPages: number
}
