import React from 'react'

type TitleProps = {
    title: string
    subtitle: string
}

export default function Title({ title, subtitle }: TitleProps) {
    return (
        <div className="">
            <h2 className="text-grey-15 font-bold text-[28px] md:text-[38px] xl:text-[48px]">
                {title}
            </h2>
            <p className="text-grey-20 text-sm md:text-base xl:text-lg">
                {subtitle}
            </p>
        </div>
    )
}