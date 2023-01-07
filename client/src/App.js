import "./App.css";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MoneyTracker from "./components/MoneyTracker";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<MoneyTracker />} />
      </Routes>
    </div>
  );
}

export default App;
