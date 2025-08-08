import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sender from "./pages/Sender";
import Receiver from "./pages/Receiver";
import "./index.css";

function App() {
  return (
    <div className="app-bg min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/receiver" element={<Receiver />} />
      </Routes>
    </div>
  );
}

export default App;


