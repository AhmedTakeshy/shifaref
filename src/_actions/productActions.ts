"use server"

import { unstable_cacheTag as cacheTag } from 'next/cache'
import { CreateProductSchema, createProductSchema, updateProductSchema, UpdateProductSchema } from "@/lib/formsSchemas"
import prisma from "@/lib/prisma"
import { uploadImage } from "@/lib/utils"
import { Prisma, Product } from "@prisma/client"
import { revalidateTag } from "next/cache"

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
    cacheTag("get-products")
    const pageNumber = parseInt(page || "1")
    const whereCondition: Prisma.ProductWhereInput = {
        OR: [] as Prisma.ProductWhereInput['OR']
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

        if (search?.category) {
            whereCondition.OR?.push({
                category: {
                    name: {
                        contains: search?.category,
                        mode: "insensitive"
                    }
                }
            });
        }

        const products = await prisma.product.findMany({
            where: whereCondition.OR && whereCondition.OR.length > 0 ? whereCondition : {},
            skip: Math.max(0, (pageNumber - 1) * 12),
            take: 12,
        });

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
                            name: {
                                contains: search?.category,
                                mode: "insensitive"
                            }
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

export async function createProductAction(data: CreateProductSchema): Promise<ServerResponse<Product>> {
    try {
        const result = await createProductSchema.safeParseAsync(data)
        if (!result.success) {
            return { status: "Error", errorMessage: "Invalid form data!", statusCode: 401 }
        }
        const { title, description, price, category, images, checkoutUrl } = result.data
        const uploadedUrls = [];
        for (const file of Array.from(images)) {
            const imageUrl = await uploadImage(file);
            if (imageUrl) uploadedUrls.push(imageUrl);
            else return { status: "Error", errorMessage: "Failed to upload the image!", statusCode: 401 }
        }
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
                        }
                    }
                },
                images: uploadedUrls,
                checkoutUrl: checkoutUrl
            }
        })
        revalidateTag("get-products")
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

export async function getProductById({ productId }: { productId: string }): Promise<ServerResponse<Product>> {
    const id = parseInt(productId)
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })
        if (!product) {
            return { status: "Error", errorMessage: "Product not found!", statusCode: 404 }
        }
        return {
            status: "Success",
            data: product,
            successMessage: "Product fetched successfully",
            statusCode: 200
        }
    } catch {
        return { status: "Error", errorMessage: "Failed to fetch the product!", statusCode: 401 }
    }
}

export async function updateProductAction({ data, productId }: { data: UpdateProductSchema, productId: number }): Promise<ServerResponse<Product>> {
    try {
        const result = await updateProductSchema.safeParseAsync(data)
        if (!result.success) {
            return { status: "Error", errorMessage: "Invalid form data!", statusCode: 401 }
        }
        const { title, description, price, category, images, checkoutUrl, oldImages } = result.data
        const uploadedUrls: string[] = [];
        if (images.length > 0) {
            for (const file of Array.from(images)) {
                const imageUrl = await uploadImage(file);
                if (imageUrl) uploadedUrls.push(imageUrl);
                else return { status: "Error", errorMessage: "Failed to upload the image!", statusCode: 401 }
            }
        }
        const product = await prisma.product.update({
            where: {
                id: productId
            },
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
                        }
                    }
                },
                images: uploadedUrls.concat(oldImages),
                checkoutUrl: checkoutUrl
            }
        })
        revalidateTag("get-products")
        return {
            status: "Success",
            data: product,
            successMessage: "Product updated successfully",
            statusCode: 200
        }
    } catch {
        return { status: "Error", errorMessage: "Failed to update the product!", statusCode: 401 }
    }
}