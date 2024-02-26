import React, { useState, useEffect } from "react";
import axios from "axios";

const WoWStats = ({ charactername, realm }) => {
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
                            client_id: "3d520dc827ca4597a45e6f9c19a2275b",
                            client_secret: "M60zthsS5XcVHvVKQ3dfwRWozfcTbEkR",
                        },
                    }
                );
                /*
                const assetsMap = response.data.assets.reduce((map, asset) => {
                    map[asset.key] = asset.value;
                    return map;
                }, {});*/

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
        try
        {
            const response = await axios.get(         // Using realm = illidan and character = horseboy for testing
                `https://us.api.blizzard.com/profile/wow/character/${realm}/${charactername}/character-media?namespace=profile-us&locale=en_US&access_token=${accessToken}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
           
            
            console.log(response.data);
            setPlayerStats(response.data);
        }

        catch (error) {
            console.error(error);
        }
    };

    fetchPlayerStats();

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
                    <h2>Character Stats:</h2>
                    <p>Character Name: {playerStats.data.character}</p>
                    
                </div>
            )}
        </div>
    );
};

export default WoWStats;