"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/_components/ui/select"
import { useSearchParams } from "next/navigation"
const categories: { label: string, values: string[] }[] = [
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
export default function CategoryFilter() {
    const searchParams = useSearchParams()
    const handleSearchValue = (value: string) => {
        const updatedQuery = new URLSearchParams(searchParams.toString())

        if (value) {
            updatedQuery.set("category", value)
        } else {
            updatedQuery.delete("category")
        }

        const url = new URL(window.location.href)
        url.search = updatedQuery.toString()
        window.history.pushState({}, "", url.toString())
    }
    return (
        // <div className='bg-light-green-90 h-min border border-light-green-80 rounded-md p-4 sm:ml-8 mx-4 space-y-2 flex flex-col'>
        <Select onValueChange={handleSearchValue}>
            <SelectTrigger className="w-60">
                <SelectValue placeholder="Category Filter" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((category) => (
                    <SelectGroup key={category.label}>
                        <SelectLabel>{category.label}</SelectLabel>
                        {category.values.map((value) => (
                            <SelectItem key={value} className="hover:cursor-pointer" value={value.toLowerCase()}>{value}</SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
        // </div>
    )
}
