import LeagueOfLegendsStats from "./LeagueOfLegendsStats";
import FullNav from "./components/FullNav";
export default function Features() {
  return (
    <div>
      <FullNav/>
      <LeagueOfLegendsStats
        username={"Doublelift"}
        tag={"na1"}
      ></LeagueOfLegendsStats>
    </div>
  );
}
