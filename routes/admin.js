// this script is more for middlewares for product-related admin functions, like having user input

const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../paths/paths')

router.get('/add-product', (req, res, next) =>{
    // console.log('in the second middleware!');
    
    //cleaner way to reference the root directory
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
    // res.send('<h1>This is the add product page</h1><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></input></form>'); //allows us to send response in the form of any body, like html
});

router.post('/add-product', (req, res, next) =>{

    // console.log(req.body)
    // console.log(req.body['title'])
    res.redirect('/')
})

module.exports = router;