let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let express = require('express');
let app = express();

// pull in helpers
let helpers = require('./helper');
let User = require('./models/user.js');


// mongoose
mongoose.connect('mongodb://localhost:27017/garland', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))

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
    if(err.length > 0) {
        res.status(200).json({err, ...redirectInfoErr});
    }
    else {
        // extract relevant data
        newUser = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        };

        // save user
        const loggedUser = new User(newUser);
        loggedUser.save()
            .then(() => {
                console.log('just saved new user');
                res.redirect('/dashboard');
            })
            .catch(() => {
                res.status(200).json({err: ['These user details already exist']});
            });

        // handle response after save
        

    }
});

// login
app.post('/login', function(req, res) {
    let validated = helpers.loginValidate(req.body);
    validated
        .then((u) => {
            // expecting user object to put in session
            // console.log(u)
            if(u) {
                res.redirect('/dashboard');
            }else{
                res.render('index', {err: ['wrong credentials']});
            }
        })
        .catch((e) => console.log(e))

});

// dashboard
app.get('/dashboard', function(req, res) {
    res.render('dashboard');
});

app.listen(3000, console.log('Serving app...'))