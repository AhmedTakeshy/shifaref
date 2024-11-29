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
import { toast } from "sonner"
import { CreateModeratorSchema, createModeratorSchema } from "@/lib/formsSchemas"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/_components/ui/select"
import SubmitButton from "@/_components/submitButton"
import { createAdminAction } from "@/_actions/adminActions"
import { useRouter } from "next/navigation"

export default function CreateModeratorForm() {

    const [isPending, setIsPending] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<{
        password: boolean,
        confirmPassword: boolean
    }>
        ({
            password: false,
            confirmPassword: false,
        })
    const router = useRouter()
    const form = useForm<CreateModeratorSchema>({
        resolver: zodResolver(createModeratorSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "SUPER_ADMIN",
        },
    })

    async function createUser(data: CreateModeratorSchema) {
        setIsPending(true)
        try {
            const result = await createModeratorSchema.safeParseAsync(data)
            if (!result.success) {
                toast("Error!", {
                    description: "Something went wrong with the form data. Please try again.",
                })
                return
            }

            const res = await createAdminAction(result.data)

            if (res?.status !== "Error") {
                toast.success("Successfully!", {
                    description: res?.successMessage,
                })
                form.reset()
                router.replace("/admin")
            } else {
                toast.error("Error!", {
                    description: res?.errorMessage,
                })
            }
        } catch {
            toast.error("Error!", {
                description: "Something went wrong. Please try again.",
            })
        }
        setIsPending(false)
    }
    return (
        <Form {...form} >
            <div className="w-full p-4 mb-4 space-y-2 border-2 rounded-md max-sm:max-w-xs border-slate-800 dark:border-slate-400">
                <form
                    onSubmit={form.handleSubmit(createUser)}
                    className="space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Harvey" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Specter" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="example@email.com" {...field} />
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
                                        <Input placeholder="*******" {...field} type={`${showPassword.password ? "text" : "password"}`} />
                                        {showPassword.password ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(prevState => ({ ...prevState, password: false }))} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, password: true }))} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="*******" {...field} type={`${showPassword.confirmPassword ? "text" : "password"}`} />
                                        {showPassword.confirmPassword ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: false }))} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: true }))} />}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="!mt-4">
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        name={field.name}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                placeholder="Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton className="w-full !mt-6" pending={isPending} text="Create Admin" />
                </form>
            </div>
        </Form>
    )
}