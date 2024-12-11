"use server"
import { revalidateTag, unstable_cacheTag as cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { Blog, Prisma, Tag } from "@prisma/client";
import { createBlogPostSchema, CreateBlogPostSchema } from "@/lib/formsSchemas";


export async function createBlogPostAction(values: CreateBlogPostSchema, userId: number): Promise<ServerResponse<null>> {
    try {
        const result = await createBlogPostSchema.safeParseAsync(values)

        if (!result.success) {
            return { status: "Error", errorMessage: "Something wrong with entered data.", statusCode: 401 }
        }
        console.log("🚀 ~ createBlogPostAction ~ result:", result)
        const { title, content, tags, published, } = result.data
        await prisma.blog.create({
            data: {
                title,
                content,
                tags: tags ? {
                    create: tags?.trim().split(",").map((tag) => ({
                        name: tag
                    }))
                } : undefined,
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
    } catch (err) {
        console.log("🚀 ~ createBlogPostAction ~ err:", err)
        return { status: "Error", errorMessage: "Something went wrong!", statusCode: 401 }
    }
}


export type BlogWithTags = Blog & { tags: Tag[] }
type BlogPostsMetadata = {
    blogPosts: BlogWithTags[],
    metadata: PaginationMetadata
}
type BlogPostsProps = {
    page?: string
    search?: {
        title?: string,
        tag?: string,
        published?: boolean
    }
}
export async function getBlogPosts({ page, search }: BlogPostsProps): Promise<ServerResponse<BlogPostsMetadata>> {
    "use cache"
    cacheTag("get-blog-posts")
    const pageNumber = page ? Number(page) : 1
    const whereCondition: Prisma.BlogWhereInput = {
        OR: [] as Prisma.BlogWhereInput['OR']
    };
    try {
        if (search?.title) {
            whereCondition.OR?.push({
                title: {
                    contains: search.title,
                    mode: "insensitive"
                }
            });
        }

        if (search?.tag) {
            whereCondition.OR?.push({
                tags: {
                    some: { name: { contains: search.tag } },
                }
            });
        }
        if (search?.published) {
            whereCondition.OR?.push({
                published: search?.published
            });
        }
        const blogPosts = await prisma.blog.findMany({
            where: whereCondition.OR && whereCondition.OR.length > 0 ? whereCondition : {},
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
                        tags: {
                            some: { name: { contains: search?.tag } },
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
                blogPosts: blogPosts as BlogWithTags[],
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

export async function getBlogPostById(id: number): Promise<ServerResponse<BlogWithTags>> {
    try {
        const blogPost = await prisma.blog.findUnique({
            where: {
                id
            },
            include: {
                tags: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!blogPost) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Blog post not found!",
            }
        }
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Blog post fetched successfully",
            data: blogPost as BlogWithTags,
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
                    connectOrCreate: tags?.trim().split(",").map((tag) => {
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