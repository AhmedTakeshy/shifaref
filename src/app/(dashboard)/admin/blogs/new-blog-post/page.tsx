import React from 'react'
import BlogForm from '../_components/blogForm'

export default function NewBlogPage() {
    return (
        <div className='flex flex-col items-center justify-center w-full max-w-xl dark:text-slate-800 gap-8 mx-auto mt-12'>
            <h1 className='text-4xl font-semibold'>Create a new blog post.</h1>
            <BlogForm />
        </div>
    )
}
