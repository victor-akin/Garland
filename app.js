let User = require('./src/user.js');
let user = new User();    

// pull in helpers
let helpers = require('./helper');

// pull in express
let express = require('express');
let app = express();

// bodyParser
var bodyParser = require('body-parser');

// allow static files from assets directory
app.use(express.static(__dirname + '/assets')) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set templating engine
app.set('views', './templates');
app.set('view engine', 'pug');

// --- ROUTES ---
app.get('/', function(req, res) {
    res.render('index');
});

// signup route
app.post('/signup', function(req, res) {
    let err = helpers.validateForm(req.body);
    if(err.length > 0) console.log(err)
    // res.send(helpers.validateForm(req.body));
});

// login
app.post('/login', function(req, res) {
    res.send('login attempt');
});

app.listen(3000, console.log('Serving app...'))