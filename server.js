const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require('path');

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json());  // in order to user req.body


// for deployment
app.use(express.static(path.resolve(__dirname, "./client/build")));

//const cors = require('cors')
//app.use(cors())

app.use('/myProxy/v1', require('./routes/index.route')) // '/api/v1' >>> was set up in client/proxySetup.js
//app.use('/myProxy/v1/api/posts', require('./routes/posts.route'))

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URL, () => {
    app.listen(PORT)
}).then(console.log(`Backend server is running and listening to ${PORT}`))
  .catch(err =>console.log(err))
