import Title from '@/_components/title'
import Image from 'next/image'
import newLogo from '@/../public/imgs/logo.png'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import Link from 'next/link'
import ContactForm from './_components/contactForm'
export default function Contact() {
    return (
        <section id='contact' className='container'>
            <div className=' flex flex-col items-center my-12'>
                <div className='border border-light-green-85 bg-light-green-95 xl:p-24 lg:p-20 sm:p-12 p-7 rounded-t-xl'>
                    <Image src={newLogo} width={80} height={100} alt="logo" priority className='mx-auto' />
                    <Title
                        className=''
                        title='Contact Us'
                        subtitle="We value your feedback, questions, and concerns at SHIFAREF. Our dedicated team is here to assist you and provide the support you need on all aspect regarding our products. Please don't hesitate to reach out to us using any of the following contact methods"
                    />
                </div>
                <div className='flex flex-col items-center justify-center w-full gap-5 p-5 mx-auto text-white bg-dark-green-15 sm:flex-row xl:gap-10 sm:gap-7 sm:px-24 xl:py-12 xl:px-64 sm:py-12 rounded-b-xl'>
                    <article className='flex flex-col items-center w-full gap-5 p-8 border rounded-md bg-dark-green-20 border-dark-green-25'>
                        <FaPhoneAlt className='mr-2 size-5 text-light-green-70' />
                        <p>
                            +972 54 429 2892
                        </p>
                    </article>
                    <article className='flex flex-col items-center w-full gap-5 p-8 border rounded-md bg-dark-green-20 border-dark-green-25'>
                        <FaEnvelope className='mr-2 size-5 text-light-green-70' />
                        <Link href={"mailto:arefabu@gmail.com"}>
                            Arefabu@gmail.com
                        </Link>
                    </article>
                </div>
            </div>
            <div className='sm:flex-row flex-col lg:p-20 sm:p-12 p-7 xl:p-20 border border-light-green-85 bg-light-green-95 rounded-xl flex items-start gap-[50px]'>
                <ContactForm />
                <Image src={"/imgs/SHIFAREF.png"} width={694} height={480} alt="contact us logo" className='rounded-xl  max-w-[694px] w-full max-h-[480px] h-full' />
            </div>
        </section>
    )
}
