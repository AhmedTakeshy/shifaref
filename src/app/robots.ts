import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: 'https://shifaref.com/sitemap.xml',
        host: 'https://shifaref.com/',
    }
}