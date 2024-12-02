import { buttonVariants } from "@/_components/ui/button";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ title, description, price, category, images, checkoutUrl }: Product) {
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
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-base font-semibold text-center md:text-left">
                    {title}
                </h3>
                <p className="text-sm text-center md:text-left">
                    {category}
                </p>
                <p className="text-base text-center md:text-left">
                    ${price}
                </p>
                <p className="text-sm text-center md:text-left">
                    {description}
                </p>
                <Link href={checkoutUrl} className={`${buttonVariants()} self-end text-blue-600`}>
                    Edit product
                </Link>
            </div>
        </li>
    )
}