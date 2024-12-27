import { getBlogPostById } from "@/_actions/blogActions"
import prisma from "@/lib/prisma"
import BlogPostCard from "../_components/blogPostCard"

export async function generateStaticParams() {
  const posts = await prisma.blog.findMany()
  return posts.map((post) => ({
    postId: post.id.toString()
  }))
}

type BlogPostIdPageProps = {
  params: Promise<{ [key: string]: string | undefined }>
}

export default async function BlogPostIdPage({ params }: BlogPostIdPageProps) {
  const { postId } = await params
  const response = await getBlogPostById(parseInt(postId as string))
  return (
    <main className='flex flex-col gap-10 dark:bg-slate-800 bg-slate-200 p-5 rounded-xl mt-5 '>
      {response.status === "Success" ? (
        <BlogPostCard  {...response.data} mode='edit' />
      ) : (
        <p className="text-semibold text-base text-rose-600">
          {response.errorMessage}
        </p>
      )}
    </main>
  )
}
