import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";

const LoLMatchBox = ({ matchId, puuid }) => {
  const [matchData, setMatchData] = useState(null);
  const [rankData, setRankData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamer-insights.azurewebsites.net/api/getmatchdata?code=Ourmnsm1rkNiHLBMUb_e_stQtY0tmn5_TqSkbwzj0aeWAzFuESDheA%3D%3D&matchID=${matchId}`
        );
        setMatchData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [matchId]);

  // useEffect(() => {
  //   if (matchData !== null) {
  //     setMainPlayerIndex(
  //       matchData.metadata.participants.findIndex(
  //         (participant) => participant === puuid
  //       )
  //     );
  //     if (mainPlayerIndex === -1) {
  //       console.error("Main player not found in match data");
  //       return;
  //     }

  //     const fetchRankData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://gamer-insights.azurewebsites.net/api/getrankedbysummonerid?code=v3qS6VLz2yS0HAa0IYdwAFrW3Wu5FAgV8mCxjELLSfIHAzFufOcBdQ%3D%3D&summonerId=${matchData.info.participants[mainPlayerIndex].summonerId}`
  //         );
  //         setRankData(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchRankData();
  //   }
  // }, [matchData, puuid]);

  if (matchData === null) {
    return <div>Loading...</div>;
  }

  const mainPlayerIndex = matchData.metadata.participants.findIndex(
    (participant) => participant === puuid
  );
  if (mainPlayerIndex === -1) {
    return <div>Main player not found in match data</div>;
  }

  function FormatChampName(string) {
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

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp); // Convert Unix timestamp to milliseconds
    const month = String(date.getMonth());
    const day = String(date.getDate());
    const year = String(date.getFullYear()); // Get last 2 digits of the year
    return `${month}/${day}/${year}`;
  }

  function gameType(queueId) {
    var string = "";
    if (queueId == 420) {
      string = "Ranked Solo/Duo";
    } else if (queueId == 400) {
      string = "Draft Pick";
    } else if (queueId == 430) {
      string = "Blind Pick";
    } else if (queueId == 440) {
      string = "Ranked Flex";
    } else if (queueId == 450) {
      string = "ARAM";
    } else {
      string = "Normal";
    }
    return string;
  }
  const firstFiveParticipants = matchData.info.participants.slice(0, 5);
  const lastFiveParticipants = matchData.info.participants.slice(5);

  return mainPlayerIndex !== null ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className={
          matchData.info.participants[mainPlayerIndex].win
            ? "match-box winner-box"
            : "match-box loser-box"
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* The image and summoner spells */}
          <div style={{ display: "flex", alignItems: "center:" }}>
            <img
              src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/champion/${FormatChampName(
                matchData.info.participants[mainPlayerIndex].championName
              )}.png`}
              alt="Champion Splash"
              style={{ marginRight: "10px" }} // Add margin between images if needed
            />
          </div>
          <div className="two-summoner-icons">
            <img
              src={`https://lolcdn.darkintaqt.com/cdn/spells/${matchData.info.participants[mainPlayerIndex].summoner1Id}`}
              alt="SummonerSpell1"
              className="summoner-spell-img"
            />
            <img
              src={`https://lolcdn.darkintaqt.com/cdn/spells/${matchData.info.participants[mainPlayerIndex].summoner2Id}`}
              alt="SummonerSpell2"
              className="summoner-spell-img"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "20%",
          }}
        >
          {/* KDA information */}
          {/* Duration of game */}
          <div className="game-date">{gameType(matchData.info.queueId)}</div>
          <div className="kda">
            {matchData.info.participants[mainPlayerIndex].kills} /{" "}
            <span style={{ color: "red" }}>
              {matchData.info.participants[mainPlayerIndex].deaths}{" "}
            </span>
            / {matchData.info.participants[mainPlayerIndex].assists}
          </div>
          <div className="game-duration">
            {formatTime(matchData.info.gameDuration)}
          </div>
          <div className="game-date">
            {formatDate(matchData.info.gameStartTimestamp)}
          </div>
        </div>
        {/* All of the Items */}
        <div className="item-list-container" style={{ width: "35%" }}>
          <ul className="item-list">
            {[0, 1, 2, 3, 4, 5].map((index) =>
              // Sometimes the player will not have an item in a certain slot. If so, don't render image
              matchData.info.participants[mainPlayerIndex][`item${index}`] !==
              0 ? (
                <li key={index}>
                  <img
                    src={`https://cdn.darkintaqt.com/lol/c-assets/items/${
                      matchData.info.participants[mainPlayerIndex][
                        `item${index}`
                      ]
                    }.png.webp`}
                    alt={`Item ${index}`}
                    className="item-icon"
                  />
                </li>
              ) : null
            )}
          </ul>
        </div>
        {/* List the participants */}
        <div className="all-participants-list" style={{ width: "25%" }}>
          <ul className="match-participants blue-side" style={{ width: "50%" }}>
            {firstFiveParticipants.map((participant, index) => (
              <li
                key={index}
                className={mainPlayerIndex === index ? "bold-text" : ""}
                title={`${participant.riotIdGameName}#${participant.riotIdTagline}`}
              >
                {participant.riotIdGameName.length > 5
                  ? participant.riotIdGameName.slice(0, 5) + "..."
                  : participant.riotIdGameName}
                <img
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/champion/${FormatChampName(
                    participant.championName
                  )}.png`}
                  alt="Champion Splash"
                  className="participant-champ-img"
                />
              </li>
            ))}
          </ul>
          <ul className="match-participants red-side">
            {lastFiveParticipants.map((participant, index) => (
              <li
                key={index}
                title={`${participant.riotIdGameName}#${participant.riotIdTagline}`}
                className={
                  mainPlayerIndex === index + firstFiveParticipants.length
                    ? "bold-text"
                    : ""
                }
              >
                {participant.riotIdGameName.length > 5
                  ? participant.riotIdGameName.slice(0, 5) + "..."
                  : participant.riotIdGameName}
                <img
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/champion/${FormatChampName(
                    participant.championName
                  )}.png`}
                  alt="Champion Splash"
                  className="participant-champ-img"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default LoLMatchBox;
