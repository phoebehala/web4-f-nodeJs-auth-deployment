# MERN Blog
> MERN stack blog with authentication
> Live demo [_here_](https://web-mern-blog.herokuapp.com/)

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features & Challenges](#features--challenges)
* [API Source](#API-Source)
* [Usage](#usage)
* [Room for Improvement](#room-for-improvement)

## General Information
#### Idea / Motivation
- To create a blog that can be registered by people to share information
#### Purposes / Intentions
- To create my own API using node.js
- To work with authentication by using JWT
- To practice MVC (Model-View-Controller) pattern 
- To practice MERN stack development
- To practice CRUD
- To deploy: a combined server on Heroku

## Technologies Used

#### react.js
- react props, useState(), react events, useEffect()
- react-router-dom
- contextAPI

#### styles
- styled-components

#### node.js
- express.js, mongoose

#### JSON Web Tokens
- jsonwebtoken

#### others
- Window localstorage

#### other libraries
- axios
- crypto-js
- http-proxy-middleware
- multer
- dotenv


## Features & Challenges

#### Authentication and Authorization
###### For every one
- Every one can view the blogs and also can view them by categories or users
- Ask a user to log in when a user click the button to write an article 
- Ask a user to log in when a user click the button to see their own article
<img width="960" alt="every-one" src="https://user-images.githubusercontent.com/83237024/162497270-e424175b-1734-43a1-a55b-0e9bb80dcae4.png">

###### For a user who has registered and logged in
- Only a person who has registed and logged in can write an article
- Show the name of the user who logged on the top-right screen
- Show the photo of the user who logged on the bottom-left screen
- Only a user who is authenticated can edit or delete their own article as well as update their personal info
<img width="960" alt="logged-in-user" src="https://user-images.githubusercontent.com/83237024/162497121-baafb887-7f01-4303-beab-63dc4403f18c.png">

#### API
<img width="965" alt="MERN-blog-API" src="https://user-images.githubusercontent.com/83237024/162512921-dc22ef5b-f1eb-4b3d-96a7-87bdb7cba9e6.png">

#### CRUD (Create, Read, Update and Delete)
- The basic operations to be done in a data
- Used the same component (SinglePost.jsx) to switch viewing mode or edited mode

#### useContext
- Using user information across the app
- In "Navbar" component, if user exist, they can view their own posts
<img width="843" alt="MERN-blog-useContext-user" src="https://user-images.githubusercontent.com/83237024/162527733-fe547cd9-b130-4d39-ae37-ca379d96ea8e.png">


## Usage
Please feel free to register or use the below user info to log in
```
username: user2
password: 123qwe
```

## Room for Improvement
To do:
- Error handling
- Adding admin consol
- CREATE category feature