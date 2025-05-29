import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostScreen from "./components/HostScreen";
import PlayerScreen from "./components/PlayerScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostScreen />} />
        <Route path="/room/:roomId/:player" element={<PlayerScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
