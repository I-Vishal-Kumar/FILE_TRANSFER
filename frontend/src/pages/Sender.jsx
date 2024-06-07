import { useEffect } from "react";
import { FaCloudArrowUp, FaFile, FaLink, FaWifi } from "react-icons/fa6";
import { CiWifiOff } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Peer } from "peerjs";
import Toast from "../components/Toast";

function SelectFIle() {
    /* This code snippet is setting up state variables and initializing references for managing file
    transfer functionality using WebRTC technology. Here's a breakdown of what each part is doing: */
    const [isConnected, setConnected] = useState(false);
    const [sending, sestSending] = useState(false);
    const [progress, setProgress] = useState(0);
    const [peerId, setPeerId] = useState("");
    const [file, setFile] = useState();
    const peerRef = useRef();
    const connRef = useRef();

    useEffect(() => {
        peerRef.current = new Peer({
            iceTransportPolicy: "all",
            config: {
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
        // peerRef.current = new Peer();

        peerRef.current.on("open", (id) => {
            setPeerId(id);

            peerRef.current.on("connection", (conn) => {
                console.log("connected");
                connRef.current = conn;
                toast.success("connected successfully");
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
        return () => {
            peerRef.current.destroy();
        };
    }, []);

    const send = () => {
        if (!isConnected) {
            toast.error("receiver not connected");
            return;
        }
        const fileStream = file.stream();
        const reader = fileStream.getReader();
        let bytesSent = 0;
        let totalSize = file.size;
        sestSending(true);
        // sending the file meta data before transfer start;
        connRef.current.send({
            isMetadata: true,
            name: file.name,
            type: file.type,
            size: totalSize,
        });

        /**
         * The function `readChunk` reads chunks of data from a reader and sends them over a connection
         * while updating progress and handling completion.
         */
        const readChunk = () => {
            reader.read().then(({ done, value }) => {
                if (done) {
                    sestSending(false);
                    toast.success("file sent successfully.");
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
        <div className="h-dvh relative w-dvw bg-[#12211C] ">
            <div className="px-4 py-10">
                <h2 className="text-xl font-bold">Connection Link</h2>
            </div>
            <div className="flex flex-col px-4 ">
                <h5 className="font-[500] text-[#fff]">File transfer link</h5>
                <div className="flex justify-between mt-0.5 ">
                    <div className="w-[80%] text-[.75rem] text-[#91C9B5] ">
                        File transfer link Copy and share this link to start
                        transferring files
                    </div>
                    <FaLink className="text-white font-bold text-[1.5rem]  " />
                </div>
            </div>

            <div className=" px-4 mt-4  ">
                {peerId ? (
                    <input
                        type="text"
                        disabled
                        value={`${window.location.origin}/receiver/${peerId}`}
                        className="w-full text-xs bg-[#24473B]  text-white p-2.5 rounded-lg "
                    />
                ) : (
                    <div>
                        <AiOutlineLoading className=" animate-spin size-10" />
                    </div>
                )}
            </div>

            <div className=" px-4 mt-4  ">
                <p
                    onClick={() =>
                        window.navigator.clipboard.writeText(
                            `${window.location.origin}/receiver/${peerId}`
                        )
                    }
                    className="w-full bg-[#0FD18C] font-bold  p-2.5 text-center  rounded-lg "
                >
                    copy
                </p>
            </div>
            <Toast />
            {/* The above code is a snippet of JavaScript React code that displays a file transfer
            interface when the `isConnected` variable is true. */}
            {isConnected && (
                <section className=" h-fit absolute top-0 left-0 w-full bg-background">
                    <div className="p-4 grid grid-cols-6">
                        <div className="col-span-1 flex justify-start items-center "></div>
                        <div className="col-span-4 font-bold text-center">
                            <p>Transfering</p>
                        </div>
                        <div className="col-span-1"></div>
                    </div>
                    <div className=" h-[10rem] px-2">
                        <div className=" h-full max-w-full ring-1 capitalize text-xs row-span-4 flex rounded-md  flex-col justify-center items-center ring-button_heighlight relative">
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
                    </div>
                    <div className="mt-4 px-4 ">
                        <div className="flex justify-between">
                            <p className="font-semibold">Transfering file </p>
                            {sending && <p>{progress}%</p>}
                        </div>
                        {!sending && (
                            <button
                                onClick={send}
                                className="w-full mt-4 rounded-md bg-highlight ring-1 ring-button_heighlight"
                            >
                                send
                            </button>
                        )}
                        <div></div>
                        {sending && (
                            <>
                                <div className="w-full bg-accent mt-4 rounded-md h-2">
                                    <div
                                        style={{ width: `${progress}%` }}
                                        className=" bg-button_heighlight rounded-md h-2 "
                                    ></div>
                                </div>
                                <div className="flex text-sm w-full space-x-3 text-slate-400 py-3">
                                    <p className="font-semibold">File name :</p>
                                    <p>projet_plan.pdf</p>
                                </div>
                            </>
                        )}
                        <div className="space-x-2 flex w-1/2 mt-8">
                            <div className="bg-accent size-12 grid place-content-center rounded-md ">
                                <FaFile />
                            </div>
                            {!file ? (
                                <div className="flex items-center">
                                    <p>No file selected</p>
                                </div>
                            ) : (
                                <div>
                                    <p>
                                        {(file?.size / (1024 * 1024)).toFixed(
                                            2
                                        )}
                                        MB
                                    </p>
                                    <p className="font-thin text-slate-300 ">
                                        File size
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-8">
                            <p className="text-sm font-bold">
                                Connection status
                            </p>
                            <div className="grid grid-cols-2 gap-x-4 mt-6">
                                <div className="bg-accent ring-1 p-4 rounded-md ring-highlight ">
                                    {isConnected ? (
                                        <FaWifi />
                                    ) : (
                                        <CiWifiOff className="size-6" />
                                    )}
                                    <p className="font-bold mt-1">Receiver</p>
                                    <p className=" font-thin text-sm ">
                                        Connected
                                    </p>
                                </div>
                                <div className="bg-accent ring-1 p-4 rounded-md ring-highlight ">
                                    <FaWifi />

                                    <p className="font-bold mt-1">You</p>
                                    <p className=" font-thin text-sm ">
                                        Connected
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pb-10">
                            <button className="w-full bg-highlight mt-20">
                                Cancel transfer
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default SelectFIle;
