import React, { useState, useEffect } from "react";
import axios from 'axios';

const LeagueOfLegendsStats = ({ username, tag }) => {
    const [puuid, setPuuid] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            var APICallString = "http://localhost:7071/api/leaguegetpuuid?username=" + username + "&tag=" + tag;
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
