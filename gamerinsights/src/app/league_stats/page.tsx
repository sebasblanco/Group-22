"use client";
import React, { useState } from "react";
import LeagueOfLegendsStats from "./LeagueOfLegendsStats";

export default function Features() {
  const [usernameAndTag, setUsernameAndTag] = useState("DoubleLift#NA1");

  const handleInputChange = (event) => {
    setUsernameAndTag(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username and tag: ", usernameAndTag);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username#tag"
          value={usernameAndTag}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {usernameAndTag && (
        <LeagueOfLegendsStats
          username={usernameAndTag.split("#")[0]}
          tag={usernameAndTag.split("#")[1]}
        />
      )}
    </div>
  );
}
