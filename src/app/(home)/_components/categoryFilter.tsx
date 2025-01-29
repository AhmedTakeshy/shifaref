"use client"
import { getCategories } from "@/_actions/productActions"
import { Button } from "@/_components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectSeparator,
} from "@/_components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

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


export default function CategoryFilter() {
    const groupCategories = (categories: Category[]) => {
        return categories.reduce((acc, category) => {
            if (!acc[category.header]) acc[category.header] = [];
            acc[category.header].push(category);
            return acc;
        }, {} as Record<string, Category[]>);
    };
    const [groupedCategories, setGroupedCategories] = useState<Record<string, Category[]>>(groupCategories(initialCategories))
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

    const handleSearchValue = (value: string) => {
        if (value) {
            setSelectedCategory(value);
            params.set("category", value)
        }
        const url = new URL(window.location.href)
        url.search = searchParams.toString()
        window.history.pushState({}, "", url.toString())
        router.push(`?${params.toString()}`, { scroll: false })
    }

    const handleReset = () => {

        setSelectedCategory("")
        params.delete("category")
        const url = new URL(window.location.href)
        url.search = params.toString()
        window.history.pushState({}, "", url.toString())
        router.push(`?${params.toString()}`, { scroll: false })
    }



    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            if (response.status === "Success") {
                const fetchedGrouped = groupCategories(response.data);

                setGroupedCategories((prev) => {
                    const merged = { ...prev };

                    for (const [header, categories] of Object.entries(fetchedGrouped)) {
                        const existingCategories = merged[header] || [];
                        const uniqueCategories = [...existingCategories];

                        for (const category of categories) {
                            if (!existingCategories.some((cat) => cat.name === category.name)) {
                                uniqueCategories.push(category);
                            }
                        }
                        merged[header] = uniqueCategories;
                    }

                    return merged;
                });
            }
        };
        fetchCategories();
    }, []);



    return (
        <div className="flex items-center justify-center mb-8 gap-4">
            <Select onValueChange={handleSearchValue} value={selectedCategory || ""} >
                <SelectTrigger className="w-60">
                    <SelectValue placeholder={"Filter category"} />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(groupedCategories).map(([header, categories]) => {
                        return <SelectGroup key={header}>
                            <SelectLabel>{header.replace("_", " ")}</SelectLabel>
                            {categories.map(({ name }, index) => (
                                <SelectItem key={`${header}-${name}-${index}`} value={name} className="hover:cursor-pointer">
                                    {name}
                                </SelectItem>
                            ))}
                            <SelectSeparator />
                        </SelectGroup>
                    })}
                </SelectContent>
            </Select>
            <Button
                onClick={handleReset}
                type={"button"}
                size={"sm"}
                className="bg-light-green-70 text-dark-green-15 hover:bg-light-green-80">
                Reset
            </Button>
        </div>
    )
    console.log("🚀 ~ CategoryFilter ~ selectedCategory:", selectedCategory)
    console.log("🚀 ~ CategoryFilter ~ selectedCategory:", selectedCategory)
}
