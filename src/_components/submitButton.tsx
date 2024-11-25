"use client"
import { ImSpinner9 } from 'react-icons/im'
import { Button, ButtonProps } from '@/_components/ui/button'
import { ReactNode } from 'react'


type Props = ButtonProps & {
    text: string | ReactNode,
    pending?: boolean,
    iconClass?: string
}

export default function SubmitButton({ iconClass, text, pending, ...props }: Props) {


    return (
        <Button
            disabled={pending}
            {...props}
        >
            {pending ? <ImSpinner9 className={`ease-in-out animate-spin ${iconClass}`} size={25} /> : text}
        </Button>
    )
}