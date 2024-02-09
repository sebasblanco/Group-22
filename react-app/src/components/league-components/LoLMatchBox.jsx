import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeagueOfLegendsStyle.css";

const LoLMatchBox = ({ matchId }) => {
    const [matchData, setMatchData] = useState(null); // Initialize matchData state to null

    // Fetch match data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://gamer-insights.azurewebsites.net/api/getmatchdata?code=Ourmnsm1rkNiHLBMUb_e_stQtY0tmn5_TqSkbwzj0aeWAzFuESDheA%3D%3D&matchID=${matchId}`
                );
                console.log(response.data);
                setMatchData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [matchId]);

    // Render loading indicator if matchData is null
    if (matchData === null) {
        return <div>Loading...</div>;
    }

    // Parse matchData and render participants
    return (
        <div className="lol-match-box">
            <h3>Participants:</h3>
            <ul>
                {matchData.metadata.participants.map((participant, index) => (
                    <li key={index}>{participant}</li>
                ))}
            </ul>
        </div>
    );
};

export default LoLMatchBox;
