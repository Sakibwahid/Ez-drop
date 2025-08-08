import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";



function App() {
  return (
    <div className="app-bg h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

