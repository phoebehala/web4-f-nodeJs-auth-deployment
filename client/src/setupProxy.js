const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function(app){
   app.use(
       ["myProxy/v1", "/api/*","/myProxy/*"], // represents endpoint of our backend API // these are two examples
       //createProxyMiddleware({ target: "https://web-mern-blog.herokuapp.com" })
       createProxyMiddleware({ target: "http://localhost:5000" })
   )
}
