import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import SelectFIle from "./pages/Sender.jsx";
import Receive from "./pages/Receive.jsx";
import Receiving from "./pages/Receiving.jsx";
import Help from "./pages/Help.jsx";
import PeerProvider from "./provider/Peer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    /* This block of code is setting up the routing configuration for a React application using React
   Router. Here's a breakdown of what each part does: */
    <Router>
        <PeerProvider>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="receiver/:connId?" element={<Receive />} />
                <Route path="sender" element={<SelectFIle />} />
                <Route path="receiving" element={<Receiving />} />
                <Route path="help" element={<Help />} />
            </Routes>
        </PeerProvider>
    </Router>
);
