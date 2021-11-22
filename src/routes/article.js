const express = require('express');
const { registerDecorator } = require('handlebars');
const Article = require('./../models/article')
const router = new express.Router()

router.get('/', async (req, res) => {
   try {
      const articles = await Article.find({})

      res.render('index', {articles})
   } catch (e) {
      res.status(500).send()
   }
})


router.get('/articles', async (req, res) => {
   try {
      const articles = await Article.find({})

      res.send(articles)
   } catch (e) {
      res.status(500).send()
   }
})

router.get('/create', async (req, res) => {
   res.render('create')
})

router.get('/:title', async (req, res) => {
   try {
      const articleName = req.params.title.replace(/-/g, ' ')
      const article = await Article.findOne({ title: { $regex: new RegExp('^' + articleName + '$', "i") } })

      article ? (res.render('article', article)) : res.status(404).send()
   } catch (e) {
      res.status(500).send()
   }
})

router.post('/', async (req, res) => {
   
   if (!req.body.title) {
      return res.send({
         error: 'You must provide a title'
      })
   }
   if (!req.body.content) {
      return res.send({
         error: 'You must provide a body'
      })
   }
   let articleURL = req.body.title
   articleURL = articleURL.replace(/\s+/g, '-').toLowerCase();
   // const article = new Article(req.query.title, req.query.content, articleURL)
   const article = new Article({
      title: req.body.title,
      content: req.body.content,
      url: articleURL
   })

   try {
      await article.save()
      res.redirect(`/${article.url}`)
      // res.status(201).send(article)
   } catch (e) {
      console.log(e);
      res.status(400).send(e)
   }
})

router.delete('/:id', async (req, res) => {
   try {
      const article = await Article.findByIdAndDelete(req.params.id)

      if (!article) {
         return res.status(404).send()
      }
      res.send(article)
   } catch (e) {
      res.send(500).send()
   }
})

module.exports = router