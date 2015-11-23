 Template.clientSignup.rendered = function () {
 	$('#tour').removeClass('active');
 	$('#features').removeClass('active');
 	$('#pricing').removeClass('active');
 	$('#loginNav').addClass('active');
 	$('#faq').removeClass('active');
 	
 }

 Template.clientSignup.events({
 	'click #signup': function (e,t) {
 		e.preventDefault();

 		var first_name = $('#first_name').val();
 		var last_name = $('#last_name').val();
 		var phone = $('#phone').val();
 		var address = $('#address').val();
 		var email = $('#email').val().toLowerCase();
 		var howHear = $('#howHear').val();
 		var password = $('#password').val();

 		if (!first_name || !last_name || !phone || !address || !email || !password) {
 			sweetAlert({
	                    title: "Uh Oh!",
	                    type: "error",
	                    text: "Please fill out all the fields."
	                });
 		}
 		Accounts.createUser({'email': email, 'password':password }, function(e,r) {
            if (e) {
                sweetAlert({
	                        title: "Uh Oh!",
	                        type: "error",
	                        text: "There was an error, all we know is : " + error
	                    });
            } else {
                Meteor.call('AddClientProfile', first_name, last_name, phone, address, function (e,r) {
	                if (e) {
	                    return sweetAlert({
	                        title: "Uh Oh!",
	                        type: "error",
	                        text: "There was an error, all we know is : " + error
	                    });
	                } else {
						//Router.go('/findWalker');
						Meteor.call('verifyEmailForUser', Meteor.userId(), function (e,r) {
			              if (e) {
			                sweetAlert({
			                      title: "Uh Oh!",
			                      type: "error",
			                      text: "There was an error, all we know is : " + error
			                  });
			              } else {
			                    sweetAlert({
			                      title: "Account Verification",
			                      type: "success",
			                      text: "Please check your email to verify your account."
			                  });
			              }
			            })
	                }
	            });
            }
        }); // end accounts creation.
 	},
 	'submit #signup': function (e,t) {
 		e.preventDefault();
 	}

 });