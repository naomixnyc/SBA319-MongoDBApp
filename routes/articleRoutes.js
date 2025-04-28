const express = require('express')
const router = express.Router()
const Article = require('../models/articleModel')
const Author = require('../models/authorModel')
const Comment = require('../models/commentModel')

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author')
      .populate('comments')
    res.render('articles/index', { articles: articles })
  } catch (err) {
    console.log(err)
    res.redirect('/') // redirect on error
  }
})

// GET one article by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author')
      .populate('comments')
    if (!article) {
      return res.redirect('/')
    }
    res.render('articles/show', { article: article })
  } catch (err) {
    console.log(err)
    res.redirect('/') // redirect on error
  }
})

// POST new article
router.post('/', async (req, res) => {
  try {
    const author = await Author.findById(req.body.authorId)
    if (!author) {
      return res.redirect('/') // redirect if author is invalid
    }

    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
      author: author._id,
    })

    const article = await newArticle.save()
    res.redirect(`/articles/${article.slug}`)
  } catch (err) {
    console.log(err)
    res.redirect('/') // redirect on error
  }
})

// POST new comment for an article
router.post('/:id/comments', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id) //just show id on the browswer (680ebab74ca5406538808fc4 ex)
    if (!article) {
      return res.redirect('/') // redirect if article is not found
    }

    const newComment = new Comment({
      content: req.body.content,
      article: article._id,
    })

    const comment = await newComment.save()
    article.comments.push(comment)
    await article.save()
    res.redirect(`/articles/${article.slug}`)
  } catch (err) {
    console.log(err)
    res.redirect('/') // redirect on error
  }
})


// GET edit article form
router.get('/:id/edit', async (req, res) => {
    try {
      const article = await Article.findById(req.params.id)
      if (!article) {
        return res.redirect('/')
      }
      res.render('articles/edit', { article: article })
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
  })


// PUT update article
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
