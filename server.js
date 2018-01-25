const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const context = require('./routes/index.js');
const news = require('./news.js');
const MongoClient = require('mongodb').MongoClient;

app.listen(3000, () => {
    console.log("server started");
    news.getArticles();
});

// view engine setup //
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'hbs');

app.get('/', async (req, res) => {
    console.log("someone tried to connect");
    try {
    const context = await getContext();
    console.log("got context");
    res.render('home', context);
    } catch (err) {
        console.log (err);
    }
});

async function getContext () {
    try {
            const client = await MongoClient.connect('mongodb://localhost:27017/watchDB');
            const db = client.db('watchDB');
            let articles = await db.collection('test4').find().toArray();
            const context = { articles };
            client.close();
            return context;
    } catch (err) {
        console.log(err);
    }
}
