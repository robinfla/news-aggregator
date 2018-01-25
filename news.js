const request = require('request');
const MongoClient = require('mongodb').MongoClient;

const apiKey = 'b961f9b8115e429da19aa7f2106f5936';
const keywords = '"deep learning"';
const lastWeekDate = new Date(new Date().setDate(new Date().getDate()-7));
const todayDate = new Date();

const sources = "ars-technica, bloomberg, business-insider, cnbc, engadget, fortune, hacker-news, les-echos, mashable, recode, techcrunch, techradar, the-economist, the-guardian-uk, the-next-web, the-verge, the-wall-street-journal, wired";

const options = {
    url: 'https://newsapi.org/v2/everything?',
    qs: {
        'q': keywords,
        'sources': sources,
        'language': ['en', 'fr'],
        'domains': "techcrunch.com, engadget.com, wsj.com",
        'from': lastWeekDate,
        'to': todayDate,
        'pageSize': 100
    },
    headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const getArticles = MongoClient.connect('mongodb://localhost:27017/watchDB', (err, client) => {
    if (err) return console.log(err);
    console.log("successfully connected to watchDB");
    const db = client.db('watchDB');
    storeArticles(db, () => {
        console.log("nothing to see here, move along");
        // client.close();
    });
})

function Article(sourceName, title, description, url, publishedAt) {
    this.source = sourceName;
    this.title = title;
    this.description = description;
    this.url = url;
    this.date = publishedAt;
}

function storeArticles (db, callback) {
    const search = request(options, (err, res, body) => {
        if (err) return console.log("Failed to get sources: " + err);

        const data = JSON.parse(body);
        console.log("Data obtained from NewsAPI");
        console.log(data);

        const length = data.totalResults;
        let i = 0;
        while (i < length) {
            const collection = db.collection('test4');
            let res = data.articles[i];
            console.log(res);
            console.log(i);
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
                callback();
            });
        } else {
            callback();
        }
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {
    getArticles: getArticles
};
