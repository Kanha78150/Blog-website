const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/article');
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter);
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.render("articles/index", { articles: articles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
});

mongoose.connect('mongodb://0.0.0.0:27017/blog')
    .then(() => {
        app.listen(3000, () => {
            console.log("Connected to MongoDB...");
            console.log("Listening @port #3000...");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });