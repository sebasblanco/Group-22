import React, { useState } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";
import LoLMasteryStats from "./LoLMasteryStats";

const LeagueOfLegendsStats = ({ username, tag }) => {
  const [activeTab, setActiveTab] = useState("championMastery"); // State to track active tab

  // Handler function to change active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // NavBar component
  const NavBar = () => {
    return (
      <div className="navbar">
        <div
          className={`tab ${activeTab === "matchHistory" ? "active" : ""}`}
          onClick={() => handleTabChange("matchHistory")}
        >
          Match History
        </div>
        <div
          className={`tab ${activeTab === "championMastery" ? "active" : ""}`}
          onClick={() => handleTabChange("championMastery")}
        >
          Champion Mastery
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavBar /> {/* Render the NavBar */}
      {activeTab === "championMastery" && (
        <div>
          <LoLMasteryStats username={username} tag={tag} />{" "}
          {/* Render LoLMasteryStats component */}
        </div>
      )}
      {activeTab === "matchHistory" && (
        /* Render match history content */
        <div>{/* Your match history content */}</div>
      )}
    </div>
  );
};

export default LeagueOfLegendsStats;
