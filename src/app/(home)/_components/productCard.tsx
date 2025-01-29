"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi, } from "@/_components/ui/carousel";
import Fade from "embla-carousel-fade"
import { useSearchParams } from "next/navigation";




type ProductCardProps = {
    id: number;
    title: string;
    price: number;
    categoryName: string;
    images: string[];
    checkoutUrl: string;
    description: string
};


export default function ProductCard({ title, images, checkoutUrl, description, categoryName, price, id }: ProductCardProps) {
    const [active, setActive] = useState<ProductCardProps | boolean | null>(
        null
    );
    const searchParams = useSearchParams();
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    const handleActiveProduct = (value: string) => {
        const updatedQuery = new URLSearchParams(searchParams.toString())

        if (value) {
            updatedQuery.set("product-name", value.toLowerCase())
        } else {
            updatedQuery.delete("product-name")
        }

        const url = new URL(window.location.href)
        url.search = updatedQuery.toString()
        window.history.pushState({}, "", url.toString())
    }

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        // This function makes the carousel dots work and the card appear in initial state as a bug
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [api, setApi])

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => {
        setActive(null);
        handleActiveProduct("")
    });

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10 w-full h-full bg-dark-green-15/20"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0  grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-light-green-90 top-2 right-2 lg:hidden"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-light-green-97 dark:bg-dark-green-15 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <Carousel
                                    opts={{ containScroll: false, loop: true }}
                                    plugins={[Fade()]}
                                // setApi={setApi} // If this is uncommented, the carousel dots won't work and the bugs will be fixed
                                >
                                    <CarouselContent>
                                        {active.images.map((src) => (
                                            <CarouselItem key={src}>
                                                <Image
                                                    loading="lazy"
                                                    placeholder="blur"
                                                    blurDataURL={src}
                                                    width={960}
                                                    height={640}
                                                    src={src}
                                                    alt={active.title}
                                                    className="object-cover object-top w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg"
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <div className="flex items-center justify-between mx-4 mt-3">
                                        <div className="flex items-center gap-2">
                                            <CarouselPrevious className="static translate-y-0 bg-light-green-95 border border-light-green-90 hover:bg-light-green-90 text-grey-20" />
                                            <CarouselNext className="static translate-y-0 bg-light-green-95 border border-light-green-90 hover:bg-light-green-90 text-grey-20" />
                                        </div>
                                        <ul className="flex items-center gap-3">
                                            {Array.from({ length: count }).map((_, index) => (
                                                <li
                                                    key={index}
                                                    className={`w-3.5 h-3.5 transition-all duration-500 rounded-full border-2 bg-transparent ${current === index + 1 ? " border-dark-green-15" : "border-light-green-70"}`} />
                                            ))}
                                        </ul>
                                    </div>
                                </Carousel>
                            </motion.div>

                            <div>
                                <div className="flex items-start justify-between p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="text-base font-semibold text-dark-green-15 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`category-${active.categoryName}-${id}`}
                                            className="text-sm text-dark-green-20 dark:text-neutral-400"
                                        >
                                            {active.categoryName}
                                        </motion.p>
                                        <motion.p
                                            layoutId={`category-${active.price}-${id}`}
                                            className="text-base font-semibold text-dark-green-20 dark:text-neutral-400"
                                        >
                                            ${active.price}
                                        </motion.p>
                                    </div>

                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-4"
                                    >
                                        <Link href={active.checkoutUrl}
                                            rel={"noopener noreferrer"}
                                            target="_blank"
                                            className="px-4 py-3 text-sm font-bold text-white transition-colors duration-300 border-2 border-transparent hover:text-dark-green-15 bg-light-green-70 rounded-xl hover:border-light-green-70 hover:bg-transparent "
                                        >
                                            Checkout
                                        </Link>
                                    </motion.div>
                                </div>
                                <div className="relative px-4 pt-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-dark-green-25 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {typeof active.description === "string"
                                            ? (<p>{active.description}</p>)
                                            : active.description}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <motion.li
                layoutId={`card-${title}-${id}`}
                key={title}
                onClick={() => {
                    setActive({ title, categoryName, images, checkoutUrl, description, price, id })
                    handleActiveProduct(title)
                }}
                className="flex flex-col p-4 cursor-pointer hover:bg-light-green-90 dark:hover:bg-neutral-800 rounded-xl"
            >
                <div className="flex flex-col w-full gap-4">
                    <motion.div layoutId={`image-${title}-${id}`}>
                        <Image
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={images[0]}
                            width={960}
                            height={640}
                            src={images[0]}
                            alt={title}
                            className="object-cover object-top w-full rounded-lg h-60"
                        />
                    </motion.div>
                    <div className="flex flex-col items-center justify-center">
                        <motion.h3
                            layoutId={`title-${title}-${id}`}
                            className="text-base font-semibold text-center text-dark-green-15 dark:text-neutral-200 md:text-left"
                        >
                            {title}
                        </motion.h3>
                        <motion.p
                            layoutId={`category-${categoryName}-${id}`}
                            className="text-sm text-center text-dark-green-20 dark:text-neutral-400 md:text-left"
                        >
                            {categoryName}
                        </motion.p>
                        <motion.p
                            layoutId={`category-${price}-${id}`}
                            className="text-base text-center text-grey-20 dark:text-neutral-400 md:text-left"
                        >
                            ${price}
                        </motion.p>
                    </div>
                </div>
            </motion.li>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};


