const mongoose = require('mongoose')
const Author = require('./models/authorModel')
const Article = require('./models/articleModel')
const Comment = require('./models/commentModel')
require('dotenv').config()

//Please make sure that you have your URI in the .env file!!
mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err))

// sample authors
const authorsData = [
    { name: 'Jane Austen', email: 'j.austen@gmail.com' },
    { name: 'Charles Dickens', email: 'charles.dickens@victorianpress.com' },
    { name: 'George Orwell', email: 'g.orwell@gmail.com' },
    { name: 'Leo Tolstoy', email: 'leo.tolstoy@russianclassics.com' },
    { name: 'F. Scott Fitzgerald', email: 'f.sfitzgerald@gmail.com' },
    { name: 'Herman Melville', email: 'h.melville@whalepress.com' },
    { name: 'Mark Twain', email: 'mark.twain@gmail.com' },
    { name: 'Virginia Woolf', email: 'v.woolf@bloomsburypress.com' },
    { name: 'Ernest Hemingway', email: 'e.hemingway@gmail.com' },
    { name: 'J.R.R. Tolkien', email: 'jrr.tolkien@middleearthpub.com' },
    { name: 'Emily Brontë', email: 'emily.bronte@gmail.com' },
    { name: 'William Shakespeare', email: 'w.shakespeare@bardhouse.com' },
    { name: 'Franz Kafka', email: 'f.kafka@gmail.com' }
  ]

// sample articles - 
const articlesData = [
    {
      title: 'Global Climate Change Accelerating',
      slug: 'global-climate-change-accelerating',
      description: 'Scientists warn that global temperatures continue to rise.',
      content: 'In a recent study, it was confirmed that global temperatures are rising at an alarming rate, threatening ecosystems worldwide...',
      author: 'Jane Austen'
    },
    {
      title: 'Tech Giants Face Antitrust Scrutiny',
      slug: 'tech-giants-face-antitrust-scrutiny',
      description: 'Governments worldwide are increasing regulations on major tech companies.',
      content: 'The world’s largest tech companies are under increasing scrutiny, with lawmakers pushing for stronger antitrust regulations...',
      author: 'Charles Dickens'
    },
    {
      title: 'AI’s Role in Healthcare: A Double-Edged Sword',
      slug: 'ais-role-in-healthcare-a-double-edged-sword',
      description: 'Artificial intelligence shows promise but raises concerns in medicine.',
      content: 'AI tools are being used to diagnose diseases and predict treatment outcomes, but many worry about data privacy and ethics...',
      author: 'George Orwell'
    },
    {
      title: 'Economic Recovery: The Road Ahead',
      slug: 'economic-recovery-the-road-ahead',
      description: 'Experts debate the pace of economic recovery post-pandemic.',
      content: 'As the world continues to recover from the COVID-19 pandemic, economists are predicting different scenarios for global growth...',
      author: 'Leo Tolstoy'
    },
    {
      title: 'Space Tourism: A New Frontier',
      slug: 'space-tourism-a-new-frontier',
      description: 'Private companies make space tourism a reality for the wealthy.',
      content: 'Companies like SpaceX and Blue Origin are leading the charge to make space tourism an accessible experience for billionaires...',
      author: 'F. Scott Fitzgerald'
    },
    {
      title: 'Electric Cars on the Rise: A Sustainable Future?',
      slug: 'electric-cars-on-the-rise-a-sustainable-future',
      description: 'Electric vehicles continue to grow in popularity, but challenges remain.',
      content: 'As electric cars become more common on the roads, questions remain about the sustainability of battery production and disposal...',
      author: 'Herman Melville'
    },
    {
      title: 'Hollywood’s Struggle with Diversity',
      slug: 'hollywoods-struggle-with-diversity',
      description: 'Calls for more diversity in film and TV production grow louder.',
      content: 'Hollywood is facing increasing pressure to diversify its cast and crew, with many pointing out that minority representation is still lacking...',
      author: 'Mark Twain'
    },
    {
      title: 'Global Pandemic Response: Lessons Learned',
      slug: 'global-pandemic-response-lessons-learned',
      description: 'Countries share their experiences in managing the COVID-19 pandemic.',
      content: 'From vaccine distribution to lockdown measures, nations are now reflecting on their pandemic responses to better prepare for future crises...',
      author: 'Virginia Woolf'
    },
    {
      title: 'Cryptocurrency: The Future of Money?',
      slug: 'cryptocurrency-the-future-of-money',
      description: 'Digital currencies continue to disrupt traditional financial systems.',
      content: 'Cryptocurrencies such as Bitcoin and Ethereum have surged in popularity, but experts are divided on whether they will eventually replace traditional currencies...',
      author: 'Ernest Hemingway'
    },
    {
      title: 'World’s Oceans: A Growing Crisis',
      slug: 'worlds-oceans-a-growing-crisis',
      description: 'The health of the world’s oceans continues to deteriorate due to pollution and overfishing.',
      content: 'Marine ecosystems are under threat from plastic waste, oil spills, and illegal fishing, and experts are calling for global action to protect our oceans...',
      author: 'J.R.R. Tolkien'
    },
    {
      title: 'Social Media’s Impact on Mental Health',
      slug: 'social-medias-impact-on-mental-health',
      description: 'Studies suggest that social media use has negative effects on mental well-being.',
      content: 'A growing body of research shows that excessive use of social media is linked to increased anxiety, depression, and loneliness...',
      author: 'Emily Brontë'
    },
    {
      title: 'Climate Refugees: A Growing Crisis',
      slug: 'climate-refugees-a-growing-crisis',
      description: 'Millions are being displaced due to climate change-induced disasters.',
      content: 'As global temperatures rise and natural disasters increase, climate refugees are fleeing their homes in search of safety and stability...',
      author: 'William Shakespeare'
    },
    {
      title: 'AI and the Future of Work: Are Jobs at Risk?',
      slug: 'ai-and-the-future-of-work-are-jobs-at-risk',
      description: 'Automation and AI technology continue to change the labor market.',
      content: 'With the rise of AI, many workers fear that their jobs may be replaced by machines. However, some experts argue that AI will create new job opportunities...',
      author: 'Franz Kafka'
    }
  ];

