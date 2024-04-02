
'use client'
import Image from "next/image"
import Link from "next/link"

import { Button } from "../../../components/ui/button"


import { motion } from "framer-motion";
import React from "react";
import Header from "./header"
import { Type } from "lucide-react";
import { TypewriterEffectSmooth } from "./type-writer";

// Elevate Your Gameplay, Empower Your Strategy with Gamer Insights

const words = [
    {
        text: "Elevate",
    },
    {
        text: "Your",
    },
    {
        text: "Gameplay",
        className: "text-orange-500 dark:text-orange-500",

    },

    {
        text: "Empower",
    },
    {
        text: "Your",
    },
    {
        text: "Strategy",
        className: "text-orange-500 dark:text-orange-500",
    }
];


export default function Body() {


    return (
        <div>
            <div className="relative pt-10 flex items-center justify-center">
                {/* <GlowingStarsHeroBackground className="relative pt-10 flex items-center justify-center"> */}
                <div className="relative pt-10 h-[50rem] flex items-center justify-center z-20">

                    <div className="py-15 sm:py-15 lg:pb-40">
                        <TypewriterEffectSmooth words={words} className="z-20" />
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="mt-14 text-2xl text-black dark:text-zinc-100">
                                Gamer Insights is a data-driven platform that helps you make better decisions for your gaming strategy. Our platform provides you with actionable insights and analytics to help you improve your gameplay and elevate your strategy.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Button className="bg-orange-500 hover:bg-orange-700 text-white">See How It Works</Button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>

    )
}

