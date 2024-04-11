import { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
    title: "Integrations",
    description: "Gamer Insights Integrations",
};

export default function Integrations() {
    return (
        <div>
            <Header />
            <h1>Integrations</h1>
            <Footer />
        </div>
    );
}