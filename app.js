let User = require('./src/user.js');
let user = new User();    

// pull in helpers
let player = require('./helper');

// pull in express
let express = require('express');
let app = express();

// allow static files from assets directory
app.use(express.static(__dirname + '/assets')) 

// set templating engine
app.set('views', './templates');
app.set('view engine', 'pug');

// ROUTES
app.get('/', function(req, res) {
    // res.send(user.index());
    res.render('index');
});

app.listen(3000, console.log('Serving app...'))