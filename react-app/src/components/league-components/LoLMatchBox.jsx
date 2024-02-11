import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";
import LoLDropDownMenu from "./LoLDropDownMenu";

const LoLMatchBox = ({ matchId, puuid }) => {
  const [matchData, setMatchData] = useState(null);
  const [runeData, setRuneData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/ZackCampbell/Statix/master/resources/runesReforged.json`
        );
        setRuneData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(runeData);

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

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
    const date = new Date(unixTimestamp);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const year = String(date.getFullYear()).substring(2);
    return `${month}/${day}/${year}`;
  }

  function getStyle(index, firstOrSecond) {
    if (matchData !== null && runeData !== null)
      var styleID =
        matchData.info.participants[index].perks.styles[firstOrSecond].style;
    var styleName = runeData.find((styleName) => styleName.id === styleID);
    return styleName.key;
  }

  function getKeyStone(index) {
    if (matchData !== null && runeData !== null) {
      var styleID = matchData.info.participants[index].perks.styles[0].style;
      var styleName = runeData.find((style) => style.id === styleID).key;
      var keyStoneID =
        matchData.info.participants[index].perks.styles[0].selections[0].perk;
      var keyStoneName = runeData
        .find((style) => style.key === styleName)
        .slots[0].runes.find((rune) => rune.id === keyStoneID).key;
      // console.log(keyStoneName);
      if (keyStoneName === "Aftershock") {
        keyStoneName = "VeteranAftershock";
      }
      return keyStoneName;
    }
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

  var winningTeamParticipants;
  var losingTeamParticipants;

  if (matchData.info.teams[0].win) {
    winningTeamParticipants = firstFiveParticipants;
    losingTeamParticipants = lastFiveParticipants;
  } else {
    winningTeamParticipants = lastFiveParticipants;
    losingTeamParticipants = firstFiveParticipants;
  }

  return mainPlayerIndex !== null ? (
    <div>
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
                style={{ marginRight: "10px" }}
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
            <ul className="rune-list">
              <li>
                {/* Primary rune */}
                <img
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/perk-images/Styles/${getStyle(
                    mainPlayerIndex,
                    0
                  )}/${getKeyStone(mainPlayerIndex)}/${
                    getKeyStone(mainPlayerIndex) === "LethalTempo"
                      ? "LethalTempoTemp"
                      : getKeyStone(mainPlayerIndex)
                  }.png`}
                  alt={`Keystone`}
                  className="rune-icon"
                />
              </li>
              <li>
                {/* Secondary rune */}
                <img
                  src={`https://static.bigbrain.gg/assets/lol/runes/${matchData.info.participants[mainPlayerIndex].perks.styles[1].style}.png`}
                  alt={`Keystone`}
                  className="rune-icon"
                />
              </li>
            </ul>
          </div>
          {/* List the participants */}
          <div className="all-participants-list" style={{ width: "27%" }}>
            <ul
              className="match-participants blue-side"
              style={{ width: "50%" }}
            >
              {firstFiveParticipants.map((participant, index) => (
                <li
                  key={index}
                  className={mainPlayerIndex === index ? "bold-text" : ""}
                  title={`${participant.riotIdGameName}#${participant.riotIdTagline}`}
                >
                  {participant.riotIdGameName.length > 6
                    ? participant.riotIdGameName.slice(0, 6) + "..."
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
                  {participant.riotIdGameName.length > 6
                    ? participant.riotIdGameName.slice(0, 6) + "..."
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
        {/* Button for dropdown */}
        <button className="dropdown-button" onClick={toggleDropdown}>
          <svg
            width="24"
            height="24"
            style={{ marginLeft: "-12px" }}
            transform={showDropdown ? "rotate(180)" : ""}
          >
            {/* Draw the arrow */}
            <path d="M12 15.41l-6.29-6.29-1.41 1.41L12 18.23l7.71-7.71-1.41-1.41z" />
          </svg>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {showDropdown && (
          <LoLDropDownMenu
            key={null}
            matchData={matchData}
            runeData={runeData}
          ></LoLDropDownMenu>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default LoLMatchBox;
