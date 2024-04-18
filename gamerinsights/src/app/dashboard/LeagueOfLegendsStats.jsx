"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./components/LeagueOfLegendsStyle.css";
import LoLMasteryStats from "./components/LoLMasteryStats";
import LoLMatchHistory from "./components/LoLMatchHistory";
import Nav from "./components/Nav";

const LeagueOfLegendsStats = ({ username, tag }) => {
  const [activeTab, setActiveTab] = useState("matchHistory"); // State to track active tab
  const [puuid, setPuuid] = useState(null);

  // Handler function to change active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Get the user's puuid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamer-insights.azurewebsites.net/api/leaguegetpuuid?code=S-qc4dIw6awRjX4zf2-8Fq5-F3sZjm2R1IicSv7YRN6cAzFusHAL1A%3D%3D&username=${username}&tag=${tag}`
        );
        setPuuid(response.data.puuid);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [username, tag]);


  return (
    <div className="bg-zinc-900 dark:bg-zinc-900">
      {activeTab === "championMastery" && (
        <div>
          <LoLMasteryStats username={username} tag={tag} puuid={puuid} />{" "}
          {/* Render LoLMasteryStats component */}
        </div>
      )}
      {activeTab === "matchHistory" && (
        /* Render match history content */
        <div>
          <LoLMatchHistory username={username} tag={tag} puuid={puuid} />{" "}
        </div>
      )}
    </div>
  );
};

export default LeagueOfLegendsStats;
