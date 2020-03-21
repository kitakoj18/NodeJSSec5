// this script is alternative to app.js where we instead import middleware routes from admin.js and shop.js in routes folder
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// imports middlewares below
// refer to bottom to use this as alterntive instead of having all middlewares in the same script as in app.js
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// this middleware to parse anything should always come first
// .urlencoded() already execudes .next()
app.use(bodyParser.urlencoded({extended: false}));

// if any files look for references to things like css file, will automatically be forwarded to static public path
// can have multiple static folders and will return back first file it matches to
app.use(express.static(path.join(__dirname, 'public')));

// adminRoutes router object is a valid middleware function
app.use(adminRoutes);
// if all paths in middlewares in admin.js start with something like '/admin/', then can put as required path as argument:
// app.use('/admin', adminRoutes);
app.use(shopRoutes); // order wouldn't matter since in shop.js we changed to .get() but still good practice to keep order

app.use((req, res, next) =>{
    //set statuscode to 404 with html
    res.status(404).sendFile(path.join(__dirname, 'views', 'page404.html'))
    //res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3000);
