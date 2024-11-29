"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    MdPeople,
    MdOutlineMailOutline,
} from "react-icons/md";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { FaBlog } from "react-icons/fa";
import { FiCodesandbox } from "react-icons/fi";

export default function NavLinks() {
    const pathname = usePathname();
    const { data: session } = useSession()
    const menuItems = [
        {
            title: "Pages",
            list: [
                {
                    title: "Admin Panel",
                    path: "/admin",
                    icon: <LuLayoutPanelLeft />,
                    role: "ADMIN"
                },
                {
                    title: "Products",
                    path: "/admin/products?page=1",
                    icon: <FiCodesandbox />,
                    role: "ADMIN"
                },
                {
                    title: "Blog",
                    path: "/admin/blog?page=1",
                    icon: <FaBlog />,
                    role: "ADMIN"
                },
                // {
                //     title: "Moderators",
                //     path: "/admin/moderators?page=1",
                //     icon: <MdPeople />,
                //     role: "SUPER_ADMIN",
                // },
            ],
        },
        {
            title: "User",
            list: [
                {
                    title: "Messages",
                    path: "/admin/messages?page=1",
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