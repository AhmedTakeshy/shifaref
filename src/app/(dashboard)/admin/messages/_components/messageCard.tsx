"use client"
import { deleteMessage, readMessage } from '@/_actions/adminActions'
import SubmitButton from '@/_components/submitButton'
import { Contact } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

type ClientMessageProps = {
    messages: Contact[]
}
export default function MessageCard({ messages }: ClientMessageProps) {
    const [isPending, setIsPending] = useState(false)


    async function handleMarkAsRead(id: number) {
        setIsPending(true)
        try {
            const res = await readMessage(id)
            if (res.status === 'Success') {
                toast.success("Success", { description: "Message marked as read" })
            } else {
                toast.error("Error", { description: "Error marking message as read" })
            }
        } catch {
            toast.error('Error', { description: 'Something went wrong!' })
        } finally {
            setIsPending(false)
        }
    }

    async function handleDeleteMessage(id: number) {
        setIsPending(true)
        try {
            const res = await deleteMessage(id)
            if (res.status === 'Success') {
                toast.success("Success", { description: "Message deleted" })
            } else {
                toast.error("Error", { description: "Error deleting message" })
            }
        } catch {
            toast.error('Error', { description: 'Something went wrong!' })
        } finally {
            setIsPending(false)
        }
    }

    return (
        <ul className='grid items-center gap-2.5 mt-2.5 lg:grid-cols-2'>
            {messages.map(message => (
                <li key={message.id} className={`max-w-lg p-2.5 rounded-3xl bg-gradient-to-b from-blue-300 to-red-300 dark:from-blue-800 dark:to-purple-800`}>
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
                            <time dateTime={new Date(message.createdAt).toLocaleString()} className="text-sm tracking-wide text-slate-600 dark:text-slate-400">
                                <b>Date - Time: </b> {new Date(message.createdAt).toLocaleString()}

                            </time>
                            <div className="flex items-center gap-2.5">
                                <SubmitButton
                                    className="self-end"
                                    text={message.read ? "Already read" : "Mark as read"}
                                    pending={isPending}
                                    onClick={() => handleMarkAsRead(message.id)}
                                    disabled={message.read}
                                />
                                <SubmitButton
                                    className="self-end"
                                    text={"Delete"}
                                    pending={isPending}
                                    variant={"destructive"}
                                    onClick={() => handleDeleteMessage(message.id)}
                                />
                            </div>
                        </div>
                    </div>
                </li>
            ))
            }
        </ul>
    )
}