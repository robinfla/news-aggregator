const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const news = require('./news.js');
const MongoClient = require('mongodb').MongoClient;

// setting handlebars options and helpers
const hbs = exphbs.create({
    helpers: {
        dateSincePosted: (dateSince) => {
            const today = new Date();
            const dateArticle = new Date(dateSince);
            const timeInMilisec = today.getTime() - dateArticle.getTime();
            return (Math.floor(timeInMilisec / (1000 * 60 * 60 * 24)));
        }
    },
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir:__dirname + '/views/layouts/'
});

app.listen(3000, () => {
    console.log("server started");
    news.getArticles();
});

// view engine setup //
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// answering GET request
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

// extracting article from local database
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
