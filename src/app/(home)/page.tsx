import Banner from "./_components/banner";
import Features from "./_components/features";
import Products from "./_components/products";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Features />
      <Products />
    </main>
  );
}
