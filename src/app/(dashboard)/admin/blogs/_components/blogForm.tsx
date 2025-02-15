"use client"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/_components/ui/form"
import { Input } from "@/_components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { Textarea } from "@/_components/ui/textarea"
import SubmitButton from "@/_components/submitButton"
import { CreateBlogPostSchema, createBlogPostSchema } from "@/lib/formsSchemas"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { BlogWithTags, createBlogPostAction, updateBlogPostAction } from "@/_actions/blogActions"
import { useSession } from "next-auth/react"
import { buttonVariants } from "@/_components/ui/button"
import Link from "next/link"

type BlogFormProps = {
    post?: BlogWithTags
}
export default function BlogForm({ post }: BlogFormProps) {
    const [isPending, setIsPending] = useState(false)
    const [isPublished, setIsPublished] = useState(post?.published || false)
    const { data: session } = useSession()
    const router = useRouter()

    const form = useForm<CreateBlogPostSchema>({
        resolver: zodResolver(createBlogPostSchema),
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            tags: post?.tags?.map((tag) => tag.name).join(",") || "",
            published: post?.published || false,
        },
    })

    async function handleBlogPost(data: CreateBlogPostSchema) {
        setIsPending(true)
        try {
            const result = await createBlogPostSchema.safeParseAsync(data)
            if (!result.success) {
                toast.error("Error!", {
                    description: "Something went wrong with the form data. Please try again.",
                })
                return
            }
            const res = post ? await updateBlogPostAction({ ...result.data, published: isPublished }, post.id) : await createBlogPostAction(result.data, Number(session?.user.id as string))
            console.log("🚀 ~ handleBlogPost ~ res:", res)
            if (res.status === "Success") {
                toast.success("Success", { description: res.successMessage })
                form.reset()
                router.push("/admin/blogs?page=1")
            } else {
                toast.error("Error", { description: res.errorMessage })
            }
        } catch {
            toast.error("Error!", {
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setIsPending(false)
        }
    }
    return (
        <div className="w-full p-4 mb-4 space-y-2 rounded-md max-sm:max-w-xs dark:bg-slate-800 bg-slate-200">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleBlogPost)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name={"title"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="dark:text-white ">Title</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                                        type="text"
                                        placeholder="How to lose weight?"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"content"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="dark:text-white">Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                                        placeholder="Write your blog post here..."
                                        rows={10}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"tags"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="dark:text-white">Tags</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                                        type="text"
                                        placeholder="Separate them with comma e.g (weight, fasting, fitness, health)"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 !mt-5">
                        <SubmitButton
                            pending={isPending && isPublished}
                            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
                            text="Publish"
                            type="submit"
                            onClick={() => setIsPublished(true)}
                        />
                        <SubmitButton
                            pending={isPending && !isPublished}
                            className="w-full sm:w-auto "
                            text="Draft"
                            type="submit"
                            onClick={() => setIsPublished(false)}
                        />
                        <Link href="." className={`${buttonVariants({ variant: "destructive" })}`}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}
