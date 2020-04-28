const express = require('express')
const app = express()
const path = require('path')
const exphbs  = require('express-handlebars');

// Get the port given to us by the server host or port 5000 instead.
const PORT = process.env.PORT || 5000;

// Set HandleBars MiddleWare.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebars routes.
app.get('/', function (req, res) {
    res.render('home',{
        stuff:"This is some stuff...."
    });
});

// Create About page route.
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder.
app.use(express.static(path.join(__dirname, 'public')));

// Listen to the port we will use.
app.listen(PORT, () => console.log("Server listening on port: "+PORT))
