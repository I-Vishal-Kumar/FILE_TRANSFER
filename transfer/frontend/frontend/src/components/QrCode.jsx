/* eslint-disable react/prop-types */
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";

const qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    backgroundOptions: {
        color: "transparent",
    },
    dotsOptions: {
        color: "#ff5d5d",
        type: "rounded",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
    },
});

export default function QrCode({ string }) {
    const ref = useRef(null);

    useEffect(() => {
        qrCode.append(ref.current);
    }, []);
    useEffect(() => {
        qrCode.update({
            data: string,
        });
    }, [string]);

    return <div ref={ref}></div>;
}
