import React, { useState } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";

const LoLMatchHistory = ({ username, tag, puuid }) => {

    const [matchIds, setMatchIds] = useState([]); // State to track active tab
    //Get a list of recent 20 games
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://gamer-insights.azurewebsites.net/api/leaguegetpuuid?code=S-qc4dIw6awRjX4zf2-8Fq5-F3sZjm2R1IicSv7YRN6cAzFusHAL1A%3D%3D&username=${username}&tag=${tag}`
            );
            setPuuid(response.data.puuid);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [username, tag]);



  return <div className="LoL-stats-div">hi</div>;
};
export default LoLMatchHistory;
