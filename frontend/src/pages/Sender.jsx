import { useEffect, useRef, useState } from "react";
import { FaCloudArrowUp, FaCopy } from "react-icons/fa6";
import { Peer } from "peerjs";
// const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB

export default function Sender() {
    const [peerId, setPeerId] = useState("");
    const [file, setFile] = useState();
    const [progress, setProgress] = useState(0);
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

    const send = () => {
        const fileStream = file.stream();
        const reader = fileStream.getReader();
        let bytesSent = 0;
        let totalSize = file.size;

        // sending the file meta data before transfer start;
        connRef.current.send({
            isMetadata: true,
            name: file.name,
            type: file.type,
            size: totalSize,
        });

        const readChunk = () => {
            reader.read().then(({ done, value }) => {
                if (done) {
                    console.log("done");
                    connRef.current.send({
                        done: true,
                    });
                    return;
                }
                connRef.current.send(value);
                bytesSent += value.length;
                setProgress(Math.round((bytesSent / totalSize) * 100));
                readChunk();
            });
        };
        readChunk();
    };

    return (
        <section className="text-white container flex items-center w-screen justify-center ">
            <div className="ring-1 text-lime-200 grid-rows-6 grid rounded-md ring-red-400 h-[60vh] w-3/4">
                {/* qr section  */}
                {/* <div className="w-full bg-gray-800 row-span-4 p-2 rounded-t-md">
                    <div className="flex justify-center items-center h-full w-full">
                        hey
                    </div>
                    
                </div> */}

                <div className=" w-full ring-2 capitalize text-xs row-span-4 flex flex-col justify-center items-center ring-yellow-400 relative">
                    <input
                        className="min-h-full w-full opacity-0 absolute top-0 left-0"
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                    <FaCloudArrowUp size={48} color="blue" />
                    <p>Drag and drop here</p>
                    <p>or</p>
                    <p>browse</p>
                </div>
                <div className="text-sm flex flex-col justify-center gap-y-2 px-3 row-span-1 ">
                    Sender Peer ID:{" "}
                    <h2 className="text-xs px-4 flex gap-x-3">
                        {peerId} <FaCopy />{" "}
                    </h2>
                </div>
                <div className="w-full row-span-1 p-2">
                    <button className="w-full h-full capitalize" onClick={send}>
                        send
                    </button>
                    <p>{progress}</p>
                </div>
            </div>
        </section>
    );
}
