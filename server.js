const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const context = require('./routes/index.js');
const news = require('./news.js');

app.listen(3000, () => {
});

// view engine setup //
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    storeArticles();
    const context = extractFromDb();
    context.sort
    res.render('home', context);
});
