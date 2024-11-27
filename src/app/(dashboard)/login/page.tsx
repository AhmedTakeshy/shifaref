import LoginForm from './_components/loginForm'

export default function Login() {
    return (
        <div className='flex flex-col items-center justify-center w-full max-w-md gap-8 mx-auto mt-12'>
            <h1 className='text-4xl font-semibold'>Welcome to sign page.</h1>
            <LoginForm />
        </div>
    )
}
