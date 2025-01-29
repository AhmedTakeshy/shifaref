import { getProducts } from "@/_actions/productActions";
import ProductCard from "./productCard";
import PaginationControl from "@/_components/paginationControl";
import Title from "./title";
import Search from "./search";
import CategoryFilter from "./categoryFilter";


type ProductsProps = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export const experimental_ppr = true;

export default async function Products({ searchParams }: ProductsProps) {
    const { category, title, page } = await searchParams;
    const res = await getProducts({
        search: { category, title },
        page: page ? page : "1",
    });
    return (
        <section id="products" className='container flex flex-col items-center mb-12'>
            <Title
                title='Exclusive Collection'
                subtitle={`Whatever you need to elevate your health and beauty, you'll find it here.`}
            />
            <Search />
            <CategoryFilter />
            {res.status === "Success" ? res.data.products.length === 0 ? (
                <h2 className="text-center text-2xl mt-12">No products with this category at the moment!</h2>
            ) : (
                <>
                    <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 '>

                        {res.data.products.map((product) =>
                            <ProductCard
                                key={product.id}
                                {...product}
                            />
                        )
                        }
                    </ul>
                    <PaginationControl
                        currentPage={page ? parseInt(page) : 1}
                        metadata={res.data.metadata}
                        scrollToTop={false}
                    />
                </>
            ) : (
                <h2 className="text-center text-rose-600 text-2xl mt-12">
                    {res.errorMessage}
                </h2>
            )}
        </section>
    )
}
