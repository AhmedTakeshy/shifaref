import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
    id: number
    title: string
    category: string
    price: string
    imageUrl: string
    offerUrl: string
}

export default function ProductCard({ title, price, imageUrl, offerUrl }: ProductCardProps) {
    return (
        <div className='shadow-md rounded-xl bg-light-green-99'>
            <Image src={imageUrl} alt={`${title}-image`} width={850} height={640} className='rounded-t-xl' />
            <article className="flex flex-col p-4 text-center rounded-b-xl bg-dark-green-15">
                <h3 className='text-lg font-semibold lg:text-2xl sm:text-xl text-light-green-70'>
                    {title}
                </h3>
                <p className='text-sm font-medium text-light-green-90 lg:text-lg sm:text-base'>
                    ${price}
                </p>
                <Link href={offerUrl} className='px-4 py-2 mt-4 text-sm font-medium transition-colors duration-200 border border-transparent rounded-md bg-light-green-75 lg:text-lg sm:text-base text-dark-green-15 hover:bg-transparent hover:border-light-green-70 hover:text-light-green-75'>View Offer</Link>
            </article>
        </div>
    )
}