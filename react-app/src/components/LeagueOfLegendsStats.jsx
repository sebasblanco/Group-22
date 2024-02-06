import React, { useState, useEffect } from "react";
import axios from 'axios';

const LeagueOfLegendsStats = ({ username, tag }) => {
    const [puuid, setPuuid] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            var APICallString = "https://gamer-insights.azurewebsites.net/api/leaguegetpuuid?code=S-qc4dIw6awRjX4zf2-8Fq5-F3sZjm2R1IicSv7YRN6cAzFusHAL1A%3D%3D&username=" + username + "&tag=" + tag;
            console.log(APICallString);

            axios.get(APICallString)
                .then(function (response) {
                    // Success
                    console.log(response.data.puuid);
                    setPuuid(response.data.puuid);
                })
                .catch(function (error) {
                    console.error(error);
                    // Error
                });
        };

        fetchData();
    }, [username, tag]);

    return (
        <div>
            <p>LoL stats for {username}</p>
            {puuid && (
                <p>Their puuid is {puuid}</p>
            )}
        </div>
    );
}

export default LeagueOfLegendsStats;
