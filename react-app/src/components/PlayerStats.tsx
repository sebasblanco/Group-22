import React, { useState } from "react";
import LeagueOfLegendsStats from "./LeagueOfLegendsStats";

function HtmlForm() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [gameStats, setGameStats] = useState<JSX.Element | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    // Handle the selected item and username
    console.log("Selected game:", selectedItem);
    console.log("Username:", username);
    // Load game stats only if the username and game are selected
    if (selectedItem && username) {
      // Load game stats based on selectedItem and username
      if (selectedItem === "League of Legends") {
        const [gameName, tag] = username.split("#");
        setGameStats(<LeagueOfLegendsStats username={gameName} tag={tag} />);
      } else {
        // Handle other games here if needed
        setGameStats(null); // Clear game stats if not applicable
      }
    }
  };

  return (
    <>
      <h1>GamerInsights</h1>
      <br />
      <h4>Player Stats</h4>
      <form onSubmit={handleSubmit}>
        {/* Dropdown menu */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedItem || "Select a game"}{" "}
            {/* Update the button text based on the selected item */}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleItemClick("World of Warcraft")}
              >
                World of Warcraft
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleItemClick("Diablo IV")}
              >
                Diablo IV
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleItemClick("Starcraft")}
              >
                Starcraft
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleItemClick("League of Legends")}
              >
                League of Legends
              </a>
            </li>
          </ul>
        </div>
        {/* End of dropdown menu */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="htmlForm-label">
            Username
          </label>
          <br />
          <input
            type="text"
            className="htmlForm-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Conditionally load the stats for the selected game */}
      {gameStats}
    </>
  );
}

export default HtmlForm;
