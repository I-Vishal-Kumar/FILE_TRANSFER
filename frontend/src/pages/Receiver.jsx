import { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
const CHUNK_SIZE = 5120;

export default function Receiver() {
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [peerId, setPeerId] = useState("");
    const [gatheredData, setData] = useState("");
    const [isDownloadable, setIsDownloadable] = useState(false);
    const peerRef = useRef();

    useEffect(() => {
        peerRef.current = new Peer();
        peerRef.current.on("connection", (id) => {
            console.log(id);
        });
    }, []);

    useEffect(() => {
        const totalChunks =
            gatheredData[gatheredData.length - 1]?.totalChunks || 0;
        const receivedChunks = gatheredData.length;
        setIsDownloadable(
            receivedChunks === totalChunks ||
                receivedChunks === totalChunks - 1 ||
                receivedChunks === totalChunks + 1
        );
    }, [gatheredData]);

    const call = () => {
        const conn = peerRef.current.connect(peerId);
        conn.on("open", () => {
            conn.send("hello from receiver");
            conn.on("data", (data) => {
                // if (data.chunkIndex + 1 !== data.totalChunks) {
                setData((prevData) => [...prevData, data]);
                // } else {
                // console.log(gatheredData);
                // }
            });
        });
    };
    // const downloadFile = () => {
    //     console.log(gatheredData);
    //     if (isDownloadable) {
    //         // Concatenate all received chunks into a single Uint8Array
    //         const totalSize = gatheredData.reduce(
    //             (acc, chunk) => acc + chunk.chunk.byteLength,
    //             0
    //         );

    //         const mergedArray = new Uint8Array(totalSize);
    //         // Concatenate the received chunks into the merged array
    //         let offset = 0;
    //         gatheredData.forEach((chunk) => {
    //             mergedArray.set(new Uint8Array(chunk.chunk), offset);
    //             offset += chunk.chunk.byteLength;
    //         });
    //         // Create a Blob from the Uint8Array
    //         const fileBlob = new Blob([mergedArray], {
    //             type: gatheredData[0].type,
    //         });

    //         // Create a URL for the Blob
    //         const fileURL = URL.createObjectURL(fileBlob);

    //         // Create a temporary anchor element to trigger the download
    //         const downloadLink = document.createElement("a");
    //         downloadLink.href = fileURL;
    //         downloadLink.download = "received_file"; // Specify the filename here
    //         document.body.appendChild(downloadLink);
    //         downloadLink.click();

    //         // Clean up
    //         document.body.removeChild(downloadLink);
    //         URL.revokeObjectURL(fileURL);
    //     }
    // };
    // Main JavaScript file
    const downloadFile = () => {
        console.log(gatheredData);
        if (isDownloadable) {
            // Create a new web worker for downloading the file
            const fileDownloaderWorker = new Worker("fileDownloaderWorker.js");

            // Send data to the web worker
            fileDownloaderWorker.postMessage({
                gatheredData,
                isDownloadable,
            });

            // Listen for messages from the web worker
            fileDownloaderWorker.onmessage = function (event) {
                const fileURL = event.data.fileURL;

                // Create a temporary anchor element to trigger the download
                const downloadLink = document.createElement("a");
                downloadLink.href = fileURL;
                downloadLink.download = "received_file"; // Specify the filename here
                document.body.appendChild(downloadLink);
                downloadLink.click();

                // Clean up
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(fileURL);
            };
        }
    };

    return (
        <section className="text-white container flex items-center w-screen justify-center ">
            <div className="ring-1 text-lime-200 rounded-md capitalize ring-red-400 h-[60vh] grid place-content-center w-3/4">
                <h2>Received Message: {receivedMessage}</h2>
                <input
                    type="text"
                    value={peerId}
                    onChange={(e) => setPeerId(e.target.value)}
                    placeholder="id"
                />
                <button onClick={call}>call</button>
                <button onClick={downloadFile}>download</button>
            </div>
        </section>
    );
}