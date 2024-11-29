"use server"

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
                            contains: search?.category,
                            mode: "insensitive"
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
                            contains: search?.category,
                            mode: "insensitive"
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