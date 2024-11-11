import Title from '@/_components/title'
import React from 'react'
import FeatureCard from './featureCard'

const features = [
    {
        iconSrc: '/icons/plant.svg',
        title: 'Personalized Nutrition Plans',
        description: 'Receive a tailored nutrition plan designed specifically for your body and goals. Our certified nutritionists will consider your unique needs, dietary preferences, and health conditions to create a plan that suits you best.',
    },
    {
        iconSrc: '/icons/academic-cap.svg',
        title: 'Guidance from Certified Nutritionists',
        description: 'Our team of experienced and certified nutritionists will provide professional guidance and support throughout your journey. They will answer your questions, address your concerns, and keep you motivated as you work towards your goals.',
    },
    {
        iconSrc: '/icons/fork.svg',
        title: 'Food Tracking and Analysis',
        description: 'Effortlessly track your food intake using our user-friendly app. Our nutritionists will analyze your data to provide insights into your eating habits, help you identify areas for improvement, and make personalized recommendations.',
    },
    {
        iconSrc: '/icons/note.svg',
        title: 'Meal Planning and Recipes',
        description: 'Access a vast collection of delicious and healthy recipes tailored to your dietary needs. Our nutritionists will also create personalized meal plans, making it easier for you to stay on track and enjoy nutritious meals.',
    },
    {
        iconSrc: '/icons/dumbbell.svg',
        title: 'Lifestyle and Behavior Coaching',
        description: 'Achieving sustainable results requires more than just a diet plan. Our nutritionists will work with you to develop healthy habits, address emotional eating, and provide strategies to overcome obstacles along the way.',
    },
    {
        iconSrc: '/icons/bag.svg',
        title: 'Nutritional Education and Workshops',
        description: 'Expand your knowledge of nutrition through informative articles and educational workshops. Our nutritionists will equip you with the knowledge and tools to make informed choices for long-term success.',
    },
]
export default function Features() {
    return (
        <section id='features' className='container flex flex-col items-center'>
            <Title title='Features' subtitle='Welcome to the Feature Section of Nutritionist, your ultimate destination for all things nutrition and wellness.' />
            <article className='grid gap-5 sm:grid-cols-2 lg:gap-8'>
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </article>
        </section>
    )
}
