const express = require('express');
const { registerDecorator } = require('handlebars');
const Article = require('./../models/article')
const router = new express.Router()

router.get('/blog', async (req, res) => {
   try {
      const articles = await Article.find({})
      res.render('blog', { articles })
   } catch (e) {
      res.status(500).send()
   }
})

router.get('/blog/create', async (req, res) => {
   res.render('create')
})

router.get('/blog/:title', async (req, res) => {
   try {
      const articleName = req.params.title.replace(/-/g, ' ')
      const article = await Article.findOne({ title: { $regex: new RegExp('^' + articleName + '$', "i") } })

      article ? (res.render('article', article)) : res.status(404).send()
   } catch (e) {
      res.status(500).send()
   }
})

router.post('/blog', async (req, res) => {
   
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
      res.redirect(`/blog/${article.url}`)
      // res.status(201).send(article)
   } catch (e) {
      console.log(e);
      res.status(400).send(e)
   }
})

module.exports = router