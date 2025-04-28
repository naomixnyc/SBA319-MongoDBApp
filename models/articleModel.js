const mongoose = require('mongoose')
const { marked } = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        maxlength: 200,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    slug: {
        type: String,
        required: true,
        unique: true,
    },
});

// index for quick searching by title
articleSchema.index({ title: 'text' })

const Article = mongoose.model('Article', articleSchema)
module.exports = Article // mongodb automatically creates a collection called articles (always plural & lowercase)

// When exporting multiple models
// module.exports = {
//     Article: mongoose.model('article', articleSchema),
//     Comment: mongoose.model('comment', commentSchema)
// }
// --> imported in server.js
// const { Article, Comment } = require('./models/articleModels')
// --> imported in routes/articleRoutes.js
// const { Article, Comment } = require('../models/articleModels')