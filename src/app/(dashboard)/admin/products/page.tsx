import prisma from "@/lib/prisma"

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function page({ searchParams }: Props) {
    const { read } = await params
    const products = await prisma.product.findMany()
    return (
        <div>page</div>
    )
}
