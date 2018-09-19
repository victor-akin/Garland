// pull in helpers
let helpers = require('./helper');

// pull in express
let express = require('express');
let app = express();

// mongoose
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/garland', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))

// app models
let User = require('./models/user.js');

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

    let redirectInfo = {redirect: false, redirecTo: '/dashboard'};
    let redirectInfoErr = {redirect: false, redirecTo: ''};
    
    // todo - manage redirect info
    if(err.length > 0) res.status(200).json({err, ...redirectInfoErr});

    // extract relevant data
    newUser = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    };

    // save user
    const loggedUser = new User(newUser);
    loggedUser.save().then(() => console.log('just saved new user'));
    // console.log(User);

    // handle respone after save
});

// login
app.post('/login', function(req, res) {
    res.send('login attempt');
});

// dashboard
app.get('/dashboard', function(req, res) {
    res.render('dashboard');
});

app.listen(3000, console.log('Serving app...'))