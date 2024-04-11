import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RankData {
  wins: number;
  losses: number;
 }
 
 interface LoLWinrateCircleProps {
  rankData: RankData[];
 }

 const LoLWinrateCircle: React.FC<LoLWinrateCircleProps> = ({ rankData }) => {
  var percentage =
    rankData.length !== 0
      ? (rankData[0].wins / (rankData[0].wins + rankData[0].losses)) * 100
      : 0;
  percentage = Math.round(percentage * 10) / 10;
  console.log("percentageL " + percentage);

  return (
    <div>
      <span className="text-white">Ranked winrate</span>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
  );
};

export default LoLWinrateCircle;
