import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
    </>
  );
}

export default App;
