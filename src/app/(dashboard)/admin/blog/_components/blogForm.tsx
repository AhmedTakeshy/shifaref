// import {
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/_components/ui/form"
// import { Input } from "@/_components/ui/input"

// import { useState } from "react"
// import { toast } from "sonner"
// import { Textarea } from "@/_components/ui/textarea"
// import SubmitButton from "@/_components/submitButton"
// import { CreateBlogPostSchema, createBlogPostSchema } from "@/lib/formsSchemas"
// import { createProductAction, } from "@/_actions/productActions"
// import { useForm } from "react-hook-form"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { createBlogPostAction } from "@/_actions/adminActions"
// import { useSession } from "next-auth/react"

// export default function BlogForm() {
//     const [isPending, setIsPending] = useState(false)
//     const {data:session} = useSession()
//     const router = useRouter()

//     const form = useForm<CreateBlogPostSchema>({
//         resolver: zodResolver(createBlogPostSchema),
//         defaultValues: {
//             title: "",
//             content: "",
//             tags: [],
//             published: false,
//         },
//     })

//     async function createBlogPost(data: CreateBlogPostSchema) {
//         setIsPending(true)
//         try {
//             const result = await createBlogPostSchema.safeParseAsync(data)
//             if (!result.success) {
//                 toast.error("Error!", {
//                     description: "Something went wrong with the form data. Please try again.",
//                 })
//                 return
//             }
//             const res = await createBlogPostAction(result.data,parseInt(session?.user.id as string))
//             if (res.status === "Success") {
//                 toast.success("Success", { description: res.successMessage })
//                 form.reset()
//                 router.push("/admin/products?page=1")
//             } else {
//                 toast.error("Error", { description: res.errorMessage })
//             }
//         } catch {
//             toast.error("Error!", {
//                 description: "Something went wrong. Please try again.",
//             })
//         } finally {
//             setIsPending(false)
//         }
//     }
//     return (
//         <div className="w-full p-4 mb-4 space-y-2 rounded-md max-sm:max-w-xs dark:bg-slate-800 bg-slate-200">
//             <Form {...form}>
//             <FormField
//                         control={control}
//                         name={"title"}
//                         render={({ field }) => (
//                             <FormItem className="w-full">
//                                 <FormLabel className="dark:text-white">Title</FormLabel>
//                                 <FormControl>
//                                     <Input
//                                         className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
//                                         type="text"
//                                         placeholder="Crave Burner"
//                                         {...field}
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//             <FormItem name="title">
//                     <FormLabel>Title</FormLabel>
//                         <Input {...form.register("title")} />
//                         <FormMessage>{form.formState.errors.title?.message}</FormMessage>
//                 </FormItem>
//             </Form>
//         </div>
//     )
// }
