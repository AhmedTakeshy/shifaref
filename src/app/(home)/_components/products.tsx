"use client"
import Title from "@/_components/title";
import ProductCard from "./productCard";
import Search from "@/_components/search";
import { useSearchParams } from "next/navigation";


const products = [
    {
        id: 1,
        title: 'Crave Burner',
        category: 'body care',
        price: "10.99",
        checkoutUrl: "https://checkout.com",
        imagesSrc: [
            '/crave/Crave_Burner_PRO1.jpg',
            '/crave/Crave_Burner_PRO2.jpg',
            '/crave/Crave_Burner_PRO3.jpg',
            '/crave/Crave_Burner_PRO4.jpg',
            '/crave/Crave_Burner_PRO5.jpg',
            '/crave/Crave_Burner_PRO6.jpg',
            '/crave/Crave_Burner_PRO7.jpg',
            '/crave/Crave_Burner_PRO8.jpg',
        ],
        detailsUrl: '/products/nail-polish',
        description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid libero quo facere laudantium assumenda veritatis sit sint itaque corrupti quidem! Ab eaque reiciendis necessitatibus, quia tenetur error! Optio, similique aspernatur.
        Hic maiores adipisci aperiam facilis porro sed et neque quo, qui, perferendis velit laborum ab vitae nemo quibusdam in dolor praesentium fuga soluta possimus ullam iusto suscipit ipsum eius! Nobis!
        Architecto quidem tempore ipsam eveniet. Animi inventore omnis explicabo quidem dolor? Ullam ea, architecto dolorum est, aperiam vitae officiis labore quos animi, maxime quis? Ab nihil quo officia at quam.
        Ratione quo quisquam officia ut, repudiandae sit nam! Officiis, nobis! Ratione sapiente sed odit eum veniam eos doloribus reprehenderit? Rem sit quod voluptatum corporis iure cupiditate ut incidunt tempore ipsa!
        `,
    },
    {
        id: 2,
        title: 'Eyevita',
        category: 'body care',
        price: "15.99",
        checkoutUrl: "https://checkout.com",
        imagesSrc: [
            '/eyevita/Eyevita-Plus-PRO1.jpg',
            '/eyevita/Eyevita-Plus-PRO2.jpg',
            '/eyevita/Eyevita-Plus-PRO3.jpg',
            '/eyevita/Eyevita-Plus-PRO4.jpg',
            '/eyevita/Eyevita-Plus-PRO5.jpg',
            '/eyevita/Eyevita-Plus-PRO6.jpg',
            '/eyevita/Eyevita-Plus-PRO7.jpg',
            '/eyevita/Eyevita-Plus-PRO8.jpg',
            '/eyevita/Eyevita-Plus-PRO9.jpg',
            '/eyevita/Eyevita-Plus-PRO10.jpg',
        ],
        detailsUrl: '/products/lipstick',
        description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid libero quo facere laudantium assumenda veritatis sit sint itaque corrupti quidem! Ab eaque reiciendis necessitatibus, quia tenetur error! Optio, similique aspernatur.
        Hic maiores adipisci aperiam facilis porro sed et neque quo, qui, perferendis velit laborum ab vitae nemo quibusdam in dolor praesentium fuga soluta possimus ullam iusto suscipit ipsum eius! Nobis!
        Architecto quidem tempore ipsam eveniet. Animi inventore omnis explicabo quidem dolor? Ullam ea, architecto dolorum est, aperiam vitae officiis labore quos animi, maxime quis? Ab nihil quo officia at quam.
        Ratione quo quisquam officia ut, repudiandae sit nam! Officiis, nobis! Ratione sapiente sed odit eum veniam eos doloribus reprehenderit? Rem sit quod voluptatum corporis iure cupiditate ut incidunt tempore ipsa!
        `,
    },
    {
        id: 3,
        title: 'Flexomore',
        category: 'body care',
        price: "12.99",
        checkoutUrl: "https://checkout.com",
        imagesSrc: [
            '/flex/Flexomore_PRO1.jpg',
            '/flex/Flexomore_PRO2.jpg',
            '/flex/Flexomore_PRO3.jpg',
            '/flex/Flexomore_PRO4.jpg',
            '/flex/Flexomore_PRO5.jpg',
            '/flex/Flexomore_PRO6.jpg',
            '/flex/Flexomore_PRO7.jpg',
            '/flex/Flexomore_PRO8.jpg',
            '/flex/Flexomore_PRO9.jpg',
        ],
        detailsUrl: '/products/mascara',
        description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid libero quo facere laudantium assumenda veritatis sit sint itaque corrupti quidem! Ab eaque reiciendis necessitatibus, quia tenetur error! Optio, similique aspernatur.
        Hic maiores adipisci aperiam facilis porro sed et neque quo, qui, perferendis velit laborum ab vitae nemo quibusdam in dolor praesentium fuga soluta possimus ullam iusto suscipit ipsum eius! Nobis!
        Architecto quidem tempore ipsam eveniet. Animi inventore omnis explicabo quidem dolor? Ullam ea, architecto dolorum est, aperiam vitae officiis labore quos animi, maxime quis? Ab nihil quo officia at quam.
        Ratione quo quisquam officia ut, repudiandae sit nam! Officiis, nobis! Ratione sapiente sed odit eum veniam eos doloribus reprehenderit? Rem sit quod voluptatum corporis iure cupiditate ut incidunt tempore ipsa!
        `,
    },
    {
        id: 4,
        title: 'Matcha Extreme',
        category: 'body care',
        price: "25.99",
        checkoutUrl: "https://checkout.com",
        imagesSrc: [
            '/matcha/Matcha-Extreme-PRO1.jpg',
            '/matcha/Matcha-Extreme-PRO2.jpg',
            '/matcha/Matcha-Extreme-PRO3.jpg',
            '/matcha/Matcha-Extreme-PRO4.jpg',
            '/matcha/Matcha-Extreme-PRO5.jpg',
            '/matcha/Matcha-Extreme-PRO6.jpg',
            '/matcha/Matcha-Extreme-PRO7.jpg',
            '/matcha/Matcha-Extreme-PRO8.jpg',
        ],
        detailsUrl: '/products/eyeshadow-palette',
        description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid libero quo facere laudantium assumenda veritatis sit sint itaque corrupti quidem! Ab eaque reiciendis necessitatibus, quia tenetur error! Optio, similique aspernatur.
                    Hic maiores adipisci aperiam facilis porro sed et neque quo, qui, perferendis velit laborum ab vitae nemo quibusdam in dolor praesentium fuga soluta possimus ullam iusto suscipit ipsum eius! Nobis!
                    Architecto quidem tempore ipsam eveniet. Animi inventore omnis explicabo quidem dolor? Ullam ea, architecto dolorum est, aperiam vitae officiis labore quos animi, maxime quis? Ab nihil quo officia at quam.
                    Ratione quo quisquam officia ut, repudiandae sit nam! Officiis, nobis! Ratione sapiente sed odit eum veniam eos doloribus reprehenderit? Rem sit quod voluptatum corporis iure cupiditate ut incidunt tempore ipsa!
                    `,
    },
    {
        id: 5,
        title: 'Prenatalin',
        category: 'body care',
        price: "19.99",
        checkoutUrl: "https://checkout.com",
        imagesSrc: [
            '/prenatalin/Prenatalin_PRO_1.jpg',
            '/prenatalin/Prenatalin_PRO_2.jpg',
            '/prenatalin/Prenatalin_PRO_3.jpg',
            '/prenatalin/Prenatalin_PRO_4.jpg',
            '/prenatalin/Prenatalin_PRO_5.jpg',
            '/prenatalin/Prenatalin_PRO_6.jpg',
            '/prenatalin/Prenatalin_PRO_7.jpg',
            '/prenatalin/Prenatalin_PRO_8.jpg',
            '/prenatalin/Prenatalin_PRO_9.jpg',
            '/prenatalin/Prenatalin_PRO_10.jpg',
        ],
        detailsUrl: '/products/foundation',
        description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid libero quo facere laudantium assumenda veritatis sit sint itaque corrupti quidem! Ab eaque reiciendis necessitatibus, quia tenetur error! Optio, similique aspernatur.
                    Hic maiores adipisci aperiam facilis porro sed et neque quo, qui, perferendis velit laborum ab vitae nemo quibusdam in dolor praesentium fuga soluta possimus ullam iusto suscipit ipsum eius! Nobis!
                    Architecto quidem tempore ipsam eveniet. Animi inventore omnis explicabo quidem dolor? Ullam ea, architecto dolorum est, aperiam vitae officiis labore quos animi, maxime quis? Ab nihil quo officia at quam.
                    Ratione quo quisquam officia ut, repudiandae sit nam! Officiis, nobis! Ratione sapiente sed odit eum veniam eos doloribus reprehenderit? Rem sit quod voluptatum corporis iure cupiditate ut incidunt tempore ipsa!
                    `,
    },
    {
        id: 6,
        title: 'Prostan',
        category: 'body care',
        price: "29.99",
        checkoutUrl: "https://checkout.com",
        imagesSrc: [
            '/prostan/Prostan-Plus-PRO1.jpg',
            '/prostan/Prostan-Plus-PRO2.jpg',
            '/prostan/Prostan-Plus-PRO3.jpg',
            '/prostan/Prostan-Plus-PRO4.jpg',
            '/prostan/Prostan-Plus-PRO5.jpg',
            '/prostan/Prostan-Plus-PRO6.jpg',
        ],
        detailsUrl: '/products/makeup-brushes',
        description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid libero quo facere laudantium assumenda veritatis sit sint itaque corrupti quidem! Ab eaque reiciendis necessitatibus, quia tenetur error! Optio, similique aspernatur.
                    Hic maiores adipisci aperiam facilis porro sed et neque quo, qui, perferendis velit laborum ab vitae nemo quibusdam in dolor praesentium fuga soluta possimus ullam iusto suscipit ipsum eius! Nobis!
                    Architecto quidem tempore ipsam eveniet. Animi inventore omnis explicabo quidem dolor? Ullam ea, architecto dolorum est, aperiam vitae officiis labore quos animi, maxime quis? Ab nihil quo officia at quam.
                    Ratione quo quisquam officia ut, repudiandae sit nam! Officiis, nobis! Ratione sapiente sed odit eum veniam eos doloribus reprehenderit? Rem sit quod voluptatum corporis iure cupiditate ut incidunt tempore ipsa!
                    `,
    },
]

export default function Products() {
    const searchParams = useSearchParams()
    return (
        <section id="products" className='container flex flex-col items-center mb-12'>
            <Title
                title='Exclusive Collection'
                subtitle={`Whatever you need to elevate your health and beauty, you'll find it here.`} />
            <Search />
            <ul className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8 md:gap-6'>
                {products
                    .filter(product => product.title.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || ''))
                    .map((product) => {
                        const contnet = () => <p>{product.description}</p>
                        return (
                            <ProductCard
                                key={product.id}
                                {...product}
                                description={contnet}
                            />
                        )
                    })
                }
            </ul>
        </section>
    )
}
