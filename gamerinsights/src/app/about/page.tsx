import Header from "../components/header"
import Footer from "../components/footer"
// import Button from "@/components/ui/button"
import Link from "next/link"

export default function About() {
    return (
        <div>
            <Header />
            <h1>About</h1>
            <Link
                href="/"
                className="-mx-3 dark:text-white block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
                Log In
            </Link>           
            <Footer />
        </div>
    )
}