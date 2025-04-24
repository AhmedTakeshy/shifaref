import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "SHIFAREF is a platform specializing in food and dietary supplements, alternative and complementary medicine, herbal remedies, skincare and cosmetics, and sports nutrition. We are dedicated to providing high-quality products that promote holistic health and well-being.",
        short_name: "SHIFAREF",
        description: "SHIFAREF is a platform specializing in food and dietary supplements, alternative and complementary medicine, herbal remedies, skincare and cosmetics, and sports nutrition. We are dedicated to providing high-quality products that promote holistic health and well-being. Our journey began with a passion for natural remedies and a commitment to offering products that enhance both physical health and beauty. At SHIFAREF, we believe in the power of nature to heal and rejuvenate, guided by the principle of holistic wellness. Join us on our mission to promote health, beauty, and vitality through our carefully curated range of products. Don't forget to invoke “the healing prayers”. We are an exceptional platform that can supply a wide range of perfumes, cosmetics, beauty, skincare. We deals with international trade in Europe, America, and the Middle East. We are dedicated to providing high-quality products that promote holistic health and well- being. Our commitments to excellency is reflected on customer satisfaction, transparency, and high standards of service. Our expertise depends on a long way of research, consulting and publishing scientific papers during the last four decades.",
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        icons: [
            {
                src: '/favicons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/favicons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/favicons/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}