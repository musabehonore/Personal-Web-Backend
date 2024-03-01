[![Coverage Status](https://coveralls.io/repos/github/musabehonore/Personal-Web-Backend/badge.svg?branch=main)](https://coveralls.io/github/musabehonore/Personal-Web-Backend?branch=main)

# Personal Web Backend

# Blog API
## Welcome to the Blog API!
This API allows you to manage blog posts, likes and comments.

# Features

Create, read, update, and delete blog posts.
Add comments to blog posts.
Authentication for secure access to API endpoints.
Pagination for retrieving blog posts.
Comprehensive test suite to ensure API reliability.
# Installation
### Clone this repository:

bash
Copy code
git clone https://github.com/musabehonore/Personal-Web-Backend.git
Install dependencies:

bash
Copy code
npm install
### Set up environment variables:

Create a .env file in the root directory and configure the following variables:

dotenv
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_secret_key
Replace your_secret_key with your desired JWT secret key.

### Start the server:

bash
Copy code
npm start
The server will run at http://localhost:3000 by default.


# Testing
To run the test suite:

bash
Copy code
npm run test
# Contributing
We welcome contributions from the community! If you encounter any bugs or have suggestions for improvement, please open an issue or submit a pull request.


