import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Sender from "./pages/Sender.jsx";
import Receiver from "./pages/Receiver.jsx";
import Home from "./pages/Home.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <Routes>
            <Route path="" element={<Sender />}></Route>
            <Route path="receiver/:connId?" element={<Receiver />} />
            <Route path="home" element={<Home />} />
        </Routes>
    </Router>
);
