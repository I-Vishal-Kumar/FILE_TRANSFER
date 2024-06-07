import { useState } from "react";
import { FaClock, FaGear, FaLock, FaUserGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [settingActive, setSettings] = useState(false);

    return (
        <section className=" h-full overflow-auto bg-background w-full">
            {/* settings section. */}
            <div className="flex relative justify-end h-[10%] p-4">
                <FaGear
                    onClick={(e) => setSettings((prev) => !prev)}
                    size={20}
                />
                {settingActive && (
                    <div className="absolute w-20 right-0 top-full bg-accent h-fit py-4 px-4 rounded-md">
                        <p
                            onClick={(e) => navigate("/help")}
                            className="text-white cursor-pointer font-bold text-center "
                        >
                            Help
                        </p>
                    </div>
                )}
            </div>
            <div className="md:flex justify-evenly">
                {/* hero section */}
                <div className="h-[45%]  space-y-4">
                    <h2 className="capitalize text-xl px-4 h-[8%] text-white font-bold ">
                        file transfer
                    </h2>
                    <div
                        style={{
                            background: "url(homeAvatar.png) top no-repeat",
                            backgroundSize: "cover",
                            backgroundBlendMode: "color-burn",
                        }}
                        className=" text-xs capitalize h-[18rem] "
                    >
                        <div
                            style={{
                                backdropFilter: "blur(2px)",
                            }}
                            className="h-full w-full flex justify-center items-center"
                        >
                            <div>
                                <h1 className="font-bold text-xl">
                                    secure file sharing
                                </h1>
                                <p>
                                    Fast, secure and private. No registration or
                                    size limits.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[45%] px-4 pt-8 space-y-3 ">
                    <h2 className="capitalize text-xl font-bold">
                        key features
                    </h2>
                    <p className="text-sm">
                        No registration is required, 100% free. Files are
                        encrypted in transit. Files are stored for up to 7 days.
                    </p>
                    <div className="grid grid-cols-2 gap-3 grid-rows-2 ">
                        <div className="w-full space-y-2 h-full bg-accent p-4 rounded-md ring-highlight ring-1 ">
                            <div>
                                <FaLock />
                            </div>
                            <div>
                                <p className=" font-semibold text-xs capitalize ">
                                    no registration
                                </p>
                            </div>
                        </div>
                        <div className="w-full space-y-2 h-full bg-accent p-4 rounded-md ring-highlight ring-1 ">
                            <div>
                                <FaUserGroup />
                            </div>
                            <div>
                                <p className=" font-semibold text-xs capitalize ">
                                    private and secure
                                </p>
                            </div>
                        </div>
                        <div className="w-full space-y-2 h-full bg-accent p-4 rounded-md ring-highlight ring-1 ">
                            <div>
                                <FaClock />
                            </div>
                            <div>
                                <p className=" font-semibold text-xs capitalize ">
                                    files are stored for upto 7 days
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* action buttons */}
                    <div className=" py-4 space-y-3 text-black capitalize">
                        <button
                            onClick={(e) => navigate("/sender")}
                            className="w-full capitalize font-bold bg-button_heighlight"
                        >
                            send a file
                        </button>
                        <button
                            onClick={(e) => navigate("/receiver")}
                            className="w-full capitalize font-bold  bg-highlight text-white"
                        >
                            receive a file
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
