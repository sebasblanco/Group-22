import PlayerStats from "./components/PlayerStats";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerStats />} />
        <Route path="/gamestats" element={<h1>Testing</h1>} />
      </Routes>
    </Router>
  );    
}

export default App;
