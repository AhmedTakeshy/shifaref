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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/_components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { CreateOrUpdateProductSchema, createOrUpdateProductSchema } from "@/lib/formsSchemas"
import { useRouter } from "next/navigation"
import { Textarea } from "@/_components/ui/textarea"
import { $Enums } from "@prisma/client"
import SubmitButton from "@/_components/submitButton"
export default function ProductForm() {
    const [isPending, setIsPending] = useState<boolean>(false)
    const router = useRouter()
    const form = useForm<CreateOrUpdateProductSchema>({
        resolver: zodResolver(createOrUpdateProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0.00,
            category: "",
            images: [],
            checkoutUrl: "",
        },
    })

    async function createProduct(data: CreateOrUpdateProductSchema) {
        setIsPending(true)
        try {
            const result = await createOrUpdateProductSchema.safeParseAsync(data)
            if (!result.success) {
                toast("Error!", {
                    description: "Something went wrong with the form data. Please try again.",
                })
                return
            }
            console.log("🚀 ~ createProduct ~ result:", result.data)
            // await createProductAction(data)
            // router.push("/admin/products")
        } catch {
            toast("Error!", {
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Form {...form}>
            <div className="w-full p-4 mb-4 space-y-2 border-2 rounded-md max-sm:max-w-xs border-slate-800 dark:border-slate-400">
                <form
                    onSubmit={form.handleSubmit(createProduct)}
                    className="space-y-2"
                >
                    <div className="flex flex-col sm:flex-row justify-between">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Crave Burner" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} min={1} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A new weight loss supplement" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col sm:flex-row justify-between">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            name={field.name}
                                        >
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Select a main category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys($Enums.Label).map((category) => (
                                                    <SelectItem key={category} value={category} className=" capitalize">
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            name={field.name}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys($Enums.Label).map((category) => (
                                                    <SelectItem key={category} value={category} className=" capitalize">
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <SubmitButton pending={isPending} text="Create product" />
                </form>
            </div>
        </Form>
    )
}
