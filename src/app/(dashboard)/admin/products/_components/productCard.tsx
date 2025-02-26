"use client"
import { deleteProductAction } from "@/_actions/productActions";
import { Button, buttonVariants } from "@/_components/ui/button";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductCard({ title, description, price, categoryName, images, checkoutUrl, id, detailsUrl }: Product) {
    const router = useRouter()

    async function handleDelete() {
        try {
            const res = await deleteProductAction({ productId: id })
            if (res.status === "Success") {
                toast.success("Success", { description: res.successMessage })
                router.push("/admin/products?page=1")
            } else {
                toast.error("Error", { description: res.errorMessage })
            }
        } catch {
            toast.error("Error!", {
                description: "Something went wrong. Please try again.",
            })
        }
    }
    return (
        <li className='p-4 rounded-xl dark:bg-slate-900 bg-slate-100'>
            <div>
                <Image
                    width={960}
                    height={640}
                    src={images[0]}
                    alt={title}
                    className="object-cover object-top w-full rounded-lg h-60"
                />
            </div>
            <div className="flex flex-col items-center justify-center p-4">
                <h3 className="text-base font-semibold text-center self-start">
                    {title}
                </h3>
                <p className="text-sm text-center self-start">
                    {categoryName}
                </p>
                <p className="text-base text-center self-start">
                    ${price}
                </p>
                <p className="text-sm text-center md:text-left mt-2 line-clamp-4">
                    {description}
                </p>
                <p className="text-base text-center self-start mt-4">
                    Checkout Url: <Link href={checkoutUrl} className={`text-blue-600 underline`} target="_blank"> {checkoutUrl}</Link>
                </p>
                <p className="text-base text-center self-start mt-4">
                    Details Url: <Link href={detailsUrl} className={`text-blue-600 underline`} target="_blank"> {detailsUrl}</Link>
                </p>
                <div className="flex gap-2 items-center mt-4">
                    <Link href={`/admin/products/${title.replace(" ", "-")}-${id}`} className={`${buttonVariants()}`}>
                        Edit
                    </Link>
                    <Button onClick={handleDelete} variant={"destructive"}>
                        Delete
                    </Button>
                </div>
            </div>
        </li>
    )
}