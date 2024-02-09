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
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [matchId]);

    if (matchData === null) {
        return <div>Loading...</div>;
    }

    const mainPlayerIndex = matchData.metadata.participants.findIndex(participant => participant === puuid);
    if (mainPlayerIndex === -1) {
        return <div>Main player not found in match data</div>;
    }
        
    return (
        <div>
            <div className={matchData.info.participants[mainPlayerIndex].win ? 'winner-box' : 'loser-box'}>
                <ul className="match-participants">
                    {matchData.info.participants.map((participant, index) => (
                        <li key={index}>
                            {participant.riotIdGameName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LoLMatchBox;
