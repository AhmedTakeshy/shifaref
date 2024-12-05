import { buttonVariants } from "@/_components/ui/button";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ title, description, price, categoryName, images, checkoutUrl, id }: Product) {
    return (
        <li className='p-4 rounded-xl dark:bg-slate-800 bg-slate-200'>
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
                <Link href={`/admin/products/${title.replace(" ", "-")}-${id}`} className={`${buttonVariants()} mt-4`}>
                    Edit product
                </Link>
            </div>
        </li>
    )
}