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
        Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} className="mx-8 my-6" />
        ))
      }>
        <Products />
      </Suspense>
    </main>
  );
}
