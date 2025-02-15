"use client"
import { BlogWithTags, deleteBlogPostAction } from '@/_actions/blogActions'
import { Button, buttonVariants } from '@/_components/ui/button'
import Link from 'next/link'
import React from 'react'
import readingDuration from 'reading-duration'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type BlogPostCardProps = BlogWithTags & { mode: "edit" | "view" }
export default function BlogPostCard({ id, title, createdAt, content, published, tags, mode }: BlogPostCardProps) {
    const Router = useRouter()

    async function handleDelete() {
        try {
            const res = await deleteBlogPostAction(id)
            if (res.status === "Success") {
                toast.success("Success", { description: res.successMessage })
                Router.push("/admin/blogs?page=1")
            } else {
                toast.error("Error", { description: res.errorMessage })
            }
        } catch {
            toast.error("Error!", {
                description: "Something went wrong. Please try again.",
            })
        }
    }

    return (
        <article className="p-5 rounded-2xl flex justify-center flex-col border dark:border-slate-200 border-slate-800">
            <time className="dark:text-slate-400 text-slate-600 text-sm mb-3 flex items-center gap-2">
                {new Date(createdAt).toDateString()}
                <p>
                    {readingDuration(content, { emoji: "open_book", })}
                </p>
            </time>
            <h4 className="text-xl dark:text-white text-black font-medium  mb-5">
                {title}
            </h4>
            <p className={`dark:text-slate-300 text-slate-700 font-medium leading-6 mb-2 ${mode === "view" ? "line-clamp-4" : ""}`}>
                {content}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag) => (
                    <Link href={`?tag=${tag.name}&page=1`} key={`${tag.name}-${tag.id}`} className="text-sm dark:bg-slate-700 hover:px-4 duration-500 transition-all will-change-auto bg-slate-300 dark:text-slate-300 text-slate-700 px-3 py-1 rounded-full">
                        {tag.name}
                    </Link>
                ))}
            </div>
            <div className="flex justify-start items-center gap-5 ">
                <Link href={`/admin/blogs/${id}${mode === "edit" ? "/edit" : ""}`} className={`${buttonVariants()} !bg-blue-600 hover:!bg-blue-700 capitalize`}>{mode}</Link>
                <Button variant={"destructive"} onClick={handleDelete}>Delete</Button>
                {mode === "edit" && (
                    <Link href={`/admin/blogs?page=1`} className={`${buttonVariants()}`}>Back</Link>
                )}
                <Button variant={"outline"} disabled className='ml-auto'>
                    {published ? "Published" : "Drafted"}
                </Button>
            </div>
        </article>
    )
}
