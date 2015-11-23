 Template.login.rendered = function () {
    $('#tour').removeClass('active');
    $('#features').removeClass('active');
    $('#pricing').removeClass('active');
    $('#loginNav').addClass('active');
    $('#faq').removeClass('active');
 }

 Template.login.events({
 	'submit #login-form' : function(e, t){
        e.preventDefault();
        // retrieve the input field values
        var email = t.find('#email').value;
        var password = t.find('#password').value;

        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                // The user might not have been found, or their passwword
                // could be incorrect. Inform the user that their
                // login attempt has failed.
                sweetAlert("Error!", err + "Please try again.", "error");
            } else {
                // The user has been logged in.
                if (Meteor.user().role[0] === "walker") {
                        Router.go('/walkerCalendarList');
                }
                if (Meteor.user().role[0] === "pro") {
                        Session.set("ProConfigured", Meteor.user().configured);
                        Router.go('/proHome');
                }
                if (Meteor.user().role[0] === "client") {
                        Router.go('/findWalker');
                }
            }

        });
        return false;
    },
    'click #forget': function () {
        Router.go('/resetPassword');
    }


 });