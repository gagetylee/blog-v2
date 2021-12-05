const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');
require('./db/mongoose')
const blogRouter = require('./routes/article')
const adminRouter = require('./routes/admin')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = 3000


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(adminRouter)
app.use(blogRouter)
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
   res.render('index')
})

app.listen(port)