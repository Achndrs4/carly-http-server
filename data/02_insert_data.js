const fs = require('fs');
const readline = require('readline');

const dataPath= process.env.DATA_PATH;
const collectionName = process.env.COLLECTION_NAME;

if (!dataPath || !collectionName) {
    console.error("Please provide DATA_PATH and COLLECTION_NAME environment variables.");
    process.exit(1);
}

function readJSONLFile(filePath) {
    return new Promise((resolve, reject) => {
        const lines = [];
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath, { encoding: 'utf-8' }),
            output: process.stdout,
            terminal: false
        });

        rl.on('line', (line) => {
            lines.push(line);
        });

        rl.on('close', () => {
            resolve(lines);
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
}

readJSONLFile(dataPath)
    .then(lines => {
        const documents = lines
            .filter(line => line.trim() !== "")
            .map(line => JSON.parse(line));

            db.users.insertMany(documents)
            .then(result => {
                console.log(`${result.insertedCount} documents inserted`);
            })
            .catch(error => {
                console.error('Error inserting documents:', error);
            });
    })
    .catch(error => {
        console.error('Error reading file:', error);
    });