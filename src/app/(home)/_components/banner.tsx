import { Button } from "@/_components/ui/button";
import Image from "next/image";

export default function Banner() {
    return (
        <section className="flex sm:flex-row flex-col justify-between items-center mb-12">
            <Image src="/imgs/woman-banner.png" alt="hero" width={711} height={712} />
            <article className="justify-center flex-col flex container my-12 gap-y-4 text-dark-green-15 text-center sm:text-left">
                <h2 className="border-b border-light-green-70 text-lg lg:text-3xl sm:text-xl font-semibold mx-auto sm:mx-0 sm:w-fit">Transform Your ❤️ Health with</h2>
                <h1 className="lg:text-[58px] sm:text-5xl text-[38px] font-bold">Personalized Nutrition Coaching</h1>
                <p className="font-medium text-grey-15">Welcome to Nutritionist, your partner in achieving optimal health through personalized nutrition coaching. Our certified nutritionists are here to guide you on your weight loss journey, providing customized plans and ongoing support. Start your transformation today and experience the power of personalized nutrition coaching.</p>
            </article>
            <div className="flex items-center gap-x-4">
                <Button className="bg-light-green-70 text-dark-green-15 border border-transparent hover:border-light-green-70 hover:bg-transparent transition-colors duration-300">Get Start Today</Button>
                <Button className="bg-light-green-85 text-dark-green-15 border border-transparent hover:border-light-green-85 hover:bg-transparent transition-colors duration-300">Book Demo</Button>
            </div>
        </section>
    )
}
