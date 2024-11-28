import { auth } from '@/lib/auth'
import SignOut from './signOut';
import NavLinks from './navLinks';

export default async function Sidebar() {
    const session = await auth()

    return (
        <section className='sticky w-full top-10'>
            <div className="flex items-center gap-5 mb-5">
                <div className="flex flex-col">
                    <span className="font-semibold">{session?.user.name}</span>
                    <span className="text-xs dark:text-slate-400">{session?.user.role}</span>
                </div>
            </div>
            <NavLinks />
            <SignOut />
        </section>
    )
}
