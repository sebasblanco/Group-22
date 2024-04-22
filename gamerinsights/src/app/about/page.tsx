import { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
    title: "About",
    description: "Gamer Insights About",
};

export default function About() {
    return (
        <div>
            <Header />
            <h1>About</h1>
            <Footer />
        </div>
    );
}