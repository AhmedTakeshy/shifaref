
import NavMenu from "@/_components/navbar"
// import ScrollButton from "@/components/ScrollButton"

type HomeLayoutProps = Readonly<{
    children: React.ReactNode
}>
export default function HomeLayout({ children }: HomeLayoutProps) {
    const links = ["Home", "Products", "About", "Blog",]
    return (
        <>
            <NavMenu links={links} />
            {children}
            {/* <ScrollButton /> */}
        </>
    )
}