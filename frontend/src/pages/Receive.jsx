import { FaArrowLeft } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Receiving from "./Receiving";
import Toast from "../components/Toast";
import { toast } from "react-toastify";
import streamSaver from "streamsaver";
import { Peer } from "peerjs";
import { useNavigate } from "react-router-dom";
const downloadWorker = new Worker("/downloadWorker.js");

export default function Receive() {
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
    const navigate = useNavigate();

    const { connId } = useParams();

    const call = () => {
        /* The code snippet you provided is establishing a peer-to-peer connection
    using the PeerJS library. Here's a breakdown of what it's doing: */
        const conn = peerRef.current.connect(connId, {
            config: {
                iceTransportPolicy: "all",
                iceServers: [
                    { url: "stun:stun1.l.google.com:19302" },
                    { url: "stun:stun2.l.google.com:19302" },
                    {
                        url: "turn:numb.viagenie.ca",
                        credential: "muazkh",
                        username: "webrtc@live.com",
                    },
                ],
            },
        });
        // const conn = peerRef.current.connect(connId);
        conn.on("open", () => {
            toast.success("connection stablished");
            setConnected(true);
            /* The `conn.on("data", (data) => { ... })` function is handling the incoming data received
           over a peer-to-peer connection. Here's a breakdown of what it's doing: */
            conn.on("data", (data) => {
                if (!isDownloading) setDownloading(true);
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
                    /* This code snippet is handling the progress of the file download process in the
                  `Receive` component of a React application. Here's a breakdown of what it's doing: */
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

    /**
     * The `download` function uses a web worker to download a file of a specified type with the given
     * file name.
     */
    const download = (fileType, fileName) => {
        downloadWorker.postMessage({ download: true, type: fileType });
        downloadWorker.addEventListener("message", (event) => {
            const stream = event.data.stream();
            const fileStream = streamSaver.createWriteStream(fileName);
            stream.pipeTo(fileStream);
        });
    };

    /* The `useEffect` hook in the provided code snippet is responsible for setting up the peer-to-peer
    connection using the PeerJS library when the component mounts or when the `connId` parameter
    changes. Here's a breakdown of what it's doing: */
    useEffect(() => {
        peerRef.current = new Peer();
        peerRef.current.on("open", (id) => {
            setPeerId(id);
        });
        peerRef.current.on("connection", (id) => {
            console.log(id);
        });

        if (connId) {
            call();
        }

        return () => {
            peerRef.current.disconnect();
        };
    }, [connId]);

    return (
        <div className="h-dvh w-dvw relative bg-[#12211C] ">
            {/* back button */}
            <div className="p-4 grid grid-cols-6">
                <div
                    onClick={(e) => navigate(-1)}
                    className="col-span-1 flex justify-start items-center "
                >
                    <FaArrowLeft />
                </div>
                <div className="col-span-4 font-bold text-center">
                    <p>Receive files</p>
                </div>
                <div className="col-span-1"></div>
            </div>

            <div className=" px-4 mt-4  ">
                <input
                    value={connId}
                    placeholder="Enter the connection string"
                    className="w-full bg-accent font-semibold ring-1 ring-button_heighlight p-2.5  rounded-lg "
                />
            </div>
            <div className="mt-4 px-4">
                <button
                    onClick={call}
                    disabled={!peerId}
                    className="py-2 rounded-md bg-button_heighlight text-black w-full"
                >
                    {peerId ? "Connect" : "loading ...."}
                </button>
            </div>
            {/* info : How to use the receive function */}
            <div className="flex mt-8 px-4 ">
                <div className="flex-[1]">
                    <div className=" size-12 grid place-content-center rounded-md bg-accent text-white ">
                        <CiCircleInfo size={20} />
                    </div>
                </div>
                <div className="flex-[5]">
                    <p className="text-white font-semibold">Instructions</p>
                    <p className="text-slate-300">
                        1. Enter the connection string to start receiving files
                        , connection strings are case sensitive.
                    </p>
                </div>
            </div>
            {isConnected && (
                <div className="absolute h-full w-full top-0 left-0">
                    <Receiving
                        metaData={metaDataRef.current}
                        progress={progress}
                        isConnected={isConnected}
                        isDownloading={isDownloading}
                    />
                </div>
            )}
            <Toast />
        </div>
    );
}
