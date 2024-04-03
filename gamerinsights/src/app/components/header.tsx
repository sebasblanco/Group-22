'use client'
import { useState } from 'react'
import { Dialog, Disclosure } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ModeToggle } from './DarkModeToggle'
import { PagesDropDown } from './pagesdropdown'
import { Button } from '../../components/ui/button';
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

const solutions = [
    { name: 'Customizable Dashboard', description: 'Get a better understanding of your traffic', href: '#' },
    { name: 'Track External Accounts', description: 'Speak directly to your customers', href: '#' },
    { name: 'Progressive Profiling', description: 'Speak directly to your customers', href: '#' },
    { name: 'Loan Tracking', description: 'Speak directly to your customers', href: '#' },
    { name: 'Automated Investment Adjustments', description: 'Speak directly to your customers', href: '#' },

]

const about: { title: string; href: string; description: string }[] = [
    {
        title: "Automated Investing",
        href: "/docs/primitives/alert-dialog",
        description:
            "Desc Here",
    },
    {
        title: "IRAs and 401(k)",
        href: "/docs/primitives/hover-card",
        description:
            "Desc Here",
    },
    {
        title: "Portfolio Options",
        href: "/docs/primitives/progress",
        description:
            "Desc Here",
    },
    {
        title: "Crypto Investing",
        href: "/docs/primitives/scroll-area",
        description: "Desc Here",
    },
    {
        title: "Micro Investing",
        href: "/docs/primitives/tabs",
        description:
            "Desc Here",
    },
    {
        title: "Financial Tools",
        href: "/docs/primitives/tooltip",
        description:
            "Desc Here",
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (

        <header className="relative z-50">

            <nav className="lg:px-4 px-2 py-4  -m" aria-label="Global">
                <div className='flex flex-wrap justify-between items-center mx-auto px-4 xl:max-w-screen-xl'>
                    <div className="flex lg:flex-1 ">
                        <Link href="/" className="flex ">
                            <img src="gamerinsightslogo.svg" alt='test' className='h-[50px] w-auto mt-5' />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <div className='pr-3'>
                            <Button asChild className='text-md font-semibold dark:bg-white dark:hover:bg-gray-300'>
                                <Link href="/auth/login">Log in</Link>
                            </Button>
                        </div>

                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6 dark:text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex  z-50">
                        <PagesDropDown />
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {/* <Link href="/auth/signup" className=" bg-green-500 inline-flex items-center justify-center px-3 py-2 mr-1 text-md font-bold text-center text-white rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900  hover:transition duration-300 ease-in-out dark:ring-2 dark:ring-white ">
                            Sign Up
                        </Link> */}
                        <Button asChild className='text-md dark:text-black font-semibold dark:bg-white dark:hover:bg-gray-300'>
                            <Link href="/auth/login/">Log in</Link>
                        </Button>

                        {/* <LoginOptions /> */}
                        <div className='ml-3'>
                            <Button variant={"outline"} size={"icon"}><GithubIcon /></Button>
                        </div>
                    </div>
                </div>
            </nav>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="bg-background fixed inset-y-0 right-0 z-20 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 dark:sm:ring-gray-600 sm:ring-gray-900/10  ">
                    <div className="flex items-center justify-between dark:bg-background">
                        <div className="-m-1.5 p-1.5">
                            <Link href="/" className="flex items-center py-2">
                                <img src="gamerinsights.svg" alt='test' className='h-[50px] w-auto mt-5' />
                            </Link>
                        </div>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6 dark:text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root bg-background dark:bg-background">
                        <div className="-my-6 divide-y divide-zinc-500">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/about"
                                    className="-mx-3 dark:text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-secondary"
                                >
                                    Features
                                </Link>


                                <Link
                                    href="/about"
                                    className="-mx-3 dark:text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-secondary"
                                >
                                    Integrations
                                </Link>


                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="dark:text-white flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-secondary">
                                                About
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...about].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.title}
                                                        as="a"
                                                        href={item.href}
                                                        className="dark:text-white block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    >
                                                        {item.title}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                            </div>
                            <div className="py-6">
                                <Link
                                    href="#"
                                    className="-mx-3 dark:text-white block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Log In
                                </Link>

                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
