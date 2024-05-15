// fileDownloaderWorker.js
onmessage = function (event) {
    const gatheredData = event.data.gatheredData;

    if (event.data.isDownloadable) {
        console.log("what we have on worker", gatheredData);
        // Concatenate all received chunks into a single Uint8Array
        const totalSize = gatheredData.reduce(
            (acc, chunk) => acc + chunk.chunk.byteLength,
            0
        );

        const mergedArray = new Uint8Array(totalSize);
        // Concatenate the received chunks into the merged array
        let offset = 0;
        gatheredData.forEach((chunk) => {
            mergedArray.set(new Uint8Array(chunk.chunk), offset);
            offset += chunk.chunk.byteLength;
        });
        // Create a Blob from the Uint8Array
        const fileBlob = new Blob([mergedArray], {
            type: gatheredData[0].type,
        });

        // Create a URL for the Blob
        const fileURL = URL.createObjectURL(fileBlob);

        // Send the file URL back to the main thread
        postMessage({ fileURL });
    }
};
