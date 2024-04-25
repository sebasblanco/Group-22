"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";

interface LoLMasteryStatsProps {
  username: string;
  tag: string;
  puuid: string | number; // Adjust the type as necessary
}

interface ChampionData {
  data: {
    [key: string]: {
      key: string;
      name: string;
      // Add other properties as needed
    };
  };
  // Add other properties as needed
}

interface ChampionMastery {
  championId: string; // Assuming championId is a string, adjust the type as necessary
  championLevel: number;
  championPoints: number;
}

const LoLMasteryStats = ({ username, tag, puuid }: LoLMasteryStatsProps) => {
  const [championMastery, setChampionMastery] = useState<ChampionMastery[]>([]);
  const [championData, setChampionData] = useState<ChampionData | null>(null);
  console.log("Puuid: " + puuid);

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
  const getChampionNameFromId = (championId: { toString: () => any }) => {
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
  function FormatChampName(string: string) {
    string = string.replace(/\s/g, "");
    string = string.replace(/[.,'\/#!$%^&*;:{}=\-_`~()]/g, "");

    //Some champions have different names/formats for their pictures. Edge cases below:
    if (string === "Wukong") {
      string = "MonkeyKing";
    } else if (string == "NunuWillump") {
      string = "Nunu";
    } else if (string == "KhaZix") {
      string = "Khazix";
    } else if (string == "ChoGath") {
      string = "Chogath";
    } else if (string == "KSante") {
      string = "KSante";
    } else if (string == "BelVeth") {
      string = "Belveth";
    } else if (string == "LeBlanc") {
      string = "Leblanc";
    } else if (string == "KaiSa") {
      string = "Kaisa";
    } else if (string == "VelKoz") {
      string = "Velkoz";
    } else if (string == "FiddleSticks") {
      string = "Fiddlesticks";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <p>Champion Masteries for {username}</p>

      <div className="champion-list-container">
        <ul className="champion-list">
          {championMastery.map((champion) => (
            <div
              className="champion-entry"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="champion-info">
                <text className="champion-name">
                  {getChampionNameFromId(champion.championId)}
                </text>
                <text>, Mastery: {champion.championLevel}</text>, Champion
                Points:{" "}
                <text className="mastery-points">
                  {champion.championPoints}
                </text>
              </span>
              <img
                src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/champion/${FormatChampName(
                  getChampionNameFromId(champion.championId)
                )}.png`}
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
