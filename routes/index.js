const context = {
    "articles": [
        {
          "source": "Wired",
          "title": "Andreessen Horowitz's Spin Master Built Silicon Valley As You Know It",
          "url": "https://www.wired.com/story/margit-wennmachers-is-andreessen-horowitzs-secret-weapon/",
          "date": "2018-01-21T12:00:00Z"
        },
        {
          "source": "Recode",
          "title": "A startup investor with billion dollar exits on how retail must change",
          "url": "https://www.recode.net/2017/9/13/16296366/code-commerce-forerunner-ventures-kirsten-green-retail",
          "date": "2017-09-13T15:36:30Z"
        },
        {
          "source": "Wirtschafts Woche",
          "title": "Global Competitiveness Report: Diese Länder greifen die besten Talente der Welt ab",
          "url": "http://www.wiwo.de/politik/ausland/global-competitiveness-report-diese-laender-greifen-die-besten-talente-der-welt-ab/20875994.html",
          "date": "2018-01-23T08:24:58+00:00"
        },
        {
          "source": "Recode",
          "title": "Silicon Valley won’t save us — but we can’t blame it for everything, either",
          "url": "https://www.recode.net/2018/1/22/16917570/andrew-keen-how-fix-future-book-jobs-economy-silicon-valley-kara-swisher-recode-decode-podcast",
          "date": "2018-01-22T11:30:01Z"
        },
        {
          "source": "Bloomberg",
          "title": "South Korea Tops Global Innovation Ranking Again While U.S. Falls",
          "url": "http://www.bloomberg.com/news/articles/2018-01-22/south-korea-tops-global-innovation-ranking-again-as-u-s-falls",
          "date": "2018-01-22T23:06:19Z"
        }
    ]
};

context.articles.sort( (a,b) => {
    return new Date(b.date) - new Date(a.date);
});

// const template = Handlebars.templates.layout(context);

// document.getElementById('body-app').innerHTML = template;

module.exports = context;
