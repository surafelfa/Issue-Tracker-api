/* eslint linebreak-style: ["error", "windows"] */


require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  // a connection to the database is obtained
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    /* To make it return the new, modified document instead,
      the option returnOriginal has to be set to false. */
    { returnOriginal: false },
  );
  return result.value.current ? result.value.current : 0;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
