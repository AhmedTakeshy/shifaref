import { Suspense } from "react";
import Banner from "./_components/banner";
import Features from "./_components/features";
import Products from "./_components/products";
import SkeletonCard from "./_components/skeletonCard";


export default function Home() {
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
        <Products />
      </Suspense>
    </main>
  );
}
