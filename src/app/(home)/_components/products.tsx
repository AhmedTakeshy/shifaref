"use client"
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
        checkoutUrl: "https://checkout.com",
        imageSrc: [
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
        imageSrc: '/eyevita/Eyevita-Plus-PRO1.jpg',
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
        imageSrc: '/flex/Flexomore_PRO1.jpg',
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
        imageSrc: '/matcha/Matcha-Extreme-PRO1.jpg',
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
        imageSrc: '/prenatalin/Prenatalin_PRO_1.jpg',
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
        imageSrc: '/prostan/Prostan-Plus-PRO1.jpg',
        detailsUrl: '/products/makeup-brushes',
        description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid libero quo facere laudantium assumenda veritatis sit sint itaque corrupti quidem! Ab eaque reiciendis necessitatibus, quia tenetur error! Optio, similique aspernatur.
                    Hic maiores adipisci aperiam facilis porro sed et neque quo, qui, perferendis velit laborum ab vitae nemo quibusdam in dolor praesentium fuga soluta possimus ullam iusto suscipit ipsum eius! Nobis!
                    Architecto quidem tempore ipsam eveniet. Animi inventore omnis explicabo quidem dolor? Ullam ea, architecto dolorum est, aperiam vitae officiis labore quos animi, maxime quis? Ab nihil quo officia at quam.
                    Ratione quo quisquam officia ut, repudiandae sit nam! Officiis, nobis! Ratione sapiente sed odit eum veniam eos doloribus reprehenderit? Rem sit quod voluptatum corporis iure cupiditate ut incidunt tempore ipsa!
                    `,
    },
]
// const cards = [
//     {
//         subtitle: "Lana Del Rey",
//         title: "Summertime Sadness",
//         imageSrc: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
//         checkoutUrl: "https://ui.aceternity.com/templates",
//         description: () => {
//             return (
//                 <p>
//                     Lana Del Rey, an iconic American singer-songwriter, is celebrated for
//                     her melancholic and cinematic music style. Born Elizabeth Woolridge
//                     Grant in New York City, she has captivated audiences worldwide with
//                     her haunting voice and introspective lyrics. <br /> <br /> Her songs
//                     often explore themes of tragic romance, glamour, and melancholia,
//                     drawing inspiration from both contemporary and vintage pop culture.
//                     With a career that has seen numerous critically acclaimed albums, Lana
//                     Del Rey has established herself as a unique and influential figure in
//                     the music industry, earning a dedicated fan base and numerous
//                     accolades.
//                 </p>
//             );
//         },
//     },
//     {
//         subtitle: "Babbu Maan",
//         title: "Mitran Di Chhatri",
//         imageSrc: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
//         checkoutUrl: "https://ui.aceternity.com/templates",
//         description: () => {
//             return (
//                 <p>
//                     Babu Maan, a legendary Punjabi singer, is renowned for his soulful
//                     voice and profound lyrics that resonate deeply with his audience. Born
//                     in the village of Khant Maanpur in Punjab, India, he has become a
//                     cultural icon in the Punjabi music industry. <br /> <br /> His songs
//                     often reflect the struggles and triumphs of everyday life, capturing
//                     the essence of Punjabi culture and traditions. With a career spanning
//                     over two decades, Babu Maan has released numerous hit albums and
//                     singles that have garnered him a massive fan following both in India
//                     and abroad.
//                 </p>
//             );
//         },
//     },

//     {
//         subtitle: "Metallica",
//         title: "For Whom The Bell Tolls",
//         imageSrc: "https://assets.aceternity.com/demos/metallica.jpeg",
//         checkoutUrl: "https://ui.aceternity.com/templates",
//         description: () => {
//             return (
//                 <p>
//                     Metallica, an iconic American heavy metal band, is renowned for their
//                     powerful sound and intense performances that resonate deeply with
//                     their audience. Formed in Los Angeles, California, they have become a
//                     cultural icon in the heavy metal music industry. <br /> <br /> Their
//                     songs often reflect themes of aggression, social issues, and personal
//                     struggles, capturing the essence of the heavy metal genre. With a
//                     career spanning over four decades, Metallica has released numerous hit
//                     albums and singles that have garnered them a massive fan following
//                     both in the United States and abroad.
//                 </p>
//             );
//         },
//     },
//     {
//         subtitle: "Lord Himesh",
//         title: "Aap Ka Suroor",
//         imageSrc: "https://assets.aceternity.com/demos/aap-ka-suroor.jpeg",
//         checkoutUrl: "https://ui.aceternity.com/templates",
//         description: () => {
//             return (
//                 <p>
//                     Himesh Reshammiya, a renowned Indian music composer, singer, and
//                     actor, is celebrated for his distinctive voice and innovative
//                     compositions. Born in Mumbai, India, he has become a prominent figure
//                     in the Bollywood music industry. <br /> <br /> His songs often feature
//                     a blend of contemporary and traditional Indian music, capturing the
//                     essence of modern Bollywood soundtracks. With a career spanning over
//                     two decades, Himesh Reshammiya has released numerous hit albums and
//                     singles that have garnered him a massive fan following both in India
//                     and abroad.
//                 </p>
//             );
//         },
//     },
// ];
export default function Products() {
    return (
        <section id="products" className='container flex flex-col items-center mb-12'>
            <Title title='Our Products' subtitle='Here you can find everything you are looking for.' />
            <ul className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8 md:gap-6'>
                {products.map((product) => {
                    const contnet = () => <p>{product.description}</p>
                    return (
                        <ProductCard
                            key={product.id}
                            {...product}
                            description={contnet}
                        />
                    )
                })}
            </ul>
        </section>
    )
}
