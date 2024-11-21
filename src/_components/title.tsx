import { cn } from '@/lib/utils'
import React from 'react'

type TitleProps = {
    title: string
    subtitle: string
    className?: string
    titleClassName?: string
    subtitleClassName?: string
}

export default function Title({ title, subtitle, className, titleClassName, subtitleClassName }: TitleProps) {
    return (
        <div className={cn("flex flex-col gap-2 my-16 text-center", className)}>
            <h2 className={cn("text-grey-15 font-bold text-[28px] md:text-[38px] xl:text-[48px]", titleClassName)}>
                {title}
            </h2>
            <p className={cn("text-sm text-grey-20 md:text-base xl:text-lg", subtitleClassName)}>
                {subtitle}
            </p>
        </div>
    )
}