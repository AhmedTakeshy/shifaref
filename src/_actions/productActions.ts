"use server"

import { CreateOrUpdateProductSchema, createOrUpdateProductSchema } from "@/lib/formsSchemas"
import prisma from "@/lib/prisma"
import { Product } from "@prisma/client"

type ProductsMetadata = {
    products: Product[],
    metadata: PaginationMetadata
}
type ProductsProps = {
    page?: string
    search?: {
        title?: string,
        category?: string,
    }
}
export async function getProducts({ page, search }: ProductsProps): Promise<ServerResponse<ProductsMetadata>> {
    'use cache'
    const pageNumber = parseInt(page || "1")
    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search?.title,
                            mode: "insensitive"
                        }
                    },
                    {
                        category: {
                            name: search?.category,
                        }
                    }
                ]
            },
            skip: (pageNumber - 1) * 12,
            take: 12,
        })

        const totalProducts = await prisma.product.count({
            where: {
                OR: [
                    {
                        title: {
                            contains: search?.title,
                            mode: "insensitive"
                        }
                    },
                    {
                        category: {
                            name: search?.category,
                        }
                    }
                ]
            }
        })

        return {
            status: "Success",
            data: {
                products,
                metadata: {
                    hasNextPage: totalProducts > pageNumber * 12,
                    totalPages: Math.ceil(totalProducts / 12),
                },
            },
            successMessage: "Products fetched successfully",
            statusCode: 200
        }
    } catch {
        return { status: "Error", errorMessage: "Failed to fetch the products!", statusCode: 401 }
    }
}

export async function createProduct(data: CreateOrUpdateProductSchema): Promise<ServerResponse<Product>> {
    try {
        const result = await createOrUpdateProductSchema.safeParseAsync(data)
        if (!result.success) {
            return { status: "Error", errorMessage: "Invalid form data!", statusCode: 401 }
        }
        const { title, description, price, category, images, checkoutUrl, label } = result.data
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: price,
                category: {
                    connectOrCreate: {
                        where: {
                            name: category
                        },
                        create: {
                            name: category,
                            label
                        }
                    }
                },
                images: images,
                checkoutUrl: checkoutUrl
            }
        })

        return {
            status: "Success",
            data: product,
            successMessage: "Product created successfully",
            statusCode: 200
        }
    } catch {
        return { status: "Error", errorMessage: "Failed to create the product!", statusCode: 401 }
    }
}