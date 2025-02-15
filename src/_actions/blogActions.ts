"use server";
import { revalidateTag, unstable_cacheTag as cacheTag } from "next/cache";
import prisma from "@/lib/prisma";
import { Blog, Tag } from "@prisma/client";
import { createBlogPostSchema, CreateBlogPostSchema } from "@/lib/formsSchemas";

export async function createBlogPostAction(
    values: CreateBlogPostSchema,
    userId: number
): Promise<ServerResponse<null>> {
    try {
        const result = await createBlogPostSchema.safeParseAsync(values);

        if (!result.success) {
            return {
                status: "Error",
                errorMessage: "Something wrong with entered data.",
                statusCode: 401,
            };
        }
        const { title, content, tags, published } = result.data;
        await prisma.blog.create({
            data: {
                title,
                content,
                tags: tags
                    ? {
                        create: tags
                            ?.trim()
                            .split(",")
                            .map((tag) => ({
                                name: tag.toLowerCase(),
                            })),
                    }
                    : undefined,
                published,
                user: {
                    connect: { id: userId },
                },
            },
        });
        revalidateTag("get-blog-posts");
        revalidateTag("get-tags");
        return {
            status: "Success",
            successMessage: `Blog post has been created successfully with this title ${title}`,
            statusCode: 201,
            data: null,
        };
    } catch {
        return {
            status: "Error",
            errorMessage: "Something went wrong!",
            statusCode: 401,
        };
    }
}

export type BlogWithTags = Blog & { tags: Tag[] };
type BlogPostsMetadata = {
    blogPosts: BlogWithTags[];
    metadata: PaginationMetadata;
};
type BlogPostsProps = {
    page?: string;
    search?: {
        title?: string;
        tag?: string;
        published?: boolean;
    };
};

export async function getBlogPosts({
    page,
    search,
}: BlogPostsProps): Promise<ServerResponse<BlogPostsMetadata>> {
    "use cache";
    cacheTag("get-blog-posts");
    const pageNumber = parseInt(page || "1");
    try {
        const blogPosts = await prisma.blog.findMany({
            where: {
                title: {
                    contains: search?.title || "",
                    mode: "insensitive",
                },
                content: {
                    contains: search?.title || "",
                    mode: "insensitive",
                },
                published: search?.published,
                tags: {
                    some: {
                        name: {
                            contains: search?.tag || "",
                            mode: "insensitive",
                        },
                    },
                },
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                image: true,
                tags: {
                    select: {
                        name: true,
                    },
                },
                userId: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: (pageNumber - 1) * 8,
            take: 8,
        });
        if (!blogPosts) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Blog posts not found!",
            };
        }
        const totalBlogPosts = await prisma.blog.count({
            where: {
                title: {
                    contains: search?.title || "",
                    mode: "insensitive",
                },
                content: {
                    contains: search?.title || "",
                    mode: "insensitive",
                },
                published: search?.published,
                tags: {
                    some: {
                        name: {
                            contains: search?.tag || "",
                            mode: "insensitive",
                        },
                    },
                },
            },
        });
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Blog posts fetched successfully",
            data: {
                blogPosts: blogPosts as BlogWithTags[],
                metadata: {
                    hasNextPage: totalBlogPosts > pageNumber * 8,
                    totalPages: Math.ceil(totalBlogPosts / 8),
                },
            },
        };
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        };
    }
}

export async function getBlogPostById(
    id: number
): Promise<ServerResponse<BlogWithTags>> {
    try {
        const blogPost = await prisma.blog.findUnique({
            where: {
                id,
            },
            include: {
                tags: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!blogPost) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Blog post not found!",
            };
        }
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Blog post fetched successfully",
            data: blogPost as BlogWithTags,
        };
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        };
    }
}

export async function getBlogPostBySlug(
    slug: string
): Promise<ServerResponse<BlogWithTags>> {
    try {
        const title = slug.split("_").join(" ");
        const blogPost = await prisma.blog.findFirst({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            },
            include: {
                tags: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!blogPost) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Blog post not found!",
            };
        }
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Blog post fetched successfully",
            data: blogPost as BlogWithTags,
        };
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        };
    }
}

export async function updateBlogPostAction(values: CreateBlogPostSchema, id: number): Promise<ServerResponse<null>> {
    try {
        const result = await createBlogPostSchema.safeParseAsync(values);
        if (!result.success) {
            return {
                status: "Error",
                errorMessage: "Something wrong with entered data.",
                statusCode: 401,
            };
        }
        const { title, content, tags, published } = result.data;
        await prisma.blog.update({
            where: {
                id,
            },
            data: {
                title,
                content,
                tags: {
                    connectOrCreate: tags
                        ?.trim()
                        .split(",")
                        .map((tag) => ({
                            where: { name: tag },
                            create: { name: tag },
                        })),
                },
                published,
            },
        });
        revalidateTag("get-blog-posts");
        return {
            status: "Success",
            successMessage: `Blog post has been updated successfully with this title ${title}`,
            statusCode: 200,
            data: null,
        };
    } catch (err) {
        console.log("🚀 ~ err:", err)
        return {
            status: "Error",
            errorMessage: "Something went wrong!",
            statusCode: 401,
        };
    }
}

export async function deleteBlogPostAction(
    id: number
): Promise<ServerResponse<null>> {
    try {
        const blogPost = await prisma.blog.delete({
            where: {
                id,
            },
        });
        if (!blogPost) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Blog post not found!",
            };
        }
        revalidateTag("get-blog-posts");
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Blog post deleted successfully",
            data: null,
        };
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        };
    }
}

export async function getTags(): Promise<ServerResponse<Tag[]>> {
    "use cache";
    cacheTag("get-tags");
    try {
        const tags = await prisma.tag.findMany({ distinct: ["name"] });
        if (!tags) {
            return {
                statusCode: 404,
                status: "Error",
                errorMessage: "Tags not found!",
            };
        }
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Tags fetched successfully",
            data: tags,
        };
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        };
    }
}
