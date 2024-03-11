// create-collection.js
const collectionName = process.env.COLLECTION_NAME;

if (!collectionName) {
    console.error("Please provide COLLECTION_NAME as an environment variable");
    process.exit(1);
}

db.createCollection(collectionName);