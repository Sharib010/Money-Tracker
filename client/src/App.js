import "./App.css";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./components/Login";

import MoneyTracker from "./components/MoneyTracker";

function UserFound() {
  const user = Cookies.get("jwtoken");
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<MoneyTracker />} />
      </Routes>
    );
  }
}
function App() {
  return (
    <div>
      <UserFound />
    </div>
  );
}

export default App;
