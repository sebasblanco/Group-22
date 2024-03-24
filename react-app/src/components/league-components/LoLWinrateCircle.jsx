import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const LoLWinrateCircle = ({ rankData }) => {
  var percentage =
    rankData.length !== 0
      ? (rankData[0].wins / (rankData[0].wins + rankData[0].losses)) * 100
      : 0;
  percentage = Math.round(percentage * 10) / 10;
  console.log("percentageL " + percentage);

  return (
    <div>
      <span class="winrate-text">Ranked winrate</span>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
  );
};

export default LoLWinrateCircle;
