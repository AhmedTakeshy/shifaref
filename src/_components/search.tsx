"use client"
import { MdSearch } from "react-icons/md"
import { useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/_components/ui/button"
import CategoryFilter from "@/app/(home)/_components/categoryFilter"

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const handleSearchValue = () => {
    const value = inputRef.current?.value.trim()

    const updatedQuery = new URLSearchParams(searchParams.toString())

    if (value) {
      updatedQuery.set("q", value)
    } else {
      updatedQuery.delete("q")
    }

    const url = new URL(window.location.href)
    url.search = updatedQuery.toString()
    window.history.pushState({}, "", url.toString())
    inputRef.current?.blur()
  }

  const handleReset = () => {
    const updatedQuery = new URLSearchParams(searchParams.toString())
    updatedQuery.delete("q")
    updatedQuery.delete("category")

    const url = new URL(window.location.href)
    url.search = updatedQuery.toString()
    window.history.pushState({}, "", url.toString())

    inputRef.current!.value = ""
    inputRef.current?.blur()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full mb-12 container">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchValue()
        }}
        className={`flex items-center shadow-lg mx-auto w-full rounded-[10px] max-w-3xl mt-12`}
      >
        <div className="h-16 w-full bg-white rounded-[10px] justify-between flex items-center">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search products (e.g. Crave)"
            className={`border-none bg-transparent outline-none py-2 px-4 md:px-8 placeholder:text-grey-60 placeholder:text-lg w-full`}
            ref={inputRef}
          />
          <Button
            aria-label="Search for products"
            size={"icon"}
            variant={"ghost"}
            className="px-8 h-full hover:bg-light-green-90"
            onClick={handleSearchValue}
          >
            <MdSearch
              className=" text-light-green-70"
              style={{ fontSize: "1.75rem", width: "1.75rem", height: "1.75rem" }}
            />
          </Button>
        </div>
      </form>
      <div className="flex items-center gap-4">
        <CategoryFilter />
        <Button onClick={handleReset} size={"sm"} className="bg-light-green-70 text-dark-green-15 hover:bg-light-green-80">
          Reset
        </Button>
      </div>
    </div>
  )
}
