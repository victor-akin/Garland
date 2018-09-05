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


module.exports