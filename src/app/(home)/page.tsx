import { Suspense } from "react";
import Banner from "./_components/banner";
import Features from "./_components/features";
import Products from "./_components/products";
import SkeletonCard from "@/_components/skeletonCard";
import { getProducts } from "@/_actions/productActions";
import PaginationControl from "@/_components/paginationControl";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>
}
export const experimental_ppr = true;
export default async function Home({ searchParams }: Props) {
  const { category, title, page } = await searchParams;
  const res = await getProducts({
    search: { category, title },
    page: page ? page : "1",
  });
  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Features />
      <Suspense fallback={
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} className="mx-8 my-6" />
          ))}
        </ul>
      }>
        {res.status === "Success" && res.data.products.length > 0 && (
          <>
            <Products products={res.data.products} />
            <PaginationControl
              currentPage={page ? parseInt(page) : 1}
              metadata={res.data.metadata}
            />
          </>
        )}
      </Suspense>
    </main>
  );
}
