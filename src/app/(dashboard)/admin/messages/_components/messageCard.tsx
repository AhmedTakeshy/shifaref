import { Contact } from '@prisma/client'
import Link from 'next/link'

type ClientMessageProps = {
    messages: Contact[]
}
export default function MessageCard({ messages }: ClientMessageProps) {

    return (
        <div className='grid items-center gap-2.5 mt-2.5 lg:grid-cols-2'>
            {messages.map(message => (
                <div key={message.id} className="max-w-lg p-2.5 rounded-3xl bg-gradient-to-b from-blue-300 to-red-300 dark:from-blue-800 dark:to-purple-800 ">
                    <div className="rounded-[calc(1.5rem-.5rem)] p-6 bg-slate-200 dark:bg-slate-800">
                        <div className="flex flex-col items-start gap-2.5">
                            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200">
                                <b>Full name: </b>{message.fullName}
                            </h3>
                            <Link href={`mailto:${message.email}`} className="text-lg font-medium text-slate-700 dark:text-slate-200">
                                <b>Email: </b>{message.email}
                            </Link>
                            <Link href={`tel:${message.phone}`} className="text-lg font-medium text-slate-700 dark:text-slate-200">
                                <b>Phone: </b>{message.phone}
                            </Link>
                            <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                                <b>Message: </b>{message.message}
                            </p>
                            <span className="text-sm tracking-wide text-slate-600 dark:text-slate-400">
                                <b>Date - Time: </b> {new Date(message.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}