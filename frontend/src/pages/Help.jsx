import { useState } from "react";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const dropDowns = [
    {
        question: "How do I send a file?",
        answer: "You can send upto 2GB of files at once and you can send one file at a time. Just drag and drop thte files here or click on this page to select them.",
    },
    {
        question: "Is there a limit to how many files I can send?",
        answer: "The Answer would be NO here you can send as many files as you want but one by one.",
    },
    {
        question: "What happens if my file is too big?",
        answer: "If your file is greater than 2GB it would deepend on the receiver's bandwidth and internet speed to download the files.",
    },
];

export default function Help() {
    const [activeDropdownIdx, setActiveDropDownIdx] = useState(0);
    const navigate = useNavigate();
    return (
        <div className="h-dvh w-dvw bg-[#12211C] ">
            {/* back button */}
            <div className="p-4 grid grid-cols-6">
                <div
                    onClick={(e) => navigate(-1)}
                    className="col-span-1 flex justify-start items-center "
                >
                    <FaArrowLeft />
                </div>
                <div className="col-span-4 capitalize font-bold text-center">
                    <p>about/Help</p>
                </div>
                <div className="col-span-1"></div>
            </div>

            <div className="px-4 mt-8 pb-10">
                <h2 className="font-bold text-xl">About</h2>
                <p className="mt-4">
                    WeTransfer is the simplest way to send your files around the
                    world. Every month, users in 195 countries send one billion
                    files through our platform.
                </p>

                <h2 className="font-bold text-xl mt-6">FAQs</h2>

                {/* dropdown's */}
                {dropDowns.map((dropDown, idx) => {
                    return (
                        <div key={`dropdown-${idx}`} className="mt-8">
                            <div className="bg-accent ring-1 ring-button_heighlight p-4 rounded-md">
                                <div
                                    onClick={() => setActiveDropDownIdx(idx)}
                                    className="flex justify-between"
                                >
                                    <p>{dropDown.question}</p>
                                    <p>
                                        <FaArrowDown />
                                    </p>
                                </div>
                                {
                                    // if active dropdown index is equal to the current index then show the answer else hide it
                                    activeDropdownIdx === idx ? (
                                        <div className="mt-2">
                                            <p className=" font-thin text-sm">
                                                {dropDown.answer}
                                            </p>
                                        </div>
                                    ) : (
                                        ""
                                    )
                                }
                            </div>
                        </div>
                    );
                })}

                <h2 className="font-bold text-xl mt-6">Contact Us</h2>
                <p className="mt-2 font-bold text-sm">
                    Need help? Contact us at support@wetransfer.com.
                </p>
                <p className="mt-2 font-thin text-sm">
                    Our office hours are Monday - Friday , 9am - 5pm GMT.
                    We&apos;ll respond within 24 hours.
                </p>
            </div>
        </div>
    );
}
