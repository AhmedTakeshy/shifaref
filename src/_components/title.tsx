import React from 'react'

type TitleProps = {
    title: string
    subtitle: string
}

export default function Title({ title, subtitle }: TitleProps) {
    return (
        <div className="flex flex-col gap-2 my-16 text-center">
            <h2 className="text-grey-15 font-bold text-[28px] md:text-[38px] xl:text-[48px]">
                {title}
            </h2>
            <p className="text-sm text-grey-20 md:text-base xl:text-lg">
                {subtitle}
            </p>
        </div>
    )
}