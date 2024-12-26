import { getBlogPosts, getTags } from '@/_actions/blogActions'
import PaginationControl from '@/_components/paginationControl'
import BlogPostCard from './_component/blogPostCard'
import Image from 'next/image'
import newLogo from '@/../public/imgs/logo.png'
import Title from '@/app/(home)/_components/title'
import Link from 'next/link'
import { Suspense } from 'react'
import SkeletonCard from '@/_components/skeletonCard'

export const experimental_ppr = true;

type BlogProps = {
    searchParams: Promise<{ [key: string]: string | string | undefined }>
}
export default async function BlogPage({ searchParams }: BlogProps) {
    const { tag, title, page } = await searchParams
    const resTags = await getTags()
    const resPosts = await getBlogPosts({ page, search: { tag, title, published: true } })

    return (
        <main className="container">
            <section className='flex flex-col items-center my-12 '>
                <div className='border border-light-green-85 bg-light-green-95 xl:p-24 lg:p-20 sm:p-12 p-7 rounded-t-xl'>
                    <Image src={newLogo} width={80} height={100} alt="logo" priority className='mx-auto' />
                    <Title
                        className=''
                        title='Our Blogs'
                        subtitle="Welcome to the Blog section of Nutritionist, your trusted source for insightful articles, tips, and expert advice on nutrition and wellness. Here, we strive to provide you with engaging and informative content that will inspire and empower you to make informed decisions about your health. Explore our blog to discover a wealth of resources that cover a wide range of topics related to nutrition, fitness, and overall well-being."
                    />
                </div>
                <ul className='flex  flex-wrap items-center justify-center w-full gap-3 p-5 mx-auto text-white bg-dark-green-15 sm:gap-5 sm:px-12 sm:py-6 rounded-b-xl'>
                    <li className='flex flex-col items-center sm:w-auto w-11/12 gap-5 px-5 py-3 border rounded-md bg-dark-green-20 border-dark-green-25'>
                        <Link href={`/blog?page=${page || 1}`} className='hover:text-light-green-70 '>
                            All
                        </Link>
                    </li>
                    {resTags.status === "Success" ? (
                        resTags.data.map((tag) => (
                            <li key={`${tag.name}-${tag.id}`} >
                                <Link href={`/blog?page=${page || 1}&tag=${tag.name}`} className='px-3 py-1 capitalize border rounded-md hover:text-light-green-70 hover:border-light-green-70'>
                                    {tag.name}
                                </Link>
                            </li>
                        ))
                    ) : null}
                </ul>
            </section>
            <section className='grid sm:grid-cols-2 lg:p-20 sm:p-12 p-7 xl:p-20 border border-light-green-85 bg-light-green-95 rounded-xl items-start gap-[50px]'>
                {resPosts.status === "Success" ? (
                    <>
                        {resPosts.data.blogPosts.map((post, i) => (
                            <Suspense fallback={
                                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <SkeletonCard key={i} className="mx-8 my-6" />
                                    ))}
                                </ul>
                            } key={i}>
                                <BlogPostCard key={i} {...post} />
                            </Suspense>
                        ))}
                        <PaginationControl className="col-span-full" metadata={resPosts.data.metadata} currentPage={Number(page) || 1} />
                    </>
                ) : (
                    <p className="text-base text-semibold text-rose-600">
                        {resPosts.errorMessage}
                    </p>
                )}
            </section>

        </main>
    )
}
