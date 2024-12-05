import { FieldValues, Path, SubmitHandler, useFormContext, } from "react-hook-form"
import {
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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/_components/ui/select"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { Textarea } from "@/_components/ui/textarea"
import SubmitButton from "@/_components/submitButton"
import FileUpload from "./fileUpload"
import { Button } from "@/_components/ui/button"




const initialCategories = [
    {
        label: 'Personal Care',
        values: ["Perfumes & Aftershave", "Makeup (lipstick, mascara, foundation, eyeshadow)", "Cosmetics (deodorant, body spray, creams, serums)", "Skincare (Anti-aging, anti-wrinkle, face care creams, foams, masks)", "Aloe Vera Gel", "Mouth Hygiene (mouthwash, dental hygiene kit)", "Body & Intimate Care (body beauty, wellness, creams, gels)", "Hair Care (shampoos, conditioners)"]
    },
    {
        label: 'Health & Wellness',
        values: ["Supplements (food & beverages, vitamin C & A serum)", "Lactic Acid Skin Peel (for acne, age spots)", "Mental & Physical Fitness (health products)"]
    },
    {
        label: "Baby & Child Care",
        values: ["Baby & child care products"]
    },
    {
        label: "Lifestyle & Comfort",
        values: ["Comfort Items", "Hobby & Lifestyle Products", "Portable Blenders (battery powered)"]
    },
    {
        label: "Home & Kitchen",
        values: ["Kitchen Appliances"]
    },
    {
        label: "Beauty Accessories",
        values: ["Beauty Products & Accessories"]
    },
]

type ProductFormProps<T extends FieldValues> = {
    mode: "create" | "update";
    isPending: boolean
    onSubmit: SubmitHandler<T>;
}
export default function ProductForm<T extends FieldValues>({ mode, isPending, onSubmit }: ProductFormProps<T>) {
    const { control, handleSubmit } = useFormContext<T>()
    const categoryInputRef = useRef<HTMLInputElement>(null)
    const [categories, setCategories] = useState<{ label: string, values: string[] }[]>(initialCategories)

    const addCategory = () => {
        if (!categoryInputRef.current?.value.trim()) {
            toast.error("Category name cannot be empty.");
            return;
        }
        if (categories.some((cat) => cat.values.includes(categoryInputRef.current?.value ?? ""))) {
            toast.error("This category already exists.");
            return;
        }
        setCategories((prev) => [
            ...prev,
            { label: "Custom", values: [categoryInputRef.current?.value ?? ""] },
        ]);
        categoryInputRef.current.value = "";
        toast.success("Category added successfully.");
    };


    return (
        <div className="w-full p-4 mb-4 space-y-2 rounded-md max-sm:max-w-xs dark:bg-slate-800 bg-slate-200">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-2"
            >
                <div className="flex flex-col sm:flex-row justify-between gap-8">
                    <FormField
                        control={control}
                        name={"title" as Path<T>}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="dark:text-white">Title</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                                        type="text"
                                        placeholder="Crave Burner"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={"price" as Path<T>}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="dark:text-white">Price</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                                        type="float"
                                        min={1}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={control}
                    name={"description" as Path<T>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="dark:text-white">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="A new weight loss supplement"
                                    className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={"checkoutUrl" as Path<T>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="dark:text-white">Checkout URL</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="https://example.com"
                                    className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col justify-between my-2 w-full gap-5">
                    <FormField
                        control={control}
                        name={"category" as Path<T>}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="dark:text-white">Category</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        name={field.name}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-60 bg-white dark:bg-slate-200">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((group, idx) => (
                                                <SelectGroup key={idx}>
                                                    <SelectLabel className="font-semibold dark:text-white text-black">{group.label}</SelectLabel>
                                                    {group.values.map((value) => (
                                                        <SelectItem key={value} value={value}>
                                                            {value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-4">
                        <Input
                            ref={categoryInputRef}
                            placeholder="New Category"
                            className="bg-white dark:bg-slate-200 focus:ring-0 border-none"
                            type="text"
                        />
                        <Button
                            onClick={addCategory}
                            type="button"
                            className="dark:bg-black hover:!bg-zinc-700"
                            variant={"secondary"}
                        >
                            Add Category
                        </Button>
                    </div>
                </div>
                <FormField
                    control={control}
                    name={"images" as Path<T>}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FileUpload
                                    onChange={(files) => field.onChange(files)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton
                    pending={isPending}
                    text={`${mode === "update" ? "Update product" : "Create product"}`}
                    variant={"secondary"}
                    className="dark:bg-black hover:!bg-zinc-700"
                />
            </form>
        </div>
    )
}
