import LeagueOfLegendsStats from "./LeagueOfLegendsStats";
import Nav from "./components/Nav";
export default function Features() {
  return (
    <div>
      <Nav/>
      <LeagueOfLegendsStats
        username={"Doublelift"}
        tag={"na1"}
      ></LeagueOfLegendsStats>
    </div>
  );
}
