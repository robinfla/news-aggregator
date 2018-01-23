const request = require('request');
const MongoClient = require('mongodb').MongoClient;

const apiKey = 'b961f9b8115e429da19aa7f2106f5936';
const keyword = 'Valley';
const sinceDate = '2018-01-20';

MongoClient.connect('mongodb://localhost:27017/watchDB', (err, client) => {
    if (err) return console.log(err);
    console.log("successfully connected to watchDB");
    const db = client.db('watchDB');
    storeArticles(db, () => {
        console.log("nothing to see here, move along");
        client.close();
    });
});

function Article(sourceName, title, description, url, publishedAt) {
    this.source = sourceName;
    this.title = title;
    this.description = description;
    this.url = url;
    this.date = publishedAt;
};

const options = {
    url: 'https://newsapi.org/v2/top-headlines?',
    qs: {
        'q': keyword,
        'category': ['technology', 'business'],
        'from': sinceDate,
        'sortBy': 'popularity'
    },
    headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
    }
};

function storeArticles (db, callback) {
    const search = request(options, (err, res, body) => {
        if (err) return console.log(err);

        const data = JSON.parse(body);
        console.log("Data obtained from NewsAPI");

        const length = data.totalResults;
        let i = 0;
        while (i < length) {
            const collection = db.collection('test2');
            let res = data.articles[i];
            let doc = new Article(res.source.name, res.title,
                res.description, res.url, res.publishedAt);
            insertDocument (collection, doc, () => {
                console.log("Next document");
                callback();
            });
            i++;
        }
    });
}

async function insertDocument (collection, doc, callback) {
    try {
        const count = await collection.find({"url": doc.url}).count();
        if (!count) {
            const result = collection.insert(doc, (err, result) => {
                if (err) return console.log(`Error during insertion: ${err}`);
                console.log("document inserted");
            });
        }
        callback();
    }
    catch (err) {
        console.log(err);
    }
};
