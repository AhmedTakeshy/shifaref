import { Contact } from "@prisma/client";
import Link from "next/link"

type SimpleCardProps = {
    message?: Contact;
};


export default function SimpleCard({ message }: SimpleCardProps) {

    return (
        message ? (
            <div className="grid grid-cols-[1fr,auto] justify-between items-center p-2.5 dark:hover:text-slate-900 hover:bg-slate-200 rounded-lg w-full">
                <Link href={`/dashboard/messages`} className="flex items-center justify-start h-20 gap-2">
                    <p className="flex flex-col justify-start h-full text-sm rounded-md">
                        {message?.fullName.split(" ")[0]}
                        <br />
                        {message?.fullName.split(" ")[1]}
                    </p>
                    <div className="flex flex-col justify-start h-full gap-1">
                        <p className="text-sm font-medium">
                            {message?.email}
                        </p>
                        <p className="text-sm font-medium text-gray-500 dark:text-inherit line-clamp-3">
                            {message?.message}
                        </p>
                    </div>
                </Link>
            </div>
        ) : null
    )
}
