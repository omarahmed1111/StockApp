const express = require('express')
const app = express()
const path = require('path')
const exphbs  = require('express-handlebars');
const request  = require('request');
const bodyParser = require('body-parser');

// Get the port given to us by the server host or port 5000 instead.
const PORT = process.env.PORT || 5000;

// API KEY pk_d044c3f1bd2d4518abdc5d2090a6bedf 
// Create call_api function.
function call_api(finishAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=pk_d044c3f1bd2d4518abdc5d2090a6bedf', {json:true},
    (err,res,body) => {
        if(err) {return console.log(err);}
        if(res.statusCode === 200){return finishAPI(body);}
    });
};

// Set HandleBars MiddleWare.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Use body parser middleware.
app.use(bodyParser.urlencoded( {extended : false} ) );

// Set handlebars GET routes.
app.get('/', (req, res) => {
    call_api((doneAPI) => {
        res.render('home',{
            stock:doneAPI
        });
    }, "fb");
});

// Set handlebars POST routes.
app.post('/', (req, res) => {
    call_api((doneAPI) => {
        //posted_stuff = req.body.stock_ticker;
        res.render('home',{
            stock:doneAPI
        });
    }, req.body.stock_ticker);
});

// Create About page route.
app.get('/about.html', (req, res) => {
    res.render('about');
});


// Listen to the port we will use.
app.listen(PORT, () => console.log("Server listening on port: "+PORT))
