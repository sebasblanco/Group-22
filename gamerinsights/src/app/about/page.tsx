import { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
    title: "About",
    description: "Gamer Insights About",
};

export default function About() {
    return(
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <br></br><br></br>
          <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-50 sm:text-4xl">About GamerInsights</p>
          <p className="mt-6 text-lg leading-8 text-cyan-50">This is a website where players can view their in-game stats for League of Legends. 
          The player is able to log into the website and link their account username. 
          They can view their dashboard for their match history with a detailed overview of each game, 
          as well as for their current rank and win rate for the season. 
          In addition, players can access a tab where they can view their most played characters and look up stats for other players.</p>
          
          <br></br><br></br>
          
          <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-50 sm:text-4xl">The team</p>
          <p className="mt-6 text-lg leading-8 text-cyan-50">John Whiddon <br></br>
          Albert Martinez <br></br>
          Nicholas Bosque<br></br>
          Sebastian Blanco<br></br>
          Christopher Nielson
          </p>
        </div>
      </div>
    </div>
    )
}