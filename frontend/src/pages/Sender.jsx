import { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
// const CHUNK_SIZE = 5120;
const CHUNK_SIZE = 1000000;

export default function Sender() {
    const [peerId, setPeerId] = useState("");
    const [file, setFile] = useState();
    const peerRef = useRef();
    const connRef = useRef();
    useEffect(() => {
        peerRef.current = new Peer();
        peerRef.current.on("open", (id) => {
            setPeerId(id);
            peerRef.current.on("connection", (conn) => {
                connRef.current = conn;
                conn.on("data", (data) => {
                    console.log(data);
                });
            });
        });
    }, []);
    const call = () => {
        const conn = peerRef.current.connect(peerId);
        conn.on("open", () => {
            console.log("hey");
            conn.send("hi");
        });
    };
    const send = () => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function (event) {
            const arrayBuffer = event.target.result;
            const totalChunks = Math.ceil(arrayBuffer.byteLength / CHUNK_SIZE);
            let offset = 0;
            let chunkIndex = 0;
            while (offset < arrayBuffer.byteLength) {
                const chunk = arrayBuffer.slice(offset, offset + CHUNK_SIZE);
                const data = {
                    chunk,
                    name: file.name,
                    totalChunks,
                    chunkIndex,
                    type: file.type,
                };
                console.log(data);
                connRef.current.send(data);
                offset += CHUNK_SIZE;
                chunkIndex += 1;
            }
        };
    };

    return (
        <section className="text-white container flex items-center w-screen justify-center ">
            <div className="ring-1 text-lime-200 rounded-md ring-red-400 h-[60vh] grid place-content-center w-3/4">
                <h2>Sender Peer ID: {peerId}</h2>
                {/* <input
                    type="text"
                    value={peerId}
                    onChange={(e) => setPeerId(e.target.value)}
                    placeholder="id"
                />
                <button onClick={call}>call</button> */}
                <input
                    type="file"
                    onChange={(e) => {
                        console.log(e.target.files[0]);
                        setFile(e.target.files[0]);
                    }}
                />
                <button onClick={send}>send</button>
            </div>
        </section>
    );
}
