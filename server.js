const MongoClient = require('mongodb').MongoClient;
const request = require('request');

MongoClient.connect('mongodb://localhost:27017/watchDB', (err, client) => {
    if (err) return console.log(err);
    console.log("Connected to my DB");
    const database = client.db('watchDB');
    insertTweets(database, () => {
        client.close();
    });
})

const searchResults = {

}
