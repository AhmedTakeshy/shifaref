import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {

    return {
        sitemap: 'https://shifaref.com/sitemap.xml',
        host: 'https://shifaref.com/',
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
    }
}
