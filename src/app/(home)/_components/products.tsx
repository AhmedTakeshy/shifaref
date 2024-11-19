import Title from "@/_components/title";
import ProductCard from "./productCard";
// [
//     '/crave/Crave_Burner_PRO1.jpg',
//     '/crave/Crave_Burner_PRO2.jpg',
//     '/crave/Crave_Burner_PRO3.jpg',
//     '/crave/Crave_Burner_PRO4.jpg',
//     '/crave/Crave_Burner_PRO5.jpg',
//     '/crave/Crave_Burner_PRO6.jpg',
//     '/crave/Crave_Burner_PRO7.jpg',
//     '/crave/Crave_Burner_PRO8.jpg',
// ],
const products = [
    {
        id: 1,
        title: 'Crave Burner',
        category: 'body care',
        price: "10.99",
        imageUrl: "/crave/Crave_Burner_PRO1.jpg",
        offerUrl: '/products/nail-polish'
    },
    {
        id: 2,
        title: 'Eyevita',
        category: 'body care',
        price: "15.99",
        imageUrl: '/eyevita/Eyevita-Plus-PRO1.jpg',
        offerUrl: '/products/lipstick'
    },
    {
        id: 3,
        title: 'Flexomore',
        category: 'body care',
        price: "12.99",
        imageUrl: '/flex/Flexomore_PRO1.jpg',
        offerUrl: '/products/mascara'
    },
    {
        id: 4,
        title: 'Matcha Extreme',
        category: 'body care',
        price: "25.99",
        imageUrl: '/matcha/Matcha-Extreme-PRO1.jpg',
        offerUrl: '/products/eyeshadow-palette'
    },
    {
        id: 5,
        title: 'Prenatalin',
        category: 'body care',
        price: "19.99",
        imageUrl: '/prenatalin/Prenatalin_PRO_1.jpg',
        offerUrl: '/products/foundation'
    },
    {
        id: 6,
        title: 'Prostan',
        category: 'body care',
        price: "29.99",
        imageUrl: '/prostan/Prostan-Plus-PRO1.jpg',
        offerUrl: '/products/makeup-brushes'
    },
]
export default function Products() {
    return (
        <section id="products" className='container flex flex-col items-center mb-12'>
            <Title title='Our Products' subtitle='Here you can find everything you are looking for.' />
            <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 lg:gap-8 md:gap-6'>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    )
}
