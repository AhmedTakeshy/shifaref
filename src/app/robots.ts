import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {

    return {
        rules: {
        sitemap: 'https://shifaref.com/sitemap.xml',
        host: 'https://shifaref.com/',
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
    }
}
