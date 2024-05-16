import { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import streamSaver from "streamsaver";
const downloadWorker = new Worker("downloadWorker.js");

export default function Receiver() {
    const [peerId, setPeerId] = useState("");
    const [progress, setProgress] = useState(0);
    const peerRef = useRef();
    const metaDataRef = useRef({
        totalSize: 0,
        fileType: "",
        fileName: "",
    });
    const bytesReceivedRef = useRef(0);

    useEffect(() => {
        peerRef.current = new Peer();
        peerRef.current.on("connection", (id) => {
            console.log(id);
        });
    }, []);

    const call = () => {
        const conn = peerRef.current.connect(peerId);
        conn.on("open", () => {
            conn.send("hello from receiver");
            conn.on("data", (data) => {
                if (data?.done) {
                    alert("downloaded");
                    download(
                        metaDataRef.current.fileType,
                        metaDataRef.current.fileName
                    );
                } else if (data?.isMetadata) {
                    metaDataRef.current = {
                        totalSize: data.size,
                        fileType: data.type,
                        fileName: data.name,
                    };
                } else if (!data?.done && !data?.isMetadata) {
                    bytesReceivedRef.current += data?.length;
                    setProgress(
                        (bytesReceivedRef.current /
                            metaDataRef.current.totalSize) *
                            100
                    );
                    downloadWorker.postMessage(data);
                }
            });
        });
    };

    const download = (fileType, fileName) => {
        downloadWorker.postMessage({ download: true, type: fileType });
        downloadWorker.addEventListener("message", (event) => {
            const stream = event.data.stream();
            const fileStream = streamSaver.createWriteStream(fileName);
            stream.pipeTo(fileStream);
        });
    };

    return (
        <section className="text-white container flex items-center w-screen justify-center ">
            <div className="ring-1 text-lime-200 rounded-md capitalize ring-red-400 h-[60vh] grid place-content-center w-3/4">
                <h2>Received Message:</h2>
                <input
                    type="text"
                    value={peerId}
                    onChange={(e) => setPeerId(e.target.value)}
                    placeholder="id"
                />
                <button onClick={call}>call</button>
                <button>download</button>
                <p>{progress}</p>
            </div>
        </section>
    );
}
