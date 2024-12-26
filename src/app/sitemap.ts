import prisma from '@/lib/prisma'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const links: MetadataRoute.Sitemap = [
        {
            url: 'https://shifaref.com/',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://shifaref.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://shifaref.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://shifaref.com/#products',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://shifaref.com/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]
    prisma.blog.findMany({
        where: {
            published: true
        },
        select: {
            title: true,
            createdAt: true
        }
    }).then((posts) => {
        posts.map((post) => {
            links.push({
                url: `https://shifaref.com/blog/${post.title.trimEnd().split(" ").join("_")}`,
                lastModified: post.createdAt,
                changeFrequency: 'daily',
                priority: 0.9,
            })
        })
    })
    return links
}