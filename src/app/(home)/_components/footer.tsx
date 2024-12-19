import { navigationMenuTriggerStyle, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/_components/ui/navigation-menu'
import Link from 'next/link'
import Image from 'next/image'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

const links = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/about',
        label: 'About',
    },
    {
        href: '#products',
        label: 'Products',
    },
    {
        href: '/blog',
        label: 'Blog',
    },
]
export default function Footer() {
    return (
        <footer className='flex flex-col justify-start bg-dark-green-15 px-4 py-8 mt-12'>
            <div className='flex items-center justify-between  mb-5'>
                <Image src='/imgs/logo.png' alt='logo' width={50} height={75} className='sm:ml-2' />
                <NavigationMenu className={`sm:ml-auto`}>
                    <NavigationMenuList className="items-center justify-center sm:gap-2 flex">
                        {links.map((link) => (
                            <NavigationMenuItem key={link.label}>
                                <Link href={`${link.href}`} legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} hover:bg-transparent bg-transparent hover:text-light-green-70 text-white border-2 border-transparent focus:bg-transparent focus:text-light-green-70 focus:border-light-green-70`}>
                                        {link.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <ul className='flex flex-col sm:flex-row sm:justify-between gap-4 p-4 bg-dark-green-20 rounded-lg justify-center text-center text-white'>
                <li className='border border-dark-green-25 p-3 flex items-center rounded justify-center'>
                    <FaEnvelope className='size-4 mr-2 text-light-green-70' />
                    <Link href={"mailto:arefabu@gmail.com"}>
                        Arefabu@gmail.com
                    </Link>
                </li>
                <li className='border border-dark-green-25 p-3 flex items-center rounded justify-center'>
                    <FaPhoneAlt className='size-4 mr-2 text-light-green-70' />
                    <p>
                        +972 54 429 2892
                    </p>
                </li>
                <li className='text-grey-95 mt-1 sm:ml-auto'>
                    © 2023 SHIFAREF. All rights reserved. <br />
                    Developed with 🤍 by <Link href="https://takeshy.tech" target="_blank" rel="noopener noreferrer" className='text-transparent animate-text bg-gradient-to-r from-green-500 to-blue-500 rounded-lg  bg-clip-text font-black'>Takeshy</Link>
                </li>
            </ul>
        </footer>
    )
}
