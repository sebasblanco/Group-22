import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Features",
  description: "Gamer Insights Features",
};

export default function Features() {
    return(
        <div>
            <Header />
            <h1>Features</h1>
            <Footer />
        </div>
    )
}