// middleware in this script are for what users see and not necessarily interact with

const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../paths/paths')

router.get('/', (req, res, next) =>{
    console.log('in the second middleware!');

    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    // __dirname is a global variable that holds the absolute path on OS to project folder, in this case the routes folder
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
    //res.send('<h1>Hello from Express!</h1>'); //allows us to send response in the form of any body, like html
});

module.exports = router;