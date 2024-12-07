import { buttonVariants } from '@/_components/ui/button'
import { Blog } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function BlogPostCard({ id, title, createdAt, content }: Blog) {
    {/* {image !== null && (
                        <div className="flex items-center">
                            <Image src={`${image}`} alt="blog" width={400} height={300} className="rounded-t-2xl w-full object-cover" />
                        </div>
                    )} */}

    return (
        <section className="p-5 rounded-2xl flex justify-center flex-col border dark:border-slate-200 border-slate-800">
            <time className="dark:text-slate-400 text-slate-600 text-sm mb-3 block">
                {new Date(createdAt).toDateString()}
            </time>
            <h4 className="text-xl dark:text-white text-black font-medium  mb-5">
                {title}
            </h4>
            <p className="dark:text-slate-300 text-slate-700 font-medium leading-6 mb-10">
                {content}
            </p>
            <Link href={`/admin/blogs/${id}`} className={`${buttonVariants()} self-end`}>Edit</Link>
        </section>
    )
}
