'use client'
import React, { useState } from "react";
import LeagueOfLegendsStats from "../LeagueOfLegendsStats";


export default function Features() {
    const [usernameAndTag, setUsernameAndTag] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameAndTag(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Username and tag: ", usernameAndTag);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter username#tag"
                    value={usernameAndTag}
                    onChange={handleInputChange}
                    style={{ color: "white" }}
                />
                <button style={{ color: "white" }} type="submit">
                    Search
                </button>
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