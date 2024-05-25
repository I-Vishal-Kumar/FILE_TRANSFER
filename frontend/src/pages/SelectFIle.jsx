import { RxCross2 } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa6";
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaLink } from "react-icons/fa6";

function SelectFIle() {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="h-dvh w-dvw bg-[#12211C] " >
            <div style={{ display: "grid", gridTemplateColumns: "10% 80% 10%", justifyItems: "center" }} className="p-3 ">
                <RxCross2 className="text-white font-bold text-[1.5rem]  " />
                <p className="text-white font-bold text-[1.2rem] ">send files</p>
            </div>
            <h1 className="text-white text-[1.1rem] p-4 px-5 font-bold leading-3 " >Drag & drop your files here</h1>

            <div className="h-[10vh] " >
                <div {...getRootProps()}>
                    <input {...getInputProps()} id="file" />
                </div>
                <div className="flex justify-between items-center h-full px-4 " >
                    <label htmlFor="file" className="text-white text-[1rem] font-[400] leading-3" >or select a file</label>
                    <FaArrowRight className="text-white font-bold text-[1.5rem]  " />
                </div>
            </div>

            <div className="flex flex-col px-4 " >
                <h5 className="font-[500] text-[#fff]" >File transfer link</h5>
                <div className="flex justify-between mt-0.5 " >
                    <div className="w-[80%] text-[.75rem] text-[#91C9B5] " >File transfer link
                        Copy and share this link to start transferring files</div>
                    <FaLink className="text-white font-bold text-[1.5rem]  " />
                </div>
            </div>

            <div className=" px-4 mt-4  " >
               <input type="text" name="" id="" value={"/https:q4q9081870"}  className="w-full bg-[#24473B]  text-white p-2.5 rounded-lg " />
            </div>

            <div className=" px-4 mt-4  " >
              <p className="w-full bg-[#0FD18C] font-bold  p-2.5 text-center  rounded-lg " >copy</p>
            </div>



        </div>
    )
}

export default SelectFIle