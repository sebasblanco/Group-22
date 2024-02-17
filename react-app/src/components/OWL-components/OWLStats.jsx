import React, { useState, useEffect } from "react";
import axios from "axios";

const OWLStats = ({ username }) => {
    const [playerStats, setPlayerStats] = useState(null);
  
    useEffect(() => {
      const fetchAccessToken = async () => {
        try {
          const response = await axios.post(
            "https://us.battle.net/oauth/token",
            null,
            {
              params: {
                grant_type: "client_credentials",
                client_id: "cf39565870174957a69a1e53c4a693d8",
                client_secret: "wPa8U2XLErm6dPsP37PvUk0vup1HQzq4",
              },
            }
          );
  
          const accessToken = response.data.access_token;
          console.log("Access Token:", accessToken);
  
          fetchPlayerStats(accessToken);
        } catch (error) {
          console.error("Error:", error.message);
        }
      };
  
      fetchAccessToken();
    }, []);
  
    const fetchPlayerStats = async (accessToken) => {
      try {
        const response = await axios.get(
          `https://api.overwatchleague.com/owl/v1/players/${username}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        console.log(response.data);
        setPlayerStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to fetch playerId by issuing a GET request to /owl/v1/owl2
const fetchPlayerId = async () => {
  try {
      const response = await axios.get("https://api.overwatchleague.com/owl/v1/owl2");

      const playerId = response.data.playerId;
      console.log("Player ID:", playerId);

      // Call fetchPlayerStatsByPlayerId with the obtained playerId
      fetchPlayerStatsByPlayerId(playerId);
  } catch (error) {
      console.error(error);
  }
};

// Call fetchPlayerId to initiate the process
fetchPlayerId();

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
          </div>
        );
      };

      return (
        <div>
          <NavBar />
          {playerStats && (
            <div>
              <h2>Player Stats:</h2>
              <p>Player Name: {playerStats.data.name}</p>
              <p>Player Level: {playerStats.data.level}</p>
            </div>
          )}
              </div>
            );
    };
  
    export default OWLStats;