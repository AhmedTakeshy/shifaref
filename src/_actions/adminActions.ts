"use server"
import { CreateModeratorSchema, createModeratorSchema, } from "@/lib/formsSchemas";
import { revalidateTag, unstable_cacheTag as cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { Contact } from "@prisma/client";
import { hash } from "bcryptjs";



export async function createModeratorAction(values: CreateModeratorSchema): Promise<ServerResponse<null>> {
    try {
        const result = await createModeratorSchema.safeParseAsync(values)

        if (!result.success) {
            return { status: "Error", errorMessage: "Something wrong with entered data.", statusCode: 401 }
        }
        const { first_name, last_name, email, password, role, } = result.data
        const existedUserEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (existedUserEmail) {
            return { status: "Error", errorMessage: "There is a user already with this email!", statusCode: 409 }
        }
        const hashedPassword = await hash(password, 10)
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role,
            }
        })
        const { first_name: fName, last_name: lName } = user
        revalidateTag("get-moderators")
        return {
            status: "Success",
            successMessage: `User has been created successfully with this name ${fName} ${lName}`,
            statusCode: 201,
            data: null
        }
    } catch {
        return { status: "Error", errorMessage: "Something went wrong!", statusCode: 401 }
    }
}

type MessagesMetadata = {
    messages: Contact[],
    metadata: PaginationMetadata
}
type MessagesProps = {
    page?: string
    search?: {
        email?: string,
        name?: string,
    }
    read: boolean
}
export async function getMessages({ page, search, read }: MessagesProps): Promise<ServerResponse<MessagesMetadata>> {
    "use cache"
    cacheTag("get-messages")
    const pageNumber = page ? Number(page) : 1
    try {
        const messages = await prisma.contact.findMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: search?.email,
                            mode: "insensitive"
                        },
                    },
                    {
                        fullName: {
                            contains: search?.name,
                            mode: "insensitive"
                        }
                    },
                    { read }
                ]
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                message: true,
                read: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: (pageNumber - 1) * 8,
            take: 8,
        })
        if (!messages) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Messages not found!",
            }
        }
        const totalMessages = await prisma.contact.count({
            where: {
                OR: [
                    {
                        email: {
                            contains: search?.email,
                            mode: "insensitive"
                        },
                    },
                    {
                        fullName: {
                            contains: search?.name,
                        }
                    },
                    { read }
                ]
            }
        })
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Messages fetched successfully",
            data: {
                messages,
                metadata: {
                    hasNextPage: totalMessages > pageNumber * 8,
                    totalPages: Math.ceil(totalMessages / 8),
                }
            },
        }
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        }
    }
}

export async function readMessage(id: number): Promise<ServerResponse<null>> {
    try {
        const message = await prisma.contact.update({
            where: {
                id
            },
            data: {
                read: true
            }
        })
        if (!message) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Message not found!",
            }
        }
        revalidateTag("get-messages")
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Message read successfully",
            data: null,
        }
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        }
    }
}