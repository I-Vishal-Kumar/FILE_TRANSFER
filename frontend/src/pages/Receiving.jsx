/* eslint-disable react/prop-types */
import { CiWifiOff } from "react-icons/ci";
import { FaFile, FaWifi } from "react-icons/fa6";

export default function Receiving({
    progress,
    isConnected,
    metaData,
    isDownloading,
}) {
    return (
        <div className="h-dvh relative w-dvw bg-[#12211C] ">
            <div className="p-4 grid grid-cols-6">
                <div className="col-span-1 flex justify-start items-center "></div>
                <div className="col-span-4 font-bold text-center">
                    <p>Transfering</p>
                </div>
                <div className="col-span-1"></div>
            </div>
            <div className="mt-4 px-4 ">
                <div className="flex justify-between">
                    <p className="font-semibold">Transfering file </p>
                    {isDownloading && <p>{progress.toFixed(2)}%</p>}
                </div>
                {isDownloading && (
                    <div className="w-full bg-accent mt-4 rounded-md h-2">
                        <div
                            style={{
                                width: `${Math.min(
                                    100,
                                    Number(progress.toFixed(2))
                                )}%`,
                            }}
                            className="bg-button_heighlight rounded-md h-2 "
                        ></div>
                    </div>
                )}

                <div className="flex text-sm w-full space-x-3 text-slate-400 py-3">
                    <p className="font-semibold">File name :</p>
                    <p>{metaData?.fileName || "no file"} </p>
                </div>
                <div className="space-x-2 flex w-1/2 mt-8">
                    <div className="bg-accent size-12 grid place-content-center rounded-md ">
                        <FaFile />
                    </div>
                    <div>
                        <p>{metaData?.totalSize || 0}MB</p>
                        <p className="font-thin text-slate-300 ">File size</p>
                    </div>
                </div>
                <div className="mt-8">
                    <p className="text-sm font-bold">Connection status</p>
                    <div className="grid grid-cols-2 gap-x-4 mt-6">
                        <div className="bg-accent ring-1 p-4 rounded-md ring-highlight ">
                            <FaWifi />
                            <p className="font-bold mt-1">You</p>
                            <p className=" font-thin text-sm ">Connected</p>
                        </div>
                        <div className="bg-accent ring-1 p-4 rounded-md ring-highlight ">
                            {isConnected ? (
                                <FaWifi />
                            ) : (
                                <CiWifiOff className="size-6" />
                            )}
                            <p className="font-bold mt-1">Sender</p>
                            <p className=" font-thin text-sm ">
                                {isConnected ? "Connected" : "Disconnected"}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="w-full bg-highlight mt-20">
                        Cancel transfer
                    </button>
                </div>
            </div>
        </div>
    );
}
