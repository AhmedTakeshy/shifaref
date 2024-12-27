"use client"
import { useState, useTransition } from "react";
import ProductForm from "../../_components/productForm";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/_components/ui/carousel"
import Image from "next/image"
import { Form } from "@/_components/ui/form";
import { Product } from "@prisma/client";
import { updateProductSchema, UpdateProductSchema } from "@/lib/formsSchemas";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductAction } from "@/_actions/productActions";
import { useRouter } from "next/navigation";
import { Button } from "@/_components/ui/button";
import { deleteImage } from "@/lib/utils";

type UpdateProductProps = {
    product: Product
}
export default function UpdateProduct({ product }: UpdateProductProps) {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [removeImagePending, startTransition] = useTransition()
    const [images, setImages] = useState<string[]>(product.images)
    console.log("🚀 ~ UpdateProduct ~ optimisticImages:", images)
    const router = useRouter()


    const form = useForm<UpdateProductSchema>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            title: product?.title ?? "",
            description: product?.description ?? "",
            price: product?.price ?? 0,
            category: product?.categoryName ?? "",
            images: [],
            oldImages: images,
            checkoutUrl: product?.checkoutUrl ?? "",
        },
    })


    async function updateProduct(data: UpdateProductSchema) {
        setIsPending(true)
        try {
            const result = await updateProductSchema.safeParseAsync(data)
            if (!result.success) {
                toast.error("Error!", {
                    description: "Something went wrong with the form data. Please try again.",
                })
                return
            }
            const res = await updateProductAction({
                data: { ...result.data, oldImages: images },
                productId: product!.id
            })
            if (res.status === "Success") {
                toast.success("Success", { description: res.successMessage })
                router.push("/admin/products?page=1")
            } else {
                toast.error("Error", { description: res.errorMessage })
            }
        } catch {
            toast("Error!", {
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setIsPending(false)
        }
    }

    async function handleDeleteImage(image: string) {
        setImages(prev => prev.filter((img) => img !== image));
        const res = await deleteImage(image);
        if (res.status === "Error") {
            setImages(prev => [...prev, image]);
            toast.error("Error", { description: res.errorMessage });
        } else {
            toast.success("Success", { description: res.successMessage });
        }

    }


    return (
        <div className="flex flex-col gap-8 w-full">
            <Form {...form}>
                <ProductForm
                    isPending={isPending}
                    onSubmit={updateProduct}
                    mode="update"
                />
            </Form>
            {images.length > 0 && (
                <Carousel>
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem key={`${image}-${index}`}>
                                <Image
                                    width={960}
                                    height={640}
                                    src={image}
                                    alt={product?.title ?? "Product Image"}
                                    className="object-cover sm:rounded-tr-lg sm:rounded-tl-lg"
                                />
                                <Button
                                    variant={"destructive"}
                                    onClick={() => {
                                        startTransition(() => handleDeleteImage(image))
                                    }}
                                    className="mt-2 text-right"
                                    disabled={removeImagePending}
                                >
                                    {removeImagePending ? "Deleting" : "Delete image"}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="dark:text-white" />
                    <CarouselNext className="dark:text-white" />
                </Carousel>
            )}
        </div>
    )
}
