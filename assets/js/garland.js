$(document).ready(function() {
    // handle signup
    $('#signupForm').on('submit', function(e){
        e.preventDefault();
        $('#error-alerts').children().remove();
        let data = {
            fullname: $('#signup-fullname').val(),
            email: $('#signup-email').val(),
            password: $('#signup-password').val(),
            confirmPassword: $('#signup-confirm').val()
        };
        console.log(data)
        $.ajax({
            url: '/signup',
            method: 'POST',
            data: data
        })
        .done(function(responseData) {
            console.log(responseData)
            if(responseData.err.length > 0) {
                responseData.err.map(function(el) {
                    $(`<div class="alert alert-danger" role="alert"> ${el} </div>`).appendTo('#error-alerts')
                });
            }
            else{
                window.location.href = responseData.redirecTo;
            }
        })
        .fail(function(responseData) {
            console.log('failed')
        });

    });
});
// console.log(errs)

