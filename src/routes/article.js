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

router.get('/:slug', async (req, res) => {
   try {
      const article = await Article.findOne({ slug: req.params.slug })
      if (article == null) res.redirect('/')

      res.render('article', article)
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

   const article = new Article({
      title: req.body.title,
      content: req.body.content
   })

   try {
      await article.save()
      res.redirect(`/${article.slug}`)
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