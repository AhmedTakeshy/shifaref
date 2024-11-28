import { SessionProvider } from "next-auth/react"
import Navbar from "./_components/navbar"
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from "./_components/sideBar"
import Footer from "./_components/footer"
import { getMessages } from "@/_actions/adminActions"
import { ThemeProvider } from "@/context/theme-provider"

type AdminLayoutProps = Readonly<{
    children: React.ReactNode
}>

export default async function AdminLayout({ children }: AdminLayoutProps) {
    const session = await auth()
    if (session?.user.role !== 'ADMIN' && session?.user.role !== 'SUPER_ADMIN') {
        redirect("/login")
    }
    const messagesResponse = await getMessages({ read: false })
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                <div className="flex">
                    <aside className="flex p-5 min-h-screen flex-[1] dark:bg-slate-800 bg-slate-200">
                        <Sidebar />
                    </aside>
                    <div className="flex-[4] p-5">
                        <Navbar
                            messages={messagesResponse.status === "Success" ? messagesResponse.data.messages : undefined}
                        />
                        {children}
                        <Footer />
                    </div>
                </div>
            </SessionProvider>
        </ThemeProvider>
    )
}