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

type ContactForm = {
    fullName: string
    email: string
    subject: string
    phone: string
    message: string
    read: boolean
}

type PaginationMetadata = {
    hasNextPage: boolean
    totalPages: number
}