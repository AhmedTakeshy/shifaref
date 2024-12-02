import SkeletonCard from '@/_components/skeletonCard'

export default function loading() {
    return (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
            {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} className="mx-8 my-6" />
            ))}
        </ul>
    )
}
