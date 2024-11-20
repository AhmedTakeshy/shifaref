
import NavMenu from "@/_components/navbar"
import Footer from "./_components/footer"
// import ScrollButton from "@/components/ScrollButton"

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
            href: "#products",
            label: "Products"
        },
        {
            href: "/blog",
            label: "Blog"
        }
    ]
    return (
        <>
            <NavMenu links={links} />
            {children}
            {/* <ScrollButton /> */}
            <Footer />
        </>
    )
}