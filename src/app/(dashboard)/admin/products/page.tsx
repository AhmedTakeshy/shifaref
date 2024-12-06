import { getProducts } from "@/_actions/productActions"
import Search from "../_components/search"
import ProductCard from "./_components/productCard"
import Link from "next/link"
import prisma from "@/lib/prisma"
import PaginationControl from "@/_components/paginationControl"


export async function generateStaticParams() {
    const response = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
        },
    })

    return response.map((product) => ({
        productTitleId: `${product.title.replace(" ", "-")}-${product.id}`,
    }))
}

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function page({ searchParams }: Props) {
    const { title, category, page } = await searchParams
    const response = await getProducts({ page, search: { title, category } })


    return (
        <div className="flex flex-col gap-10 dark:bg-slate-800 bg-slate-200 p-5 rounded-xl mt-5">
            <div className="flex items-center justify-between my-5">
                <Search placeholder="Search products" option1="title" option2="category" />
                <Link href="/admin/products/new-product" className="inline px-5 py-3 leading-5 text-white transition-colors duration-300 bg-light-green-70 dark:bg-dark-green-15 border border-transparent rounded-lg shadow-2xl focus:outline-none active:bg-light-green-85 hover:bg-light-green-80 dark:active:bg-dark-green-25 dark:hover:bg-dark-green-25">
                    Add new product
                </Link>
            </div>

            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
                {response.status === "Success" ? (
                    <>
                        {response.data.products.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                        <PaginationControl className="col-span-full" metadata={response.data.metadata} currentPage={Number(page) || 1} />
                    </>
                ) : (
                    <p className="text-semibold text-base text-rose-600">
                        {response.errorMessage}
                    </p>
                )}
            </ul>
        </div>
    )
}
