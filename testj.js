// let mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/garland', { useNewUrlParser: true });
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample');

const Cat = mongoose.model('animal', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
console.log(Cat.find({name: 'Zildjian'}))