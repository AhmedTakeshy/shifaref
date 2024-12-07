import { getBlogPostById, } from '@/_actions/blogActions'
import BlogForm from '../_components/blogForm'
import prisma from '@/lib/prisma'


export async function generateStaticParams() {
    const posts = await prisma.blog.findMany({})
    return posts.map((post) => ({
        postId: post.id.toString()
    }))
}

type Props = {
    params: Promise<{ [key: string]: string | undefined }>
}

export default async function page({ params }: Props) {
    const { postId } = await params
    const response = await getBlogPostById(parseInt(postId as string))
    console.log("🚀 ~ page ~ response:", response)
    return (
        <div className='flex flex-col items-center justify-center w-full max-w-xl dark:text-slate-800 gap-8 mx-auto mt-12'>
            <h1 className='text-4xl font-semibold'>Update blog post.</h1>
            {response.status === "Success" ? (
                <BlogForm post={response.data} />
            ) : (
                <p className="text-semibold text-base text-rose-600">
                    {response.errorMessage}
                </p>
            )}
        </div>
    )
}