const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./db/mongoose')
const blogRouter = require('./routes/article')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.json())
app.use(blogRouter)
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
   res.render('index')
})

app.listen(port)