"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/_components/ui/carousel";
type ProductCardProps = {
    id: number;
    title: string;
    price: string;
    category: string;
    imageSrc: string | string[];
    checkoutUrl: string;
    detailsUrl: string;
    description: () => JSX.Element;
};


export default function ProductCard({ title, imageSrc, checkoutUrl, description, category, detailsUrl, price, id }: ProductCardProps) {
    const [active, setActive] = useState<ProductCardProps | boolean | null>(
        null
    );

    const ref = useRef<HTMLDivElement>(null);

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

    useOutsideClick(ref, () => setActive(null));

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
                                <Image
                                    priority
                                    width={960}
                                    height={640}
                                    src={typeof active.imageSrc === "string" ? active.imageSrc : active.imageSrc[0] || ""}
                                    alt={active.title}
                                    className="object-cover object-top w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg"
                                />
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
                                            layoutId={`category-${active.category}-${id}`}
                                            className="text-sm text-dark-green-20 dark:text-neutral-400"
                                        >
                                            {active.category}
                                        </motion.p>
                                        <motion.p
                                            layoutId={`category-${active.price}-${id}`}
                                            className="text-base text-dark-green-20 dark:text-neutral-400"
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
                                            target="_blank"
                                            className="px-4 py-3 text-sm font-bold text-white transition-colors duration-300 border-2 border-transparent hover:text-dark-green-15 bg-light-green-70 rounded-xl hover:border-light-green-70 hover:bg-transparent "
                                        >
                                            Checkout
                                        </Link>
                                        <Link href={active.detailsUrl}
                                            target="_blank"
                                            className="px-4 py-3 text-sm font-bold transition-colors duration-300 border-2 border-transparent bg-light-green-80 text-dark-green-15 rounded-xl hover:border-light-green-80 hover:bg-transparent"
                                        >
                                            Details
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
                                        {typeof active.description === "function"
                                            ? active.description()
                                            : active.description}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            {/* <ul className="grid items-start w-full max-w-2xl grid-cols-1 gap-4 mx-auto md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-2"> */}
            <motion.div
                layoutId={`card-${title}-${id}`}
                key={title}
                onClick={() => setActive({ title, category, imageSrc, checkoutUrl, description, detailsUrl, price, id })}
                className="flex flex-col p-4 cursor-pointer hover:bg-light-green-90 dark:hover:bg-neutral-800 rounded-xl"
            >
                <div className="flex flex-col w-full gap-4">
                    <motion.div layoutId={`image-${title}-${id}`}>
                        <Carousel>
                            <CarouselContent>
                                {typeof imageSrc === "string" ? (
                                    <CarouselItem>
                                        <Image
                                            width={960}
                                            height={640}
                                            src={imageSrc}
                                            alt={title}
                                            className="object-cover object-top w-full rounded-lg h-60"
                                        />
                                    </CarouselItem>
                                ) : (
                                    imageSrc.map((src, index) => (
                                        <CarouselItem key={index}>
                                            <Image
                                                width={960}
                                                height={640}
                                                src={src}
                                                alt={title}
                                                className="object-cover object-top w-full rounded-lg h-60"
                                            />
                                        </CarouselItem>
                                    ))
                                )}
                            </CarouselContent>
                        </Carousel>
                    </motion.div>
                    <div className="flex flex-col items-center justify-center">
                        <motion.h3
                            layoutId={`title-${title}-${id}`}
                            className="text-base font-semibold text-center text-dark-green-15 dark:text-neutral-200 md:text-left"
                        >
                            {title}
                        </motion.h3>
                        <motion.p
                            layoutId={`category-${category}-${id}`}
                            className="text-sm text-center text-dark-green-20 dark:text-neutral-400 md:text-left"
                        >
                            {category}
                        </motion.p>
                        <motion.p
                            layoutId={`category-${price}-${id}`}
                            className="text-base text-center text-grey-20 dark:text-neutral-400 md:text-left"
                        >
                            ${price}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
            {/* </ul> */}
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


