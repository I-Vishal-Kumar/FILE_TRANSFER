import { useEffect, useRef, useState, useCallback } from "react";
import { FaDownload, FaFile } from "react-icons/fa6";
import Toast from "../components/Toast";
import { toast } from "react-toastify";
import streamSaver from "streamsaver";
import { useParams } from "react-router-dom";
import { Peer } from "peerjs";
const downloadWorker = new Worker("/downloadWorker.js");

export default function Receiver() {
    const [isDownloading, setDownloading] = useState(false);
    const [isConnected, setConnected] = useState(false);
    const [progress, setProgress] = useState(0);
    const [peerId, setPeerId] = useState("");
    const peerRef = useRef();
    const bytesReceivedRef = useRef(0);
    const metaDataRef = useRef({
        totalSize: 0,
        fileType: "",
        fileName: "",
    });

    const { connId } = useParams();

    const call = () => {
        const conn = peerRef.current.connect(peerId);
        conn.on("open", () => {
            toast.success("connection stablished");
            setConnected(true);
            conn.on("data", (data) => {
                if (!isDownloading) setDownloading(true);
                console.log(data);
                if (data?.done) {
                    toast.success("downloaded");
                    setDownloading(false);
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
    useEffect(() => {
        peerRef.current = new Peer();
        peerRef.current.on("connection", (id) => {
            console.log(id);
        });

        if (connId) {
            setPeerId(connId);
            call();
        }

        return () => {
            peerRef.current.disconnect();
        };
    }, [connId]);

    return (
        <section className="text-white container flex items-center w-[100dvw] justify-center ">
            <div className="ring-1 text-lime-200 rounded-md capitalize p-4 ring-red-400 h-[60vh] w-3/4">
                <h2>connect with:</h2>
                {!isConnected && (
                    <div className="flex justify-center md:flex-row flex-col md:space-y-0 space-y-2 items-center gap-x-3 p-3">
                        <input
                            type="text"
                            value={peerId}
                            onChange={(e) => setPeerId(e.target.value)}
                            placeholder="id"
                        />
                        <button onClick={call} className="py-[0.25rem]">
                            connect
                        </button>
                    </div>
                )}

                {/* downloads */}
                {isDownloading && (
                    <div className=" space-y-2 py-4">
                        <div className="h-10 w-full flex flex-col items-end rounded-s-md bg-white">
                            <div className="h-9 text-black w-full flex items-center justify-between">
                                <div className="w-9 h-9 flex items-center justify-center">
                                    <FaFile />
                                </div>
                                <div className="text-start w-full ">
                                    <p className=" line-clamp-1 truncate ">
                                        {metaDataRef.current.fileName}
                                    </p>
                                </div>
                                <div className="w-9 h-9 animate-pulse flex items-center justify-center">
                                    <FaDownload />
                                </div>
                            </div>
                            <div
                                style={{ width: `${progress}%` }}
                                className="w-full h-1 bg-blue-200 rounded-full"
                            >
                                <div className=" h-full text-center text-xs text-white bg-blue-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toast />
        </section>
    );
}
