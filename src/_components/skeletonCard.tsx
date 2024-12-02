import { Skeleton } from "@/_components/ui/skeleton"
import { cn } from "@/lib/utils"

type SkeletonCardProps = {
    className?: string
}

export default function SkeletonCard({ className }: SkeletonCardProps) {
    return (
        <div className={cn(className, "flex flex-col space-y-3")}>
            <Skeleton className="h-[324px] w-[300px] rounded-xl" />
            <div className="space-y-2 text-center">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
            </div>
        </div>
    )
}
