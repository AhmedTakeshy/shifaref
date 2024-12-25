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
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Textarea } from "@/_components/ui/textarea"
import SubmitButton from "@/_components/submitButton"
import FileUpload from "./fileUpload"
import { Button, buttonVariants } from "@/_components/ui/button"
import Link from "next/link"
import { getCategories } from "@/_actions/productActions"
import { SelectSeparator } from "@radix-ui/react-select"
import { Label } from "@/_components/ui/label"



const initialCategories = [
    {
        header: 'PERSONAL_CARE',
        name: "Perfumes & Aftershave"
    }, {
        header: 'PERSONAL_CARE',
        name: "Makeup (lipstick, mascara, foundation, eyeshadow)"
    }, {
        header: 'PERSONAL_CARE',
        name: "Cosmetics (deodorant, body spray, creams, serums)"
    }, {
        header: 'PERSONAL_CARE',
        name: "Skincare (Anti-aging, anti-wrinkle, face care creams, foams, masks)"
    }, {
        header: 'PERSONAL_CARE',
        name: "Aloe Vera Gel"
    }, {
        header: 'PERSONAL_CARE',
        name: "Mouth Hygiene (mouthwash, dental hygiene kit)"
    }, {
        header: 'PERSONAL_CARE',
        name: "Body & Intimate Care (body beauty, wellness, creams, gels)"
    }, {
        header: 'PERSONAL_CARE',
        name: "Hair Care (shampoos, conditioners)"
    }, {
        header: 'HEALTH_WELLNESS',
        name: "Supplements (food & beverages, vitamin C & A serum)"
    }, {
        header: 'HEALTH_WELLNESS',
        name: "Lactic Acid Skin Peel (for acne, age spots)"
    }, {
        header: 'HEALTH_WELLNESS',
        name: "Mental & Physical Fitness (health products)"
    }, {
        header: 'BABY_CHILD_CARE',
        name: "Baby & child care products"
    }, {
        header: 'LIFESTYLE_COMFORT',
        name: "Comfort Items"
    }, {
        header: 'LIFESTYLE_COMFORT',
        name: "Hobby & Lifestyle Products"
    }, {
        header: 'LIFESTYLE_COMFORT',
        name: "Portable Blenders (battery powered)"
    }, {
        header: 'HOME_KITCHEN',
        name: "Kitchen Appliances"
    }, {
        header: 'BEAUTY_ACCESSORIES',
        name: "Beauty Products & Accessories"
    }]

type ProductFormProps<T extends FieldValues> = {
    mode: "create" | "update";
    isPending: boolean
    onSubmit: SubmitHandler<T>;
}
export default function ProductForm<T extends FieldValues>({ mode, isPending, onSubmit }: ProductFormProps<T>) {
    const { control, handleSubmit } = useFormContext<T>()
    const categoryInputRef = useRef<HTMLInputElement>(null)
    const [categories, setCategories] = useState<Category[]>(initialCategories)

    const addCategory = () => {
        const newCategory = categoryInputRef.current?.value.trim();

        if (!newCategory) {
            toast.error("Category name cannot be empty.");
            return;
        }
        setCategories(prev => [...prev, { header: "OTHERS", name: newCategory }]);

        if (categoryInputRef.current) {
            categoryInputRef.current.value = "";
        }
        toast.success("Category added successfully.");
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await getCategories()
                if (res.status === "Error") {
                    toast.error(res.errorMessage)
                    return
                }
                const newCategories = res.data;

                setCategories(newCategories);
            } catch {
                toast.error("Failed to fetch categories.")
            }
        }
        fetchCategories()
    }, [])


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
                                            {Object.entries(
                                                categories.reduce((acc, category) => {
                                                    if (!acc[category.header]) {
                                                        acc[category.header] = [];
                                                    }
                                                    acc[category.header].push(category);
                                                    return acc;
                                                }, {} as Record<string, Category[]>)
                                            ).map(([header, categories]) => (
                                                <SelectGroup key={header}>
                                                    <SelectLabel className="font-semibold dark:text-white text-black capitalize">{header.replace("_", " ")}</SelectLabel>
                                                    <SelectSeparator />
                                                    {categories.map(({ name }) => (
                                                        <SelectItem key={name} value={name}>
                                                            {name}
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
                    <div className="flex items-end gap-4">
                        <div className="flex-col flex space-y-2 w-full">
                            <Label className="dark:text-white">Add Category</Label>
                            <Input
                                ref={categoryInputRef}
                                placeholder="Supplements"
                                className="bg-white dark:bg-slate-200 focus:ring-0 border-1 "
                                type="text"
                            />
                        </div>
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
                <div className="flex flex-col sm:flex-row justify-canter my-2 w-full gap-5">
                    <SubmitButton
                        pending={isPending}
                        text={`${mode === "update" ? "Update product" : "Create product"}`}
                        variant={"secondary"}
                        className="dark:bg-black hover:!bg-zinc-700"
                    />
                    <Link href="/admin/products?page=1" className={buttonVariants({ variant: "destructive" })}>
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}
