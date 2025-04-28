# Article Board Application
This is a simple article board application using Express.js, MongoDB, Mongoose and EJS. It allows authors to post articles, and users can comment on them. Authors can create, edit, delete articles and comments, and view them on the website.

**Please note:** This project was initially started as a media bookmark application, where I was the sole user and owner. Currently, there are no restrictions on deleting or modifying articles, although the schema includes certain requirements for other operations.


## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [GET Articles](#get-articles)
  - [GET Article by Slug](#get-article-by-slug)
  - [POST New Article](#post-new-article)
  - [POST New Comment](#post-new-comment)
  - [PUT Update Article](#put-update-article)
  - [DELETE Article](#delete-article)


  ## Features

- **Article Management**: 
  - View, add, update, and delete articles.
- **Commenting System**: 
  - Users can post comments on articles.
- **Author Management**: 
  - Articles are linked to authors.

  ## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **View Engine**: EJS
- **Middleware**: Method Override (and DOMJS) for PUT and DELETE requests over HTML
- **Environment Variables**: dotenv

  ## Installation
1. Clone the repository
2. Install dependencies (npm install)
3. Set up your .env file with your MongoDB connection URI or:
To populate the database with sample data, you can run the seed.js script. The data includes:
13 Articles, 13 Authors, 13 Comments

  ## API Endpoints

- **GET** `/articles`  
  Fetch all articles along with authors and comments.  

- **GET** `/articles/:slug`  
  Fetch a single article by its slug, including the author and comments.  

- **POST** `/articles`  
  Create a new article.  
  **Request Body:**
  ```json
  {
    "title": "Article Title",
    "description": "Article Description",
    "markdown": "Full article content",
    "authorId": "Author's ObjectId"
  }

  - **POST** `/articles/:id/comments`  
  Add a comment to an article.  
  **Request Body:**
  ```json
  {
    "content": "Comment content"
  }

  - **PUT** `/articles/:id`  
  Update an article by its id.  
  **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "markdown": "Updated content"
  }

  - **DELETE** `/articles/:id`  
  Delete an article by its id.  
