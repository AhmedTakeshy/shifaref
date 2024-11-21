import { ReactNode } from 'react'

type FeatureCardProps = {
    icon: ReactNode
    title: string
    description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className='grid grid-cols-[auto,1fr] p-7 sm:p-10 lg:px-[50px] bg-light-green-85 rounded-lg gap-x-4 items-center gap-y-5'>
            <div className="flex items-center justify-center p-[12px] rounded-md bg-light-green-70">
                {icon}
            </div>
            <h3 className='text-lg font-semibold lg:text-2xl sm:text-xl'>
                {title}
            </h3>
            <p className='col-span-2 text-sm font-medium text-grey-20 lg:text-lg sm:text-base'>
                {description}
            </p>
        </div>
    )
}