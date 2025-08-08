import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateSession from "./pages/CreateSession";



function App() {
  return (
    <div className="app-bg h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-session" element={<CreateSession/>} />
      </Routes>
    </div>
  );
}

export default App;