// sample comments
const commentsData = [
    { content: 'Great article! Very informative.', articleId: 'Global Climate Change Accelerating', author: 'John Doe' },
    { content: 'Very thought-provoking. Thank you for sharing.', articleId: 'Tech Giants Face Antitrust Scrutiny', author: 'Alice Johnson' },
    { content: 'I disagree with some points, but it’s a good read.', articleId: 'AI’s Role in Healthcare: A Double-Edged Sword', author: 'Bob Smith' },
    { content: 'I loved the historical insight. A must-read!', articleId: 'Economic Recovery: The Road Ahead', author: 'Carla Green' },
    { content: 'Such a tragic story of ambition gone wrong.', articleId: 'Space Tourism: A New Frontier', author: 'David White' },
    { content: 'A masterpiece. Highly recommend.', articleId: 'Electric Cars on the Rise: A Sustainable Future?', author: 'Eve Adams' },
    { content: 'Tom’s adventures bring back memories of childhood.', articleId: 'Hollywood’s Struggle with Diversity', author: 'George Bell' },
    { content: 'Really insightful into the human psyche.', articleId: 'Global Pandemic Response: Lessons Learned', author: 'Hannah Clarke' },
    { content: 'An emotional read. So beautifully written.', articleId: 'Cryptocurrency: The Future of Money?', author: 'Ian Evans' },
    { content: 'A classic. Love the adventure.', articleId: 'World’s Oceans: A Growing Crisis', author: 'James Roberts' },
    { content: 'A haunting love story. Amazing!', articleId: 'Social Media’s Impact on Mental Health', author: 'Katherine Lewis' },
    { content: 'Shakespeare’s work always leaves me questioning.', articleId: 'Climate Refugees: A Growing Crisis', author: 'Louis Hall' },
    { content: 'Kafka’s writing is so strange and intriguing.', articleId: 'AI and the Future of Work: Are Jobs at Risk?', author: 'Megan Clark' }
]


async function seedDatabase() {
    try {
        // insert authors
        await Author.deleteMany()
        await Author.insertMany(authorsData)

        // insert articles (associate them with authors by name)
        await Article.deleteMany()
        for (let article of articlesData) {
            const author = await Author.findOne({ name: article.author })
            article.author = author._id  // link author by ObjectId
            await Article.create(article)
        }

        // insert comments (associate them with articles by title)
        await Comment.deleteMany()
        
        // for (let comment of commentsData) {
        //     const article = await Article.findOne({ title: comment.articleId })
        //     comment.articleId = article._id  // link comment to article by ObjectId
        //     await Comment.create(comment)
        // }
        for (let comment of commentsData) {
            const article = await Article.findOne({ title: comment.articleId })
            const author = await Author.findOne({ name: comment.author })

            if (!article) {
                console.warn(`Article not found for comment: ${comment.content}`)
                continue
            }

            comment.article = article._id // match commentModel's 'article' field

            // author optional (articleModel), so set only if found
            if (author) {
                comment.author = author._id // match authorModel's 'author' field
            } else {
                delete comment.author // avoid validation error
            }

            await Comment.create(comment)

        }

        console.log('Database seeded successfully!')
        mongoose.connection.close()
    } catch (err) {
        console.error('Error seeding database:', err)
        mongoose.connection.close()
    }
}

seedDatabase()