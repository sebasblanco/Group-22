import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";

const LoLMasteryStats = ({ username, tag }) => {
  const [puuid, setPuuid] = useState(null);
  const [championMastery, setChampionMastery] = useState([]);
  const [championData, setChampionData] = useState(null);

  // Fetch the puuid
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

  // Fetch the champion masterys
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamer-insights.azurewebsites.net/api/getchampionmastery?code=kr0MFXnnRCrd4MUdqO2nv4IoaFsMotgiAKfVj2Hb-BFeAzFuSjNExg%3D%3D&puuid=${puuid}`
        );
        setChampionMastery(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (puuid) {
      fetchData();
    }
  }, [puuid]);

  // Fetch champion data
  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const response = await axios.get(
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"
        );
        setChampionData(response.data);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };

    fetchChampionData();
  }, []);

  // Function to get champion name from ID
  const getChampionNameFromId = (championId) => {
    if (championData && championData.data) {
      // Iterate over championData keys to find the matching "key" value
      for (const championKey of Object.keys(championData.data)) {
        if (championData.data[championKey].key === championId.toString()) {
          return championData.data[championKey].name;
        }
      }
    }
    return "Champion Name Not Found";
  };

  //For the pictures, the first letter of the champ name needs to be capitalized, spaces removed, punctuation removed
  function FormatChampName(string) {
    string = string.replace(/\s/g, "");
    string = string.replace(/[.,'\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="LoL-stats-div">
      <p>LoL stats for {username}</p>

      <div className="champion-list-container">
        <p>Favorite Champions:</p>
        <ul className="champion-list">
          {championMastery.map((champion) => (
            <div
              className="champion-entry"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="champion-info">
                {getChampionNameFromId(champion.championId)}, Mastery Level:{" "}
                {champion.championLevel}, Champion Points:{" "}
                {champion.championPoints}
              </span>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${FormatChampName(
                  getChampionNameFromId(champion.championId)
                )}_0.jpg`}
                alt="Champion Splash"
                className="champion-image"
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoLMasteryStats;
