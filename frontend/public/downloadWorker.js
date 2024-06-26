/* This JavaScript code snippet is setting up a web worker that listens for messages using the
`onmessage` event handler. Here's a breakdown of what the code is doing: */
let dataArr = [];
onmessage = (event) => {
    try {
        // console.log(event.data);
        if (event.data?.download) {
            const blob = new Blob(dataArr, { type: event?.data?.type });
            self.postMessage(blob);
            dataArr = [];
        } else {
            dataArr.push(event.data);
        }
    } catch (error) {
        console.log(error);
    }
};
