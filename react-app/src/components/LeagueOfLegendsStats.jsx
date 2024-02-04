import React from "react";
import axios from 'axios';
// This key is automatically going to reset at 11:13AM on Feb 5th, so it wont work after that until John refreshses the key
const API_KEY="RGAPI-e798d195-1699-4872-be89-25e47e7ac361"

const LeagueOfLegendsStats = ({username, tag}) => {

    var APICallString = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + username + "/" + tag + "?api_key=" + API_KEY;
        console.log(APICallString)
        axios.get(APICallString).then(function (response) {
            //Success
            console.log(response)
        
        }).catch(function (error) {
            console.log(response)
            //Error
        })
    
    
    function searchForPlayer(event) {
        axios.get(APICallString).then(function (response) {
            //Success
            console.log(response)
        
        }).catch(function (error) {
            console.log(response)
            //Error
        })
    }


    return (<div>
        LoL stats for {username}
        {APICallString}
    </div>




    );
}

export default LeagueOfLegendsStats;