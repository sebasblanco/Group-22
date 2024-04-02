import { Metadata } from "next"
import AuthenticationPage from "./login-placeholder"

export const metadata: Metadata = {
    title: "Log In",
    description: ".",
}


export default function Home() {
    return (
        <AuthenticationPage/>
    )
}

