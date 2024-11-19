import { Button } from "@/_components/ui/button";
import Image from "next/image";

export default function Banner() {
    return (
        <section className="flex flex-col items-center justify-between mb-12 sm:flex-row gap-x-10">
            <Image src="/imgs/woman-banner.png" alt="hero" width={711} height={712} className="sm:w-1/2" />
            <article className="container flex flex-col justify-center my-12 ml-0 text-center sm:my-0 sm:w-5/12 gap-y-4 text-dark-green-15 sm:text-left">
                <h2 className="mx-auto text-lg font-semibold border-b-[3px] border-light-green-70 lg:text-3xl sm:text-xl sm:mx-0 sm:w-fit">Transform Your ❤️ Health with</h2>
                <h1 className="lg:text-[58px] sm:text-5xl text-[38px] font-bold">Personalized Nutrition Coaching</h1>
                <p className="font-medium text-grey-15">Welcome to Nutritionist, your partner in achieving optimal health through personalized nutrition coaching. Our certified nutritionists are here to guide you on your weight loss journey, providing customized plans and ongoing support. Start your transformation today and experience the power of personalized nutrition coaching.</p>
                <div className="flex items-center justify-center mt-12 gap-x-4 sm:justify-normal">
                    <Button className="transition-colors duration-300 border-2 border-transparent bg-light-green-70 text-dark-green-15 hover:border-light-green-70 hover:bg-transparent">Get Start Today</Button>
                    <Button className="transition-colors duration-300 border-2 border-transparent bg-light-green-85 text-dark-green-15 hover:border-light-green-85 hover:bg-transparent">Book Demo</Button>
                </div>
            </article>
        </section>
    )
}
