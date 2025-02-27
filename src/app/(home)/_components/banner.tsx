

export default function Banner() {
    return (
        <section className="flex flex-col items-center justify-between mb-12 sm:flex-row gap-x-10 h-[calc(100vh-6.5rem)]">
            {/* <Image src={womanImg} alt="hero" width={711} height={712} className="sm:w-1/2" loading="lazy" placeholder={"blur"} blurDataURL={womanImg.blurDataURL} /> */}
            <article className="container flex flex-col justify-center my-12 text-center w-full max-w-4xl gap-y-4 text-dark-green-15">
                <h2 className="mx-auto text-lg font-semibold border-b-[3px] border-light-green-70 lg:text-3xl sm:text-xl sm:w-fit">Enjoy Your ❤️ Health with</h2>
                <h1 className="lg:text-[58px] sm:text-5xl text-[38px] font-bold">Empowering Your Health and Beauty, Naturally</h1>
                <p className="font-medium text-grey-15">Explore a curated selection of skincare, cosmetics, dietary supplements, and wellness products that harness the healing power of nature, backed by science, to enhance your health, beauty, and vitality.</p>
            </article>
        </section>
    )
}
