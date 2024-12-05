import CreateProduct from "./_component/createProduct";


export default function page() {

    return (
        <div className='flex flex-col items-center justify-center w-full max-w-xl dark:text-slate-800 gap-8 mx-auto mt-12'>
            <h1 className='text-4xl font-semibold'>Create a new product.</h1>
            <CreateProduct />
        </div>
    )
}
