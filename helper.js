// let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/garland', { useNewUrlParser: true });
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'))
// let User = require('./models/user');

/**
 * 
 * @param formData object literal
 */
exports.validateForm = function(formData) {

    dis = this;

    dis.errors = Array();

    dis.isEmpty = function(val, field) {
        val === '' ? dis.errors.push(`The ${field} field is empty`) : true;
    }

    dis.comparePasswords = function(password, confirmPassword){
        password !== confirmPassword ? dis.errors.push('The password fields are not the same') : true
    }

    // console.log(formData)
    Object.keys(formData).forEach(function(key) {
        dis.isEmpty(formData[key], key);
    });
    dis.comparePasswords(formData.password, formData.confirmPassword)
    return dis.errors;
}

/**
 * @param formData
 */
exports.loginValidate = async function(formData) {
    dis = this;

    dis.isValidUser = false;

    let User = require('./models/user');
    
    // if(User.find({email: formData.email}) > 0) console.log('found user')
    await User.find({email: formData.email}, (err,u) => {
        if(err) return false;
        // extract data to send for session tracking
        if(u.length > 0) dis.isValidUser = u;
    })

    return dis.isValidUser
}


module.exports