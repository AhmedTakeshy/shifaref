import { BlogWithTags } from '@/_actions/blogActions'
import { buttonVariants } from '@/_components/ui/button'
import Link from 'next/link'

export default function BlogPostCard({ title, content, createdAt, tags }: BlogWithTags) {
    return (
        <article className='w-full flex flex-col p-5 rounded-xl border-2 border-light-green-70 text-dark-green-15 gap-2'>
            <h2 className='font-semibold text-lg'>
                {title}
            </h2>
            <p className='text-black line-clamp-4'>
                {content}
            </p>
            <div className='flex justify-between'>
                <p className='text-grey-30'>
                    Published at: <span className='font-semibold'>
                        {new Date(createdAt).toDateString()}
                    </span>
                </p>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                {tags.map((tag, i) => (
                    <Link href={`?tag=${tag.name}&page=1`} key={i} className='text-white bg-dark-green-15 py-1 px-2 rounded-md capitalize'>{tag.name}</Link>
                ))}
            </div>
            <Link className={`${buttonVariants()} mt-6 !bg-light-green-70 !text-dark-green-15`} href={`/blog/${(title.trimEnd().split(" ").join("_"))}`}>
                Read more
            </Link>
        </article>
    )
}