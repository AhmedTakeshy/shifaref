
import NavMenu from "@/app/(home)/_components/navbar"
import Footer from "./_components/footer"
import ScrollButton from "@/_components/scrollButton"

type HomeLayoutProps = Readonly<{
    children: React.ReactNode
}>
export default function HomeLayout({ children }: HomeLayoutProps) {
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
            <Footer />
        </>
    )
}