
import NavMenu from "@/app/(home)/_components/navbar"
import Footer from "./_components/footer"
import ScrollButton from "@/_components/scrollButton"
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next/server';
import Cookies from "./_components/cookies";

type HomeLayoutProps = Readonly<{
    children: React.ReactNode
}>
export default async function HomeLayout({ children }: HomeLayoutProps) {
    const cookie = await getCookie('cookie-consent-state', { cookies })
    const links = [
        {
            href: "/",
            label: "Home"
        },
        {
            href: "/about",
            label: "About"
        },
        {
            href: "/#products",
            label: "Products"
        },
        {
            href: "/blog?page=1",
            label: "Blog"
        }
    ]
    return (
        <>
            <NavMenu links={links} />
            {children}
            <ScrollButton />
            <Cookies cookie={cookie as string} />
            <Footer />
        </>
    )
}