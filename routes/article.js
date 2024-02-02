const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

// Render the form for creating a new article
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})


router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})


router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article === null) res.redirect('/')
    res.render('articles/show', { article: article })
})


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticle('edit'))


router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticle('new'))

function saveArticle(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        article.author = req.body.author
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (error) {
            console.log(error)
            res.render(`articles/${path}`, { article: article })
        }
    }
}

module.exports = router