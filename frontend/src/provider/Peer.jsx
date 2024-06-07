import { createContext, useRef, useState } from "react";
import { Peer } from "peerjs";

export const PeerContext = createContext();

export default function PeerProvider({ children }) {
    /* The code snippet is setting up state variables and references using React hooks in a functional
    component. */
    const peerRef = useRef();
    const connRef = useRef();
    const [isConnected, setConnected] = useState(false);
    const [peerId, setPeerId] = useState("");

    /**
     * The `connectPeer` function establishes a connection with a PeerJS server, sets up event
     * listeners for incoming connections, and handles data exchange and connection status updates.
     */
    const connectPeer = () => {
        peerRef.current = new Peer();
        peerRef.current.on("open", (id) => {
            setPeerId(id);
            peerRef.current.on("connection", (conn) => {
                connRef.current = conn;
                console.log("connected");
                conn.send("hello from sender");
                setConnected(true);
                conn.on("data", (data) => {
                    console.log(data);
                });
                conn.on("close", () => {
                    setConnected(false);
                });
                conn.on("disconnected", () => {
                    setConnected(false);
                });
            });
        });
    };

    return (
        <PeerContext.Provider
            value={{ connectPeer, peerRef, isConnected, connRef, peerId }}
        >
            {children}
        </PeerContext.Provider>
    );
}
