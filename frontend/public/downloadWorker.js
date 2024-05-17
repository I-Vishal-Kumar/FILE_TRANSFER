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
