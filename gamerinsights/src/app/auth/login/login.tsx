// 'use client'
import { FormEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button";
import React from "react";
// import { login } from "../confirm/actions";
import { KeyIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./icons";

export default async function Login() {
    // const [isLoading, setIsLoading] = useState(false);
    // const handleSubmit = async (event: { preventDefault: () => void; target: HTMLFormElement | undefined; }) => {
    //     event.preventDefault();
    //     setIsLoading(true);

    //     // Create a FormData object from the form event
    //     const formData = new FormData(event.target);

    //     // You can now access email and password directly from formData
    //     const email = formData.get('email');
    //     const password = formData.get('password');

    //     // Assuming the login function expects an object with email and password
    //     try {
    //         await login({ email, password });
    //         setIsLoading(false);
    //         toast.success('Logged in successfully');
    //     } catch (error) {
    //         setIsLoading(false);
    //         toast.error('Failed to log in');
    //     }
    // };



    return (
        <div>
            <div><Toaster /></div>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
                        Log In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="block text-sm font-bold leading-6 dark:text-white text-primary">
                                Email Address
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="block text-sm font-bold leading-6 dark:text-white text-primary">
                                    Password
                                </Label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-black dark:text-white hover:text-red-600">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {/* {isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> // Make sure Icons.spinner points to your spinner icon
                            ) : (
                                "Sign in"
                            )} */}
                            Log In
                            </Button>
                        </div>
                    </form>
                    <div className="pt-8">
                        <div className="relative mb-5">
                      
                           
                        </div>
             
                    </div>

                    <div className="pt-5">

                        {/* <p className="mt-10 text-center text-sm text-gray-400">
                            Don&apos;t have an account?{' '}
                            <Link href="/auth/signup" className="font-semibold leading-6 text-green-500 hover:text-green-300">
                                Sign Up
                            </Link>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
