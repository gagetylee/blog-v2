const express = require('express');
const Article = require('../models/article')
const router = new express.Router()

router.get('/blog', async (req, res) => {
   try {
      const articles = await Article.find({})
      res.render('blog', { articles })
   } catch (e) {
      res.status(500).send()
   }
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
   const article = new Article(req.body)

   try {
      await article.save()
      res.status(201).send(article)
   } catch (e) {
      res.status(400).send(e)
   }
})

module.exports = router