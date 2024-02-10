import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";
import "./LolMatchBox";
import LoLMatchBox from "./LolMatchBox";

const LoLMatchHistory = ({ username, tag, puuid }) => {
  const [matchIds, setMatchIds] = useState([]); // State to track active tab
  //Get a list of recent 20 games
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamer-insights.azurewebsites.net/api/getlistofmatches?code=NUwm1jlubSXbf9aNRQkmUYR0rK4YCNGq0Xrao1JjUMzaAzFuQ4uvXw%3D%3D&puuid=${puuid}`
        );
        setMatchIds(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [puuid]);

  return (
    <div>
      <div className="LoL-stats-div">
        <ul>
          {matchIds.map((matchId, index) => (
            <LoLMatchBox key={matchId} puuid={puuid} matchId={matchId} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default LoLMatchHistory;
