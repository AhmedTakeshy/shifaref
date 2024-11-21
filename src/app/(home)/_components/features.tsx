import Title from '@/_components/title'
import FeatureCard from './featureCard'
import { FaLeaf, FaSearch, FaBookOpen } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { GiLotusFlower } from "react-icons/gi";




const features = [
    {
        icon: <FaLeaf className='size-[30px] text-grey-15' />,
        title: 'Personalized Wellness Plans',
        description: "Receive a tailored wellness plan that harmonizes your health and beauty goals. Whether it's skincare routines, supplement recommendations, or fitness guidance, we craft solutions that suit your lifestyle.",
    },
    {
        icon: <MdSupportAgent className='size-[30px] text-grey-15' />,
        title: 'Expert Guidance from Wellness Professionals',
        description: "Our team of experienced wellness experts, including skincare specialists and nutritionists, offers professional support and personalized advice to help you achieve a balanced and vibrant lifestyle.",
    },
    {
        icon: <FaSearch className='size-[30px] text-grey-15' />,
        title: 'Product Recommendations and Analysis',
        description: "Discover the best products for your unique needs. From skincare to dietary supplements, our experts analyze your preferences and recommend high-quality solutions to enhance your daily routine.",
    },
    {
        icon: <IoCalendarOutline className='size-[30px] text-grey-15' />,
        title: 'Curated Beauty and Health Routines',
        description: "Access thoughtfully designed routines and tips for glowing skin, holistic health, and a revitalized appearance. Our guides make it easy to integrate effective practices into your life.",
    },
    {
        icon: <GiLotusFlower className='size-[30px] text-grey-15' />,
        title: 'Lifestyle and Self-Care Coaching',
        description: "Embrace a holistic approach to well-being with personalized coaching that supports your beauty, health, and emotional wellness. Build sustainable habits that elevate your quality of life.",
    },
    {
        icon: <FaBookOpen className='size-[30px] text-grey-15' />,
        title: 'Workshops and Knowledge Sharing',
        description: "Stay informed with educational resources, including articles, researches, and papers. Learn how to harness the power of nature and science to nurture your health and beauty.",
    },
]
export default function Features() {
    return (
        <section id='features' className='container flex flex-col items-center mb-12'>
            <Title title='Features' subtitle='Welcome to the Feature Section of Nutritionist, your ultimate destination for all things nutrition and wellness.' />
            <article className='grid gap-5 sm:grid-cols-2 lg:gap-8'>
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </article>
        </section>
    )
}
