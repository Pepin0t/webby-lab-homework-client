import W from "../workers/txt.worker";

export function txtParse(file) {
    const worker = new W();
    const reader = new FileReader();

    reader.onload = e => {
        worker.postMessage(e.target.result);
    };

    reader.readAsText(file);

    return new Promise((resolve, reject) => {
        worker.onmessage = function({ data }) {
            resolve(data);

            this.terminate();
        };

        worker.onerror = function() {
            reject({
                response: {
                    data: {
                        ok: false,
                        message: "File reading error. Check your file. Look at example above."
                    }
                }
            });

            this.terminate();
        };
    });
}
