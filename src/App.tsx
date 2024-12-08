import CheckBoxCard from "./components/checkbox";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dev from "./components/Dev";
import Display from "./components/Display";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dev" element={<Dev />} />
        <Route path="/" element={<Display />} />
      </Routes>
    </Router>
  );
}

export default App;
