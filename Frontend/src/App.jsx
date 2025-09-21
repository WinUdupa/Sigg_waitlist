// 📁 src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroAnimation from "./components/IntroAnimation";
import Home from "./pages/Home";
import Waitlist from "./pages/Waitlist";

import TextType from "./components/TextType"; // ✅ new import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroAnimation />} />
        <Route path="/home" element={<Home />} />
        <Route path="/getstarted" element={< Waitlist />} />
        <Route path="/texttype" element={<TextType />} /> {/* ✅ new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
