import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";

const LoLDropDownMenu = ({ matchData, mainPlayerIndex, runeData }) => {
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

  function getStyle(index, firstOrSecond) {
    if (matchData !== null && runeData !== null)
      var styleID =
        matchData.info.participants[index].perks.styles[firstOrSecond].style;
    var styleName = runeData.find((styleName) => styleName.id === styleID);
    return styleName.key;
  }

  function getKeyStone(index) {
    if (!matchData || !runeData) return null;

    const participant = matchData.info.participants[index];
    if (!participant || !participant.perks || !participant.perks.styles)
      return null;

    const styleID = participant.perks.styles[0]?.style;
    const style = runeData.find((style) => style.id === styleID);
    if (!style) return null;

    const keyStoneID = participant.perks.styles[0]?.selections[0]?.perk;
    if (keyStoneID == 8369) {
      return "FirstStrike";
    }
    const keyStone = style.slots[0].runes.find(
      (rune) => rune.id === keyStoneID
    );
    if (!keyStone) return null;

    let keyStoneName = keyStone.key;
    if (keyStoneName === "Aftershock") {
      keyStoneName = "VeteranAftershock";
    } else if (keyStoneName === "Kleptomancy") {
      keyStoneName = "FirstStrike";
    }
    return keyStoneName;
  }

  const DamageBar = ({ the_participant, winLose }) => {
    // Calculate the percentage of damage dealt by the player relative to the team's total damage
    var teamDamage = 0;
    if (the_participant.teamId === 100) {
      for (var i = 0; i < 5; i++) {
        var participant = matchData.info.participants[i];
        teamDamage = teamDamage + participant.totalDamageDealtToChampions;
      }
    } else {
      for (var i = 5; i < 10; i++) {
        var participant = matchData.info.participants[i];
        teamDamage = teamDamage + participant.totalDamageDealtToChampions;
      }
    }
    //This makes the bars look more relative to eachother
    var playerDamage = the_participant.totalDamageDealtToChampions;
    const teammateDamageSum = teamDamage - playerDamage;
    const averageTeammateDamage = teammateDamageSum / 4;
    const damageRatio = playerDamage / averageTeammateDamage;
    const scaledRatio = Math.min(damageRatio / 2.5, 1);
    const percentage = scaledRatio * 100;
    const backgroundColor = winLose ? "green" : "red";
    return (
      <div className="damage-progress-bar">
        <div
          className="progress"
          style={{ width: `${percentage}%`, backgroundColor }}
        ></div>
        <div className="damage-label">{playerDamage}</div>
      </div>
    );
  };

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

  const makeRow = (playerIndex) => {
    const participant = matchData.info.participants[playerIndex];
    return (
      <div className="dropdown-box-row">
        <div className="column dropdown-image">
          <img
            src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/champion/${FormatChampName(
              participant.championName
            )}.png`}
            alt="Champion Splash"
            style={{ width: "100%" }}
          />
        </div>
        <div
          className={
            mainPlayerIndex === playerIndex
              ? "bold-text column dropdown-playername"
              : "column dropdown-playername"
          }
          title={`${participant.riotIdGameName}#${participant.riotIdTagline}`}
        >
          {participant.riotIdGameName}
        </div>
        <div className="column dropdown-kda">
          {participant.kills} /
          <span style={{ color: "red" }}> {participant.deaths}</span> /{" "}
          {participant.assists}
        </div>
        <div className="column dropdown-runes">
          <div style={{ display: "flex" }}>
            {/* Primary rune */}
            <img
              src={`https://static.bigbrain.gg/assets/lol/riot_static/14.3.1/img/perk-images/Styles/${getStyle(
                playerIndex,
                0
              )}/${getKeyStone(playerIndex)}/${
                getKeyStone(playerIndex) === "LethalTempo"
                  ? "LethalTempoTemp"
                  : getKeyStone(playerIndex)
              }.png`}
              alt={`Keystone`}
              className="dropdown-rune-icon"
            />
            {/* Secondary rune */}
            <img
              src={`https://static.bigbrain.gg/assets/lol/runes/${matchData.info.participants[playerIndex].perks.styles[1].style}.png`}
              alt={`Keystone`}
              className="dropdown-rune-icon"
            />
          </div>
        </div>
        <div className="column dropdown-summoner-spells">
          <div className="dropdown-summoner-icons">
            <img
              src={`https://lolcdn.darkintaqt.com/cdn/spells/${participant.summoner1Id}`}
              alt="SummonerSpell1"
              className="summoner-spell-img"
            />
            <img
              src={`https://lolcdn.darkintaqt.com/cdn/spells/${participant.summoner2Id}`}
              alt="SummonerSpell2"
              className="summoner-spell-img"
            />
          </div>
        </div>
        <div className="column dropdown-item-build">
          {" "}
          <ul className="item-list">
            {[0, 1, 2, 3, 4, 5].map((index) =>
              // Sometimes the player will not have an item in a certain slot. If so, don't render image
              participant[`item${index}`] !== 0 ? (
                <li key={index}>
                  <img
                    src={`https://cdn.darkintaqt.com/lol/c-assets/items/${
                      participant[`item${index}`]
                    }.png.webp`}
                    alt={`Item ${index}`}
                    className="item-icon"
                  />
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="column dropdown-damage">
          <DamageBar
            the_participant={participant}
            winLose={participant.win}
          ></DamageBar>
        </div>
      </div>
    );
  };

  return (
    <div className="dropdown-box">
      <ul style={{ listStyle: "none" }}>
        <div className="losing-team-text">Defeat</div>
        {makeRow(0)}
        {makeRow(1)}
        {makeRow(2)}
        {makeRow(3)}
        {makeRow(4)}
        <div className="winning-team-text">Victory</div>
        {makeRow(5)}
        {makeRow(6)}
        {makeRow(7)}
        {makeRow(8)}
        {makeRow(9)}
      </ul>
    </div>
  );
};

export default LoLDropDownMenu;
