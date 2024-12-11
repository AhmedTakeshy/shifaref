import { getBlogPosts } from '@/_actions/blogActions'
import PaginationControl from '@/_components/paginationControl'
import BlogPostCard from './_component/blogPostCard'
import React from 'react'


type BlogProps = {
    searchParams: Promise<{ [key: string]: string | string | undefined }>
}
export default async function Blog({ searchParams }: BlogProps) {
    const { tag, title, page } = await searchParams
    const res = await getBlogPosts({ page, search: { tag, title, published: true } })
    return (
        <main className="flex flex-col gap-10 p-5 rounded-xl mt-5">
            <ul className="grid sm:grid-cols-2 gap-5">
                {res.status === "Success" ? (
                    <>
                        {res.data.blogPosts.map((post, i) => (
                            <BlogPostCard key={i} {...post} />
                        ))}
                        <PaginationControl className="col-span-full" metadata={res.data.metadata} currentPage={Number(page) || 1} />
                    </>
                ) : (
                    <p className="text-semibold text-base text-rose-600">
                        {res.errorMessage}
                    </p>
                )}
            </ul>
        </main>
    )
}
