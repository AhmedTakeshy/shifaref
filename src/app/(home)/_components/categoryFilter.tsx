import { getCategories } from "@/_actions/productActions"
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
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

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
    const searchParams = useSearchParams()
    const [groupedCategories, setGroupedCategories] = useState<Record<string, Category[]>>(groupCategories(initialCategories))

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
        <Select onValueChange={handleSearchValue}>
            <SelectTrigger className="w-60">
                <SelectValue placeholder="Category Filter" />
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
    )
}
