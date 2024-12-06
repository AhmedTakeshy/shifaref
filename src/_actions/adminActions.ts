"use server"
import { createBlogPostSchema, CreateBlogPostSchema, CreateModeratorSchema, createModeratorSchema, } from "@/lib/formsSchemas";
import { revalidateTag, unstable_cacheTag as cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { Blog, Contact } from "@prisma/client";
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

export async function deleteMessage(id: number): Promise<ServerResponse<null>> {
    try {
        const message = await prisma.contact.delete({
            where: {
                id
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
            successMessage: "Message deleted successfully",
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

export async function createBlogPostAction(values: CreateBlogPostSchema, userId: number): Promise<ServerResponse<null>> {
    try {
        const result = await createBlogPostSchema.safeParseAsync(values)

        if (!result.success) {
            return { status: "Error", errorMessage: "Something wrong with entered data.", statusCode: 401 }
        }
        const { title, content, tags, published, } = result.data
        await prisma.blog.create({
            data: {
                title,
                content,
                tags: {
                    connectOrCreate: tags?.map((tag) => {
                        return {
                            where: { name: tag },
                            create: { name: tag }
                        }
                    })
                },
                published,
                user: {
                    connect: { id: userId }
                }
            }
        })
        revalidateTag("get-blog-posts")
        return {
            status: "Success",
            successMessage: `Blog post has been created successfully with this title ${title}`,
            statusCode: 201,
            data: null
        }
    } catch {
        return { status: "Error", errorMessage: "Something went wrong!", statusCode: 401 }
    }
}


type BlogPostsMetadata = {
    blogPosts: Blog[],
    metadata: PaginationMetadata
}
type BlogPostsProps = {
    page?: string
    search?: {
        title?: string,
        content?: string,
        published?: boolean
    }
}
export async function getBlogPosts({ page, search }: BlogPostsProps): Promise<ServerResponse<BlogPostsMetadata>> {
    "use cache"
    cacheTag("get-blog-posts")
    const pageNumber = page ? Number(page) : 1
    try {
        const blogPosts = await prisma.blog.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search?.title,
                            mode: "insensitive"
                        },
                    },
                    {
                        content: {
                            contains: search?.content,
                            mode: "insensitive"
                        }
                    },
                    {
                        published: search?.published
                    }
                ]
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                image: true,
                tags: {
                    select: {
                        name: true
                    }
                },
                userId: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: (pageNumber - 1) * 8,
            take: 8,
        })
        if (!blogPosts) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Blog posts not found!",
            }
        }
        const totalBlogPosts = await prisma.blog.count({
            where: {
                OR: [
                    {
                        title: {
                            contains: search?.title,
                            mode: "insensitive"
                        },
                    },
                    {
                        content: {
                            contains: search?.content,
                            mode: "insensitive"
                        }
                    },
                    {
                        published: search?.published
                    }
                ]
            }
        })
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Blog posts fetched successfully",
            data: {
                blogPosts,
                metadata: {
                    hasNextPage: totalBlogPosts > pageNumber * 8,
                    totalPages: Math.ceil(totalBlogPosts / 8),
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


export async function updateBlogPostAction(values: CreateBlogPostSchema, id: number): Promise<ServerResponse<null>> {
    try {
        const result = await createBlogPostSchema.safeParseAsync(values)

        if (!result.success) {
            return { status: "Error", errorMessage: "Something wrong with entered data.", statusCode: 401 }
        }
        const { title, content, tags, published, } = result.data
        await prisma.blog.update({
            where: {
                id
            },
            data: {
                title,
                content,
                tags: {
                    connectOrCreate: tags?.map((tag) => {
                        return {
                            where: { name: tag },
                            create: { name: tag }
                        }
                    })
                },
                published,
            }
        })
        revalidateTag("get-blog-posts")
        return {
            status: "Success",
            successMessage: `Blog post has been updated successfully with this title ${title}`,
            statusCode: 201,
            data: null
        }
    } catch {
        return { status: "Error", errorMessage: "Something went wrong!", statusCode: 401 }
    }
}

export async function deleteBlogPostAction(id: number): Promise<ServerResponse<null>> {
    try {
        const blogPost = await prisma.blog.delete({
            where: {
                id
            }
        })
        if (!blogPost) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Blog post not found!",
            }
        }
        revalidateTag("get-blog-posts")
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Blog post deleted successfully",
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