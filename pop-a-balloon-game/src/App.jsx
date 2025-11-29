import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import GameLayout from "./components/game/GameLayout";
import GameWrapper from "./components/game/GameWrapper";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/" || location.pathname === "/sign-in";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/sign-in" element={<Login />} />


        <Route path="/game" element={<GameLayout />} />


        <Route path="/game/level1" element={<GameWrapper />} />


        {/* <Route path="/game/level2" element={<Level2Wrapper />} /> */}
      </Routes>
    </>
  );
}

export default App;