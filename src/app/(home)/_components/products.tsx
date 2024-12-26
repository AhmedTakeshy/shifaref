"use client"
import Title from "@/app/(home)/_components/title";
import ProductCard from "./productCard";
import Search from "./search";
import { useSearchParams } from "next/navigation";
import { Product } from "@prisma/client";


type ProductsProps = {
    products: Product[]
}

export default function Products({ products }: ProductsProps) {
    const searchParams = useSearchParams()
    return (
        <section id="products" className='container flex flex-col items-center mb-12'>
            <Title
                title='Exclusive Collection'
                subtitle={`Whatever you need to elevate your health and beauty, you'll find it here.`}
            />
            <Search />
            <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 '>
                {products
                    .filter(product => {
                        const query = searchParams.get('q')?.toLowerCase() || searchParams.get("category")?.toLowerCase() || '';
                        return query.includes(product.title.toLowerCase()) || query.includes(product.categoryName.toLowerCase()) || "" === query;
                    })
                    .map((product) => {
                        const content = () => <p>{product.description}</p>
                        return (
                            <ProductCard
                                key={product.id}
                                {...product}
                                description={content}
                            />
                        )
                    })
                }
            </ul>
        </section>
    )
}
