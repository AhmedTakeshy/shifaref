
import CreateModeratorForm from './_components/createModeratorForm'

export default function page() {
    return (
        <div className='flex flex-col items-center justify-center w-full max-w-md gap-8 mx-auto mt-12'>
            <h1 className='text-4xl font-semibold'>Create a new account.</h1>
            <CreateModeratorForm />
        </div>
    )
}