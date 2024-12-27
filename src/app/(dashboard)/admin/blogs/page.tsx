import React from 'react'
import Search from '../_components/search'
import Link from 'next/link'
import { getBlogPosts } from '@/_actions/blogActions'
import PaginationControl from '@/_components/paginationControl'
import BlogPostCard from './_components/blogPostCard'

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function BlogsPage({ searchParams }: Props) {
    const { page, title, published, tag } = await searchParams
    const response = await getBlogPosts({ page, search: { title, published: typeof published === "boolean" ? published : undefined, tag } })
    return (
        <section className="flex flex-col gap-10 dark:bg-slate-800 bg-slate-200 p-5 rounded-xl mt-5 ">
            <div className="flex items-center justify-between my-5">
                <Search placeholder="Search blogs" option1="title" option2="content" />
                <Link href="/admin/blogs/new-blog-post" className="inline px-5 py-3 leading-5 text-white transition-colors duration-300 bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 rounded-lg shadow-2xl focus:outline-none active:bg-green-600  dark:active:bg-green-800 ">
                    A new blog post
                </Link>
            </div>

            <div className="flex flex-col gap-5">
                {response.status === "Success" ? (
                    <>
                        {response.data.blogPosts.map((post, i) => (
                            <BlogPostCard key={i} {...post} mode='view' />
                        ))}
                        <PaginationControl className="col-span-full" metadata={response.data.metadata} currentPage={Number(page) || 1} />
                    </>
                ) : (
                    <p className="text-semibold text-base text-rose-600">
                        {response.errorMessage}
                    </p>
                )}
            </div>
        </section>
    )
}
