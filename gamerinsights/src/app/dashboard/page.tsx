import { redirect } from "next/navigation";
import LeagueOfLegendsStats from "./LeagueOfLegendsStats";
import FullNav from "./components/FullNav";
import { getUserData } from "@/lib/data"
import { prisma } from "../../lib/PrismaClient";

export default async function Home() {
    const user = await getUserData();
    console.log(user);
    // Check if user and user.riotUserName are defined
    if (!user || !user.riotUserName) {
        return (
            <div>
            <FullNav/>
                <h2>No Data to Display</h2>
                <h4>Connect your account in the settings.</h4>
            </div>
        )
    }
    var username = user.riotUserName.split("#");
    console.log(username);
    return (
        <div>
            <FullNav />
            <LeagueOfLegendsStats
                username={username[0]}
                tag={username[1]}
            ></LeagueOfLegendsStats>
        </div>
    )
}
