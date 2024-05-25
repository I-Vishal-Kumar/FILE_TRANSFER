import { FaClock, FaGear, FaLock, FaUserGroup } from "react-icons/fa6";

export default function Home() {
    return (
        <section className=" h-full overflow-auto bg-background w-full">
            {/* settings section. */}
            <div className="flex justify-end h-[10%] p-4">
                <FaGear size={20} />
            </div>
            {/* hero section */}
            <div className="h-[45%]  space-y-4">
                <h2 className="capitalize text-xl px-4 h-[8%] text-white font-bold ">
                    file transfer
                </h2>
                <div
                    style={{
                        background: "url(homeAvatar.png) center no-repeat",
                        backgroundSize: "cover",
                        backgroundBlendMode: "color-burn",
                    }}
                    className=" text-xs capitalize h-[92%] grid place-content-center"
                >
                    <div>
                        <h1 className="font-bold text-xl">
                            secure file sharing
                        </h1>
                        <p>
                            Fast, secure and private. No registration or size
                            limits.
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-[45%] px-4 pt-8 space-y-3 ">
                <h2 className="capitalize text-xl font-bold">key features</h2>
                <p className="text-sm">
                    No registration is required, 100% free. Files are encrypted
                    in transit. Files are stored for up to 7 days.
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
                    <button className="w-full capitalize font-bold bg-button_heighlight">
                        send a file
                    </button>
                    <button className="w-full capitalize font-bold  bg-highlight text-white">
                        receive a file
                    </button>
                </div>
            </div>
        </section>
    );
}
