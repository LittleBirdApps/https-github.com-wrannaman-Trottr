 Template.signup.rendered = function () {
 	$('#tour').removeClass('active');
 	$('#features').removeClass('active');
 	$('#pricing').removeClass('active');
 	$('#loginNav').addClass('active');
 	$('#faq').removeClass('active');
 }

 Template.signup.events({
 	'submit #signup-form': function (e,t) {
 		e.preventDefault();
 		var first_Name = $('#first_name').val();
 		var last_Name = $('#last_name').val();
 		var phone = $('#phone').val();
 		var email = $('#email').val();
 		var password = $('#password').val();
 		var address = $('#busAddress').val();
 		var radius = $('#radius').val();
 		var howHear = $('#howHear').val();

 		if (!first_name || !last_name || !phone || !address || !email || !password || !radius) {
 			sweetAlert({
	                    title: "Uh Oh!",
	                    type: "error",
	                    text: "Please fill out all the fields."
	                });
 		} else {
 			Accounts.createUser({'email': email, 'password':password }, function(e,r) {
	            if (e) {
	                sweetAlert({
		                        title: "Uh Oh!",
		                        type: "error",
		                        text: "There was an error, all we know is : " + error
		                    });
	            } else {
	                Meteor.call('AddWalkerProfile', Meteor.userId(), ["walker"], first_Name, last_Name, phone, address, radius, function (e,r) {
		                if (e) {
		                    return sweetAlert({
		                        title: "Uh Oh!",
		                        type: "error",
		                        text: "There was an error, all we know is : " + error
		                    });
		                } else {
							Router.go('/findWalker');
							sweetAlert({
		                        title: "Thanks!",
		                        type: "info",
		                        text: "Your application has been recieved, we will be in touch. For now, check out how the client side of the app works!"
		                    });
		                }
		            });
	            }
	        }); // end accounts creation.
 		}
 	}
 });