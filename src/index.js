const fg = require("fast-glob");
const extract = require("./extractor");
const writeCSV = require("./csvWriter");

(async () => {
    const files = await fg("input/**/*.js");

    let dataset = [];

    for (const file of files) {
        const functions = extract(file);

        dataset.push(...functions);
    }
    console.log(`Extracted data in json format is  ${JSON.stringify(dataset)}`);

    await writeCSV(dataset);
})();