"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";
import "./LoLMatchBox";
import LoLMatchBox from "./LoLMatchBox";
import LoLWinrateCircle from "./LoLWinrateCircle";

interface LoLMatchHistoryProps {
  username: string;
  tag: string;
  puuid: string;
}
interface SummonerData {
  id: string; // Assuming the id is a string, adjust the type as necessary
  // Add other properties as needed
}

const LoLMatchHistory: React.FC<LoLMatchHistoryProps> = ({
  username,
  tag,
  puuid,
}) => {
  const [matchIds, setMatchIds] = useState([]);
  const [summonerData, setSummonerData] = useState<SummonerData | null>(null);
  const [rankData, setRankData] = useState(null);

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

  //Find the summoner's id from puuid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamer-insights.azurewebsites.net/api/getsummoneridfrompuuid?code=L1r8lFplEPPqqtiBYoqOV7xXzmpbV774fyXUrx03tK1RAzFufMdM6g%3D%3D&puuid=${puuid}`
        );
        setSummonerData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [puuid]);
  // console.log(summonerData);

  //Find the summoner's rank from id
  useEffect(() => {
    const fetchData = async () => {
      if (summonerData) {
        // Check if summonerData is not null
        try {
          const response = await axios.get(
            `https://gamer-insights.azurewebsites.net/api/getrankedbysummonerid?code=v3qS6VLz2yS0HAa0IYdwAFrW3Wu5FAgV8mCxjELLSfIHAzFufOcBdQ%3D%3D&summonerId=${summonerData.id}`
          );
          setRankData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [summonerData]);
  console.log("Below is ranked data");
  console.log(rankData);

  function formatToLower(str: string) {
    return str.toLowerCase();
  }

  const rankDisplay = (rankData: string | any[]) => {
    if (rankData.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span className="rank-text">
            {username}#{tag}
          </span>
          <img
            src={
              "https://trackercdn.com/cdn/tracker.gg/lol/ranks/2022/unranked.png"
            }
            alt="Item 2"
            className="rank-icon"
          />
          <span style={{ marginBottom: 15, marginTop: -25 }}>
            <span className="rank-text"> Unranked</span>{" "}
          </span>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span className="rank-text">
            {username}#{tag}
          </span>
          <img
            src={
              "https://trackercdn.com/cdn/tracker.gg/lol/ranks/2022/" +
              formatToLower(rankData[0].tier) +
              ".png"
            }
            alt="Item 2"
            className="rank-icon"
          />
          <span style={{ marginBottom: 15, marginTop: -25, color: "white" }}>
            <span className="rank-text">
              {rankData[0].tier} {rankData[0].rank}
            </span>{" "}
            {rankData[0].leaguePoints}LP
          </span>
        </div>
      );
    }
  };
  console.log(puuid);

  return rankData !== null ? (
    <div className="LoL-stats-div">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
        }}
      >
        {rankDisplay(rankData)}
        <span style={{ width: "200px" }}>
          <LoLWinrateCircle rankData={rankData} />
        </span>
      </div>
      <ul>
        {matchIds.map((matchId, index) => (
          <LoLMatchBox key={matchId} puuid={puuid} matchId={matchId} />
        ))}
      </ul>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
export default LoLMatchHistory;
