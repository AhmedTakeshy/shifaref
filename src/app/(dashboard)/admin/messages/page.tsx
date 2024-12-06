import { getMessages } from '@/_actions/adminActions'
import MessageCard from './_components/messageCard'
import PaginationControl from '@/_components/paginationControl'
import Search from '../_components/search'
import Link from 'next/link'
import { buttonVariants } from '@/_components/ui/button'

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function page({ searchParams }: Props) {
    const { page, search, read } = await searchParams
    const searchObj = search ? JSON.parse(search) : {}
    const response = await getMessages({
        page: page || "1",
        search: { email: searchObj.email, name: searchObj.name },
        read: read === "true",
    })
    return (
        <div className={`dark:bg-slate-800 bg-slate-200 p-5 rounded-xl mt-5 flex flex-col`}>
            <div className="flex items-center justify-between">
                <Search placeholder="Search messages..." option1="email" option2="name" />
                <Link href={{
                    query: {
                        ...Object.fromEntries(Object.entries(await searchParams)),
                        read: read === "true" ? false : true,
                    }
                }} className={`${buttonVariants()} ml-2.5`}>
                    {read === "true" ? "Show unread messages" : "Show read messages"}
                </Link>
            </div>
            {
                response.status === "Success" ?
                    <>
                        <MessageCard messages={response.data.messages} />
                        <PaginationControl metadata={response.data.metadata} currentPage={Number(page) || 1} />
                    </>
                    :
                    <p className="font-semibold text-center text-red-500">There is a problem with our servers at moment, please try again later.</p>
            }
        </div >
    )
}