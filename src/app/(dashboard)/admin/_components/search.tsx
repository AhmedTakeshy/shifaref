"use client"
import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent, useState } from "react";
import { Button } from "@/_components/ui/button";

type SearchProps = {
    placeholder: string;
    option1: string;
    option2: string;
};

export default function Search({ placeholder, option1, option2 }: SearchProps) {
    const [searchType, setSearchType] = useState<typeof option1 | typeof option2>(option2);
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams);

    const handleSearchInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.value) {
            params.set(searchType, e.target.value);
        } else {
            params.delete(searchType);
        }
        replace(`${pathname}?${params}`);
    }, 100);

    const handleSearchClick = () => {
        params.delete(searchType);
        setSearchType(prev => prev === option1 ? option2 : option1)
        replace(`${pathname}?${params}`);
    }

    return (
        <div className={`flex items-center dark:bg-slate-700 bg-slate-300 p-2.5 w-max gap-2.5 rounded-lg h-12`}>
            <MdSearch size={20} />
            <input
                type="text"
                placeholder={placeholder}
                className={`border-none bg-transparent outline-none dark:text-white`}
                onChange={handleSearchInput}
            />
            <Button
                onClick={handleSearchClick}
                className={`font-bold border ${searchType === option1 ? "dark:bg-zinc-900 bg-white" : ""}`}
                variant="ghost"
            >
                {option1}
            </Button>
        </div>
    )
}