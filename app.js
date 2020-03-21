// don't need because we use the functionalities from express (see commented out block below where we no longer use http to create server)
// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser')

// this is a request handler that can be passed through createServer
const app = express();

// imports middlewares below
// refer to bottom to use this as alterntive instead of having all middlewares in this script
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// this middleware to parse anything should always come first
// .urlencoded() already execudes .next()
app.use(bodyParser.urlencoded({extended: false}));
// .use() allows us to add a new middleware function
// the function that's passed to .use() will be executed for every incoming request
// can use any function that receives request, response, and next function as arguments
// app.use((req, res, next) =>{
    // this is a useless middleware but to illustrate purpose of next() function
    // but will always run since this is the first middleware and we have next() function to go to next middlewares
    console.log('this always runs!');
    next(); // need to call .next() for the request to travel on to the next middleware in line
// });
// this middleware does not have next function, so if path is '/add-product', will execute response in this block
// else, if path is not '/add-product', will go to next middleware
app.use('/add-product', (req, res, next) =>{
    console.log('in the second middleware!');
    
    res.send('<h1>This is the add product page</h1><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></input></form>'); //allows us to send response in the form of any body, like html
});

// this middleware will only trigger for incoming post requests with this past and not for get
// .get() and .post() act same as .use(), with same arguments, but only trigger for respective requests
// if try to do get request at '/product' path, will redirect to '/' 
app.post('/product', (req, res, next) =>{
    // body of text submitted in form will be parsed by bodyParser and returns object of key(in this case, "title"): value(whatever is submtited)
    // this console log will log {"title": 'whateverissubmitted'}
    console.log(req.body)
    res.redirect('/')
})
//.use() takes optional first argument, which is path(default is '/')
// '/' will be response for any path that starts with /, which is everything so need to have main domain last middleware
// but, .get() will do exact match, so order in this case wouldn't matter
app.use('/', (req, res, next) =>{
    console.log('in the second middleware!');
    //if we're sending response, probably do not want a next() function
    res.send('<h1>Hello from Express!</h1>'); //allows us to send response in the form of any body, like html
});

// add 404 error if get or post requests don't match any of the paths in the middlewares above
app.use((req, res, next) =>{
    //set statuscode to 404 with html
    res.status(404).send('<h1>Page Not Found</h1>')
})

// const server = http.createServer(app);
// server.listen(3000);
// alternative to above:
app.listen(3000);
