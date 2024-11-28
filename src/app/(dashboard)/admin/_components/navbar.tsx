"use client";
import { ModeToggler } from "./modeToggler";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/_components/ui/hover-card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineMailOutline } from "react-icons/md";
import SimpleCard from "./simpleCard";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
import { Contact } from "@prisma/client";

type NavbarProps = {
    messages: Contact[] | undefined;
}
export default function Navbar({ messages }: NavbarProps) {
    // const { data: session } = useSession()
    // const [open, setOpen] = useState(false)
    const pathname = usePathname();

    function navTitle() {
        if (isNaN(Number(pathname.split("/").pop()))) {
            return pathname.split("/").pop()
        }
        if (pathname.includes("admins")) {
            return `Admins-${pathname.split("/").pop()}`
        }
        if (pathname.includes("clients")) {
            return `Clients-${pathname.split("/").pop()}`
        }
    }


    return (
        <div className={`dark:bg-slate-800 bg-slate-200 p-5 rounded-xl flex items-center justify-between`}>
            <span className={`font-bold capitalize dark:text-gray-400`}>
                {navTitle()}
            </span>
            <div className={`flex items-center gap-5 p-2.5`}>
                <div className={`flex gap-5 items-center`}>
                    <HoverCard openDelay={200} closeDelay={100}>
                        <HoverCardTrigger asChild>
                            <Link href="/messages" aria-description="open message" aria-label="open message" aria-controls="navbar-default" aria-expanded="false" className="relative group">
                                <MdOutlineMailOutline size={25} className=" group-hover:text-blue-700" />
                                {!!messages && messages.length > 0 && <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-2.5 -right-2.5 bg-sky-800">{messages.length}</span>}
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="p-3 overflow-y-auto -translate-x-5 rounded-xl w-80 max-h-96 dark:bg-slate-900">
                            {
                                !!messages && messages.length > 0
                                    ?
                                    messages.map(message => (
                                        <SimpleCard key={message.id} message={message} />
                                    ))
                                    :
                                    <p>There are no message.</p>
                            }
                        </HoverCardContent>
                    </HoverCard>
                    <ModeToggler />
                </div>
            </div>
        </div>
    );
};