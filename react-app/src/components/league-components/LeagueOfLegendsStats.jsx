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
  // NavBar component
  const NavBar = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#282e32",
          listStyle: "none",
          padding: 0,
        }}
      >
        <li
          className={`tab ${activeTab === "matchHistory" ? "active" : ""}`}
          onClick={() => handleTabChange("matchHistory")}
        >
          Match History
        </li>
        <li
          className={`tab ${activeTab === "championMastery" ? "active" : ""}`}
          onClick={() => handleTabChange("championMastery")}
        >
          Champion Mastery
        </li>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
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
