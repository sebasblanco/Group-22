import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";

const LoLMatchBox = ({ matchId, puuid }) => {
  const [matchData, setMatchData] = useState(null);

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
      string = "Ksante";
    } else if (string == "BelVeth") {
      string = "Belveth";
    } else if (string == "LeBlanc") {
      string = "Leblanc";
    } else if (string == "KaiSa") {
      string = "Kaisa";
    } else if (string == "VelKoz") {
      string = "Velkoz";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const firstFiveParticipants = matchData.info.participants.slice(0, 5);
  const lastFiveParticipants = matchData.info.participants.slice(5);

  return (
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
          {/* Original image with KDA */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/champion/${FormatChampName(
                matchData.info.participants[mainPlayerIndex].championName
              )}.png`}
              alt="Champion Splash"
              style={{ marginRight: "10px" }} // Add margin between images if needed
            />
            {/* KDA information */}
            <div className="kda">
              {matchData.info.participants[mainPlayerIndex].kills} /{" "}
              <span style={{ color: "red" }}>
                {matchData.info.participants[mainPlayerIndex].deaths}{" "}
              </span>
              / {matchData.info.participants[mainPlayerIndex].assists}
            </div>

            {/* All of the Items */}
            <ul className="item-list">
              <li>
                <img
                  src={`https://cdn.darkintaqt.com/lol/c-assets/items/${matchData.info.participants[mainPlayerIndex].item0}.png.webp`}
                  alt="SummonerSpell1"
                  className="item-icon"
                />
              </li>
              <li>
                <img
                  src={`https://cdn.darkintaqt.com/lol/c-assets/items/${matchData.info.participants[mainPlayerIndex].item1}.png.webp`}
                  alt="SummonerSpell1"
                  className="item-icon"
                />
              </li>
              <li>
                <img
                  src={`https://cdn.darkintaqt.com/lol/c-assets/items/${matchData.info.participants[mainPlayerIndex].item2}.png.webp`}
                  alt="SummonerSpell1"
                  className="item-icon"
                />
              </li>
              <li>
                <img
                  src={`https://cdn.darkintaqt.com/lol/c-assets/items/${matchData.info.participants[mainPlayerIndex].item3}.png.webp`}
                  alt="SummonerSpell1"
                  className="item-icon"
                />
              </li>
              <li>
                <img
                  src={`https://cdn.darkintaqt.com/lol/c-assets/items/${matchData.info.participants[mainPlayerIndex].item4}.png.webp`}
                  alt="SummonerSpell1"
                  className="item-icon"
                />
              </li>
              <li>
                <img
                  src={`https://cdn.darkintaqt.com/lol/c-assets/items/${matchData.info.participants[mainPlayerIndex].item5}.png.webp`}
                  alt="SummonerSpell1"
                  className="item-icon"
                />
              </li>
            </ul>
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
        {/* List the participants */}
        <div className="all-participants-list">
          <ul className="match-participants blue-side">
            {firstFiveParticipants.map((participant, index) => (
              <li key={index}>
                {participant.riotIdGameName}
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
              <li key={index}>
                {participant.riotIdGameName}
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
  );
};

export default LoLMatchBox;
