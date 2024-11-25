"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormMessage, FormItem, FormLabel } from "@/_components/ui/form"
import { ContactSchema, contactSchema } from "@/lib/formsSchemas"
import { Input } from "@/_components/ui/input"
import { Textarea } from "@/_components/ui/textarea"
import SubmitButton from "@/_components/submitButton"
// import { contactFormAction } from "@/_actions/userActions"
import { toast } from "sonner"

export default function ContactForm() {
    const [isPending, setIsPending] = useState<boolean>(false)

    const form = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullName: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
        },
    })


    async function submitContact(data: ContactSchema) {
        setIsPending(true)
        try {
            const result = await contactSchema.safeParseAsync(data)
            if (!result.success) {
                setIsPending(false)
                return
            }
            const res = { statusCode: 200 }
            // await contactFormAction(result.data)
            if (res.statusCode === 200) {
                form.reset()
                toast.success("Contact form submitted successfully", {
                    description: "We will get back to you soon, thank you!",
                })
            }
        } catch {
            toast.error("Error", {
                description: "Internal Server Error message not sent!",
            })
        }
        setIsPending(false)
    }

    return (
        <Form {...form}>
            <form className="grid sm:grid-cols-2 w-full items-center lg:p-20 sm:p-12 p-7 xl:p-20 border border-light-green-85 bg-light-green-95 rounded-xl gap-[30px]"
                onSubmit={form.handleSubmit(submitContact)}>
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className="text-neutral-600 font-semibold text-base lg:text-lg">Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter your Name"
                                    className="w-full p-5 border rounded-md placeholder-grey-40 bg-light-green-90 border-light-green-80 focus-visible:ring-dark-green-15"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className="text-neutral-600 font-semibold text-base lg:text-lg">Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter your Email"
                                    className="w-full p-5 border rounded-md placeholder-grey-40 bg-light-green-90 border-light-green-80 focus-visible:ring-dark-green-15"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="space-y-2 sm:col-span-2">
                            <FormLabel className="text-neutral-600 font-semibold text-base lg:text-lg">Phone Number</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Enter your Number"
                                    className="w-full p-5 border rounded-md placeholder-grey-40 bg-light-green-90 border-light-green-80 focus-visible:ring-dark-green-15 "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="space-y-2 sm:col-span-2">
                            <FormLabel className="text-neutral-600 font-semibold text-base lg:text-lg">Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    rows={6}
                                    cols={15}
                                    placeholder="Enter your Message"
                                    className="p-5 border rounded-md placeholder-grey-40 bg-light-green-90 border-light-green-80 focus-visible:ring-dark-green-15"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton text="Send Message" pending={isPending} className="bg-light-green-70 text-grey-15 hover:bg-light-green-80 !mt-10 sm:col-span-2" />
            </form>
        </Form>
    )
}
