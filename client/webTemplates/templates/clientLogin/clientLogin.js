 Template.clientLogin.rendered = function () {
 	$('#tour').removeClass('active');
 	$('#features').removeClass('active');
 	$('#pricing').removeClass('active');
 	$('#loginNav').addClass('active');
 	$('#faq').removeClass('active');
 }

 Template.clientLogin.events({
	'click #login': function(e,t) {
		e.preventDefault();
        console.log('clicking Login');
        var email = $('#email').val().toLowerCase();
        var password = $('#password').val();
            Meteor.loginWithPassword(email, password, function(err,result) {
                if (err) {
                    sweetAlert("Error!", err + "Please try again.", "error");
                } else {
                    if (Meteor.user().role[0] === "walker") {
                            Router.go('/walkerCalendarList');
                    }
                    if (Meteor.user().role[0] === "pro") {
                            Session.set("ProConfigured", Meteor.user().configured);
                            Router.go('/proSchedule');
                    }
                    if (Meteor.user().role[0] === "client") {
                            Router.go('/findWalker');
                    }
                }

            });
	},
	'submit #login': function (e,t) {
		e.preventDefault();
	},
    'click #forget': function () {
        Router.go('/resetPassword');
    }
})