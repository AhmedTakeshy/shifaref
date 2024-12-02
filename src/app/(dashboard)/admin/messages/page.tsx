import { getMessages } from '@/_actions/adminActions'
import MessageCard from './_components/messageCard'
import PaginationControl from '@/_components/paginationControl'
import Search from '../_components/search'

type Props = {
    searchParams: { [key: string]: string | undefined }
}

export default async function page({ searchParams }: Props) {
    const response = await getMessages({
        page: searchParams?.page,
        search: { email: searchParams?.email, phone: searchParams?.phone },
        read: searchParams?.read === "true",
    })
    return (
        <div className={`dark:bg-slate-800 bg-slate-200 p-5 rounded-xl mt-5 flex flex-col`}>
            <Search placeholder="Search messages..." option1="email" option2="phone" />
            {response.status === "Success" ?
                <>
                    <MessageCard messages={response.data.messages} />
                    <PaginationControl metadata={response.data.metadata} currentPage={Number(searchParams.page) || 1} />
                </>
                :
                <p className="font-semibold text-center text-red-500">There is a problem with our servers at moment, please try again later.</p>
            }
        </div>
    )
}