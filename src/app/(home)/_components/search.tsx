"use client"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function Search() {
  const { push } = useRouter()
  const [inputValue, setInputValue] = useState("")
  const searchParams = useSearchParams()
  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  useEffect(() => {
    const currentValue = params.get("title") || "";
    setInputValue(currentValue);
  }, [searchParams, params]);

  const handleSearchInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }
    const url = new URL(window.location.href)
    url.search = searchParams.toString()
    window.history.pushState({}, "", url.toString())
    push(`?${params.toString()}`, { scroll: false });
  }, 100)


  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full mb-4 container">
      <div className="h-16 w-full bg-white rounded-[10px] justify-between flex items-center shadow-lg mx-auto max-w-3xl mt-12`">
        <input
          type="text"
          autoComplete="off"
          placeholder="Search products (e.g. Crave)"
          className={`border-none bg-transparent outline-none py-2 px-4 md:px-8 placeholder:text-grey-60 placeholder:text-lg w-full`}
          onChange={(e) => { setInputValue(e.target.value); handleSearchInput(e) }}
          value={inputValue}
        />
      </div>
    </div>
  )
}
