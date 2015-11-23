 Template.resetPassword.rendered = function () {
    $('#tour').removeClass('active');
    $('#features').removeClass('active');
    $('#pricing').removeClass('active');
    $('#loginNav').addClass('active');
    $('#faq').removeClass('active');
 }

 Template.resetPassword.events({
 	'click #forgot' : function(e, t){
        e.preventDefault();
        var email = t.find('#email').value;
        Meteor.call('resetPasswordByEmail', email, function (error, result) {
            if (error) {
                sweetAlert({
                        title: "Password Reset",
                        type: "error",
                        text: "Email address not found"
                    });
            } else {
                sweetAlert({
                        title: "Password Reset",
                        type: "success",
                        text: "Check your email to reset your password."
                    });
            }
        });
    }
 });