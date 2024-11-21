import Title from '@/_components/title'
import React from 'react'

export default function About() {
    return (
        <section id='about' className='container flex flex-col items-center mb-12 xl:gap-20 lg:gap-12 sm:gap-7 gap-4'>
            <Title
                className='border border-light-green-85 bg-light-green-95 xl:p-24 lg:p-20 sm:p-12 p-7 rounded-xl xl:gap-[50px] lg:gap-10 sm:gap-7 gap-5'
                title='Welcome to SHIFAREF'
                subtitle="SHIFAREF is a platform specializing in food and dietary supplements, alternative and
                complementary medicine, herbal remedies, skincare and cosmetics, and sports nutrition. We
                are dedicated to providing high-quality products that promote holistic health and well-being.
                Our journey began with a passion for natural remedies and a commitment to offering
                products that enhance both physical health and beauty. At SHIFAREF, we believe in the
                power of nature to heal and rejuvenate, guided by the principle of holistic wellness. Join us
                on our mission to promote health, beauty, and vitality through our carefully curated range of
                products. Don't forget to invoke “the healing prayers”"  />
            <Title
                title='Our Mission'
                subtitle={`At SHIFAREF, we are driven by a passion for natural remedies and holistic health. Our goal is to enhance your well-being with premium products that combine the healing power of nature with scientific expertise.`} subtitleClassName=' w-4/5' className='text-center mx-auto' />
            <div className='text-center w-full'>
                <Title
                    title='What We Offer'
                    subtitle={`From skincare and cosmetics to dietary supplements and wellness solutions, we bring you a curated selection of products designed to promote health, beauty, and vitality. Our offerings include:`} subtitleClassName=' w-4/5' />
                <ul className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    <li className='border border-light-green-85 bg-light-green-95 rounded-lg p-2'>Skincare essentials like anti-aging creams, serums, and masks.</li>
                    <li className='border border-light-green-85 bg-light-green-95 rounded-lg p-2'>Health and wellness supplements for a balanced lifestyle.</li>
                    <li className='border border-light-green-85 bg-light-green-95 rounded-lg p-2'>Premium perfumes and beauty accessories.</li>
                    <li className='border border-light-green-85 bg-light-green-95 rounded-lg p-2'>Lifestyle products, including kitchen and hobby essentials.</li>
                </ul>
            </div>
        </section>
    )
}

/**
 * 
Our Mission
At SHIFAREF, we are driven by a passion for natural remedies and holistic health. Our goal is to enhance your well-being with premium products that combine the healing power of nature with scientific expertise.

What We Offer
From skincare and cosmetics to dietary supplements and wellness solutions, we bring you a curated selection of products designed to promote health, beauty, and vitality. Our offerings include:

Skincare essentials like anti-aging creams, serums, and masks.
Health and wellness supplements for a balanced lifestyle.
Premium perfumes and beauty accessories.
Lifestyle products, including kitchen and hobby essentials.
Our Commitment
With decades of experience and dedication to excellence, we ensure every product meets the highest standards of quality, transparency, and customer satisfaction. Join us in embracing a healthier, more beautiful life.
 */