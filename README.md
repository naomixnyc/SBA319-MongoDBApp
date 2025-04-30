# Article Bulletin Application
This is a simple article bulletin board application using Express.js, MongoDB, Mongoose and EJS. It allows authors to post articles, and users can comment on them. Authors can create, edit, delete articles and comments, and view them on the website.

**Please note:** This project was initially started as a media bookmark application, where I was the sole user and owner. Currently, there are no restrictions on deleting or modifying articles, although the schema includes certain requirements for other operations.


## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)


  ## Features

- **Article Management**: 
  - View, create, edit, and delete articles. 
  - Articles include title, description, content, and a unique slug.
  - Articles are timestamped and linked to an author.
  - Articles can have multiple comments.

- **Commenting System**: 
  - Users can post comments on articles.
- **Author Management**: 
  - Articles are linked to authors.

  ## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **View Engine**: EJS, Slugify
- **Middleware**: Method Override (and DOMJS) for PUT and DELETE requests over HTML
- **Environment Variables**: dotenv

  ## Installation
1. Clone the repository
2. Install dependencies (npm install)
3. Set up your .env file with your MongoDB connection URI and run the `seed.js` script to create three collections: 13 Articles, 13 Authors, 13 Comments.
```bash
   node seed.js
```


  ## API Endpoints


- **GET** `/articles`  
  Display all articles, sorted by most recent ({ createdAt: -1 }).
  Each article includes its author and associated comments. 

  - **GET** `/articles/authors`  
  Display all authors currently registered.   

- **GET** `/articles/comments`  
  Display all comments submitted.  


- ---**GET** `/articles/:slug`---  
  ---View a single article by its slug, including its author and comments.--- 

- **GET** `/articles/:id`  
  View a single article by its MongoDB _id (ObjectId), including its author and comments. 



- **POST** `/articles`  
  Create a new article.  
  **Request Body:**
  ```json
  {
    "title": "Article Title",
    "description": "Article Description",
    "content": "Full article content",
    "author": "Author's ObjectId" //"6811045c50b8186c1d7e5a64"
  }
  ```

- **GET** `/articles/new`
  Display the form to create a new article. (This form dynamically loads available authors to choose from.)


- **POST** `/articles/authors`
  Add a new author.
```json
{
  "name": "Author Name",
  "email": "Author's email"
}
```

- **POST** `/articles/:id/comments`  
  Add a comment to a specific article.  
  **Request Body:**
  ```json
  {
    "content": "Comment content",
    "author": Author's ObjectId //"6811045c50b8186c1d7e5a6e"  
  }
  ```


- **PUT** `/articles/:id`  
  Update an existing article by its _id. 
  **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "content": "Updated content"
  }
  ```

- **DELETE** `/articles/:id`  
  Delete an article by its _id.  

### **Notes:** `slug` is automatically generated from the title when an article is created. 
