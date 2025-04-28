const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
require('dotenv').config() // CommonJS way to load environment variables
const port = process.env.PORT || 4000


const Article = require('./models/articleModel.js') 
const articleRouter = require('./routes/articleRoutes.js') 


mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Could not connect to MongoDB Atlas...', err))


app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false })) 
app.use(methodOverride('_method')) // allows method override for PUT, DELETE from HTML

// show all articles
app.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' }).populate('author').populate('comments')
    res.render('articles/index', { articles: articles })
  } catch (err) {
    console.error(err)
    res.redirect('/') 
  }
})


app.use('/articles', articleRouter)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})