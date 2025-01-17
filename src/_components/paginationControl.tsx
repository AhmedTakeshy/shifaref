"use client"
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi"
import Link from "next/link"
import { Button } from "./ui/button"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

type PaginationControlProps = {
  currentPage: number
  metadata: {
    hasNextPage: boolean
    totalPages: number
  }
  className?: string
  scrollToTop?: boolean
}

export default function PaginationControl({ currentPage, metadata, className, scrollToTop }: PaginationControlProps) {
  const { totalPages, hasNextPage } = metadata
  const hasPreviousPage = currentPage > 1
  const searchParams = useSearchParams()
  console.log("🚀 ~ PaginationControl ~ searchParams:", searchParams)

  const createPageLink = (page: number) => ({
    query: {
      ...Object.fromEntries(searchParams),
      page,
    },
  })

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 mx-auto px-2.5 mt-12 max-w-full ",
        className,
      )}
    >
      <Button asChild size={"icon"} variant="ghost">
        <Link
          aria-label="Go to the first page"
          href={createPageLink(1)}
          scroll={scrollToTop}
        >
          <FiChevronsLeft className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        asChild={hasPreviousPage}
        variant="ghost"
        className={`rounded-md text-base dark:hover:bg-slate-600`}
        disabled={!hasPreviousPage}
      >
        <Link
          aria-label="Go to the previous page"
          href={createPageLink(Math.max(currentPage - 1, 1))}
          scroll={scrollToTop}
        >
          Prev
        </Link>
      </Button>
      <span className="font-bold">{currentPage}</span>
      <span className="text-base mx-1">of</span>
      <span className="font-bold">{totalPages}</span>
      <Button
        asChild={hasNextPage}
        variant="ghost"
        className={`rounded-md text-base dark:hover:bg-slate-600`}
        disabled={!hasNextPage}
      >
        <Link
          aria-label="Go to the next page"
          href={createPageLink(Math.min(currentPage + 1, totalPages))}
          scroll={scrollToTop}
        >
          Next
        </Link>
      </Button>
      <Button asChild size={"icon"} variant="ghost">
        <Link
          aria-label="Go to the last page"
          href={createPageLink(totalPages)}
          scroll={scrollToTop}
        >
          <FiChevronsRight className="h-4 w-4 " />
        </Link>
      </Button>
    </div>
  )
}
