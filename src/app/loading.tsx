import Image from "next/image"

export default function Loading() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-dark-green-15">
            <Image src="/favicons/android-chrome-512x512.png" alt="loading" width={100} height={100} className="w-[100px] animate-pulse" />
        </div>
    )
}