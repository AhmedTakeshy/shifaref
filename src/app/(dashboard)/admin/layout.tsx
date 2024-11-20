import React from 'react'

type AdminLayoutProps = Readonly<{
    children: React.ReactNode
}>

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div>
            <h1>Admin Layout</h1>
            {children}
        </div>
    )
}