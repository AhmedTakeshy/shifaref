import { getBlogPostBySlug } from '@/_actions/blogActions'
import prisma from '@/lib/prisma'
import readingDuration from 'reading-duration'

export async function generateStaticParams() {
    const posts = await prisma.blog.findMany({
        where: {
            published: true
        },
    })
    return posts.map((post) => ({
        postSlug: post.title.trimEnd().split(" ").join("_")
    }))
}

type BlogPostPageProps = {
    params: Promise<{ [key: string]: string | undefined }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { postSlug } = await params
    const res = await getBlogPostBySlug(postSlug as string)
    return (
        <main className='container xl:pt-20 lg:pt-16 md:pt-12 sm:pt-8 pt-4'>
            <div className="flex flex-col bg-light-green-85 shadow rounded-xl p-5 border-2 border-light-green-70 text-dark-green-15 gap-3">
                {res.status === "Success" ? (
                    <article>
                        <h1 className='text-4xl font-semibold mb-2'>{res.data.title}</h1>
                        <div className="flex items-center gap-2">
                            <p className='font-semibold'>
                                {new Date(res.data.createdAt).toDateString()}
                            </p>
                            <p>
                                {readingDuration(res.data.content, { emoji: "open_book", })}
                            </p>
                        </div>
                        <div className="flex gap-2 flex-wrap items-center mb-8">
                            {res.data.tags.map((tag) => (
                                <span key={`${tag.name}-${tag.id}`} className='lowercase'>#{tag.name}</span>
                            ))}
                        </div>
                        <p className='text-black text-lg'>{res.data.content}</p>
                    </article>
                ) : (
                    <p className="text-semibold text-base text-rose-600">
                        {res.errorMessage}
                    </p>
                )}
            </div>
        </main>
    )
}