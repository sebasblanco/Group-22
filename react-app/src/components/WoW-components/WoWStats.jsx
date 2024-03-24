import React, { useState, useEffect } from "react";
import axios from "axios";

const WoWStats = ({ charactername, realm }) => {
    const [playerStats, setPlayerStats] = useState(null);
    const [assetsMap, setAssetsMap] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let accessToken = null;
    useEffect(() => {
        setIsLoading(true);
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
                
                accessToken = response.data.access_token;
                console.log("Access Token:", accessToken);

                fetchPlayerStats(accessToken);
                setIsLoading(false);
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

            // Create a map of assets from response
            const tempMap = response.data.assets.reduce((map, asset) => {
                map[asset.key] = asset.value;
                return map;
            }, {});
            // Set variable to be used for display
            setAssetsMap(tempMap);
            
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
            {(function () {
                if (playerStats != null && assetsMap != null) {
                    return <div>
                        <h2>Character Sheet for {playerStats.character.name}:</h2>
                        <img src={assetsMap.avatar}></img>
                        <img src={assetsMap.inset}></img>
                    </div>;
                }
                else if (isLoading) {
                    return <h2>Loading...</h2>
                }
                else {
                    return <h2>Sorry, we couldn't find the character you're looking for.</h2>;
                }
            })()}
        </div>
    );
};

export default WoWStats;