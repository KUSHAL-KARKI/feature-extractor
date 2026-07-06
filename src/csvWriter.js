const fs = require("fs");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");

const outputDir = path.join(__dirname, "../output");
const outputFile = path.join(outputDir, "dataset.csv");

// Create output folder if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const csvWriter = createObjectCsvWriter({
    path: outputFile,
    header: [
        { id: "function_name", title: "function_name" },
        { id: "cyclomatic_complexity", title: "cyclomatic_complexity" },
        { id: "max_nesting_depth", title: "max_nesting_depth" },
        { id: "loc", title: "loc" },
        { id: "parameter_count", title: "parameter_count" },
        { id: "branch_count", title: "branch_count" },
        { id: "loop_count", title: "loop_count" },
        { id: "return_statement_count", title: "return_statement_count" },
        { id: "is_async", title: "is_async" },
        { id: "await_count", title: "await_count" },
        { id: "has_try_catch", title: "has_try_catch" },
        { id: "external_call_count", title: "external_call_count" },
        { id: "callback_count", title: "callback_count" },
        { id: "is_recursive", title: "is_recursive" },
        { id: "complexity_level", title: "complexity_level" }
    ]
});

async function writeCSV(records) {
    await csvWriter.writeRecords(records);
    console.log(`✅ Dataset written to ${outputFile}`);
}

module.exports = writeCSV;