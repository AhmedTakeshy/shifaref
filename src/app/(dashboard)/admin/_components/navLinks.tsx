"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdAttachMoney,
    MdAnalytics,
    MdPeople,
    MdOutlineMailOutline,
} from "react-icons/md";
import { BiNotepad } from "react-icons/bi";

export default function NavLinks() {
    const pathname = usePathname();
    const { data: session } = useSession()
    const menuItems = [
        {
            title: "Pages",
            list: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <MdDashboard />,
                    role: "ADMIN"
                },
                {
                    title: "Clients",
                    path: "/dashboard/clients?page=1",
                    icon: <MdSupervisedUserCircle />,
                    role: "ADMIN"
                },
                {
                    title: "Admins",
                    path: "/dashboard/admins?page=1",
                    icon: <MdPeople />,
                    role: "SUPER_ADMIN",
                },
            ],
        },
        {
            title: "Analytics",
            list: [
                {
                    title: "Transactions",
                    path: "/dashboard/transactions?page=1",
                    icon: <MdAttachMoney />,
                    role: "SUPER_ADMIN",
                },
                {
                    title: "Reports",
                    path: "/dashboard/reports",
                    icon: <MdAnalytics />,
                    role: "SUPER_ADMIN",
                },
            ],
        },
        {
            title: "User",
            list: [
                {
                    title: "Notes",
                    path: "/dashboard/notes?page=1",
                    icon: <BiNotepad className="pt-px" size={16} />,
                    role: "ADMIN",
                },
                {
                    title: "Messages",
                    path: "/dashboard/messages?page=1",
                    icon: <MdOutlineMailOutline className="pt-px" size={16} />,
                    role: "ADMIN",
                },
            ],
        },
    ];
    return (
        <nav className={``}>
            <ul className="flex flex-col">
                {menuItems.map((cat) => (
                    <li key={cat.title} className="flex flex-col">
                        <span className="my-2.5 text-sm font-bold dark:text-slate-400">{cat.title}</span>
                        {cat.list.map((item) => (
                            <Link
                                key={item.title}
                                href={`${item.path}`}
                                aria-disabled={session?.user.role === "ADMIN" && item.role === "SUPER_ADMIN" ? true : false}
                                tabIndex={session?.user.role === "ADMIN" && item.role === "SUPER_ADMIN" ? -1 : 0}
                                className={` 
                                ${session?.user.role === "ADMIN" && item.role === "SUPER_ADMIN" ? "pointer-events-none" : ""} 
                                ${(item.title === "Reports") && "pointer-events-none"} 
                                p-5 flex justify-start items-center gap-2.5 my-1 rounded-lg w-full dark:hover:bg-slate-700 hover:bg-slate-300 
                                ${pathname === item.path && "dark:bg-slate-700 bg-slate-300"} h-12`}>
                                {item.icon}
                                {item.title}
                            </Link>
                        ))}
                    </li>
                ))}
            </ul>
        </nav>
    )
}