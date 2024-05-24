import { useEffect, useRef, useState } from "react";
import { FaCloudArrowUp, FaCopy, FaDownload, FaFile } from "react-icons/fa6";
import Toast from "../components/Toast";
import { toast } from "react-toastify";
import { Peer } from "peerjs";
import QrCode from "../components/QrCode";
// const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB

export default function Sender() {
    const [isConnected, setConnected] = useState(false);
    const [sending, sestSending] = useState(false);
    const [progress, setProgress] = useState(0);
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
            peerRef.current.destroy;
        };
    }, []);

    const send = () => {
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

    const copy = async (id) => {
        try {
            window.navigator.clipboard.writeText(id);
            toast.success("Id copyed succesfully.");
        } catch (error) {
            toast.error("something went wrong");
        }
    };

    return (
        <section className="text-white p-1 w-full h-full overflow-hidden container flex items-center  justify-center ">
            <div className="ring-1 text-lime-200  grid-rows-6 grid rounded-md ring-red-400 h-[60vh]">
                {/* qr section  */}
                {isConnected ? (
                    <div className=" max-w-full ring-2 capitalize text-xs row-span-4 flex  flex-col justify-center items-center ring-yellow-400 relative">
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
                ) : (
                    <div className=" bg-gray-800 row-span-4 p-2 rounded-t-md">
                        <div className="flex justify-center items-center h-full w-full">
                            {peerId ? (
                                <QrCode
                                    string={`${window.location.href}receiver/${peerId}`}
                                />
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                )}
                {!isConnected && (
                    <div className="text-sm flex flex-col  justify-center gap-y-2 px-4 row-span-1">
                        connection string:
                        <div className="flex space-x-1">
                            <h2 className="text-xs truncate px-4">
                                {`${window.location.href}receiver/${peerId}`}
                            </h2>
                            <p
                                onClick={() => copy(peerId)}
                                className="cursor-pointer"
                            >
                                <FaCopy />
                            </p>
                        </div>
                    </div>
                )}
                {isConnected && (
                    <div className="w-full row-span-1 p-2">
                        <button
                            className="w-full h-full capitalize"
                            onClick={send}
                        >
                            send
                        </button>
                        <p>{progress}</p>
                    </div>
                )}
                {sending && (
                    <div className=" space-y-2 py-4 px-2">
                        <div className="h-10 w-full flex flex-col items-end rounded-s-md bg-white">
                            <div className="h-9 text-black w-full flex items-center justify-between">
                                <div className="w-9 h-9 flex items-center justify-center">
                                    <FaFile />
                                </div>
                                <div className="text-start w-full ">
                                    <p className=" line-clamp-1 truncate ">
                                        {file?.name}
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
6000232256;
6001101407;
6001410543;
6001447595;

6001970539;
6003554140;
6009069020;
6009188131;
6009773360;
6026439923;
6200319421;

6200623502;
6201353791;
6202413654;
6202480063;
6202745814;
6203214725;
6203619122;
6204518010;
6206143718;
6206529496;
6206931873;
6207438907;
6239349870;
6239734232;
6239750611;
6239999367;
6260078213;
6260200335;
6260334077;
6260336178;
6263616305;
6264761790;
6264836948;
6265100901;
6265137916;
6266245968;
6266662888;
6268431307;
6268845880;
6284614525;
6289886277;
6295278734;
6299125114;
6306393496;
6307960899;
6360422989;
6361068511;
6361922715;
6370581670;
6371138040;
6372059691;
6372188350;
6372302520;
6375583968;
6376498646;
6376610350;
6377052279;
6378532017;
6379699051;
6387867638;
6388917886;
6392124919;
6392698165;
6393553118;
6394952926;
6395017952;
6395019956;
6395295351;
6395664368;
6398057853;
6900675824;
