const express = require('express')
const router = express.Router()
const Article = require('../models/articleModel.js')
const Author = require('../models/authorModel.js')
const Comment = require('../models/commentModel.js')

// = = = = = = = = = = = = =
//  GET ALL ARTICLES (JSON)
// = = = = = = = = = = = = =
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .populate('author')
      .populate('comments')

    //res.send(articles) // <-- test without ejs
    //console.log(articles)
    //res.render('articles/index', { articles: articles })
    res.json(articles) 
  } catch (err) {
    console.error('GET /articles failed:', err)
    res.status(500).send('Server error')
  }
})

  // = = = = = = = = = = = = =
  //  GET ALL AUTHORS
  // = = = = = = = = = = = = =
  router.get('/authors', async (req, res) => {
    try {
      const authors = await Author.find().sort({ name: 1 })
      res.json(authors)
    } catch (err) {
      console.error('GET /articles/authors failed:', err)
      res.status(500).send('Failed to fetch authors')
    }
  })


  // = = = = = = = = = = = = =
  //  GET ALL COMMENTS
  // = = = = = = = = = = = = =
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find().populate('author article').sort({ createdAt: -1 })
    res.json(comments)
  } catch (err) {
    console.error('GET /comments failed:', err)
    res.status(500).send('Failed to fetch comments')
  }
})


  // = = = = = = = = = = = = =
  //  GET One Article by Slug
  // = = = = = = = = = = = = =
// router.get('/:slug', async (req, res) => {
//   try {
//     const article = await Article.findOne({ slug: req.params.slug })
//       .populate('author')
//       .populate('comments')
//     if (!article) {
//       console.log('📍 Route hit with slug:', req.params.slug)      
//       return res.redirect('/')
//     }
//     res.render('articles/show', { article: article })
//   } catch (err) {
//     console.log(err)
//     res.redirect('/') // redirect on error
//   }
// })



// = = = = = = = = = = = = =
//  GET FORM TO CREATE
// = = = = = = = = = = = = =
router.get('/new', async (req, res) => {
  try {
    const authors = await Author.find() //<--- fetches all authors from db!
    res.render('articles/new', { article: new Article(), authors: authors }) // MUST must have mew Artcile()
  } catch (err) {
    console.error('GET /articles/new failed:', err)
    res.redirect('/articles')
  }
})

// = = = = = = = = = = = = =
//  CREATE ARTICLE (POST)
// = = = = = = = = = = = = =
router.post('/', async (req, res) => {
  const { title, description, content, author } = req.body
  const article = new Article({
    title,
    description,
    content,
    author,
    slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  })

  try {
    const newArticle = await article.save()
    res.redirect(`/articles/${newArticle._id}`)
  } catch (err) {
    console.error('POST /articles failed:', err)
    const authors = await Author.find()
    res.render('articles/new', {
      article: article,
      authors: authors,
      errorMessage: 'Error creating article'
    })
  }
})


// IMPORTANT: All specific GET routes (e.g. /articles/comments, /articles/authors)
// MUST be defined BEFORE dynamic routes like /articles/:slug or /articles/:id
// because Express matches routes in the order they appear!!

// = = = = = = = = = = = = =
//  SHOW ARTICLE BY ID
// = = = = = = = = = = = = =
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author')
      .populate('comments')
    if (!article) return res.status(404).send('Article not found')
    //res.render('articles/show', { article: article })
    res.json(article) 
  } catch (err) {
    console.error('GET /articles/:id failed:', err)
    res.redirect('/')
  }
})


// = = = = = = = = = = = = =
//  POST NEW AUTHOR
// = = = = = = = = = = = = =
router.post('/authors', async (req, res) => {
    const { name, email } = req.body
    try {
      const author = new Author({ name, email })
      await author.save()
      res.status(201).json(author)
    } catch (err) {
      console.error('POST /articles/author failed:', err)
      res.status(400).send('Failed to create author')
    }
  })
  

// = = = = = = = = = = = = =
//  POST NEW COMMENT TO ARTICLE
// = = = = = = = = = = = = =
router.post('/:id/comments', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ message: 'Article not found' })

    const comment = new Comment({
      content: req.body.content,
      article: article._id
    })

    const savedComment = await comment.save()
    article.comments.push(savedComment._id)
    await article.save()

    res.status(201).json(savedComment)
  } catch (err) {
    console.error('POST /articles/:id/comments failed:', err)
    res.status(500).json({ message: 'Failed to add comment' })
  }
})

// = = = = = = = = = = = = =
//  PUT Edit/Update ARTICLE
// = = = = = = = = = = = = =
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!article) {
      return res.redirect('/') // redirect if article is not found
    }
    res.redirect(`/articles/${article.slug}`)
  } catch (err) {
    console.log(err)
    res.redirect('/') // redirect on error
  }
})

// = = = = = = = = = = = = =
//  DELETE DELETE AN ARTICLE
// = = = = = = = = = = = = =

// DELETE article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) {
      return res.redirect('/') // redirect if article is not found
    }
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/') // redirect on error
  }
})

module.exports = router