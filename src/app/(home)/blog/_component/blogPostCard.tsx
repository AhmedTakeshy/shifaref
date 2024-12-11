import { BlogWithTags } from '@/_actions/blogActions'
import React from 'react'

export default function BlogPostCard({ title, content, createdAt, tags }: BlogWithTags) {
    return (
        <div className='w-full flex-col p-5 rounded-xl bg-light-green-70 text-dark-green-15'>
            <h2 className='font-semibold text-lg'>
                {title}
            </h2>
            <p className='text-black line-clamp-3'>
                {content}
            </p>
            <div className='flex justify-between'>
                <p className='text-grey-30'>
                    Published at: <span className='font-semibold'>
                        {new Date(createdAt).toDateString()}
                    </span>
                </p>
            </div>
            <div>
                {tags.map((tag, i) => (
                    <span key={i} className='text-white bg-dark-green-15 p-1 rounded-lg'>{tag.name}</span>
                ))}
            </div>
        </div>
    )
}