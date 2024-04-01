'use client'
import { useState } from 'react'
import { Dialog, Disclosure } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ModeToggle } from './DarkModeToggle'
import { PagesDropDown } from './pagesdropdown'
import { Button } from '../../../components/ui/button'
// import MySvgComponent from './logo'

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

            <nav className="lg:px-4 px-2 py-4" aria-label="Global">
                <div className='flex flex-wrap justify-between items-center mx-auto px-4 xl:max-w-screen-xl'>
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex items-center py-4">
                            {/* <MySvgComponent/> */}
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
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="dark:bg-background fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 dark:sm:ring-gray-600 sm:ring-gray-900/10 bg-opacity-50 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                        <div className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Link href="/" className="flex items-center py-2">
                                <svg className="h-8 md:h-10 w-auto fill-green-500 dark:fill-white " viewBox="0 0 350.00000000000006 110.0053045131987"><g transform="matrix(4.640678977689433,0,0,4.640678977689433,-2.5987810683883894,0.7637259811136552)"><path d="M6.1 12.16 c-1.6 0 -2.8 1.22 -2.8 2.76 c0 1.52 1.24 2.76 2.8 2.76 c1.52 0 2.7 -1.24 2.7 -2.76 c0 -1.54 -1.18 -2.76 -2.7 -2.76 z M6.34 20.14 c-1.16 0 -2.28 -0.36 -3 -0.92 l0 4.3 l-2.78 0 l0 -13.78 l2.78 0 l0 0.8 c0.72 -0.56 1.84 -0.9 3 -0.9 c2.8 0 5.18 2.26 5.18 5.22 s-2.38 5.28 -5.18 5.28 z M17.7 12.16 c-1.52 0 -2.7 1.24 -2.7 2.76 c0 1.54 1.18 2.76 2.7 2.76 c1.6 0 2.8 -1.22 2.8 -2.76 c0 -1.52 -1.24 -2.76 -2.8 -2.76 z M20.46 20 l0 -0.76 c-0.72 0.56 -1.84 0.9 -3 0.9 c-2.8 0 -5.18 -2.26 -5.18 -5.22 s2.38 -5.28 5.18 -5.28 c1.16 0 2.28 0.36 3 0.92 l0 -0.82 l2.78 0 l0 10.26 l-2.78 0 z M34.22 9.74 l-3.44 9.9 c-0.96 2.74 -2.2 3.9 -4.72 3.9 l-1 0 l0 -2.5 l0.84 0 c0.92 0 1.52 -0.52 1.9 -1.32 l-3.82 -9.98 l3.18 0 l2.1 6.32 l2.08 -6.32 l2.88 0 z M43.54 20 l-1.4 -5.86 l-1.4 5.86 l-3.52 0 l-2.62 -10.26 l2.8 0 l1.68 7.06 l1.74 -7.06 l2.8 0 l1.72 7.1 l1.7 -7.1 l2.7 0 l-2.64 10.26 l-3.56 0 z M53.28 8.86 l-2.78 0 l0 -2.56 l2.78 0 l0 2.56 z M53.28 20 l-2.78 0 l0 -10.26 l2.78 0 l0 10.26 z M57.13999999999999 9.74 l0 1.04 c0.5 -0.58 1.56 -1.22 2.98 -1.22 c2.4 0 3.96 1.66 3.96 4.14 l0 6.3 l-2.76 0 l0 -5.82 c0 -1.22 -0.7 -2.06 -1.88 -2.06 c-1.36 0 -2.26 0.86 -2.26 2.28 l0 5.6 l-2.78 0 l0 -10.26 l2.74 0 z M70.44 17.68 c1.6 0 2.8 -1.22 2.8 -2.76 c0 -1.52 -1.24 -2.76 -2.8 -2.76 c-1.52 0 -2.7 1.24 -2.7 2.76 c0 1.54 1.18 2.76 2.7 2.76 z M73.2 20 l0 -0.76 c-0.72 0.56 -1.84 0.9 -3 0.9 c-2.8 0 -5.18 -2.26 -5.18 -5.22 s2.38 -5.28 5.18 -5.28 c1.16 0 2.28 0.36 3 0.92 l0 -4.26 l2.78 0 l0 13.7 l-2.78 0 z"></path></g></svg>
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
                    <div className="mt-6 flow-root ">
                        <div className="-my-6 divide-y divide-zinc-500">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="dark:text-white flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 dark:hover:bg-secondary">
                                                Features
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...solutions].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                <Link
                                    href="/about"
                                    className="-mx-3 dark:text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-secondary"
                                >
                                    Integrations
                                </Link>

                                <Link
                                    href="/pricing"
                                    className="-mx-3 dark:text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-secondary"
                                >
                                    Pricing
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
                                    Indivdual Log In
                                </Link>
                                <Link
                                    href="#"
                                    className="-mx-3 dark:text-white block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Advisor Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
