self.addEventListener(
    "message",
    function(e) {
        const requiredWords = [/^title/i, /^release\s*year/i, /^format/i, /^stars/i];
        let result;

        result = e.data
            .split("\n\n")
            .filter(el => el !== "")
            .map(film => {
                const obj = {};

                film.split("\n").forEach(info => {
                    const match = info.match(/^(\w+)\s*\w*:\s*(.+)/);

                    const checkWords = requiredWords.some(word => {
                        return word.test(match[0]);
                    });

                    if (!checkWords) {
                        throw new Error();
                    }

                    const key = match[1].toLowerCase();

                    if (/^stars/.test(key)) {
                        obj[key] = match[2].replace(/\s*,\s*/g, ",").split(",");
                    } else {
                        obj[key] = match[2];
                    }
                });

                return obj;
            });

        self.postMessage(result);
    },
    false
);
