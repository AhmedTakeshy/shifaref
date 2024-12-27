import { getBlogPostById, } from '@/_actions/blogActions'
import BlogForm from '../../_components/blogForm'


type EditBlogPageProps = {
    params: Promise<{ [key: string]: string | undefined }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
    const { postId } = await params
    const response = await getBlogPostById(parseInt(postId as string))
    return (
        <div className='flex flex-col items-center justify-center w-full max-w-xl dark:text-slate-800 gap-8 mx-auto mt-12'>
            <h1 className='text-4xl font-semibold text-slate-700 dark:text-slate-400'>Update blog post.</h1>
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