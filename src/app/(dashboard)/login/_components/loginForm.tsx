"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/_components/ui/form"
import { Input } from "@/_components/ui/input"
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LoginSchema, loginSchema } from "@/lib/formsSchemas"
import SubmitButton from "@/_components/submitButton"
import { signIn } from "next-auth/react"


export default function LoginForm() {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()


    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })



    async function loginCredentials(data: LoginSchema) {
        setIsPending(true)
        try {
            const result = await loginSchema.safeParseAsync(data)
            if (!result.success) {
                toast.error("Error!", {
                    description: "Something went wrong with the form data. Please try again.",
                })
                return
            }
            const { email, password } = result.data
            const res = await signIn("credentials", {
                redirect: false,
                email: email.toLowerCase(),
                password,
            })
            if (res?.status === 200) {
                toast.success(`Welcome back!`, {
                    description: "You have successfully signed in",
                })
                router.push("/admin")
            } else {
                toast.error("Oops!", {
                    description: "Please check your email and password and try again.",
                })
            }
        } catch {
            toast("Error!", {
                description: "Something went wrong. Please try again.",
            })
        }
        setIsPending(false)
    }

    return (
        <Form {...form} >
            <div className="w-full p-4 mb-4 space-y-2 border-2 rounded-md max-sm:max-w-xs border-slate-800 dark:border-slate-400">
                <form onSubmit={form.handleSubmit(loginCredentials)}
                    className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="*******" {...field} type={`${showPassword ? "text" : "password"}`} />
                                        {showPassword ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(false)} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`} onClick={() => setShowPassword(true)} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton className="w-full !mt-6" text="Login" pending={isPending} />
                </form>
            </div>
        </Form>
    )
}