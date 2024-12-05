"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import { CreateProductSchema, createProductSchema, } from "@/lib/formsSchemas"
import { createProductAction, } from "@/_actions/productActions"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import ProductForm from "../../_components/productForm"
import { Form } from "@/_components/ui/form"


export default function CreateProduct() {
  const [isPending, setIsPending] = useState<boolean>(false)
  const router = useRouter()


  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      images: [],
      checkoutUrl: "",
    },
  })



  async function createProduct(data: CreateProductSchema) {
    setIsPending(true)
    try {
      const result = await createProductSchema.safeParseAsync(data)
      if (!result.success) {
        toast.error("Error!", {
          description: "Something went wrong with the form data. Please try again.",
        })
        return
      }
      const res = await createProductAction(data)
      if (res.status === "Success") {
        toast.success("Success", { description: res.successMessage })
        form.reset()
        router.push("/admin/products?page=1")
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
    <Form {...form}>
      <ProductForm
        isPending={isPending}
        onSubmit={createProduct}
        mode="create"
      />
    </Form>
  )
}
