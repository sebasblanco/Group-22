import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogIn from "./login";
// import { ModeToggle } from "./dashboard/components/DarkModeToggle";
// import { BackgroundBeams } from "@/components/ui/background-beams";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function AuthenticationPage() {
    const session = getServerSession(authOptions);
    if (await session) {
        redirect('/dashboard');
    }

    return (
        <main>
            <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none dark:bg-dot-white/10 bg-grid-black/[0.2] lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <Link href="/" className="flex ">
                            <img src="gamerinsightslogo.svg" alt='test' className='h-[50px] w-auto mt-5' />
                        </Link>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                    </div>
                    <div className="relative z-20 flex items-center mt-auto">
                        {/* Hero text addition */}
                    </div>
                </div>

                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="absolute right-4 top-4 md:right-8 md:top-8">
                        </div>
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign In
                            </h1>
                        </div>
                        <LogIn />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Don&apos;t have an accout?{" "}
                            <Link
                                href="/auth/signup"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
