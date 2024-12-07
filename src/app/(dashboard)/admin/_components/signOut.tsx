"use client"
import { Button } from '@/_components/ui/button'
import { signOut } from 'next-auth/react'
import { MdLogout } from "react-icons/md";
export default function SignOut() {

    async function handleSignOut() {
        await signOut({ callbackUrl: `/login` })
    }
    return (
        <Button
            onClick={handleSignOut}
            className='dark:hover:bg-slate-700 hover:bg-slate-300 border-none dark:text-white items-center justify-start bg-none my-1 flex gap-2.5 w-full p-5' variant="ghost">
            <MdLogout />
            Sign Out
        </Button>
    )
}