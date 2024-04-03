import Link from "next/link"
import lottie from "lottie-web";
import { useEffect } from "react";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Login from "./login"
import { TextGenerateEffect } from "@/components/ui/text-generate";
import Image from "next/image";

const words = `Game-Changing Stats for Game-Changing Players`;

export default function AuthenticationPage() {


    return (
        <div>
            <div className="container relative hidden h-screen overflow-hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background">

                    <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                        <div className="relative z-20 flex items-center text-lg font-medium">
                            <Link href="/">
                                <img src="gamerinsightslogo.svg" alt='test' className='h-[50px] w-auto' height={100} width={100} />
                            </Link>
                        </div>
                        <div className="flex item-center justify-center">
                                <img src="valorant.png" alt="test2" className="h-[150px] w-auto mt-20" ></img>
                            </div>
                        <div className="relative z-20 mt-auto">
                         

                        </div>
                        <TextGenerateEffect words={words}/>

                    </div>

                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[1000px]">
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}