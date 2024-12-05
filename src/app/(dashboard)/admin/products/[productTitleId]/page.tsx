import { getProductById } from '@/_actions/productActions'
import UpdateProduct from './_component/updateProduct'

type PageProps = {
    params: Promise<{ [key: string]: string | undefined }>
}

export default async function page({ params }: PageProps) {
    const { productTitleId } = await params
    const id = productTitleId?.split('-').pop() || ''
    const response = await getProductById({ productId: id })
    console.log("🚀 ~ page ~ response:", response.status)
    return (
        <div className='flex flex-col items-center justify-center w-full max-w-xl dark:text-slate-800 gap-8 mx-auto mt-12'>
            <h1 className='text-4xl font-semibold'>Update product.</h1>
            {response.status === "Success" ? (
                <UpdateProduct product={response.data} />
            ) : (
                <p className="text-semibold text-base text-rose-600">
                    {response.errorMessage}
                </p>
            )}
        </div>
    )
}
